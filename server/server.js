import 'dotenv/config';
import express from 'express';
import ClientError from './lib/client-error.js';
import errorMiddleware from './lib/error-middleware.js';
import authorizationMiddleware from './lib/authorization-middleware.js';
import imgUploadsMiddleware from './lib/img-uploads-middleware.js';
import audioUploadsMiddleware from './lib/audio-uploads-middleware.js';
import pg from 'pg';
import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

// eslint-disable-next-line no-unused-vars -- Remove when used
const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();

// Create paths for static directories
const reactStaticDir = new URL('../client/build', import.meta.url).pathname;
const uploadsStaticDir = new URL('public', import.meta.url).pathname;

app.use(express.static(reactStaticDir));
app.use(express.static(uploadsStaticDir));
app.use(express.json());

// register
app.post('/api/users/register', async (req, res, next) => {
  try {
    const password = req.body.password;
    const username = req.body.username.toLowerCase();
    if (/\d/.test(username) && /[!@#$%^&*()]+/.test(username)) {
      throw new ClientError(
        401,
        'Numbers and special characters are not allowed in usernames!'
      );
    } else if (/\d/.test(username)) {
      throw new ClientError(401, 'Numbers are not allowed in usernames!');
    } else if (/[!@#$%^&*()]+/.test(username)) {
      throw new ClientError(
        401,
        'Special characters are not allowed in usernames!'
      );
    }
    const date = new Date();
    if (!username || !password) {
      throw new ClientError(400, 'username and password are required fields');
    }
    const hashedPassword = await argon2.hash(password);
    const sql = `
      insert into "users" ("username", "hashedPassword", "createdAt")
      values ($1, $2, $3)
      returning *
    `;
    const params = [username, hashedPassword, date];
    const result = await db.query(sql, params);
    const user = result.rows[0];
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

// Login
app.post('/api/users/log-in', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const usaname = username.toLowerCase();
    if (!username || !password) {
      throw new ClientError(401, 'Invalid Login');
    }
    const sql = `
    select "userId",
     "hashedPassword"
      from "users"
      where "username" = $1
    `;
    const params = [usaname];
    const result = await db.query(sql, params);
    if (!result) {
      throw new ClientError(401, 'Invalid Login');
    }
    const user = result.rows[0];
    if (!user) {
      throw new ClientError(401, 'Invalid Login');
    }
    const { userId, hashedPassword } = user;
    if (!(await argon2.verify(hashedPassword, password))) {
      throw new ClientError(401, 'Invalid Login');
    }
    const payload = { userId, user };
    const token = jwt.sign(payload, process.env.TOKEN_SECRET);
    res.json({ user: payload, token });
  } catch (err) {
    next(err);
  }
});

// delete all but dummy data
app.delete('/api/songs/:username', async (req, res, next) => {
  const username = String(req.params.username);
  try {
    const sql = `
    delete from "songs"
    where "songId" > 3
    returning *`;
    const result = await db.query(sql);
    const songs = result.rows[0];
    if (username.toLocaleLowerCase() !== 'example') {
      throw new ClientError(403, 'This account contains no dummy data');
    }
    res.status(204).json(songs);
  } catch (err) {
    next(err);
  }
});

// delete all but dummy data
app.delete('/api/images/:username', async (req, res, next) => {
  const username = String(req.params.username);
  try {
    const sql = `
      delete from "images"
      where "imageId" > 1
      returning *`;
    const result = await db.query(sql);
    const images = result.rows[0];
    if (username.toLowerCase() !== 'example') {
      throw new ClientError(403, 'This account contains no dummy data');
    }
    res.status(204).json(images);
  } catch (err) {
    next(err);
  }
});

app.use('/api/*', authorizationMiddleware);

// upload image
app.post(
  '/api/:userId/images/upload',
  imgUploadsMiddleware.single('image'),
  async (req, res, next) => {
    try {
      const userId = Number(req.params.userId);
      const date = new Date();
      const url = `/images/${req.file.filename}`;
      const sql = `
    insert into "images" ("userId", "url", "createdAt")
    values ($1, $2, $3)
    returning *
  `;
      const params = [userId, url, date];
      const result = await db.query(sql, params);
      const image = result.rows[0];
      res.status(201).json(image);
    } catch (err) {
      next(err);
    }
  }
);

// get images
app.get('/api/:userId/images', async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    if (!userId) {
      throw new ClientError(404, `Could not find ${userId}`);
    }
    const sql = `
    select "imageId", "createdAt", "url"
    from "images"
    where "userId" = $1
    `;
    const params = [userId];
    const result = await db.query(sql, params);
    const images = result.rows;
    res.status(200).json(images);
  } catch (err) {
    next(err);
  }
});

// get image
app.get('/api/:userId/images/:imageId', async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    const imageId = Number(req.params.imageId);
    const sql = `
    select "url"
    from "images"
    where "userId" = $1 and "imageId" = $2
    `;
    const params = [userId, imageId];
    const result = await db.query(sql, params);
    const image = result.rows[0];
    if (!image) {
      throw new ClientError(404, `Could not find image with Id ${imageId}`);
    }
    res.status(200).json(image);
  } catch (err) {
    next(err);
  }
});

// delete an image
app.delete('/api/:userId/images/:imageId', async (req, res, next) => {
  try {
    const imageId = Number(req.params.imageId);
    const userId = Number(req.params.userId);
    if (imageId === 1 && userId === 1) {
      throw new ClientError(403, 'Cannot delete demo data!');
    }
    const sql = `
    delete
      from "images"
      where "userId" = $1 and "imageId" = $2
      returning *
      `;
    const params = [userId, imageId];
    const result = await db.query(sql, params);
    const image = result.rows[0];
    if (!image) {
      throw new ClientError(
        404,
        `Could not find image with imageId ${imageId}`
      );
    }
    res.status(204).json(image);
  } catch (err) {
    next(err);
  }
});

// upload song
app.post(
  '/api/:userId/songs/upload',
  audioUploadsMiddleware.single('audio'),
  async (req, res, next) => {
    try {
      const { song, artist } = req.body;
      const userId = Number(req.params.userId);
      const date = new Date();
      if (!song || !artist) {
        throw new ClientError(400, 'name is a required field');
      }
      const url = `/audio/${req.file.filename}`;
      const sql = `
    insert into "songs" ("userId", "url", "song", "artist", "createdAt")
    values ($1, $2, $3, $4, $5)
    returning *
    `;
      const params = [userId, url, song, artist, date];
      const result = await db.query(sql, params);
      const songs = result.rows[0];

      res.status(201).json(songs);
    } catch (err) {
      next(err);
    }
  }
);

// get songs
app.get('/api/:userId/songs', async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    const sql = `
  select *
  from "songs"
  where "userId" = $1
  `;
    const params = [userId];
    const result = await db.query(sql, params);
    const songs = result.rows;
    res.status(200).json(songs);
  } catch (err) {
    next(err);
  }
});

// get song
app.get('/api/:userId/songs/:songId', async (req, res, next) => {
  try {
    const songId = Number(req.params.songId);
    const userId = Number(req.params.userId);
    const sql = `
    select "url", "song", "artist"
    from "songs"
    where "userId" = $1 and "songId" = $2
    `;
    const params = [userId, songId];
    const result = await db.query(sql, params);
    const song = result.rows[0];
    if (!song) {
      throw new ClientError(404, `Could not find song with songId ${songId}`);
    }
    res.status(200).json(song);
  } catch (err) {
    next(err);
  }
});

// delete song
app.delete('/api/:userId/songs/:songId', async (req, res, next) => {
  try {
    const demoData = [1, 2, 3];
    const songId = Number(req.params.songId);
    if (demoData.includes(songId)) {
      throw new ClientError(403, 'Cannot delete demo data!');
    }
    const sql = `
    delete
      from "songs"
      where "songId" = $1
      returning *
      `;
    const params = [songId];
    const result = await db.query(sql, params);
    const song = result.rows[0];
    if (!song) {
      throw new ClientError(404, `Could not find song with songId ${songId}`);
    }
    res.status(204).json(song);
  } catch (err) {
    next(err);
  }
});

app.get('*', (req, res) => res.sendFile(`${reactStaticDir}/index.html`));

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});

//  const deleteImgs = async username => {
//    try {
//      const response = await fetch(`/api/images/${username}/`, {
//        method: 'DELETE',
//        headers: {
//          'Content-Type': 'application/json',
//          Authorization: `Bearer ${token}`
//        }
//      });
//      if (!response.ok)
//        throw new Error(
//          `Error Code: ${response.status} Error Message: It Boken`
//        );
//    } catch (err) {
//      console.error(err);
//    }
//  };

//  const deleteSongs = async username => {
//    try {
//      const response = await fetch(`/api/songs/${username}/`, {
//        method: 'DELETE',
//        headers: {
//          'Content-Type': 'application/json',
//          Authorization: `Bearer ${token}`
//        }
//      });
//      if (!response.ok)
//        throw new Error(
//          `Error Code: ${response.status} Error Message: It Boken`
//        );
//    } catch (err) {
//      console.error(err);
//    }
//  };
