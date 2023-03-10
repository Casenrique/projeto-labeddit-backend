-- Active: 1675556550542@@127.0.0.1@3306
-- Active: 1675556550542@@127.0.0.1@3306
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    nick_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT "NORMAL" NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);

CREATE TABLE posts (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER DEFAULT(0) NOT NULL,
    dislikes INTEGER DEFAULT(0) NOT NULL,
    replies INTEGER DEFAULT(0) NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE likes_dislikes_post (
    user_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (post_id) REFERENCES posts(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE comments (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    creator_id TEXT NOT NULL,
    post_id TEXT NOT NULL,
    content TEXT NOT NULL,
    likes INTEGER DEFAULT(0) NOT NULL,
    dislikes INTEGER DEFAULT(0) NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    updated_at TEXT NOT NULL,
    FOREIGN KEY (creator_id) REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
    FOREIGN KEY (post_id) REFERENCES posts(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

CREATE TABLE likes_dislikes_post_comment (
    user_id TEXT NOT NULL,
    comment_id TEXT NOT NULL,
    like INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (comment_id) REFERENCES comments(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

INSERT INTO users (id, nick_name, email, password, created_at, role)
VALUES
	("10da3742-8900-43ba-ae95-e6afba03d4de", "Carlos Henrique", "carloshenriquesouza.eng@gmail.com", "$2a$12$giYgTXJzMNj1AzlGT1AQAOWPE9MvH23/W8npG6jaHLTeDawhODeqq","2023-02-10T14:48:00.000Z", "ADMIN"),
	("59873459-0568-45b8-8243-b147f98cab71", "Professor X", "professorx@marvel.com", "$2a$12$2cJLsGrhRpFMFvWQO66GXuvpSMvXRRF5RvC4nndouSK593Bcd9g2y", "2023-02-10T14:48:00.000Z", "NORMAL"),
    ("ea66dc18-f092-4665-871e-9c1bba53f726", "Feiticeira Escarlate", "feiticeiraescarlate@marvel.com", "$2a$12$UYwWFOH2lSHs/ick8dilZuRD4xvT9/4C1pZJXpUhQ/66gARnU0q62", "2023-02-10T14:48:00.000Z", "NORMAL"),
    ("5b19a5ad-56d5-4688-9a84-dbf67a99b559", "Flash", "flash@dc.com", "$2a$12$ctf6tWuyfQ2Qwv/qzQ7AxukN5U8WjOHcFQhGiKA7slqJ9VcS6CWJe", "2023-02-10T14:48:00.000Z", "NORMAL");

INSERT INTO posts (id, creator_id, content, likes, dislikes, replies, created_at, updated_at)
VALUES
	("5bd2ca8f-948b-4e73-9804-68096f9ad38f", "10da3742-8900-43ba-ae95-e6afba03d4de", "Estou adorando React!", 0, 0, 1, "2023-02-10T14:48:00.000Z", "2023-02-10T14:48:00.000Z"),
	("55fc3f98-0449-4206-9145-882c51befbc1", "59873459-0568-45b8-8243-b147f98cab71", "CSS é muito chato.", 0, 1, 1, "2023-02-10T14:48:00.000Z", "2023-02-10T14:48:00.000Z"),
	("9edbb98e-f4d4-469b-a737-59baf052c88a", "ea66dc18-f092-4665-871e-9c1bba53f726", "POO é extremamente interessante!", 3, 1, 1, "2023-02-10T14:48:00.000Z", "2023-02-10T14:48:00.000Z"),
	("9feaf731-0cc4-4dde-86bc-6b9a8c72a127", "5b19a5ad-56d5-4688-9a84-dbf67a99b559", "Nada a declarar...", 1, 0, 1, "2023-02-10T14:48:00.000Z", "2023-02-10T14:48:00.000Z");

INSERT INTO likes_dislikes_post (user_id, post_id, like)
VALUES
	("10da3742-8900-43ba-ae95-e6afba03d4de", "55fc3f98-0449-4206-9145-882c51befbc1", 0),
	("59873459-0568-45b8-8243-b147f98cab71", "9edbb98e-f4d4-469b-a737-59baf052c88a", 0),
	("10da3742-8900-43ba-ae95-e6afba03d4de", "9edbb98e-f4d4-469b-a737-59baf052c88a", 1),
	("ea66dc18-f092-4665-871e-9c1bba53f726", "9edbb98e-f4d4-469b-a737-59baf052c88a", 1),
	("5b19a5ad-56d5-4688-9a84-dbf67a99b559", "9edbb98e-f4d4-469b-a737-59baf052c88a", 1),
	("ea66dc18-f092-4665-871e-9c1bba53f726", "9feaf731-0cc4-4dde-86bc-6b9a8c72a127", 1);


INSERT INTO comments (id, creator_id, post_id, content, likes, dislikes, created_at, updated_at)
VALUES
	("b00e24d9-c967-4437-9777-93d50e65046d", "10da3742-8900-43ba-ae95-e6afba03d4de", "5bd2ca8f-948b-4e73-9804-68096f9ad38f", "Comentário interessante.", 1, 0, "2023-02-10T14:48:00.000Z", "2023-02-10T14:48:00.000Z"),
	("5f3d89ab-07c3-44ca-ac8d-6053e03dc7c3", "59873459-0568-45b8-8243-b147f98cab71", "55fc3f98-0449-4206-9145-882c51befbc1", "Comentário inteligente.", 1, 0, "2023-02-10T14:48:00.000Z", "2023-02-10T14:48:00.000Z"),
	("944b29f9-5a7c-4166-83f7-f9374436b289", "ea66dc18-f092-4665-871e-9c1bba53f726", "9edbb98e-f4d4-469b-a737-59baf052c88a", "Comentário desnecessário.", 1, 0, "2023-02-10T14:48:00.000Z", "2023-02-10T14:48:00.000Z"),
	("a357aa0e-65b3-40e9-8f62-e9f5f6bf747e", "5b19a5ad-56d5-4688-9a84-dbf67a99b559", "9feaf731-0cc4-4dde-86bc-6b9a8c72a127", "Comentário bacana.", 1, 0, "2023-02-10T14:48:00.000Z", "2023-02-10T14:48:00.000Z");


INSERT INTO likes_dislikes_post_comment (user_id, comment_id, like)
VALUES
	("10da3742-8900-43ba-ae95-e6afba03d4de", "b00e24d9-c967-4437-9777-93d50e65046d", 1),
	("59873459-0568-45b8-8243-b147f98cab71", "5f3d89ab-07c3-44ca-ac8d-6053e03dc7c3", 1),
	("10da3742-8900-43ba-ae95-e6afba03d4de", "944b29f9-5a7c-4166-83f7-f9374436b289", 1),
	("ea66dc18-f092-4665-871e-9c1bba53f726", "a357aa0e-65b3-40e9-8f62-e9f5f6bf747e", 1);
	

SELECT * FROM users;

SELECT * FROM posts;

SELECT * FROM comments;

SELECT * FROM likes_dislikes_post;

SELECT * FROM likes_dislikes_post_comment;

DROP TABLE users;
DROP TABLE posts;
DROP TABLE likes_dislikes_post;

DROP TABLE likes_dislikes_post_comment;


UPDATE users
SET id = "e79fdbf9-d332-47e0-9ecf-8e85ea7f02e2"
WHERE id = "ea66dc18-f092-4665-871e-9c1bba53f726";