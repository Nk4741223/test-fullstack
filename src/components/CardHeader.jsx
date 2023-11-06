import React from "react";

export const CardHeader = (props) => {
  const { onClick } = props;
  return (
    <div id="card-header" className="headers">
      <input placeholder="serch" />
      <button onClick={onClick}>＋</button>
    </div>
  );
};
