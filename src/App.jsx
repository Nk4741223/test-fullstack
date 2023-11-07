import "./styles.css";
import React, { useEffect } from "react";
import { useState } from "react";
import { CardHeader } from "./components/CardHeader";
import { CardAria } from "./components/CardAria";
import { TextHeader } from "./components/TextHeader";
import { TextAria } from "./components/TextAria";

export const App = () => {
  //カード
  const [cards, setCards] = useState([
    {
      title: "レストラン福岡",
      content: "12/24の17:00に予約してます。",
      timestamp: new Date() - 100000,
      active: false,
    },
    {
      title: "レストラン横浜",
      content: "12/25の17:00に予約してます。",
      timestamp: new Date() - 10000000,
      active: false,
    },
    {
      title: "レストラン名古屋あああああああああああ",
      content: "12/26の17:00に予約してます。",
      timestamp: new Date() - 1000000000,
      active: false,
    },
    {
      title: "レストラン大阪",
      content: "12/27の17:00に予約してます。",
      timestamp: new Date() - 100000000000,
      active: false,
    },
  ]);

  //テキスト
  const [text, setText] = useState({ title: "", content: "" });

  //アクティブ番号
  const [activeCardIndex, setActiveCardIndex] = useState("initialValue");
  const [preActiveCardIndex, setPreActiveCardIndex] = useState("initialValue");

  //追加ボタン（③ノートの作成）
  const onClickAdd = () => {
    //アクティブカード番号を変更
    setPreActiveCardIndex(activeCardIndex);
    setActiveCardIndex(0);

    //アクティブカードを変更（追加）
    changeActiveCard("add");
  };

  //デリートボタン（⑤ノートの削除）
  const onClickDelete = () => {
    //アクティブカードを変更（削除）
    activeCardIndex !== "initialValue" && changeActiveCard("delete");
  };

  //カードボタン（②ノートの読み込み）
  const onClickCard = (index) => {
    //アクティブカードを押しても処理なし
    if (activeCardIndex === index) {
      return;
    }
    //アクティブカード番号を変更
    setPreActiveCardIndex(activeCardIndex);
    setActiveCardIndex(index);

    //オブジェクトのアクティブを変更
    const newCards = [...cards];
    newCards.map((card) => (card.active = false));
    newCards[index].active = true;
    setCards(newCards);

    //テキスト表示
    const newText = {
      title: newCards[index].title,
      content: newCards[index].content,
    };
    setText(newText);

    timeFlag && saveSavedFlagChange();
    //上下ずれの対応
    if (timeFlag && activeCardIndex > index) {
      setActiveCardIndex(index + 1);
    }
  };

  //アクティブカードを変更（追加、削除）
  const changeActiveCard = (flag) => {
    //追加or削除
    const newCards = [...cards];
    flag === "delete" && newCards.splice(activeCardIndex, 1);
    newCards.map((card) => (card.active = false));
    flag === "add" &&
      newCards.unshift({
        title: "",
        content: "",
        timestamp: Date.now(),
        active: true,
      });
    if (activeCardIndex < newCards.length) {
      //オブジェクトのアクティブを変更
      if (flag === "delete") {
        newCards[activeCardIndex].active = true;
      }
      //テキスト表示
      const newText = {
        title: newCards[activeCardIndex].title,
        content: newCards[activeCardIndex].content,
      };
      setText(newText);
    } else {
      //テキスト表示
      const newText = {
        title: "",
        content: "",
      };
      setText(newText);
    }
    setCards(newCards);
  };

  //ノート変更（④ノートの更新）
  const onChangeTextTitle = (event) => {
    if (activeCardIndex !== "initialValue") {
      const newCards = [...cards];
      newCards[activeCardIndex].title = event.target.value;
      setCards(newCards);

      const newText = Object.assign({}, text);
      newText.title = newCards[activeCardIndex].title;
      setText(newText);
    }
  };
  const onChangeTextContent = (event) => {
    if (activeCardIndex !== "initialValue") {
      const newCards = [...cards];
      newCards[activeCardIndex].content = event.target.value;
      setCards(newCards);

      const newText = Object.assign({}, text);
      newText.content = newCards[activeCardIndex].content;
      setText(newText);
    }
  };

  //保存-----------------------------------------------
  //save表示フラグ
  const [savedFlag, setSavedFlag] = useState(false);
  //タイマ中フラグ
  const [timeFlag, setTimeFlag] = useState(false);
  const sec = 5;
  let timeoutId;

  // タイマー
  const setTimer = () => {
    timeoutId = setTimeout(doTimeout, sec * 1000);
    setTimeFlag(true);
  };

  // タイマーリセット
  const resetTimer = () => {
    clearTimeout(timeoutId);
    setSavedFlag(false);
    setTimer();
  };

  //入力されたらタイマ開始
  addEventListener("keydown", resetTimer, false); // eslint-disable-line

  //タイムアウト時の実行
  const doTimeout = () => {
    saveSavedFlagChange();
    setTimeFlag(false);
  };

  //save表示関数
  const saveSavedFlagChange = () => {
    activeCardIndex !== "initialValue" && setSavedFlag(true);
  };

  // save表示されたら日時更新
  const [update, setUpdata] = useState(false);
  useEffect(() => {
    if (savedFlag) {
      if (!timeFlag) {
        cards[activeCardIndex].timestamp = new Date();
      } else {
        //アクティブカードの変更あれば、前の番号の日時を更新
        cards[preActiveCardIndex].timestamp = new Date();
      }
      setUpdata(update ? false : true);
    }
  }, [savedFlag]);

  //並び替え
  const sortedCards = cards.sort((a, b) => b.timestamp - a.timestamp);

  return (
    <>
      <h1>Notes</h1>
      <div id="flame-row">
        <div id="card-flame">
          <CardHeader onClick={onClickAdd} />
          <CardAria cards={cards} onClick={onClickCard} />
        </div>
        <div id="text-flame">
          <TextHeader savedFlag={savedFlag} onClick={onClickDelete} />
          <TextAria
            text={text}
            onChangeTextTitle={onChangeTextTitle}
            onChangeTextContent={onChangeTextContent}
          />
        </div>
      </div>
    </>
  );
};

//サーバーサイド
//データベース
//検索
//テスト導入
