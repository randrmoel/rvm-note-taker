// make connection with db.json to load and save note data

var fs = require("fs");
var db = require("../db/db.json");
uniqid = require("uniqid");

module.exports = function(app){
    app.get("/api/notes", function(req, res){
        res.send(data);
    });

    app.post("/api/notes", function(req, res){
        let newID = uniqid();
        let newNote = {
            id : newID,
            title : req.body.title, 
            text : req.body.text
        };
        console.log(newNote);

        fs.readFile("./db/db.json", "utf8", (err, data)=>{
            if(err) throw err;
            const notes = JSON.parse(data);
            notes.push(newNote);
            fs.writeFile("./db/db.json", JSON.stringify(notes, null, 2), err =>{
                if(err) throw err;
                res.send("note added");
                console.log("complete: note written");
            });
        });
    });

    app.delete("/api/notes/:id", function(req, res){
        oldID = req.params.id;
        fs.readFile("./db/db.json", "utf8", (err, data)=>{
            if(err) throw err;
            const notes = JSON.parse(data);
            const newNotes = notes.filter(note => note.id != oldID);
            fs.writeFile("./db/db.json", JSON.stringify(newNotes, null, 2), err =>{
                if(err) throw err;
                res.send(data);
                console.log("completed: note deleted");
            })
        })
    })
};