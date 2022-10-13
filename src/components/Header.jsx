import { ReactComponent as KeepMain } from "../assets/svgs/Keep_main.svg";
import { ReactComponent as React } from "../assets/svgs/React.svg";
import { ReactComponent as Firebase } from "../assets/svgs/Firebase.svg";
import { ReactComponent as Keep } from "../assets/svgs/Keep.svg";
import { ReactComponent as Plus } from "../assets/svgs/plus.svg";

const Header = () => {
  return (
    <header id="app-header">
      <div className="main-logo">
        <KeepMain />
      </div>
      <span className="keep-h">Keep</span>

      <div className="built-with">
        <div className="built-with-logo">
          <React />
        </div>
        <div className="built-with-logo">
          <Plus />
        </div>
        <div className="built-with-logo">
          <Firebase />
        </div>
        <div className="built-with-logo">
          <Plus />
        </div>
        <div className="built-with-logo">
          <Keep />
        </div>
      </div>
    </header>
  );
};

export default Header;
