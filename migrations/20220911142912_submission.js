/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return createSubmission()
    function createSubmission() {
        return knex.schema.createTable('submission', function (t) {
            t.increments('id').unsigned().primary();
            t.string("subreddit").nullable();
            t.string("reddit_id").notNullable();
            t.text('title').notNullable();
            t.text('link').nullable();
            t.bigInteger('ups').notNullable();
            t.bigInteger('downs').notNullable();
            t.boolean('favorite').notNullable().defaultTo(false)
            t.timestamp('created_at', { precision: 6 }).defaultTo(knex.fn.now(6));
        })
    }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return dropSubmission()
    function dropSubmission() {
        return knex.schema.dropTable('submission')
    }
};
