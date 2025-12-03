import React from "react";

export default function ChildA({ text, setText }) {
  return (
    <div>
      <h3>Child A</h3>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type something..."
      />
    </div>
  );
}
