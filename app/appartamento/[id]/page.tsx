import { supabase } from '../../supabase'
import { redirect } from 'next/navigation'

export default async function DettaglioAppartamento({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const { data: appartamento, error } = await supabase
    .from('appartamenti')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !appartamento) return <p>Appartamento non trovato</p>

  async function prenota(formData: FormData) {
    'use server'
    
    const nome = formData.get('nome') as string
    const email = formData.get('email') as string
    const check_in = formData.get('check_in') as string
    const check_out = formData.get('check_out') as string

    await supabase.from('prenotazioni').insert({
      appartamento_id: Number(id),
      nome_ospite: nome,
      email_ospite: email,
      check_in,
      check_out,
      stato: 'confermata'
    })

    redirect('/prenotazione-confermata')
  }

  return (
    <main style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '600px' }}>
      <h1>{appartamento.nome}</h1>
      <p>{appartamento.descrizione}</p>
      <p><strong>€ {appartamento.prezzo} / notte</strong></p>
      <p>{appartamento.metri_quadri} m² · {appartamento.camere} camere · {appartamento.bagni} bagni · max {appartamento.max_ospiti} ospiti</p>

      <hr style={{ margin: '32px 0' }} />

      <h2>Prenota</h2>
      <form action={prenota} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <input name="nome" placeholder="Il tuo nome" required style={{ padding: '8px' }} />
        <input name="email" type="email" placeholder="La tua email" required style={{ padding: '8px' }} />
        <label>Check-in</label>
        <input name="check_in" type="date" required style={{ padding: '8px' }} />
        <label>Check-out</label>
        <input name="check_out" type="date" required style={{ padding: '8px' }} />
        <button type="submit" style={{ padding: '12px', background: '#2D4A35', color: 'white', border: 'none', cursor: 'pointer' }}>
          Prenota ora
        </button>
      </form>
    </main>
  )
}