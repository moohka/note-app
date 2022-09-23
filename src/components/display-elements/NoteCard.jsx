import { ReturnNoteContext } from "../contexts/NoteContext";

const NoteCard = (props) => {
  const thisNote = props.note;

  const { setSelectedNote, openEdit, setTargetElement, setEditing } =
    ReturnNoteContext();

  //dev
  console.log(props.note.title);

  return (
    <div className="display-placeholder" key={thisNote.id}>
      <div
        className="display-card"
        note-id={thisNote.id}
        note-title={thisNote.title}
        note-content={thisNote.content}
        note-time={thisNote.time}
        onClick={(e) => {
          e.target.style.visibility = "hidden";
          openEdit(e);
        }}
      >
        <h2 className="display-input" id="item-h">
          {thisNote.title}
        </h2>

        <p className="display-input" id="item-p">
          {thisNote.content}
        </p>
      </div>
    </div>
  );
};

export default NoteCard;
