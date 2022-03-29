require('express');
require('mongodb');

exports.setApp = function (app, client) {

    app.post('/api/register/', async (req, res, next) => {
        const { FirstName, LastName, Login, Password , Email} = req.body;
        const newUser = { FirstName: FirstName, LastName: LastName, Login: Login, Password: Password, Email: Email};
        var error = '';

        const db = client.db('foodgram');
        const results = await db.collection('users').find({ Login: Login, Password: Password }).toArray();
        
        if(results.length > 0)
        {
            error = 'User already exists';
        }
        else
        {
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
}