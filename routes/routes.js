const express = require("express");
const fs = require("fs");
const path = require("path");

module.exports = (app) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);


    app.get("/api/notes", function (req, res) {
      res.json(notes);
    });


    app.post("/api/notes", (req, res) => {
      const curNotes = req.body;
      const noteId = { 
        ...curNotes, id: notes.length + 1 };
      notes.push(noteId);
      console.log(curNotes)
      dbUpdate();


      res.json(req.body);
      return console.log(`New note added${curNotes.title}`);
    });


    app.get("/api/notes/:id", (req, res) => {
      res.json(notes.get[req.params.id]);
    });


    app.delete("/api/notes/:id", (req, res) => {
      const id = req.params.id;
      const noteIndex = notes.findIndex((x) => x.id) === parseInt(id);
      notes.splice(noteIndex, 1);
      dbUpdate();


      res.json(req.body.id);
      console.log("Delete note " + req.params.id);
    });


    app.get("/notes", (req, res) => {
      res.sendFile(path.join(__dirname, "../public/notes.html"));
    });


    function dbUpdate() {
      fs.writeFile("./db/db.json", JSON.stringify(notes, "\t"), (err) => {
        if (err) throw err;
        return true;
      });
    }
  });
};