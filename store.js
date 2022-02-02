const config = require('./knexfile');
const knex = require('knex')(config);

async function fetchRouteAlerts(lineId, limit) {
    try {
        const fetchAlertsForLine = await knex
            .select('*')
            .from('alert')
            .whereILike('route_id', lineId)
            .limit(limit);
        return fetchAlertsForLine;
    } catch (e) {
        console.log(e);
    }
}

async function fetchRouteAlertsForDate(lineId, date) {
    try {
        const fetchAlertsForLineAndDate = await knex
            .select('*')
            .from('alert')
            .whereILike('route_id', lineId)
            .andWhere('valid_from', '<', date)
            .andWhere('valid_to', '>', date);
        return fetchAlertsForLineAndDate;
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    fetchRouteAlerts,
    fetchRouteAlertsForDate
}
