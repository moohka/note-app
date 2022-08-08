import { useState, useEffect, useRef } from "react";
import { db } from "../firebase-config";
import Header from "./Header";
import Form from "./Form";
import Display from "./Display";

function App() {
  const formRef = useRef();

  return (
    <div className="app">
      <Header />
      <Form ref={formRef} />
      <Display />
    </div>
  );
}

export default App;
