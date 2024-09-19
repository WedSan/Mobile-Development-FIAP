const {db} = require('../db/db');

createTask = (req, res)=>{
    const {task} = req.body;
    db.run("INSERT INTO TASK (name) VALUES (?)", [task], function(err){
        if(err){
            res.status(500).json({error: err.message});
        }
        res.status(201).json({id: this.lastID, task});
    });
}

getAllTasks = (req, res)=>{
    db.all("SELECT * FROM TASK ", function(err, rows){
        if(err){
            res.status(500).json({error: err.message});
        }
        res.status(200).json(rows);
    });
}

getTaskById = (req, res)=>{  
    const {id} = req.params;
    db.get("SELECT * FROM TASK WHERE ID = ?", [id], function(err, row){
        if(err){
            res.send(500).json({error: err.message});
        }
        else if(row){
            res.status(200).json(row);
        }
        else{
            res.status(404).json({message: `Task ${id} not found `});
        }
    });   
}

updateTask = (req, res)=>{
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
}

deleteTask = (req, res)=>{
    const {id} = req.params;

    db.run("DELETE FROM TASK WHERE ID = ?", [id], function(err){
        if(err){
            res.status(500).json({error: err.message});
        }
        else if(this.changes){
            res.status(204).json();
        }
        else{
            res.status(404).json({message: `Task ${id} not found`});
        }
    });
}

module.exports = {
    createTask,
    getAllTasks,
    getTaskById,
    updateTask,
    deleteTask
}