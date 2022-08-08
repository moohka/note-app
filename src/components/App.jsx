import { db } from "../firebase-config";
import Header from "./Header";
import Form from "./Form";
import Display from "./Display";

function App() {
  return (
    <div className="app">
      <Header />
      <Form />
      <Display />
    </div>
  );
}

export default App;
