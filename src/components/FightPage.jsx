import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./fightPage.css";

const FightPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [pokemonData, setPokemonData] = useState(null);
  const [opponentData, setOpponentData] = useState(null);
  const [winner, setWinner] = useState(null);
  const [loser, setLoser] = useState(null);
  const [fightTextVisible, setFightTextVisible] = useState(true); // State to control visibility of fight text

  const backgroundImage = "2.jpg";
  // [
  //   "2.jpg",
  //   "4.jpg",
  //   "7.jpg",
  //   "8.jpg",
  //   "9.jpg",
  //   "10.jpg",
  //   "11.jpg",
  //   "12.jpg",
  //   "arena2.jpg",
  //   "arena3.jpg",
  // ];

  // const randomIndex = Math.floor(Math.random() * backgroundImage.length);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const responsePokemonData = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        if (!responsePokemonData.ok) {
          throw new Error(
            `Error fetching details for Pokémon ${id}: ${responsePokemonData.statusText}`
          );
        }
        const dataPokemonData = await responsePokemonData.json();
        setPokemonData(dataPokemonData);
        const randomId = Math.floor(Math.random() * 898) + 1;
        const responseRandomPokemon = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${randomId}`
        );
        if (!responseRandomPokemon.ok) {
          throw new Error(
            `Error fetching details for the random Pokémon: ${responseRandomPokemon.statusText}`
          );
        }
        const dataRandomPokemon = await responseRandomPokemon.json();
        setOpponentData(dataRandomPokemon);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPokemonData();
  }, []);

  const startFight = () => {
    const killTtimePokemon =
      opponentData.stats[0].base_stat /
      ((pokemonData.stats[5].base_stat * pokemonData.stats[1].base_stat) /
        (opponentData.stats[2].base_stat / 230));

    const killTtimeOpponent =
      pokemonData.stats[0].base_stat /
      ((opponentData.stats[5].base_stat * opponentData.stats[1].base_stat) /
        (pokemonData.stats[2].base_stat / 230));

    if (killTtimePokemon - killTtimeOpponent < 0) {
      setLoser(opponentData);
      setTimeout(() => {
        setWinner(pokemonData);
        setFightTextVisible(false); // Hide fight text when winner is displayed
        sendWinnerToBackend(pokemonData.name, opponentData.name); // Send winner's name to backend
      }, 1000); // Delay winner display after loser animation
    } else {
      setLoser(pokemonData);
      setTimeout(() => {
        setWinner(opponentData);
        setFightTextVisible(false); // Hide fight text when winner is displayed
        sendWinnerToBackend(opponentData.name, pokemonData.name); // Send winner's name to backend
      }, 1000); // Delay winner display after loser animation
    }
  };

  const sendWinnerToBackend = async (winnerName, loserName) => {
    try {
      const response = await fetch(
        "https://pokemon-api-vmgy.onrender.com/fight-result",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            winer: winnerName,
            loser: loserName,
            point: 1,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to send winner data to backend");
      }
      console.log("Winner data sent to backend successfully");
    } catch (error) {
      console.error("Error sending winner data to backend:", error);
    }
  };

  return (
    <div
      className="fight-page-container"
      style={{
        backgroundImage: `url("/${backgroundImage}")`,
        backgroundSize: "cover",
      }}
    >
      {fightTextVisible && <h1 className="fight-page-title">Fight</h1>}
      {pokemonData && opponentData && !winner && (
        <div className="fight-content">
          <div className={`pokemon-card ${loser ? "loser-animation" : ""}`}>
            <h2 className="opponent-name">{opponentData.name}</h2>
            <img
              src={opponentData.sprites.front_default}
              alt={opponentData.name}
              className="pokemon-image"
              width="150"
              height="100"
            />
          </div>
          <div className={`pokemon-card ${winner ? "winner-animation" : ""}`}>
            <h2 className="opponent-name">{pokemonData.name}</h2>
            <img
              src={pokemonData.sprites.front_default}
              alt={pokemonData.name}
              className="pokemon-image"
              width="150"
              height="100"
            />
          </div>
        </div>
      )}
      {winner && (
        <div className={`pokemon-card ${winner ? "winner-animation" : ""}`}>
          <h2 className="winner-page-title opponent-name">The Winner is</h2>
          <h2 className="opponent-name">{winner.name}</h2>
          <img
            src={winner.sprites.front_default}
            alt={winner.name}
            className="pokemon-image"
            width="150"
            height="200"
          />
        </div>
      )}
      <div className="fight-page-button-container">
        <button onClick={() => navigate("/")} className="back-button">
          home
        </button>
        {!winner && (
          <button onClick={startFight} className="fight-button ">
            Start Fight
          </button>
        )}
        <Link to="/HighScores" className="highscore-button ">
          High Scores
        </Link>
      </div>
    </div>
  );
};

export default FightPage;
