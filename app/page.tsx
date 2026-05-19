import { supabase } from './supabase'

export default async function Home() {
  const { data: appartamenti, error } = await supabase
    .from('appartamenti')
    .select('*')

  if (error) return <p>Errore: {error.message}</p>

  return (
    <main style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>FuoriPorta 🌿</h1>
      <p>{appartamenti.length} appartamenti disponibili</p>
      {appartamenti.map(a => (
        <div key={a.id} style={{ border: '1px solid #ccc', padding: '20px', margin: '10px 0' }}>
          <h2>{a.nome}</h2>
          <p>{a.descrizione}</p>
          <p><strong>€ {a.prezzo} / notte</strong> · {a.metri_quadri} m² · {a.max_ospiti} ospiti max</p>
        </div>
      ))}
    </main>
  )
}