import { useEffect, useState } from "react";
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
      <div className="search-form">
        <div className="p-6">
          <img className="w-[15rem] h-20 object-contain" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png" alt="" />
        </div>
        <form action="" onSubmit={handleSearch}>
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
        <div class="hidden w-full md:block md:w-auto p-6" >
      <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li className="cursor-pointer">
          <div className="cursor-pointer hover:text-blue-600" onClick={() => {
             router.push({
              pathname: "/create",
              query: {
                name: name
            }
            });
          }} class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Create a team</div>
        </li>
        <li className="cursor-pointer">
          <div className="cursor-pointer hover:text-blue-600" onClick={() => {
            router.push({
              pathname: "/teams",
              query: {
                name: name
            }
            });
          }}  class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Team list</div>
        </li>
      </ul>
    </div>

      </div>

      {search && searchResults.length > 0 && (
        <div className="search-results">{displaySearchResults()}</div>
      )}

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
                  <h3>Base Experience: {pokemon.base_experience}</h3>
                  <h3>Type:</h3>
                  {pokemon?.types?.map((type) => {
                    return <p key={type.type.name}>{type.type.name},</p>;
                  })}
                  <h3>Abilities:</h3>
                  {pokemon?.abilities?.map((ability) => {
                    return (
                      <p key={ability.ability.name}>{ability.ability.name},</p>
                    );
                  })}
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