import { useRouter } from 'next/router'
import React from 'react'

function Home() {
  const router = useRouter()
  const {name} = router.query
  return (
    <div>{name}</div>
  )
}

export default Home