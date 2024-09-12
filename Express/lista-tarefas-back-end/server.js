const express = require('express');
const sqlite3 = require('sqlite3').verbose()
const app = express();
const db = new sqlite3.Database('task.db')


db.serialize(()=>{
    db.run("CREATE TABLE IF NOT EXISTS task (id INTEGER PRIMARY KEY, name TEXT)");
});

app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log("application is running");
});

app.post("/task", (req, res)=>{
    const {task} = req.body;
    db.run("INSERT INTO TASK (name) VALUES (?)", [task], (err)=>{
        if(err){
            res.status(500).json({error: err.message});
        }
        res.status(201).json({id: this.lastID, task});
    })
});


app.get("/task", (req, res)=>{
    db.all("SELECT * FROM TASK ", (err, rows)=>{
        if(err){
            res.status(500).json({error: err.message});
        }
        res.status(200).json(rows)
    })
})