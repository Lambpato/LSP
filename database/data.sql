INSERT INTO "users"
  ("userId", "username", "hashedPassword", "createdAt")
  VALUES
  (1, 'example', '$argon2id$v=19$m=4096,t=3,p=1$4mtVqZVLhMaSPFneM1qnuA$Pf+rvBmaschmwxjWAt904zonM1DE8oU3XmfJTeAjocM', '2023-07-13T07:54:33.697Z');

INSERT INTO "images"
  ("userId", "url", "createdAt")
  VALUES
  (1, '/images/image-1689264867032.png', '2023-07-13T16:14:27.057Z');

INSERT INTO "songs"
  ("userId", "url", "song", "artist", "createdAt")
  VALUES
  (1, '/audio/1689235152806-audio.mp3', 'Crush Resist', 'Ecco2k', '2023-07-13T07:59:12.84Z'),
  (1, '/audio/1689235339915-audio.mp3', 'Girls Just Want To Have Fun (TS Remix)', 'Bladee & Ecco2k', '2023-07-13T08:02:20.003Z'),
  (1, '/audio/1689235476562-audio.mp3', 'Tokyo Nostalgia', 'XXXTentation', '2023-07-13T08:04:36.641Z');
