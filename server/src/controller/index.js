const express = require('express');
const router = express.Router();
const users = require('../domain/services/service-user');
const music = require('../domain/services/service-music');
const { upload } = require('../middlewares/file');
const { isAdmin } = require('../middlewares/admin.middleware');
const { isAuth } = require('../middlewares/auth.middleware');

router.get('/users', users.GetAll); //poner isadmin
router.post('/users', upload.single('avatar'), users.Register);
router.delete('/users/:id', [isAuth], users.Delete);
router.patch('/users/:id', [isAuth], upload.single('avatar'), users.Update);
router.get('/users/:id', [isAdmin], users.GetById);
router.get('/users/user/:nickName', users.GetByNickName);
router.get('/users/name/:name', users.GetByName);
router.post('/users/login', users.Login);

router.get('/music', music.GetAll);
router.post('/music', upload.single('image'), music.Create);
router.delete('/music/:id', [isAuth], music.Delete);
//router.patch('/music/:id', [isAuth], upload.single('image'), music.Update);
router.get('/music/:id', music.GetById);
router.get('/music/music/:title', music.GetByTitle);