
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from "@/context/global";
import Router, { useRouter } from "next/router";

function create() {
  const [name, setName] = useState("")
  const [teamName, setTeamName] = useState("")
  const [pokemonTeam, setPokemonTeam] = useState([])
  const [allPokemons, setAllPokemonData] = useState()
  const [isDisabled, setIsDisabled] = useState(true)



  const router = useRouter()

  const {
    allPokemonData
  } = useGlobalContext();

  useEffect(() => {
    setAllPokemonData(allPokemonData)
  },[allPokemonData])

  const fetchPokemon = (e) => {
    console.log(allPokemons)
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


  useEffect(() => {
    console.log(pokemonTeam)
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
     {pokemonTeam.length !== 0
     ?  <div className='w-screen flex justify-center p-9' >
     <button className='bg-black text-white p-2 rounded-lg'>Submit Team</button>
   </div> : ""}
    </main>
  )
}

export default create