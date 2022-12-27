import { ReactComponent as KeepMain } from "../assets/svg/Keep_main.svg";

const Header = () => {
  return (
    <header id="app-header">
      <div className="main-logo">
        <KeepMain />
      </div>
      <span className="keep-h">Keep</span>
    </header>
  );
};

export default Header;
