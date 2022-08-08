import { useState } from "react";

function Display() {
  //edit a note
  const [edit, setEdit] = useState("");

  //fetch data
  let data = [
    {
      title: "First Note dff asdf sadf sadf asdf",
      content:
        "cut the grass askdjfl; asdf jiasmdflsadfas dfhasklasdfa asdf asdffdgsd fhuasdfh aslkjdfhklasudhf lkh  asdhfkuashdf lkajhsdflk jashdflk uh; aisj df;lajis df;lja sdl;ifj a;lisdf j;lsadjk",
    },
  ];

  return (
    <div className="app-display">
      {data.map((note) => {
        return (
          <div className={`display-item  ${edit}`} key={note.title}>
            <p className="item-h">{`${note.title}`}</p>
            <p className="item-p">{`${note.content}`}</p>
          </div>
        );
      })}
    </div>
  );
}

export default Display;
