import { useState, useEffect, useRef, useContext } from "react";
import { notesCollection } from "../firebase-config";
import { addDoc } from "firebase/firestore";
import { AppContext } from "./App";

function Form() {
  const [focused, setFocused] = useState(false);

  const formRef = useRef();

  const titleRef = useRef();
  const contentRef = useRef();
  const buttonRef = useRef();

  //form useEffect
  useEffect(() => {
    if (focused) {
      titleRef.current.style.display = "block";
      buttonRef.current.style.display = "block";
    } else {
      titleRef.current.style.display = "none";
      buttonRef.current.style.display = "none";
    }
  }, [focused]);

  //1 addDoc
  const addNote = async (titleInput, contentInput) => {
    await addDoc(notesCollection, { title: titleInput, content: contentInput });
  };

  //open function
  let realCloseFunction = function (e) {
    var isClickInsideElement = formRef.current.contains(e.target);

    if (!isClickInsideElement) {
      closeForm();
    }
  };

  function openForm() {
    //add close function
    document.removeEventListener("click", realCloseFunction);
    document.addEventListener("click", realCloseFunction);

    setFocused(true);
  }

  //close function
  const [refresh, setRefresh] = useContext(AppContext);

  function closeForm() {
    if (titleRef.current.value !== "" || contentRef.current.value !== "") {
      addNote(titleRef.current.value, contentRef.current.value);
      setRefresh(!refresh);
    }

    titleRef.current.value = "";
    contentRef.current.value = "";
    contentRef.current.style.height = "auto";

    //remove close function
    document.removeEventListener("click", realCloseFunction);
    setFocused(false);
  }

  //textarea auto-grow
  function autoGrow() {
    contentRef.current.style.height = "auto";
    contentRef.current.style.height = contentRef.current.scrollHeight + "px";
  }

  //disable enter from submitting
  function titleEnter(e) {
    if (e.which === 13) {
      e.preventDefault();
      contentRef.current.focus();
    }
  }

  return (
    <form
      className="app-form"
      ref={formRef}
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
}

export default Form;
