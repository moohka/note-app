import { useEffect, useRef, useState, useContext } from "react";
import { db, notesCollection } from "../firebase-config";
import { doc, getDocs, updateDoc, deleteDoc } from "firebase/firestore";
import { AppContext } from "./App";

function Display() {
  const [notes, setNotes] = useState([]);
  const [editing, setEditing] = useState(false);
  const contentRef = useRef();

  const [refresh, setRefresh] = useContext(AppContext);

  //2 getDocs
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

    console.log("display refresh");
  }, [refresh, editing]);

  //3 updateDoc
  async function updateNote(id) {
    const noteDoc = doc(db, "notes", id);
    await updateDoc(noteDoc);
    setRefresh(!refresh);
  }

  //4 deleteDoc
  async function deleteNote(id) {
    const noteDoc = doc(db, "notes", id);
    await deleteDoc(noteDoc);
    setRefresh(!refresh);
  }

  //open popup
  function openEdit(e) {
    console.log("openEdit");
  }

  //close popup
  function closeEdit(e) {
    console.log("closeEdit");
    setEditing(false);
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
    { id: 3, title: "ab1c", content: "content" },
    { id: 4, title: "abzzzzzc", content: "conte12312nt" },
    { id: 5, title: "abffffc", content: "conxcvtent" },
    { id: 6, title: "abffddfefc", content: "conte2123123sdfnt" },
    { id: 7, title: "abdccccc", content: "contesdfnt" },
  ];

  return (
    <div className="app-display">
      {/*edit popup*/}
      {editing ? (
        <div className="edit-div" onClick={closeEdit}>
          <form className="edit-form">
            <input className="edit-title"></input>

            <textarea className="edit-content"></textarea>

            <div className="edit-buttons">
              <div className="edit-delete">D</div>
              <button className="edit-close">Close</button>
            </div>
          </form>
        </div>
      ) : null}

      {/*note display*/}
      <div className="display-container">
        {testNotes.map((note) => {
          return (
            <div
              className="display-card"
              key={note.id}
              id={`note.id`}
              onClick={() => {
                setEditing(true);
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
                defaultValue={`${note.content}`}
              ></textarea>

              <div className="button-container">
                <i
                  className="fi fi-rr-trash"
                  id="delete-icon"
                  onClick={() => {
                    //delete()
                  }}
                ></i>

                <button
                  className="close-button"
                  onClick={() => {
                    //edit()
                  }}
                >
                  Close
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/*spare space*/}
      <div className="space"></div>
    </div>
  );
}

export default Display;
