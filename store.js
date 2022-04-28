const config = require('./knexfile');
const knex = require('knex')(config);

async function fetchRouteAlertsForDate(lineId, date) {
    try {
        const fetchAlertsForLineAndDate = await knex
            .select('*')
            .from('alert')
            .whereILike('route_id', lineId)
            .andWhere('valid_from', '<=', date)
            .andWhere('valid_to', '>=', date)
            .orderBy('valid_from', 'desc');
        return fetchAlertsForLineAndDate;
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    fetchRouteAlertsForDate
}
