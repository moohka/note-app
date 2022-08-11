import { useState, useEffect, useRef, useContext } from "react";
import { notesCollection } from "../firebase-config";
import { addDocs, addDoc } from "firebase/firestore";
import { AppContext } from "./App";

function Form() {
  const [focused, setFocused] = useState();
  const formRef = useRef();
  const titleRef = useRef();
  const contentRef = useRef();
  const buttonRef = useRef();

  useEffect(() => {
    formRef.current.addEventListener("click", openForm);
  }, []);

  //form open & close
  useEffect(() => {
    if (focused) {
      titleRef.current.style.display = "block";
      buttonRef.current.style.display = "block";
    } else {
      titleRef.current.style.display = "none";
      buttonRef.current.style.display = "none";
    }
  }, [focused]);

  //addDoc
  async function addNote(titleInput, contentInput) {
    await addDoc(notesCollection, { title: titleInput, content: contentInput });
  }

  //open Form
  function openForm() {
    document.addEventListener("click", (e) => {
      var isClickInsideElement = formRef.current.contains(e.target);
      if (!isClickInsideElement) {
        closeForm();
      }
    });
    setFocused(true);
  }

  //close Form
  const [trigger, setTrigger] = useContext(AppContext);

  function closeForm() {
    if (titleRef.current.value !== "" || contentRef.current.value !== "") {
      addNote(titleRef.current.value, contentRef.current.value);
      // setTrigger(!trigger);
    }

    titleRef.current.value = "";
    contentRef.current.value = "";
    contentRef.current.style.height = "auto";

    document.removeEventListener("click", () => {});
    setFocused(false);
  }

  //textarea auto-grow
  function autoGrow() {
    contentRef.current.style.height = "auto";
    contentRef.current.style.height = contentRef.current.scrollHeight + "px";
  }

  //disable input from submit
  function titleEnter(e) {
    if (e.which === 13) {
      e.preventDefault();
      contentRef.current.focus();
    }
  }

  return (
    <form className="app-input" ref={formRef}>
      <div className="button-container" ref={buttonRef}>
        <button type="button" className="close-button" onClick={closeForm}>
          Close
        </button>
      </div>

      <textarea
        className="input-element"
        id="input-content"
        placeholder="Take a note..."
        rows="1"
        ref={contentRef}
        onInput={autoGrow}
      ></textarea>

      <input
        className="input-element"
        type="text"
        id="input-title"
        placeholder="Title"
        onKeyPress={titleEnter}
        ref={titleRef}
      ></input>
    </form>
  );
}

export default Form;
