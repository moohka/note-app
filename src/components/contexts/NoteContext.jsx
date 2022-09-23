import {
  useState,
  useEffect,
  useReducer,
  useRef,
  useContext,
  createContext,
} from "react";
import { db, notesCollectionRef } from "../../firebase-config";
import {
  doc,
  query,
  orderBy,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

const NoteContext = createContext();
export const ReturnNoteContext = () => {
  return useContext(NoteContext);
};

export const NoteProvider = ({ children }) => {
  //variables
  const [notes, setNotes] = useState([]);
  const [editing, setEditing] = useState(false);
  const [focused, setFocused] = useState(false);
  const [selectedNote, setSelectedNote] = useState({
    id: "",
    title: "",
    content: "",
    time: 0,
  });
  const [targetElement, setTargetElement] = useState();
  const editTitleRef = useRef();
  const editContentRef = useRef();
  const formRef = useRef();
  const titleRef = useRef();
  const contentRef = useRef();
  const buttonRef = useRef();

  //force refresh with useReducer
  const [refresh, forceRefresh] = useReducer((x) => x + 1, 0);

  //1 addDoc
  const addNote = async (titleInput, contentInput) => {
    await addDoc(notesCollectionRef, {
      title: titleInput,
      content: contentInput,
      time: Date.now(),
    })
      .then(() => {
        forceRefresh();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //2 getDocs
  useEffect(() => {
    (async function () {
      try {
        const data = await getDocs(
          query(notesCollectionRef, orderBy("time", "desc"))
        );

        //dev
        console.log("testing, get data working");

        setNotes(
          data.docs.map((doc) => {
            return { ...doc.data(), id: doc.id };
          })
        );
      } catch (error) {
        console.log(error);
      }
    })();
  }, [refresh]);

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
        time: Date.now(),
      };
      await updateDoc(noteDoc, newFields).then(() => forceRefresh());
    }
  }

  //4 deleteDoc
  async function deleteNote() {
    const noteDoc = doc(db, "notes", selectedNote.id);
    await deleteDoc(noteDoc).then(() => forceRefresh());
  }

  //form useEffect
  useEffect(() => {
    if (focused) {
      titleRef.current.style.display = "block";
      buttonRef.current.style.display = "block";
    } else {
      titleRef.current.style.display = "none";
      buttonRef.current.style.display = "none";
    }
  }, [focused, refresh, titleRef, buttonRef]);

  //Open editing modal
  function openEdit(e) {
    let theId = e.target.getAttribute("note-id");
    let theTitle = e.target.getAttribute("note-title");
    let theContent = e.target.getAttribute("note-content");
    let theTime = e.target.getAttribute("note-time");
    let conversion = new Date(parseInt(theTime));
    let timeInString = conversion.toLocaleString("en-us");

    console.log(theTitle);

    setSelectedNote({
      id: theId,
      title: theTitle,
      content: theContent,
      time: timeInString,
    });

    setTargetElement(e.target);
    document.documentElement.style.setProperty("--scroll-enabler", "hidden");
    setEditing(true);
  }

  //Open form function
  let focusCloseForm = function (e) {
    var isClickInsideElement = formRef.current.contains(e.target);

    if (!isClickInsideElement) {
      closeForm();
    }
  };

  function openForm() {
    document.addEventListener("mousedown", focusCloseForm);
    setFocused(true);
  }

  //Close form function
  function closeForm() {
    if (titleRef.current.value !== "" || contentRef.current.value !== "") {
      addNote(titleRef.current.value, contentRef.current.value);
    }

    titleRef.current.value = "";
    contentRef.current.value = "";
    contentRef.current.style.height = "auto";

    //Remove close function after used
    document.removeEventListener("click", focusCloseForm);
    setFocused(false);
  }

  //textarea auto-grow
  function autoGrow() {
    contentRef.current.style.height = "auto";
    contentRef.current.style.height = contentRef.current.scrollHeight + "px";
  }

  const value = {
    addNote,
    notes,
    updateNote,
    deleteNote,

    focused,
    openEdit,
    openForm,
    closeForm,
    autoGrow,
    setFocused,
    refresh,
    forceRefresh,
    editing,
    setEditing,
    formRef,
    titleRef,
    buttonRef,
    contentRef,
    targetElement,
    setTargetElement,
    setSelectedNote,
  };

  return <NoteContext.Provider value={value}>{children}</NoteContext.Provider>;
}; //end of NoteProvider
