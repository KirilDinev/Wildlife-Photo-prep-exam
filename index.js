const express = require('express');
const expressConfig = require('./config/express.js');
const databaseConfig = require('./config/database.js');
const routesConfig = require('./config/router.js');

start();

async function start() {
    const app = express();

    expressConfig(app);
    await databaseConfig(app);
    routesConfig(app);

    app.get('/', (req, res) => {
        console.log(req.session);
        res.render('home', { layout: false });
    });

    app.listen(3000, () => console.log('Server started on port 3000'));
}