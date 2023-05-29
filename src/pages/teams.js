import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

export default function teams() {

  const Router = useRouter()

  const [teams, setTeams] = useState([])

  useEffect(() => {
    const storedTeams = localStorage.getItem("teams");
    let teams = storedTeams ? JSON.parse(storedTeams) : [];
   
    setTeams(teams)
   
  },[])

  useEffect(() => {
    console.log(teams)
  },[teams])

  

  return (
    <main>
      <div action="" className="search-form" >
        
      </div>
      <div className="all-pokemon">
        {teams ? (
          teams.map((team) => {
            return (
              <div
                key={team.name}
                className="card"
                onClick={() => {
                  Router.push({
                    pathname: "/teamPage",
                    query: {
                      team: team[0].id
                  }
                  });
                }}
              >
                <div className="card-image">
                  <img
                    src={"https://www.freeiconspng.com/thumbs/pokeball-png/pokeball-transparent-png-2.png"}
                    alt={team.name}
                  />
                </div>
                <div className="card-body">
                  <h3>{team[0].name}</h3>
                  
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
