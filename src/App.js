import React, { useRef, useEffect, useState } from "react";
import "./App.css";
import "./puzzlelib";
import img from "./frame.png";

function TextContent({ show }) {
  if (!show) return null;
  return (
    <section class="answer">
      <img src={img} alt="answer" />
      <h1>
        Debes encontrar que tengo en comun con estos muchachos{" "}
        <span role="img" aria-label="emoji moon">
          🌚
        </span>
      </h1>
    </section>
  );
}

function App() {
  const appRef = useRef();
  const [textVisibility, setTextVisibility] = useState(false);

  function showText() {
    setTextVisibility(true);
  }
  useEffect(function onMount() {
    // eslint-disable-next-line no-undef
    const puzzle = new PicturePuzzle(appRef.current, img, 300, 5);
    puzzle.onFinished = function () {
      showText();
    };
  }, []);
  return (
    <div id="App">
      <h1>No vale inspeccionar!</h1>
      <div
        ref={appRef}
        className={!textVisibility ? "gameWrapper" : null}
      ></div>
      <TextContent show={textVisibility} />
    </div>
  );
}

export default App;
