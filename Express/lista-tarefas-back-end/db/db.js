const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('task.db')

const createTables = ()=> {
    db.serialize(()=>{
        db.run("CREATE TABLE IF NOT EXISTS task (id INTEGER PRIMARY KEY, name TEXT)");
        db.run("CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY, username TEXT UNIQUE, password TEXT, role TEXT)")
    });
}


module.exports = {db, createTables};