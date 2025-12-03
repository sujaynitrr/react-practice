import React, { useState } from "react";
import ChildA from "./ChildA";
import ChildB from "./ChildB";

export default function Parent() {
  const [text, setText] = useState("");

  return (
    <div>
      <h2>Parent Component</h2>

      {/* Pass state and updater as props */}
      <ChildA text={text} setText={setText} />
      <ChildB text={text} />
    </div>
  );
}
