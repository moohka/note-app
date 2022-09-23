import { useState, useEffect, useRef } from "react";
import { ReturnNoteContext } from "./contexts/NoteContext";

const Input = () => {
  const {
    refresh,
    addNote,
    focused,
    setFocused,
    titleRef,
    buttonRef,
    formRef,
    autoGrow,
    closeForm,
    contentRef,
    openForm,
  } = ReturnNoteContext();

  //disable enter from submitting
  function titleEnter(e) {
    if (e.which === 13) {
      e.preventDefault();
      contentRef.current.focus();
    }
  }

  return (
    <form
      id="app-form"
      ref={formRef}
      onMouseDown={(e) => {
        e.stopPropagation();
      }}
      onClick={() => {
        if (!focused) openForm();
      }}
    >
      <input
        className="input-element"
        type="text"
        id="input-title"
        placeholder="Title"
        onKeyPress={titleEnter}
        ref={titleRef}
      ></input>

      <textarea
        className="input-element"
        id="input-content"
        placeholder="Take a note..."
        rows="1"
        ref={contentRef}
        onInput={autoGrow}
      ></textarea>

      <div className="button-container" ref={buttonRef}>
        <button
          type="button"
          className="close-button"
          onClick={() => {
            closeForm();
          }}
        >
          Close
        </button>
      </div>
    </form>
  );
};

export default Input;
