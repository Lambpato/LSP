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
// Static directory for file uploads server/public/
app.use(express.static(uploadsStaticDir));
app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello World!' });
});

app.post('/api/users/register', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) { throw new ClientError(400, 'username and password are required fields'); }
    const hashedPassword = await argon2.hash(password);
    const date = new Date();
    const sql = `
      insert into "users" ("username", "hashedPassword", "createdAt", "loggedInAt")
      values ($1, $2, $3, $4)
      returning *
    `;
    const params = [username, hashedPassword, date, date];
    const result = await db.query(sql, params);
    const user = result.rows[0];
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

app.post('/api/users/log-in', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) { throw new ClientError(401, 'Invalid Login'); }
    const sql = `
    select "userId",
     "hashedPassword"
      from "users"
      where "username" = $1
    `;
    const params = [username];
    const result = await db.query(sql, params);
    if (!result) { throw new ClientError(401, 'Invalid Login'); }
    const user = result.rows[0];
    console.log('log-in');
    if (!user) { throw new ClientError(401, 'Invalid Login'); }
    const { userId, hashedPassword } = user;
    if (!await argon2.verify(hashedPassword, password)) { throw new ClientError(401, 'Invalid Login'); }
    const payload = { userId, user };
    const token = jwt.sign(payload, process.env.TOKEN_SECRET);
    res.json({ user: payload, token });
  } catch (err) {
    next(err);
  }
});

app.use(authorizationMiddleware);

app.post('/api/images/upload', imgUploadsMiddleware.single('image'), async (req, res, next) => {
  try {
    const { caption } = req.body;
    const { userId } = req.user;
    if (!caption) { throw new ClientError(400, 'caption is a required field'); }
    const url = `/images/${req.file.filename}`;
    const sql = `
    insert into "images" ("userId", "url", "caption")
    values ($1, $2 ,$3)
    returning *
  `;
    const params = [userId, url, caption];
    const result = await db.query(sql, params);
    const image = result.rows[0];
    res.status(201).json(image);
  } catch (err) {
    next(err);
  }
});

app.get('/api/images/', async (req, res, next) => {
  try {
    const { userId } = req.user;
    const sql = `
    select "caption"
    from "images"
    where "userId" = $1
    `;
    const params = [userId];
    const result = await db.query(sql, params);
    const images = result.rows[0];
    res.status(200).json(images);
  } catch (err) {
    next(err);
  }
});

app.get('/api/images/:imageId', async (req, res, next) => {
  try {
    const { imageId } = req.user;
    const sql = `
    select *
    from "images"
    where "imageId" = $1
    `;
    const params = [imageId];
    const result = await db.query(sql, params);
    const image = result.rows[0];
    if (!image) throw new ClientError(404, `Could not find image with imageId ${imageId}`);
    res.status(200).json(image);
  } catch (err) {
    next(err);
  }
});

app.delete('/api/images/:imageId', async (req, res, next) => {
  try {
    const { imageId } = req.user;
    const sql = `
    delete
      from "images"
      where "imageId" = $1
      returning *
      `;
    const params = [imageId];
    const result = await db.query(sql, params);
    const image = result.rows[0];
    if (!image) throw new ClientError(404, `Could not find image with imageId ${imageId}`);
    res.status(204).json(image);
  } catch (err) {
    next(err);
  }
});

app.post('/api/songs/upload', audioUploadsMiddleware.single('audio'), async (req, res, next) => {
  try {
    const { name } = req.body;
    const { userId } = req.user;
    if (!name) { throw new ClientError(400, 'name is a required field'); }
    const url = `/songs/${req.file.filename}`;
    const sql = `
    insert into "songs" ("userId", "url", "name")
    values ($1, $2, $3)
    returning *
    `;
    const params = [userId, url, name];
    const result = await db.query(sql, params);
    const song = result.rows[0];

    res.status(201).json(song);
  } catch (err) {
    next(err);
  }
});

app.get('/api/songs/', async (req, res, next) => {
  const { userId } = req.user;
  const sql = `
  select "name"
  from "songs"
  where "userId" = $1
  `;
  const params = [userId];
  const result = await db.query(sql, params);
  const songs = result.rows[0];
  res.status(200).json(songs);
});

app.get('/api/songs/:songId', async (req, res, next) => {
  try {
    const { songId } = req.user;
    const sql = `
    select *
    from images
    where "imageId" = $1
    `;
    const params = [songId];
    const result = await db.query(sql, params);
    const song = result.rows[0];
    if (!song) throw new ClientError(404, `Could not find song with songId ${songId}`);
    res.status(200).json(song);
  } catch (err) {
    next(err);
  }
});

app.delete('/api/songs/:songId', async (req, res, next) => {
  try {
    const { songId } = req.user;
    const sql = `
    delete
      from "songs"
      where "songId" = $1
      returning *
      `;
    const params = [songId];
    const result = await db.query(sql, params);
    const song = result.rows[0];
    if (!song) throw new ClientError(404, `Could not find song with songId ${songId}`);
    res.status(204).json(song);
  } catch (err) {
    next(err);
  }
});

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  process.stdout.write(`\n\napp listening on port ${process.env.PORT}\n\n`);
});
