import Link from 'next/link'
import { supabase } from '../../supabase'
import { redirect } from 'next/navigation'

export default async function DettaglioAppartamento({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const { data: appartamento, error } = await supabase
    .from('appartamenti')
    .select(`*, foto_appartamenti(url, ordine)`)
    .eq('id', id)
    .single()

  if (error || !appartamento) return <p>Appartamento non trovato</p>

  async function prenota(formData: FormData) {
    'use server'

    const nome = formData.get('nome') as string
    const email = formData.get('email') as string
    const check_in = formData.get('check_in') as string
    const check_out = formData.get('check_out') as string

    if (check_out <= check_in) {
      redirect('/date-non-valide')
    }

    const { data: sovrapposizioni } = await supabase
      .from('prenotazioni')
      .select('id')
      .eq('appartamento_id', Number(id))
      .lt('check_in', check_out)
      .gt('check_out', check_in)

    if (sovrapposizioni && sovrapposizioni.length > 0) {
      redirect('/date-non-disponibili')
    }

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

  const foto = appartamento.foto_appartamenti?.sort((a: any, b: any) => a.ordine - b.ordine) || []

  return (
    <main style={{ fontFamily: 'sans-serif', background: '#FDFAF6', minHeight: '100vh' }}>

      {/* HEADER */}
      <header style={{ background: '#2D4A35', padding: '16px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/" style={{ color: 'white', fontSize: '22px', textDecoration: 'none' }}>
          Fuori<span style={{ fontStyle: 'italic', color: '#A8C4AE' }}>Porta</span>
        </Link>
        <Link href="/" style={{ color: '#A8C4AE', fontSize: '13px', textDecoration: 'none' }}>← Torna alla home</Link>
      </header>

      {/* GALLERIA FOTO */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3px', height: '400px' }}>
        <div style={{ overflow: 'hidden' }}>
          <img
            src={appartamento.foto_copertina || 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800'}
            alt={appartamento.nome}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: '3px' }}>
          {foto.slice(0, 2).map((f: any, i: number) => (
            <div key={i} style={{ overflow: 'hidden' }}>
              <img src={f.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ))}
        </div>
      </div>

      {/* CONTENUTO */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '48px', padding: '48px 40px', maxWidth: '1100px', margin: '0 auto' }}>

        {/* SINISTRA */}
        <div>
          <p style={{ fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8FA897', margin: '0 0 6px' }}>
            📍 {appartamento.indirizzo}
          </p>
          <h1 style={{ fontSize: '36px', fontWeight: 400, margin: '0 0 16px', color: '#1C2820' }}>{appartamento.nome}</h1>

          <div style={{ display: 'flex', gap: '20px', fontSize: '14px', color: '#4A6552', marginBottom: '24px', flexWrap: 'wrap' }}>
            <span>🛏 {appartamento.camere} camere</span>
            <span>🚿 {appartamento.bagni} bagni</span>
            <span>📐 {appartamento.metri_quadri} m²</span>
            <span>👤 max {appartamento.max_ospiti} ospiti</span>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #D8E4DB', margin: '24px 0' }} />

          <h2 style={{ fontSize: '20px', fontWeight: 400, marginBottom: '12px', color: '#1C2820' }}>Descrizione</h2>
          <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#4A6552', fontWeight: 300 }}>{appartamento.descrizione}</p>

          <hr style={{ border: 'none', borderTop: '1px solid #D8E4DB', margin: '24px 0' }} />

          <h2 style={{ fontSize: '20px', fontWeight: 400, marginBottom: '16px', color: '#1C2820' }}>Servizi</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {appartamento.wifi && <div style={{ display: 'flex', gap: '10px', fontSize: '14px', color: '#4A6552' }}>📶 Wi-Fi fibra incluso</div>}
            {appartamento.parcheggio && <div style={{ display: 'flex', gap: '10px', fontSize: '14px', color: '#4A6552' }}>🚗 Parcheggio gratuito</div>}
            {appartamento.aria_condizionata && <div style={{ display: 'flex', gap: '10px', fontSize: '14px', color: '#4A6552' }}>❄️ Aria condizionata</div>}
            {appartamento.animali_ammessi && <div style={{ display: 'flex', gap: '10px', fontSize: '14px', color: '#4A6552' }}>🐾 Animali ammessi</div>}
            <div style={{ display: 'flex', gap: '10px', fontSize: '14px', color: '#4A6552' }}>🔑 Check-in autonomo</div>
            <div style={{ display: 'flex', gap: '10px', fontSize: '14px', color: '#4A6552' }}>🚆 Stazione a 10 min</div>
            <div style={{ display: 'flex', gap: '10px', fontSize: '14px', color: '#4A6552' }}>🌿 Parco a 5 min</div>
            <div style={{ display: 'flex', gap: '10px', fontSize: '14px', color: '#4A6552' }}>🧹 Pulizie professionali</div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #D8E4DB', margin: '24px 0' }} />

          <h2 style={{ fontSize: '20px', fontWeight: 400, marginBottom: '8px', color: '#1C2820' }}>Dove si trova</h2>
          <p style={{ fontSize: '14px', color: '#4A6552', fontWeight: 300 }}>
            {appartamento.indirizzo} · A 20 minuti da Milano in treno diretto
          </p>
        </div>

        {/* DESTRA - FORM PRENOTAZIONE */}
        <div style={{ position: 'sticky', top: '24px', alignSelf: 'start' }}>
          <div style={{ background: 'white', border: '1px solid #D8E4DB', borderRadius: '4px', padding: '28px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}>
            <div style={{ marginBottom: '20px' }}>
              <span style={{ fontSize: '28px', fontWeight: 400, color: '#1C2820' }}>€ {appartamento.prezzo}</span>
              <span style={{ fontSize: '13px', color: '#8FA897' }}> / notte</span>
              <div style={{ fontSize: '12px', color: '#2D4A35', fontWeight: 500, marginTop: '4px' }}>
                Risparmio stimato ~40% vs Milano
              </div>
            </div>

            <form action={prenota} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input
                name="nome"
                placeholder="Il tuo nome"
                required
                style={{ padding: '12px', border: '1px solid #D8E4DB', borderRadius: '3px', fontFamily: 'sans-serif', fontSize: '14px' }}
              />
              <input
                name="email"
                type="email"
                placeholder="La tua email"
                required
                style={{ padding: '12px', border: '1px solid #D8E4DB', borderRadius: '3px', fontFamily: 'sans-serif', fontSize: '14px' }}
              />
              <div>
                <label style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8FA897', display: 'block', marginBottom: '4px' }}>Check-in</label>
                <input
                  name="check_in"
                  type="date"
                  required
                  style={{ width: '100%', padding: '12px', border: '1px solid #D8E4DB', borderRadius: '3px', fontFamily: 'sans-serif', fontSize: '14px' }}
                />
              </div>
              <div>
                <label style={{ fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#8FA897', display: 'block', marginBottom: '4px' }}>Check-out</label>
                <input
                  name="check_out"
                  type="date"
                  required
                  style={{ width: '100%', padding: '12px', border: '1px solid #D8E4DB', borderRadius: '3px', fontFamily: 'sans-serif', fontSize: '14px' }}
                />
              </div>
              <button
                type="submit"
                style={{ padding: '14px', background: '#2D4A35', color: 'white', border: 'none', borderRadius: '3px', cursor: 'pointer', fontSize: '14px', fontWeight: 500, letterSpacing: '0.06em' }}
              >
                Prenota ora
              </button>
            </form>

            <p style={{ fontSize: '11px', color: '#8FA897', textAlign: 'center', marginTop: '12px' }}>
              Nessun addebito immediato · Conferma istantanea
            </p>
          </div>
        </div>

      </div>
    </main>
  )
}