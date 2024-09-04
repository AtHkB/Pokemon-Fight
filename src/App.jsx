import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PokemonList from "./components/PokemonList";
import PokemonDetail from "./components/PokemonDetail";
import FightPage from "./components/FightPage"; // Import the FightPage component
import HighScores from "./components/HighScores"; // Import HighScores component

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/pokemon/:id" element={<PokemonDetail />} />
        <Route path="/fight/:id" element={<FightPage />} />{" "}
        <Route path="/highscores" element={<HighScores />} />
        {/* Add this route */}
      </Routes>
    </Router>
  );
};

export default App;
