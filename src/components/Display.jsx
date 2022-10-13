import { ReturnNoteContext } from "../contexts/NoteContext";
import NoteCard from "./display-elements/NoteCard";
import NoteModal from "./display-elements/NoteModal";

const Display = () => {
  const { notes } = ReturnNoteContext();

  return (
    <div id="app-display">
      <div className="display-container">
        {notes.map((note, id) => (
          <NoteCard key={id} note={note} />
        ))}
      </div>

      <NoteModal />
    </div>
  );
};

export default Display;
