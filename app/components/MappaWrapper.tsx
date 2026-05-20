'use client'

import dynamic from 'next/dynamic'

const Mappa = dynamic(() => import('./mappa'), { ssr: false })

type Appartamento = {
  id: number
  nome: string
  indirizzo: string
  prezzo: number
  latitudine: number
  longitudine: number
}

export default function MappaWrapper({ appartamenti }: { appartamenti: Appartamento[] }) {
  return <Mappa appartamenti={appartamenti} />
}