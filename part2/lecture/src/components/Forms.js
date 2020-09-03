import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import noteService from '../services/notes';
import loginService from '../services/login';
import Toggleable from './Toggleable';
import LoginForm from './LoginForm';
import NoteForm from './NoteForm';

const Forms = ({ notes, setNotes, setErrorMessage }) => {
  const [user, setUser] = useState(null);
  const noteFormRef = useRef();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  const login = async potentialUser => {
    try {
      const user = await loginService.login(potentialUser);
      window.localStorage.setItem('loggedNoteappUser', JSON.stringify(user));
      noteService.setToken(user.token);
      setUser(user);
    } catch (exception) {
      setErrorMessage('Wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const addNote = async noteObject => {
    try {
      noteFormRef.current.toggleVisibility();
      const returnedNote = await noteService.create(noteObject);
      setNotes(notes.concat(returnedNote));
    } catch (exception) {
      setErrorMessage('Error creating new note');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const noteForm = () => (
    <Toggleable buttonLabel="New Note" ref={noteFormRef}>
      <NoteForm createNote={addNote} />
    </Toggleable>
  );

  const loginForm = () => {
    return (
      <div>
        <Toggleable buttonLabel="Login">
          <LoginForm login={login} />
        </Toggleable>
      </div>
    );
  };

  return (
    <div>
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} logged in</p>
          {noteForm()}
        </div>
      )}
    </div>
  );
};

Forms.propTypes = {
  notes: PropTypes.array.isRequired,
  setNotes: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
};

export default Forms;
