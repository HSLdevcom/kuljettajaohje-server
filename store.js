const config = require('./knexfile_transitlog');
const configMap = require('./knexfile');
const knexTransitlog = require('knex')(config);
const knexMapProject = require('knex')(configMap);
const { v4: uuidv4 } = require('uuid');

async function migrate() {
    await knexMapProject.migrate.latest();
}

async function fetchRouteAlertsForDate(lineId, date) {
    try {
        const fetchAlertsForLineAndDate = await knexTransitlog
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

const fetchUIMessages = async () => {
    try {
        const messages = await knexMapProject.select('*').from('message').orderBy('created_at', 'desc').limit(1);
        return !messages.length ? null : messages[0];
    } catch (e) {
        console.log(e);
    }
}

const addUIMessage = async ({message}) => {
    const id = uuidv4();
    await knexMapProject('message').insert({
      id,
      text: message,
    });
    return { id };
}

module.exports = {
    migrate,
    fetchRouteAlertsForDate,
    fetchUIMessages,
    addUIMessage
}
