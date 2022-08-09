import { createContext, useState } from "react";
import Header from "./Header";
import Form from "./Form";
import Display from "./Display";

export const AppContext = createContext();

function App() {
  const [trigger, setTrigger] = useState(true);

  return (
    <div className="app">
      <AppContext.Provider value={[trigger, setTrigger]}>
        <Header />
        <Form />
        <Display />
      </AppContext.Provider>
    </div>
  );
}

export default App;
