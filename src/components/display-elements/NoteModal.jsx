import { ReturnNoteContext } from "../../contexts/NoteContext";

const NoteModal = () => {
  const {
    editTitleRef,
    editContentRef,
    editing,
    setEditing,
    titleEnter,
    selectedNote,
    targetElement,
    updateNote,
    deleteNote,
  } = ReturnNoteContext();

  //close edit popup
  function closeEdit() {
    targetElement.style.visibility = "visible";
    document.documentElement.style.setProperty("--scroll-enabler", "auto");
    setEditing(false);
  }

  return (
    <>
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
    </>
  );
};

export default NoteModal;
