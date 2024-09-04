// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./PokemonDetail.css"; // Import CSS file for styling

const PokemonDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [pokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await response.json();
        setPokemonData(data);
      } catch (error) {
        console.error(`Error fetching details for Pokémon ${id}:`, error);
      }
    };

    fetchPokemonData();
  }, [id]);

  const goBackToList = () => {
    navigate("/");
  };

  // const selectForFight = () => {
  // Logic to select the pokemon for fight
  // };

  return (
    <div className="pokemon-detail-container">
      <h1 className="pokemon-detail-title">Pokémon Details</h1>
      {pokemonData ? (
        <div className="pokemon-detail-content">
          <h2 className="pokemon-name">{pokemonData.name}</h2>
          <img
            src={pokemonData.sprites.front_default}
            alt={pokemonData.name}
            className="pokemon-image"
          />
          {console.log("POKEMON DATA: ", pokemonData)}
          <p>HP: {pokemonData.stats[0].base_stat}</p>
          <p>Height: {pokemonData.height}</p>
          <p>Weight: {pokemonData.weight}</p>
          <p>Attack: {pokemonData.stats[1].base_stat}</p>
          <p>Defense: {pokemonData.stats[2].base_stat}</p>
          <p>Speed: {pokemonData.stats[5].base_stat}</p>
          <div className="button-container">
            <button onClick={goBackToList} className="back-button">
              home
            </button>
            <Link to={`/fight/${id}`} className="fight-button">
              Random Opponent
            </Link>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PokemonDetail;
