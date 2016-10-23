/**
 * @file rethinkdb_config.js
 * @type {{database: {db: string, host: (*|string), port: (*|number)}, firesDatabase: {db: string, host: (*|string), port: (*|number)}}}
 */

/** 
 * Connection details for RethinkDB connection
 */

module.exports = {
    database: {
        db: "earthquakes",
        host: process.env.RDB_HOST || "localhost",
        port: process.env.RDB_PORT || 28015
    },
    firesDatabase: {
        db: "fires",
        host: process.env.RDB_HOST || "localhost",
        port: process.env.RDB_PORT || 28015
    },
    usersDatabase: {
      db: "users",
      host: process.env.RDB_HOST || "localhost",
      port: process.env.RDB_PORT || 28015
    }
}

/*rethinkdb.dbCreate('DisastersDB').run(connection, function(err, result){
    if(err){
        console.log("Database already created");
    }
    else
    {
        console.log("Created new database");
    }
    callback(null, connection);
});*/
