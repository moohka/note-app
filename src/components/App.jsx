import { useReducer } from "react";
import Header from "./Header";
import Form from "./Form";
import Display from "./Display";

function App() {
  const [refresh, forceRefresh] = useReducer((x) => x + 1, 0);

  return (
    <div className="app">
      <Header />
      <Form refresh={refresh} forceRefresh={forceRefresh} />
      <Display refresh={refresh} forceRefresh={forceRefresh} />
    </div>
  );
}

export default App;
