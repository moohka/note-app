import { ReturnNoteContext } from "./contexts/NoteContext";
import NoteCard from "./display-elements/NoteCard";
import NoteModal from "./display-elements/NoteModal";

const Display = () => {
  const { notes, setSelectedNote, setTargetElement, setEditing } =
    ReturnNoteContext();

  return (
    <div id="app-display">
      <div className="display-container">
        {notes.map((note, id) => (
          <NoteCard note={note} key={id} />
        ))}
        <NoteModal />
      </div>
    </div>
  );
};

export default Display;
