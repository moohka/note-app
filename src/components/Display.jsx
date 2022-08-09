import { useEffect, useState } from "react";
import { db } from "../firebase-config";
import { collection, getDocs, updateDocs } from "firebase/firestore";

function Display() {
  //getDocs
  const [notes, setNotes] = useState([]);
  const notesCollection = collection(db, "notes");

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
  }, []);

  //updateDocs

  return (
    <div className="app-display">
      {notes.map((note) => {
        return (
          <div className={`display-item`} key={note.id}>
            <p className="item-h">{`${note.title}`}</p>
            <p className="item-p">{`${note.content}`}</p>

            <div className="button-container">
              <i className="fi fi-rr-trash" id="delete-icon"></i>
              <button className="close-button">Close</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Display;
