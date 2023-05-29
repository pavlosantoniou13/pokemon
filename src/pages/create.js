
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { nanoid } from 'nanoid';
import { useGlobalContext } from '@/context/global';



function Create() {
  const [name, setName] = React.useState("")
  const [teamName, setTeamName] = React.useState("")
  const [pokemonTeam, setPokemonTeam] = React.useState([])
  const [allPokemons, setAllPokemonData] = React.useState()
  const [isDisabled, setIsDisabled] = React.useState(true)

  

  

  const router = useRouter()

  const {
    allPokemonData
  } = useGlobalContext();

  useEffect(() => {
    setAllPokemonData(allPokemonData)
  },[allPokemonData])

  const fetchPokemon = (e) => {
    e.preventDefault()
    if(allPokemons.length === 0){
      return
    } else if(allPokemons.length !== 0) {
      const pokemons = allPokemons;
      const randomPokemon = pokemons[~~(Math.random() * pokemons.length)];
      console.log(pokemons);
      if (pokemonTeam.includes(randomPokemon)) {
        return;
      } else {
        setPokemonTeam((current) => [...current, randomPokemon]);
      }
    }
    
  }

  const saveTeam = () => {
    
    const id = nanoid()

    let teamData = [{
      name: teamName,
      pokemonTeam,
      id: id
    }]

    const storedTeams = localStorage.getItem("teams");
    let teams = storedTeams ? JSON.parse(storedTeams) : [];
    teams.push(teamData);
    const updatedTeams = JSON.stringify(teams);
    localStorage.setItem("teams", updatedTeams);
    
    
    setPokemonTeam([])
    setTeamName("")
  }

  return (
    <main>
      <form action="" className="search-form">
        <div className="p-6">
          <img
            className="w-[15rem] h-20 object-contain"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png"
            alt=""
          />
        </div>
        <div className="input-control">
          <input
            type="text"
            value={teamName}
            onChange={(e) => {
              setTeamName(e.target.value);
            }}
            placeholder="Team name..."
          />
          <button className="submit-btn" onClick={fetchPokemon} type="submit">
            Gotta Catch 'Em All
          </button>
        </div>
        <div class="hidden w-full md:block md:w-auto p-6">
          <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li className="cursor-pointer">
              <div
                className="cursor-pointer hover:text-blue-600"
                onClick={() => {
                  router.push({
                    pathname: "/home",
                    
                  });
                }}
                class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Home
              </div>
            </li>
            <li className="cursor-pointer">
              <div
                className="cursor-pointer hover:text-blue-600"
                onClick={() => {
                  router.push({
                    pathname: "/teams",
                    
                  });
                }}
                class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
              >
                Team list
              </div>
            </li>
          </ul>
        </div>
      </form>

      <div className="w-screen flex justify-center py-8">
        <div className="flex-col">
          <h1 className="text-2xl font-bold">Your team</h1>
          <h2 className="text-lg font-bold text-center">{teamName}</h2>
        </div>
      </div>
      <div className="all-pokemon">
        {pokemonTeam ? (
          pokemonTeam.map((pokemon) => {
            return (
              <div key={pokemon.id} className="card">
                <div className="card-image">
                  <img
                    src={pokemon.sprites.other.home.front_shiny}
                    alt={ "&apos;"}
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
                </div>
              </div>
            );
          })
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
      {pokemonTeam.length !== 0 ? (
        <div className="w-screen flex justify-center p-9">
          <button
            onClick={saveTeam}
            className="bg-black text-white p-2 rounded-lg"
          >
            Submit Team
          </button>
        </div>
      ) : (
        ""
      )}
    </main>
  );
}

export default Create