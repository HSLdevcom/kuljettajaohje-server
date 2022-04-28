const express = require('express');
const cors = require('cors');
const {
    fetchRouteAlertsForDate
 } = require('./store.js');
const { getQueryParamValues } = require('./utils.js');

const app = express();
const port = process.env.PORT;

app.use(cors({
    origin: process.env.ALLOWED_ORIGINS
}))

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

app.get('/', async (_req, _res) => {
    _res.send('Transitlog proxy');
});
 
// Server setup
app.listen(port, () => {
    console.log(`http://localhost:${port}/`);
});
