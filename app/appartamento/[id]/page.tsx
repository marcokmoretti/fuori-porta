import { supabase } from '../../supabase'

export default async function DettaglioAppartamento({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  const { data: appartamento, error } = await supabase
    .from('appartamenti')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !appartamento) return <p>Appartamento non trovato</p>

  return (
    <main style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '600px' }}>
      <h1>{appartamento.nome}</h1>
      <p>{appartamento.descrizione}</p>
      <p><strong>€ {appartamento.prezzo} / notte</strong></p>
      <p>{appartamento.metri_quadri} m² · {appartamento.camere} camere · {appartamento.bagni} bagni · max {appartamento.max_ospiti} ospiti</p>

      <hr style={{ margin: '32px 0' }} />

      <h2>Prenota</h2>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <input name="nome" placeholder="Il tuo nome" style={{ padding: '8px' }} />
        <input name="email" type="email" placeholder="La tua email" style={{ padding: '8px' }} />
        <label>Check-in</label>
        <input name="check_in" type="date" style={{ padding: '8px' }} />
        <label>Check-out</label>
        <input name="check_out" type="date" style={{ padding: '8px' }} />
        <button type="submit" style={{ padding: '12px', background: '#2D4A35', color: 'white', border: 'none', cursor: 'pointer' }}>
          Prenota ora
        </button>
      </form>
    </main>
  )
}
