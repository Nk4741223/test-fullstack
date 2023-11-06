import React from "react";

export const CardAria = (props) => {
  const { cards, onClick } = props;
  return (
    <div id="card-aria">
      {cards.map((card, index) => {
        return (
          <div
            key={(card, index)}
            className={card.active ? "note-cards active" : "note-cards"}
            onClick={() => onClick(index)}
          >
            <h2>{card.title}</h2>
            <p>
              更新日時：
              {new Date(card.timestamp).toLocaleDateString("ja-JP", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>
        );
      })}
    </div>
  );
};
