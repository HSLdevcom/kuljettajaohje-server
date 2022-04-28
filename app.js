const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const basicAuth = require("express-basic-auth");
const path = require("path");
const { createEngine } = require("express-react-views");
const { ALLOWED_ORIGINS, PORT } = require('./constants');
const {
    fetchRouteAlertsForDate,
    fetchUIMessages,
    addUIMessage,
    migrate,
 } = require('./store.js');
const { getQueryParamValues } = require('./utils.js');

async function main() {
    await migrate();

    const app = express();
    const port = PORT;
    
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    // parse application/json
    app.use(bodyParser.json())
    const allowedOrigins = ALLOWED_ORIGINS.split(",");

    app.use(cors({
        origin: allowedOrigins
    }))
    
    app.get('/admin',         
        basicAuth({
            challenge: true,
            users: { admin: "" },
        }), (req, res) => {
        res.render("admin");
    });

    app.get('/admin', (req, res) => {
        res.render("admin");
    });

    app.engine("jsx", createEngine());
    app.set("view engine", "jsx");
    app.set("views", path.join(__dirname, "views"));

    app.get('/alerts', async (_req, _res) => {
        const params = getQueryParamValues(_req.query);
        try {
            const results = params.map(async (line) => {
                const dbResult = await fetchRouteAlertsForDate(line.lineId, line.date);
                return {lineId: line.lineId, alerts: dbResult};
            })
            Promise.all(results).then(res => {
                _res.send(res);
            });
        } catch (e) {
            _res.status(400);
        }
    });
    
    app.get('/UIMessages', async (req, res) => {
        try {
            const dbResult = await fetchUIMessages();
            res.send(dbResult);
        } catch (e) {
            console.log(e);
            res.send('failed')
        }
    })

    app.post('/UIMessages', async (req, res) => {
        const { ui_message } = req.body;
        await addUIMessage({ message: ui_message });
        res.send(req.body)
      });
    
    app.get('/', async (_req, _res) => {
        _res.send('Transitlog proxy');
    });
     
    // Server setup
    app.listen(port, () => {
        console.log(`http://localhost:${port}/`);
    });
}

main().catch(error => console.error(error.stack)); // eslint-disable-line no-console