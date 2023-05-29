import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast';
import { toast } from 'react-hot-toast';

export default function teams() {

  const Router = useRouter()

  const [teams, setTeams] = useState([])

  useEffect(() => {
    const storedTeams = localStorage.getItem("teams");
    let teams = storedTeams ? JSON.parse(storedTeams) : [];
   
    setTeams(teams)
   
  },[])

  return (
    <main>
      <div action="" className="search-form" >
      <div className="p-6">
          <img
            className="w-[15rem] h-20 object-contain"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/2560px-International_Pok%C3%A9mon_logo.svg.png"
            alt=""
          />
        </div>
        <div class="hidden w-full md:block md:w-auto p-6">
          <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li className="cursor-pointer">
              <div
                className="cursor-pointer hover:text-blue-600"
                onClick={() => {
                  Router.push({
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
                  Router.push({
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
      <Toaster position="top-right" reverseOrder={false} />
    </main>
  )
}
