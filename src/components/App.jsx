import { NoteProvider } from "./contexts/NoteContext";
import Header from "./Header";
import Input from "./Input";
import Display from "./Display";
import Footer from "./Footer";

function App() {
  return (
    <div className="app">
      <Header />

      <NoteProvider>
        <Input />
        <Display />
      </NoteProvider>

      <Footer />
    </div>
  );
}

export default App;
