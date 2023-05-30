"use client"

import Image from 'next/image'
import {Search} from "./Search";

export default function Home() {
  return (
    
   <main>
    <title>Web app previsão de tempo</title>
      <Search
      placeholder="Digite o nome de uma Cidade"
      />
      
   </main>
  )
}
