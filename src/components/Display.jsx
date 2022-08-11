import { useEffect, useRef, useState, useContext } from "react";
import { db, notesCollection } from "../firebase-config";
import { doc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";
import { AppContext } from "./App";

function Display() {
  const [notes, setNotes] = useState([]);
  const [trigger, setTrigger] = useContext(AppContext);

  //getDocs
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

  //updateDoc
  async function updateNote(id) {
    const noteDoc = doc(db, "notes", id);
    await updateDoc(noteDoc);
    // setTrigger(!trigger);
  }

  //deleteDoc
  async function deleteNote(id) {
    const noteDoc = doc(db, "notes", id);
    await deleteDoc(noteDoc);
    // setTrigger(!trigger);
  }

  //TEST DATA
  const testNotes = [
    { id: 1, title: "abc", content: "content" },
    {
      id: 2,
      title: "efjeifj",
      content:
        "aisdjlskdfj dlkjas sdfjasidfj sadfj asldfj ;asjidf;lasidfj ;lasdijf ;laisjhfohiuwerf  dkf sadfs dfhsadfuh sdf dfj dfjd sahfsh  ",
    },
    { id: 3, title: "abc", content: "content" },
    { id: 4, title: "abc", content: "content" },
    { id: 5, title: "abc", content: "content" },
    { id: 6, title: "abc", content: "content" },
    { id: 7, title: "abc", content: "content" },
  ];

  //open popup

  function openNote(e) {
    e.target.classList.add("popup");
  }

  function closeNote(e) {
    const parent = e.target.parentNode;
    const div = parent.parentNode;

    console.log(div);
    div.classList.remove("popup");
  }

  return (
    <div className="app-display">
      {testNotes.map((note) => {
        return (
          <div className="overlay" key={note.id}>
            <div
              className={`display-main`}
              id={note.id}
              onClick={(e) => {
                openNote(e);
              }}
            >
              <p className="item-h">{`${note.title}`}</p>
              <p className="item-p">{`${note.content}`}</p>

              <div className="button-container">
                <i
                  className="fi fi-rr-trash"
                  id="delete-icon"
                  onClick={() => {
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
        );
      })}
    </div>
  );
}

export default Display;
