"use client"

import Image from 'next/image'
import {Search} from "./Search";

export default function Home() {
  return (
   <main>
      <Search
      placeholder="Digite a Cidade..."
      defaultValue="Florianópolis
      "/>
      
   </main>
  )
}
