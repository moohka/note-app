import { useEffect, useRef, useState } from "react";
import { db, notesCollectionRef } from "../firebase-config";
import {
  doc,
  query,
  orderBy,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

function Display(props) {
  //useState
  const [notes, setNotes] = useState([]);
  const [editing, setEditing] = useState(false);

  const [selectedNote, setSelectedNote] = useState({
    id: "",
    title: "",
    content: "",
    time: 0,
  });
  const [targetElement, setTargetElement] = useState();

  //useRef
  const noteTitleRef = useRef();
  const noteContentRef = useRef();
  const editTitleRef = useRef();
  const editContentRef = useRef();

  //2 getDocs
  useEffect(() => {
    (async function () {
      try {
        const data = await getDocs(
          query(notesCollectionRef, orderBy("time", "desc"))
        );

        setNotes(
          data.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          })
        );
      } catch (error) {
        console.log(error);
      }
    })();
  }, [props.refresh]);

  //3 updateDoc
  async function updateNote() {
    if (
      selectedNote.title !== editTitleRef.current.value ||
      selectedNote.content !== editContentRef.current.value
    ) {
      const noteDoc = doc(db, "notes", selectedNote.id);
      const newFields = {
        title: editTitleRef.current.value,
        content: editContentRef.current.value,
      };
      await updateDoc(noteDoc, newFields).then(() =>
        props.setRefresh(!props.refresh)
      );
    }
  }

  //4 deleteDoc
  async function deleteNote() {
    const noteDoc = doc(db, "notes", selectedNote.id);
    await deleteDoc(noteDoc).then(() => props.setRefresh(!props.refresh));
  }

  //open edit popup
  function openEdit(e) {
    let theId = e.target.getAttribute("note-id");
    let theTitle = e.target.getAttribute("note-title");
    let theContent = e.target.getAttribute("note-content");
    let theTime = e.target.getAttribute("note-time");

    let conversion = new Date(parseInt(theTime));
    let timeInString = conversion.toLocaleString("en-us");

    setSelectedNote({
      id: theId,
      title: theTitle,
      content: theContent,
      time: timeInString,
    });

    setTargetElement(e.target);

    setEditing(true);
  }

  //close edit popup
  function closeEdit() {
    targetElement.style.visibility = "visible";
    setEditing(false);
  }

  //disable form sumit
  function titleEnter(e) {
    if (e.which === 13) {
      e.preventDefault();
      editContentRef.current.focus();
    }
  }

  return (
    <div id="app-display">
      {/*edit popup*/}
      {editing ? (
        <div
          className="edit-div"
          onMouseDown={() => {
            updateNote();
            closeEdit();
          }}
        >
          <form
            className="edit-form"
            onMouseDown={(e) => {
              e.stopPropagation();
            }}
          >
            <input
              className="edit-input"
              id="edit-title"
              onKeyDown={titleEnter}
              defaultValue={selectedNote.title}
              ref={editTitleRef}
            ></input>

            <textarea
              className="edit-input"
              id="edit-content"
              defaultValue={selectedNote.content}
              ref={editContentRef}
            ></textarea>

            <div className="edit-button-container">
              <div
                id="edit-delete"
                onClick={() => {
                  deleteNote();
                  closeEdit();
                }}
              >
                <i className="fi fi-rr-trash"></i>
              </div>

              <div id="edit-time">
                <p>
                  last edited: <span>{selectedNote.time}</span>
                </p>
              </div>

              <button
                type="button"
                id="edit-close"
                onClick={() => {
                  updateNote();
                  closeEdit();
                }}
              >
                Close
              </button>
            </div>
          </form>
        </div>
      ) : null}

      {/*note display*/}
      <div className="display-container">
        {notes.map((note) => {
          return (
            <div className="display-placeholder" key={note.id}>
              <div
                className="display-card"
                note-id={note.id}
                note-title={note.title}
                note-content={note.content}
                note-time={note.time}
                onClick={(e) => {
                  e.target.style.visibility = "hidden";
                  openEdit(e);
                }}
              >
                <h2 className="display-input" id="item-h" ref={noteTitleRef}>
                  {note.title}
                </h2>

                <p className="display-input" id="item-p" ref={noteContentRef}>
                  {note.content}
                </p>
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
