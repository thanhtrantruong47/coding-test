import "./app.css";
import Game from "./components/Game";

const App = () => {
  return (
    <div className="container">
      <hgroup className="head">
        <h1>HAIBAZO - Entrance Test - ReactJs</h1>
        <h2>
          As a React developer, your job watch the gameplay video and implement
          the game
        </h2>
        <section className="game">
          <h2>UI</h2>
          <Game />
        </section>
      </hgroup>
    </div>
  );
};

export default App;
