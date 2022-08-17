import { createContext, useState } from "react";
import Header from "./Header";
import Form from "./Form";
import Display from "./Display";

export const AppContext = createContext();

function App() {
  const [refresh, setRefresh] = useState(true);

  return (
    <div className="app">
      <Header />

      <AppContext.Provider value={[refresh, setRefresh]}>
        <Form />
        <Display />
      </AppContext.Provider>
    </div>
  );
}

export default App;
