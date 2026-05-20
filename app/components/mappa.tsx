'use client'

import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix icone Leaflet con Next.js
const icon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
})

type Appartamento = {
  id: number
  nome: string
  indirizzo: string
  prezzo: number
  latitudine: number
  longitudine: number
}

export default function Mappa({ appartamenti }: { appartamenti: Appartamento[] }) {
  return (
    <MapContainer
      center={[45.3081, 9.5036]}
      zoom={14}
      style={{ height: '400px', width: '100%', borderRadius: '4px' }}
    >
      <TileLayer
        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {appartamenti.map(a => (
        <Marker key={a.id} position={[a.latitudine, a.longitudine]} icon={icon}>
          <Popup>
            <strong>{a.nome}</strong><br />
            {a.indirizzo}<br />
            <strong>€ {a.prezzo} / notte</strong>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}