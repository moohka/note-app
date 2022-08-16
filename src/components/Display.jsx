import { useEffect, useRef, useState, useContext } from "react";
import { db, notesCollection } from "../firebase-config";
import { doc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";
import { AppContext } from "./App";

function Display() {
  const [notes, setNotes] = useState([]);
  const [trigger, setTrigger] = useContext(AppContext);
  const contentRef = useRef();

  //2getDocs
  useEffect(() => {
    // (async function () {
    //   try {
    //     const data = await getDocs(notesCollection);
    //     setNotes(
    //       data.docs.map((doc) => {
    //         return { ...doc.data(), id: doc.id };
    //       })
    //     );
    //   } catch (error) {
    //     console.log(error);
    //   }
    // })();
  }, []);

  //3updateDoc
  async function updateNote(id) {
    const noteDoc = doc(db, "notes", id);
    await updateDoc(noteDoc);
    // setTrigger(!trigger);
  }

  //4deleteDoc
  async function deleteNote(id) {
    const noteDoc = doc(db, "notes", id);
    await deleteDoc(noteDoc);
    // setTrigger(!trigger);
  }

  //open popup
  function openNote(e) {
    e.target.classList.add("popup");
    //open overlay
    e.target.parentNode.classList.add("popup");
    //click anywhere to close
    document.addEventListener("click", (e) => {
      var isClickInsideElement = e.target.contains(e.target.childNodes[0]);
      if (!isClickInsideElement) {
        closeNote(e);
      }
    });
  }
  //close popup
  function closeNote(e) {
    //parents of buttons
    const parent = e.target.parentNode;
    const div = parent.parentNode;
    div.classList.remove("popup");
  }

  function overlayCloseNote(e) {
    const child = e.target.childNodes[0];
    child.classList.remove("popup");
  }

  //textarea auto-grow
  function autoGrow() {
    contentRef.current.style.height = "auto";
    contentRef.current.style.height = contentRef.current.scrollHeight + "px";
  }

  //TEST DATA
  const testNotes = [
    { id: 1, title: "abc", content: "content" },
    {
      id: 2,
      title: "fjeifj",
      content:
        "aisdjlskdfj dlkjas sdfjasidfj sadfj asldfj ;asas dfjhaskj fhksajdf aksdfhklsa jdfhkajs dfklas dfjakslfdhauslkdfh lkjjidf;lasidfj ;lasdijf ;laisjhfohiuwerf  dkf sadfs dfhsadfuh sdf dfj dfjd sahfsh  END",
    },
    { id: 3, title: "abc", content: "content" },
    { id: 4, title: "abc", content: "content" },
    { id: 5, title: "abc", content: "content" },
    { id: 6, title: "abc", content: "content" },
    { id: 7, title: "abc", content: "content" },
  ];

  return (
    <div className="app-display">
      {/*each note items*/}
      {testNotes.map((note) => {
        return (
          <div className="just-a-placeholder" key={note.id}>
            <div
              className="overlay"
              onClick={(e) => {
                overlayCloseNote(e);
              }}
            >
              <div
                className={`display-main`}
                id={note.id}
                onClick={(e) => {
                  contentRef.current.style.height =
                    contentRef.current.scrollHeight + "px";
                  openNote(e);
                }}
              >
                <input
                  className="display-input"
                  id="item-h"
                  defaultValue={`${note.title}`}
                ></input>

                <textarea
                  className="display-input"
                  id="item-p"
                  rows="1"
                  ref={contentRef}
                  onInput={autoGrow}
                  defaultValue={`${note.content}`}
                ></textarea>

                <div className="button-container">
                  <i
                    className="fi fi-rr-trash"
                    id="delete-icon"
                    onClick={(e) => {
                      closeNote(e);
                      //deleteNote();
                    }}
                  ></i>

                  <button
                    className="close-button"
                    onClick={(e) => {
                      closeNote(e);
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div className="test"></div>
    </div>
  );
}

export default Display;
