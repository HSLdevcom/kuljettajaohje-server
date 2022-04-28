exports.up = async knex => {
  await knex.schema.createTable('message', table => {
    table.string('id').primary();
    table.string('text').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = async knex => {
  await knex.schema.dropTable('message');
};
