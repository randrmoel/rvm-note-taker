var path = require("path");

module.exports = function(app) {
// Provide routes for /notes.html and for index.html

    //actual note page html
    app.get("/notes", function(req, res) {
      res.sendFile(path.join(__dirname, "../public/notes.html"));
    });

    
    // Index html
    app.get("*", function(req, res) {
      res.sendFile(path.join(__dirname, "../public/index.html"));
    });
  };
  