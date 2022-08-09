import { useEffect, useState, useContext } from "react";
import { db, notesCollection } from "../firebase-config";
import { doc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";
import { AppContext } from "./App";

function Display() {
  //getDocs
  const [notes, setNotes] = useState([]);
  const [trigger, setTrigger] = useContext(AppContext);

  useEffect(() => {
    (async function () {
      try {
        const data = await getDocs(notesCollection);
        setNotes(
          data.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          })
        );
      } catch (error) {
        console.log(error);
      }
    })();
  }, [trigger]);

  //updateDoc
  function openNote(e) {
    console.log(e.target.id);
    console.log(e.target.className);
  }
  function closeNote() {}

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
  ];

  return (
    <div className="app-display">
      {testNotes.map((note) => {
        return (
          <div
            className={`display-main`}
            key={note.id}
            id={note.id}
            onClick={openNote}
          >
            <p className="item-h">{`${note.title}`}</p>
            <p className="item-p">{`${note.content}`}</p>

            <div className="button-container">
              <i
                className="fi fi-rr-trash"
                id="delete-icon"
                onClick={() => {}}
              ></i>
              <button className="close-button">Close</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Display;
