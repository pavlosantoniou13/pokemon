import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast';
import { toast } from 'react-hot-toast';

export default function edit() {
  const router = useRouter()
  const {id} = router.query
  const [teamName, setTeamName] = useState([])
  const [team, setTeam] = useState([])
  const [allTeams, setAllTeams] = useState([])
  

  useEffect(() => {
    const storedTeams = localStorage.getItem("teams");
    let teams = storedTeams ? JSON.parse(storedTeams) : [];
    setAllTeams(teams)
  
    teams.map((currentTeam) => {
      if(currentTeam[0].id === id){
        setTeamName(currentTeam[0].name)
        setTeam(currentTeam[0].pokemonTeam)
      }
    })
   
  },[])

  const removePokemon = (e) => {
    const pokemonRemove = e.target.id
    
    setTeam((prev) => {
      return prev.filter((pokemon) => pokemon.name !== pokemonRemove)
    })
    
    
  }

 

  const uploadData = () => {
    let allTeamsArr = allTeams;

    if (team.length === 0) {
      allTeamsArr = allTeamsArr.filter((team) => team[0].id !== id);
      const updatedTeams = JSON.stringify(allTeamsArr);
      localStorage.setItem("teams", updatedTeams);
    } else if (team.length !== 0) {
      allTeamsArr = allTeamsArr.filter((team) => team[0].id !== id);

      let teamData = [
        {
          name: teamName,
          pokemonTeam: team,
          id: id,
        },
      ];

      allTeamsArr.push(teamData);

      const updatedTeams = JSON.stringify(allTeamsArr);
      localStorage.setItem("teams", updatedTeams);
    }
    toast.success("changes were submitted succesfully")
  }

  const deleteTeam = () => {
    setTeam([])
    setTeamName("")
    let allTeamsArr = allTeams;
    allTeamsArr = allTeamsArr.filter((team) => team[0].id !== id);
    const updatedTeams = JSON.stringify(allTeamsArr);
    localStorage.setItem("teams", updatedTeams);
    toast.success(`Team was deleted succesfully`)
    
  }


  

  useEffect(() => {
    console.log(team)
  },[team])

  return (
    <>
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
      </div>
    <div className="mt-8 flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Base Experience
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    type
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    abilities
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    
                  </th>
                  
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {team.map((pokemon) => (
                  <tr key={""}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <img
                            className="h-14 w-14 rounded-md"
                            src={pokemon.sprites.other.home.front_shiny}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">
                            {pokemon.name}
                          </div>
                          <div className="text-gray-500"></div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <div className="text-gray-900">
                        {pokemon.base_experience}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {pokemon?.types?.map((type) => {
                        return <p key={type.type.name}>{type.type.name},</p>;
                      })}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"></td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {pokemon?.abilities?.map((ability) => {
                    return (
                      <p key={ability.ability.name}>{ability.ability.name},</p>
                    );
                  })}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <div
                        onClick={(e) => removePokemon(e)}
                        id={pokemon.name}
                        className="text-[#F70D1A] hover:text-[#dc2626] cursor-pointer"
                       
                      >
                        Delete<span className="sr-only"></span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className='w-screen flex justify-center my-3'>
        <input
                type="text"
                class="block w-2/5 px-5 py-2 border rounded-lg bg-white shadow-lg placeholder-gray-400 text-gray-700 focus:ring focus:outline-none"
                placeholder=" "
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
              />
        </div>
      </div>
        <div className="w-screen flex justify-center p-9">
          <button
            onClick={uploadData}
            className="bg-black text-white p-2 rounded-lg"
          >
            Submit Changes
          </button>
        </div>
        <div className="w-screen flex justify-center p-9">
          <button
            onClick={deleteTeam}
            className="bg-red-600 text-white p-2 rounded-lg"
          >
            Delete Team
          </button>
        </div>
    </div>
    <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}
