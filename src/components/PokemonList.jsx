import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./pokemonList.css"; // Import CSS file for styling

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?offset=${page * 20}&limit=20`
        );
        const data = await response.json();
        setPokemonList(data.results);
        console.log("DATA: ", data);
      } catch (error) {
        console.error("Error fetching Pokémon list:", error);
      }
    };

    fetchPokemonList();
  }, [page]);

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPokemonList = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().startsWith(searchTerm.toLowerCase())
  );

  return (
    <div className="pokemon-list-container">
      <h1 className="pokemon-list-title">Pokemon Fight</h1>
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={searchTerm}
        onChange={handleSearchInputChange}
        className="pokemon-list-search-bar"
      />
      <div className="button-container">
        <Link to="/highscores" className="button">
          High Scores
        </Link>
      </div>
      <div className="pokemon-grid">
        {filteredPokemonList.map((pokemon) => (
          <div key={pokemon.name} className="pokemon-card">
            <span></span>
            <Link to={`/pokemon/${pokemon.name}`} className="pokemon-link">
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                  pokemon.url.split("/")[6]
                }.png`}
                alt={pokemon.name}
                className="pokemon-image"
              />
              <p className="pokemon-name">{pokemon.name}</p>
            </Link>
          </div>
        ))}
      </div>
      <div className="button-container">
        <button
          className="pokemon-list-btn"
          onClick={() => {
            if (page > 1) setPage(page - 1);
          }}
        >
          prev
        </button>

        <button
          className="pokemon-list-btn"
          onClick={() => {
            if (page < 64) setPage(page + 1);
          }}
        >
          next
        </button>
      </div>
    </div>
  );
};

export default PokemonList;
