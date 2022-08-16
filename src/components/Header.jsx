import { ReactComponent as KeepMain } from "../visuals/Keep_main.svg";

import { ReactComponent as React } from "../visuals/React.svg";
import { ReactComponent as Firebase } from "../visuals/Firebase.svg";
import { ReactComponent as Keep } from "../visuals/Keep.svg";
import { ReactComponent as Plus } from "../visuals/plus.svg";

function Header() {
  return (
    <header className="app-header">
      <KeepMain />
      <span className="keep-h">Keep</span>

      <div className="built-with">
        <React />
        <Plus />
        <Firebase />
        <Plus />
        <Keep />
      </div>
    </header>
  );
}

export default Header;
