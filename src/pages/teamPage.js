import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router";
export default function teamPage() {
  const router = useRouter();

  const { team } = router.query;
  const [teamToDisplay, setTeamToDisplay] = useState([])
  const [array, setArray] = useState([])
  console.log(team)
  useEffect(() => {
    const storedTeams = localStorage.getItem("teams");
    let teams = storedTeams ? JSON.parse(storedTeams) : [];
   console.log(teams[0])
    teams.map((currentTeam) => {
      if(currentTeam[0].id === team){
        setTeamToDisplay(currentTeam[0])
        setArray(currentTeam[0].pokemonTeam)
      }
    })
   
  },[])

  useEffect(() => {
    console.log(teamToDisplay)
  }, [array])
  
  return (
    <div>
      <div className="w-screen flex justify-center py-8">
        <div className="flex-col">
          <h1 className="text-2xl font-bold">Your team</h1>
          <h2 className="text-lg font-bold text-center">
            {teamToDisplay.name}
          </h2>
        </div>
      </div>
      <div className="all-pokemon">
        {array ? (
          array.map((pokemon) => {
            return (
              <div key={pokemon.id} className="card">
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
      {teamToDisplay.length !== 0
     ?  <div className='w-screen flex justify-center p-9' >
     <button  className='bg-black text-white p-2 rounded-lg' onClick={() => {
      router.push({
        pathname: "/edit",
        query: {
          id: teamToDisplay.id
      }
      });
     }} >Edit Team</button>
   </div> : ""}
    </div>
  );
}
