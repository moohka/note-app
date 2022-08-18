import { createContext, useState, useEffect } from "react";
import Header from "./Header";
import Form from "./Form";
import Display from "./Display";

export const AppContext = createContext();

function App() {
  const [refresh, setRefresh] = useState(true);

  useEffect(() => {
    console.log("re-rendered");
  }, [refresh]);

  return (
    <div className="app">
      <Header />

      <AppContext.Provider value={[refresh, setRefresh]}>
        <Form refresh={refresh} setRefresh={setRefresh} />
        <Display refresh={refresh} setRefresh={setRefresh} />
      </AppContext.Provider>
    </div>
  );
}

export default App;
