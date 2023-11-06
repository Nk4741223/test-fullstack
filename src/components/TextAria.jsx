import React from "react";

export const TextAria = (props) => {
  const { text, onChangeTextTitle, onChangeTextContent } = props;
  return (
    <div id="text-aria" key={text}>
      <input
        value={text.title}
        onChange={onChangeTextTitle}
        id="textTitle"
      ></input>
      <br />
      <textarea
        value={text.content}
        onChange={onChangeTextContent}
        id="textContent"
      ></textarea>
    </div>
  );
};
