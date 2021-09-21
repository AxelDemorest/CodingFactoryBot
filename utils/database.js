const mysql = require('mysql');
const chalk = require('chalk');
const config = require("../config/config.json");

module.exports = {
    connexion(client) {

        const db = mysql.createPool({
            connectionLimit: 10,
            host: config.db.host,
            port: config.db.port,
            user: config.db.user,
            password: config.db.password,
            database: config.db.database,
        });

        client.db = db;

        db.getConnection(async function (err, con) {
            if (err) {
                console.log(chalk.red('[CLIENT] Unable to connnect to the database'), err);
                process.exit(0);
            }

            const start = Date.now();
            con.ping(function (err) {
                if (err) throw err;
                console.log(chalk.yellow(`[CLIENT] Database connected | latency: ${Math.round(Date.now() - start)}ms`));
            });

            db.asyncQuery = function (query) {
                return new Promise(function (resolve, reject) {
                    client.db.query(query, (err, rows) => {
                        if (err) reject(err);
                        resolve(rows);
                    });
                });
            }

            // QUERY : let data = await db.asyncQuery(`requete`).catch(console.error); //
        });

        db.on('enqueue', function () { console.log(chalk.red(`[DB] Waiting for available connection slot`)); });

    }
}

