const express = require('express')
const {
    fetchRouteAlerts,
    fetchRouteAlertsForDate
 } = require('./store.js')

const app = express();
const port = 3001;

app.get('/alerts/:lineId', async (_req, _res) => {
    try {
        const limit = _req.query.limit ? _req.query.limit : 10;
        const dbResponse = await fetchRouteAlerts(_req.params.lineId, limit);
        _res.send(dbResponse);
    } catch (e) {
        _res.status(400)
    }
});
 
app.get('/alerts/:lineId/:date', async (_req, _res) => {
    try {
        const dbResponse = await fetchRouteAlertsForDate(_req.params.lineId, _req.params.date);
        _res.send(dbResponse);
    } catch (e) {
        _res.status(400)
    }
});

app.get('/', async (_req, _res) => {
    _res.send('Transitlog proxy');
});
 
// Server setup
app.listen(port, () => {
    console.log(`http://localhost:${port}/`);
});
