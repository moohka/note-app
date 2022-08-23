import { useReducer } from "react";

import Header from "./elements/Header";
import Form from "./elements/Form";
import Display from "./elements/Display";
import Footer from "./elements/Footer";

function App() {
  const [refresh, forceRefresh] = useReducer((x) => x + 1, 0);

  return (
    <div className="app">
      <Header />

      <Form refresh={refresh} forceRefresh={forceRefresh} />
      <Display refresh={refresh} forceRefresh={forceRefresh} />

      <Footer />
    </div>
  );
}

export default App;
