import { useState } from "react";
import { useGlobalContext } from "@/context/global";
import Router, { useRouter } from "next/router";

export default function Home() {

  const router = useRouter()
  const {name} = router.query

  const {
    allPokemonData,
    searchResults,
    next,
    getPokemon,
    loading,
    realTimeSearch,
  } = useGlobalContext();

  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);

    realTimeSearch(search);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    realTimeSearch(search);
  };

  const displaySearchResults = () => {
    return searchResults.map((pokemon) => {
      return (
        <div
          key={pokemon.id}
          onClick={() => {
            Router.push(`/pokemon/${pokemon.name}`);
          }}
          className="pokemon-name"
        >
          {pokemon.name}
        </div>
      );
    });
  };

  return (
    <main>
      <form action="" className="search-form" onSubmit={handleSearch}>
        <div className="input-control">
          <input
            type="text"
            value={search}
            onChange={handleChange}
            placeholder="Search for a Pokemon..."
          />
          <button className="submit-btn" type="submit">
            Search
          </button>
        </div>
      </form>

      {search && searchResults.length > 0 && (
        <div className="search-results">{displaySearchResults()}</div>
      )}

        <div className="">
          <button className="bg-[#7263f3] text-white p-2 rounded-lg" onClick={() => {
            router.push({
              pathname: "/create",
              query: {
                name: name
            }
            });
          }}>Create a team</button>
        </div>

      <div className="all-pokemon">
        {allPokemonData ? (
          allPokemonData.map((pokemon) => {
            return (
              <div
                key={pokemon.id}
                className="card"
                onClick={() => {
                  Router.push(`/pokemon/${pokemon.name}`);
                }}
              >
                <div className="card-image">
                  <img
                    src={pokemon.sprites.other.home.front_shiny}
                    alt={pokemon.name}
                  />
                </div>
                <div className="card-body">
                  <h3>{pokemon.name}</h3>
                  <p>More Details &nbsp; &rarr;</p>
                </div>
              </div>
            );
          })
        ) : (
          <h1>Loading...</h1>
        )}
      </div>

      <div className="next">
        {allPokemonData.length > 0 && (
          <button className="next-btn" onClick={next}>
            Load More &darr;
          </button>
        )}
      </div>
    </main>
  );
}