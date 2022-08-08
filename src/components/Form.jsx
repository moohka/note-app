import { useState, useEffect, useRef } from "react";

function Form() {
  //Form variables
  const [focused, setFocused] = useState(false);
  const formRef = useRef();
  const titleRef = useRef();
  const contentRef = useRef();
  const buttonRef = useRef();

  //form open/close
  useEffect(() => {
    if (focused) {
      titleRef.current.style.display = "block";
      buttonRef.current.style.display = "block";
    } else {
      titleRef.current.style.display = "none";
      buttonRef.current.style.display = "none";
    }
  }, [focused]);

  //form focus
  useEffect(() => {
    formRef.current.addEventListener("click", openForm);

    document.addEventListener("click", (e) => {
      var isClickInsideElement = formRef.current.contains(e.target);
      if (!isClickInsideElement) {
        closeForm();
      }
    });
  }, []);

  function addNote() {
    console.log("add to database");
  }

  function openForm() {
    setFocused(true);
  }

  function closeForm() {
    if (titleRef.current.value !== "" || contentRef.current.value !== "") {
      addNote();
    } else {
      console.log("nothing");
    }

    titleRef.current.value = "";
    contentRef.current.value = "";
    contentRef.current.style.height = "auto";

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
        <button type="button" className="form-button" onClick={closeForm}>
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
