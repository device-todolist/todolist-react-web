import React from "react";
import Header from "Components/Header";
import { add, minus } from "Utils/math";
import "./app.scss";

interface IProps {
  name: string;
  age: number;
}

function App(props: IProps) {
  const { name, age } = props;
  return (
    <div className="app">
      <Header />
      <span>{`Hello! I'm ${name}, ${age} yearssss old.`}</span>
      <div>{add(5, 6)}</div>
    </div>
  );
}

export default App;
