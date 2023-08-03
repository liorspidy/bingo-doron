import { useState } from "react";
import "./App.css";
import MainGame from "./components/MainGame";
import Modal from "./components/Modal";

function App() {
  const [youWon, setYouWon] = useState(false);

  return (
    <>
      {youWon && <Modal setYouWon={setYouWon} />}
      <div className="title">
        <h1>Bingo Doron</h1>
        <h2>Did he say he is angry today?</h2>
      </div>
      <div>
        <MainGame setYouWon={setYouWon} />
      </div>
    </>
  );
}

export default App;
