import React, { useState, useEffect } from "react";
import { FiDelete, FiSun } from "react-icons/fi";
import { BsMoonStars } from "react-icons/bs";

function App() {
  const [modulOn, setModulOn] = useState(false);
  const [darkModeOn, setDarkModeOn] = useState(() => {
    const saved = localStorage.getItem("mode");
    if (saved !== undefined || null) {
      const initalValue = JSON.parse(saved);
      return initalValue;
    } else {
      return true;
    }
  });
  const [inputValue, setInputValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  let dataID = JSON.parse(localStorage.getItem(`ID`));
  const [id, setId] = useState(dataID ? dataID : 0);


  const notesStorage = JSON.parse(localStorage.getItem("notesStorage"));

  const removeNote = (id2) => {
    const newNotes = notes.filter((note) => note.id !== id2);
    setNotes(newNotes);
    localStorage.setItem("notesStorage", JSON.stringify(newNotes));
  };

  const [notes, setNotes] = useState(notesStorage ? notesStorage : []);

  console.log(id);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submited");
    setModulOn(false);
    setId(id + 1);

    const newItem = {
      title: inputValue,
      text: textareaValue,
      id: id
    };

    notes.push(newItem);
    /* notesStorage holds all the notes in local storage */
    localStorage.setItem("notesStorage", JSON.stringify(notes));
    localStorage.setItem("ID", JSON.stringify(id + 1));

    setInputValue("");
    setTextareaValue("");
  };

  let date = new Date().getDate().toLocaleString();
  let day = new Date().getDay().toLocaleString();
  let year = new Date().getFullYear().toString();


  useEffect(() => {
    localStorage.setItem("mode", darkModeOn);
  }, [darkModeOn]);

  return (
    <main
      style={{ backgroundColor: `${darkModeOn ? "#141411" : "#f8f6cf"}` }}
      className={`${modulOn ? "background-dim modul-background" : ""}`}
    >
      {/* Dark/Light mode button */}

      <button
        className={`${darkModeOn ? "dark-mode" : "light-mode"}`}
        onClick={() => setDarkModeOn(!darkModeOn)}
      >
        {darkModeOn ? <BsMoonStars /> : <FiSun />}
      </button>
      <form
        className={`${modulOn ? "modul" : "modul hide-modul"}`}
        onSubmit={handleSubmit}
      >
        <div className="title">
          <input
            maxLength="16"
            type="text"
            placeholder="Title"
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
            className="title-input"
          />
        </div>
        <div className="text">
          <textarea
            maxLength="175"
            onChange={(e) => setTextareaValue(e.target.value)}
            value={textareaValue}
            name="text"
            id=""
            cols="50"
            rows="10"
            className="text-input"
          ></textarea>
        </div>
        <br />
        <button type="submit" className="submit-btn">
          Submit
        </button>
        <h4 className="date">{`${day}/${date}/${year}`}</h4>
      </form>
      <div>
        <button className="create-btn" onClick={() => setModulOn(!modulOn)}>
          Create A New Note
        </button>
        {notes.length ? (
          <button
            className="remove-all"
            onClick={() => {
              localStorage.clear();
              localStorage.setItem("mode", darkModeOn);
              setNotes([]);
            }}
          >
            Remove Notes
          </button>
        ) : null}
      </div>
      <section className="section">
        {notes.map((note) => {
          return (
            <div className="note" key={note.id}>
              <div className="cover">
                <h1>{note.title}</h1>
                <span>{`${day}/${date}/${year}`}</span>
              </div>
              <p className="notes-text">{note.text}</p>
              <button
                className="remove-note"
                onClick={() => {
                  removeNote(note.id);
                }}
              >
                <FiDelete />
              </button>
            </div>
          );
        })}
      </section>
    </main>
  );
}

export default App;
