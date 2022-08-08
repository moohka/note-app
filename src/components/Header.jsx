function Header() {
  return (
    <header className="app-header">
      <div className="header-madewith">
        <div className="madewith-item" id="React-logo"></div>
        <span className="madewith-item" id="plus-icon"></span>
        <div className="madewith-item" id="Firebase-logo"></div>
        <span className="madewith-item" id="plus-icon"></span>
        <div className="madewith-item" id="Keep-logo"></div>
      </div>

      <div className="header-intro">
        <span>Built with React.</span>
        <span>Stored in Firebase.</span>
        <span>Designed by Keep.</span>
      </div>
    </header>
  );
}

export default Header;
