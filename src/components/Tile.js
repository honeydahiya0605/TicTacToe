import React, { useState } from "react";

export default function Tile({ id, label, clickEvent }) {
  const [color, setcolor] = useState("");

  if (label === "X" && color !== "red") {
    setcolor("red");
  } else if (label === "O" && color !== "green") {
    setcolor("green");
  }

  return (
    <div className={`${color} grid-item`} id={id} onClick={clickEvent}>
      {label}
    </div>
  );
}
