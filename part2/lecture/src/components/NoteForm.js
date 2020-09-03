import React, { useState } from 'react';
import PropTypes from 'prop-types';

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('');

  const addNote = event => {
    event.preventDefault();
    createNote({
      content: newNote,
      important: false,
    });

    setNewNote('');
  };

  const handleChange = event => {
    setNewNote(event.target.value);
  };

  return (
    <div className="formDiv">
      <h2>Create a new note</h2>
      <form onSubmit={addNote}>
        <input id="note-content" value={newNote} onChange={handleChange} />
        <button id="note-submit" type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

NoteForm.propTypes = {
  createNote: PropTypes.func.isRequired,
};

export default NoteForm;
