import { useReducer } from "react";
import Header from "./elements/Header";
import Input from "./elements/Input";
import Display from "./elements/Display";
import Footer from "./elements/Footer";

function App() {
  const [refresh, forceRefresh] = useReducer((x) => x + 1, 0);

  return (
    <div className="app">
      <Header />

      <Input refresh={refresh} forceRefresh={forceRefresh} />
      <Display refresh={refresh} forceRefresh={forceRefresh} />

      <Footer />
    </div>
  );
}

export default App;
