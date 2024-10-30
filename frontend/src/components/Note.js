import React, { useState, useEffect } from "react";
import {
  getNotes,
  createNote,
  deleteNote,
  getNoteAudios,
  uploadAudio,
} from "../services/api";
import AudioRecorder from "./AudioRecorder";
function Notes({ onLogout }) {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: "", description: "" });
  const [selectedAudios, setSelectedAudios] = useState([]);
  const [currentNoteId, setCurrentNoteId] = useState(null);
  const [audioFile, setAudioFile] = useState(null); // New state for audio file

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      const response = await getNotes();
      setNotes(response);
    } catch {
      onLogout();
      alert("Failed to load notes");
    }
  };

  const handleCreateNote = async () => {
    const response = await createNote(newNote);
    setNotes([...notes, response]);
    setNewNote({ title: "", description: "" });
  };

  const handleDeleteNote = async (id) => {
    await deleteNote(id);
    setNotes(notes.filter((note) => note.id !== id));
  };

  const handleLoadAudios = async (noteId) => {
    try {
      const response = await getNoteAudios(noteId);
      setSelectedAudios(response);
      setCurrentNoteId(noteId);
    } catch {
      alert("Failed to load audios");
    }
  };

  return (
    <div>
      <button onClick={onLogout}>Logout</button>
      <input
        placeholder="Title"
        value={newNote.title}
        style={{ margin: "5px" }}
        onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
      />
      <input
        placeholder="Description"
        value={newNote.description}
        style={{ margin: "5px" }}
        onChange={(e) =>
          setNewNote({ ...newNote, description: e.target.value })
        }
      />
      <button onClick={handleCreateNote}>Add Note</button>
      <h2>Your Notes</h2>
      {notes.map((note) => (
        <div key={note.id}>
          <h3>{note.title}</h3>
          <p>{note.description}</p>
          <AudioRecorder noteId={note.id} />
          {/* Display each audio file associated with the note */}
          <button onClick={() => handleLoadAudios(note.id)}>Load Audios</button>
          {currentNoteId === note.id && selectedAudios.length > 0 && (
            <div>
              <h4>Audios:</h4>
              {selectedAudios.map((audio) => (
                <div key={audio.id}>
                  <audio controls>
                    <source src={audio.file} type="audio/webm" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              ))}
            </div>
          )}

          <button onClick={() => handleDeleteNote(note.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default Notes;
