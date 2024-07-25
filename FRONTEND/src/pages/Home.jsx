import React from 'react'
import Hero from '../components/Hero'
import Biography from '../components/Biography'
import Department from '../components/Department'
import MessageFrom from '../components/MessageFrom'


const Home = () => {
  return (
    <>
    <Hero title={"welcome"} imageUrl={"/hero.png"}/>
    <Biography/>
    <Department/>
    <MessageFrom/>
    </>
  )
}

export default Home