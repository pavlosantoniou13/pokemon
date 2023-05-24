import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Toaster } from 'react-hot-toast';
import { toast } from 'react-hot-toast';

function index() {
    const [name, setName] = useState("")
    const router = useRouter()

    const loginPlayer = (e) =>{ 
        e.preventDefault()

        if(name === "") {
            toast.error("Please add a name")
        } else if(name !== "") {
            router.push({
              pathname: "/home",
              query: {
                name: name
            }
            });
        }

        setName("")
    }

  return (
    <main className=" p-4 flex flex-col bg-gray-100 h-screen">
      <div className="text-5xl pt-4 text-gray-500 my-2 flex justify-center">
        Welcome Pokemon Trainer
      </div>
      <div className="w-screen flex justify-center">
        <img
          className="object-contain w-[30%] "
          src="https://ssb.wiki.gallery/images/thumb/2/28/Pok%C3%A9mon_Trainer_%28solo%29_SSBU.png/800px-Pok%C3%A9mon_Trainer_%28solo%29_SSBU.png"
        />
      </div>
      <div className="w-screen flex justify-center">
        <form className=" p-10 w-[40%]">
          <div className="relative z-0 w-full mb-6 group">
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              type="text"
              name="name"
              id="name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="name"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Your name
            </label>
          </div>

          <div className=" flex justify-center">
            <button 
              onClick={loginPlayer}
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </main>
  );
}

export default index