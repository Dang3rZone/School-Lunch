exports.up = function (knex) {
  return knex.schema.createTable('lunch_day', function (table) {
    // primary key
    table.increments('lunch_day_id')
    // create the foreign key (FK) column first
    table.integer('lunch_week_id').notNullable()
    table.date('day').notNullable()
    table.string('menu_details', 1000)
    table
      .foreign('lunch_week_id')
      .references('lunch_week_id')
      // FK to the parent lunch_week table
      .inTable('lunch_week')
      // If the parent lunch_week row is deleted, delete any child lunch_day rows
      .onDelete('CASCADE')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('lunch_day')
}
