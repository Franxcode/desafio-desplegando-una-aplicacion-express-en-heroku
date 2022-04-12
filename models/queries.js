require('dotenv').config()

const { Client } = require('pg');

const insertUser = async (username, email, password) => {
    try {
        const client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false
            }
        });
        await client.connect();
        const result = await client.query(`INSERT INTO users (username, email, password) VALUES ('${username}','${email}','${password}') RETURNING*`);
        await client.end();
        return result.rows[0];
    } catch (error) {
        return error;
    }
};

const getUsers = async() => {
    try {
        const client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false
            }
        });
        await client.connect();
        const result = await client.query(`SELECT * FROM users`);
        await client.end();
        return result.rows;
    } catch (error) {
        return error;
    }
};

const deleteUser = async (id) => {
    try {
        const client = new Client({
            connectionString: process.env.DATABASE_URL,
            ssl: {
                rejectUnauthorized: false
            }
        });
        await client.connect();
        const result = await client.query(`DELETE FROM users WHERE id = '${id}'`);
        await client.end();
        return result.rowCount;
    } catch (error) {
        return error;
    }
};

module.exports = {
    insertUser,
    getUsers,
    deleteUser
}