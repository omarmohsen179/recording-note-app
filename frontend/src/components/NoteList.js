import React, { useState, useEffect } from "react";
import axios from "axios";
import Note from "./Note";
import { getNotes } from "../services/api";

const NoteList = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await getNotes();
      setNotes(response.data);
    };

    fetchNotes();
  }, []);

  const deleteNote = async (noteId) => {
    await deleteNote();
    setNotes(notes.filter((note) => note.id !== noteId));
  };

  return (
    <div>
      {notes.map((note) => (
        <Note key={note.id} note={note} onDelete={deleteNote} />
      ))}
    </div>
  );
};

export default NoteList;
