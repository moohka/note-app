import { useState, useEffect, useRef } from "react";

function form() {
  //add a note
  const [focused, setFocused] = useState(false);

  const titleRef = useRef();
  const buttonRef = useRef();

  const cancelButtonRef = useRef();
  const addButtonRef = useRef();

  useEffect(() => {
    if (focused) {
      titleRef.current.style.display = "block";
      buttonRef.current.style.display = "block";
    } else {
      titleRef.current.style.display = "none";
      buttonRef.current.style.display = "none";
    }
  }, [focused]);

  useEffect(() => {
    formRef.current.addEventListener("click", openForm);
    document.addEventListener("click", (e) => {
      var isClickInsideElement = formRef.current.contains(e.target);
      if (!isClickInsideElement) {
        closeForm();
      }
    });
  }, []);

  function openForm() {
    setFocused(true);
  }

  function closeForm() {
    setFocused(false);
  }

  function clickClose() {
    setFocused(false);
  }
  function clickAdd() {
    clickClose();
  }

  return (
    <form className="app-input">
      <div className="button-container" ref={buttonRef}>
        <button
          type="button"
          className="form-button"
          ref={cancelButtonRef}
          onClick={clickClose}
        >
          Close
        </button>
      </div>

      <input
        className="input-element"
        id="input-content"
        placeholder="Take a note..."
      ></input>

      <input
        className="input-element"
        id="input-title"
        placeholder="Title"
        ref={titleRef}
      ></input>
    </form>
  );
}

export default form;
