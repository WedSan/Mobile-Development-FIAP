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

app.get("/task/:id", (req, res)=>{  
    const {id} = req.params;
    db.get("SELECT * FROM TASK WHERE ID = ?", [id], (err, row)=>{
        if(err){
            res.send(500).json({error: err.message});
        }
        else if(row){
            res.status(200).json(row);
        }
        else{
            res.status(404).json({error: `Task ${id} not found `});
        }
    });
    
});

app.put("/task/:id", (req, res)=>{
    const {id} = req.params;
    const {task} = req.body;
    db.run("UPDATE TASK SET NAME = ? WHERE ID = ?", [task, id], function(err){
        if(err){
            res.status(500).json({error: err.message});
        }
        else if(this.changes){
            res.status(200).json({message: "Task updated successfully"});
        }
        else{
            res.status(404).json({message: `Task ${id} not found `});
        }
    });
});