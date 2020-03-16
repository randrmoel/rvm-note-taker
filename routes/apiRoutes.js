// make connection with db.json to load and save note data
var fs = require("fs");
var db = require("../db/db.json");

//use npm uniqid to create unique ID numbers
var uniqid = require("uniqid");

// Get the data to initialize the screen
module.exports = function(app){
    app.get("/api/notes", function(req, res){
        fs.readFile("./db/db.json", "utf8", (err, db)=>{
            if(err) throw err;
            // must do this step to display properly
            let notes = JSON.parse(db);
        res.json(notes);
        });
    });

    // Write a new node, grab a new ID form uniqid
    app.post("/api/notes", function(req, res){
        let newID = uniqid();
        //Create the object
        let newNote = {
            id : newID,
            title : req.body.title, 
            text : req.body.text
        };
        console.log(newNote);

        // Read the existing file
        fs.readFile("./db/db.json", "utf8", (err, db)=>{
            if(err) throw err;
            const notes = JSON.parse(db);
            //push the new item into the array of objects
            notes.push(newNote);

            //write the new file
            fs.writeFile("./db/db.json", JSON.stringify(notes, null, 2), err =>{
                if(err) throw err;

                //Respond with the updated object properly stringified
                res.json(JSON.stringify(notes));
                console.log("complete: note written");
            });
        });
    });

    // Delete a note using the unique ID
    app.delete("/api/notes/:id", function(req, res){
        //Grab the ID from the req.params passed by AJAX
        const oldID = req.params.id;
        // Get the existing file
        fs.readFile("./db/db.json", "utf8", (err, db)=>{
            if(err) throw err;
            //Parse it
            let notes = JSON.parse(db);

            // Use filter to remove the record with the ID we don't want
            notes = notes.filter(note => note.id !== oldID);
            console.log(notes);

            // Write the emended file
            fs.writeFile("./db/db.json", JSON.stringify(notes, null, 2), err =>{
                if(err) throw err;
                console.log(notes);
                console.log("completed: note deleted");
                //Respond with the new notes
                res.json(JSON.stringify(notes));
            });
        });
    });
};