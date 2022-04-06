require('express');
require('mongodb');

exports.setApp = function (app, client) {

    app.post('/api/register/', async (req, res, next) => {
        const { FirstName, LastName, Login, Password, Email } = req.body;
        const newUser = { FirstName: FirstName, LastName: LastName, Login: Login, Password: Password, Email: Email };
        var error = '';

        const db = client.db('foodgram');
        const results = await db.collection('users').find({ Login: Login, Password: Password }).toArray();

        if (results.length > 0) {
            error = 'User already exists';
        }
        else {
            const result = db.collection('users').insertOne(newUser);
            error = '';
        }

        var ret = { error: error };
        res.status(200).json(ret);
    });

    app.post('/api/login/', async (req, res, next) => {
        // incoming: login, password
        // outgoing: id, firstName, lastName, error
        var error = '';

        const { login, password } = req.body;

        const db = client.db('foodgram');
        const results = await db.collection('users').find({ Login: login, Password: password }).toArray();

        var id = -1;
        var fn = '';
        var ln = '';

        if (results.length > 0) {
            id = results[0].UserId;
            fn = results[0].FirstName;
            ln = results[0].LastName;
        }

        var ret = { id: id, firstName: fn, lastName: ln, error: '' };
        res.status(200).json(ret);
    });

        var multer = require('multer');
        var storage = multer.diskStorage({
        destination: (req, file, cb) => {
        cb(null, './public/images');
        },
        filename: (req, file, cb) => {
            console.log(file);
            var filetype = '';
            if (file.mimetype === 'image/png') {
                filetype = 'png';
            }
            if (file.mimetype === 'image/jpeg') {
                filetype = 'jpg';
            }
            cb(null, 'image-' + Date.now() + '.' + filetype);
        }
        });
        const multerFilter = (req, file, cb) =>{
            if(file.mimetype.split('/')[1] === 'png' || 'jpg'){
                cb(null, true)
            }
            else
            {
                cb(new Error('Must be a jpg or png'), false)
            }
        }

        var upload = multer({ storage: storage });

    app.post('/api/upload/', upload.single('file'), function(req, res, next) {
        //console.log(req.file);
        var createAt = Date.now();
        var name = req.file.filename;
        //const newPost = { userid: userid, name: name, recipe: recipe};
        //console.log(name);
        const db = client.db('foodgram');
        const result = db.collection('posts').insertOne({name: name, date: createAt});
        if(!req.file) {
          res.status(500);
          //return next(err);
        }
        else
        {
            res.status(200).json({
                status: 'success',
                message: 'Image uploaded successfully'
            })
        }
      });
}