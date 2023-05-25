
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from "@/context/global";
import Router, { useRouter } from "next/router";

function create() {
  const [name, setName] = useState("")
  const [teamName, setTeamName] = useState("")
  const [pokemonTeam, setPokemonTeam] = useState([])
  const [isDisabled, setIsDisabled] = useState(true)

  const router = useRouter()

  const {
    allPokemonData
  } = useGlobalContext();

  const fetchPokemon = (e) => {
    e.preventDefault()
    const pokemons = (allPokemonData)
    const randomPokemon = pokemons[~~(Math.random() * pokemons.length)]
    console.log(pokemons)
    if(pokemonTeam.includes(randomPokemon)) {
      return
    } else {
      setPokemonTeam(current => [...current, randomPokemon])
    }
  }

  const sleep = ms =>
  new Promise(resolve => setTimeout(resolve, ms));

  useEffect(() => {
    console.log(pokemonTeam)
    sleep(3000).then(() => {
      setIsDisabled(false)
    });
  },[pokemonTeam])

  

  return (
    <main>
        <form action="" className="search-form" >
        <div className="input-control">
            
          <input
            type="text"
            value={teamName}
            onChange={(e) => {
              setTeamName(e.target.value)
            }}
            placeholder="Team name..."
          />
          
        </div>
        <button className="bg-[#7263f3] text-white p-2 rounded-lg" onClick={fetchPokemon}
        disabled={isDisabled}
        type="submit">
        Gotta Catch 'Em All
        </button>
      </form>
      <div className='w-screen flex justify-center py-8'>
        <div className='flex-col'>
          <h1 className='text-2xl font-bold'>Your team</h1>
          <h2 className='text-lg font-bold text-center'>{teamName}</h2>
        </div>
      </div>
      <div className="all-pokemon">
        {pokemonTeam ? (
          pokemonTeam.map((pokemon) => {
            return (
              <div
                key={pokemon.id}
                className="card"
                
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
    </main>
  )
}

export default create