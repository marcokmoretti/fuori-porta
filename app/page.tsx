import Link from 'next/link'
import { supabase } from './supabase'

export default async function Home() {
  const { data: appartamenti, error } = await supabase
    .from('appartamenti')
    .select('*')
    .order('id')

  if (error) return <p>Errore: {error.message}</p>

  return (
    <main style={{ fontFamily: 'sans-serif', background: '#FDFAF6', minHeight: '100vh' }}>
      
      {/* HEADER */}
      <header style={{ background: '#2D4A35', padding: '16px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: 'white', fontSize: '22px', margin: 0 }}>
          Fuori<span style={{ fontStyle: 'italic', color: '#A8C4AE' }}>Porta</span>
        </h1>
        <nav style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <Link href="/admin" style={{ color: '#A8C4AE', fontSize: '13px', textDecoration: 'none' }}>Admin</Link>
        </nav>
      </header>

      {/* HERO */}
      <section style={{ background: '#2D4A35', padding: '80px 40px', textAlign: 'center', color: 'white' }}>
        <p style={{ fontSize: '12px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#A8C4AE', marginBottom: '16px' }}>
          🌿 20 minuti da Milano · Fino al 40% in meno
        </p>
        <h2 style={{ fontSize: '48px', fontWeight: 300, margin: '0 0 16px', lineHeight: 1.1 }}>
          Milano a portata di treno.<br />
          <em>La vita a portata di verde.</em>
        </h2>
        <p style={{ fontSize: '16px', color: '#A8C4AE', maxWidth: '500px', margin: '0 auto 32px', lineHeight: 1.7 }}>
          Appartamenti curati a 20 minuti da Milano in treno diretto, in un contesto tranquillo e verde.
        </p>
        <div style={{ display: 'flex', gap: '32px', justifyContent: 'center' }}>
          {[['5', 'Appartamenti'], ["20'", 'Da Milano'], ['−40%', 'vs Milano'], ['4.9★', 'Rating']].map(([num, label]) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '28px', fontWeight: 300 }}>{num}</div>
              <div style={{ fontSize: '11px', letterSpacing: '0.1em', color: '#A8C4AE', textTransform: 'uppercase' }}>{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* APPARTAMENTI */}
      <section style={{ padding: '64px 40px' }}>
        <h3 style={{ fontSize: '32px', fontWeight: 300, marginBottom: '8px', color: '#1C2820' }}>
          I nostri <em>appartamenti</em>
        </h3>
        <p style={{ color: '#8FA897', marginBottom: '40px', fontSize: '14px' }}>
          Tutti a pochi minuti dalla stazione, parchi e centro storico
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
          {appartamenti.map(a => (
            <div key={a.id} style={{ background: 'white', borderRadius: '4px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
              
              {/* FOTO */}
              <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                {a.foto_copertina ? (
                  <img
                    src={a.foto_copertina}
                    alt={a.nome}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                ) : (
                  <div style={{ width: '100%', height: '100%', background: '#2D4A35', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px' }}>🏡</div>
                )}
                <div style={{ position: 'absolute', bottom: '12px', left: '12px', background: 'rgba(45,74,53,0.88)', color: 'white', padding: '4px 10px', borderRadius: '100px', fontSize: '11px', fontWeight: 500 }}>
                  ↓ −38% vs Milano
                </div>
              </div>

              {/* BODY */}
              <div style={{ padding: '20px' }}>
                <p style={{ fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#8FA897', margin: '0 0 4px' }}>
                  📍 {a.indirizzo || 'Zona verde tranquilla'}
                </p>
                <h4 style={{ fontSize: '18px', fontWeight: 400, margin: '0 0 8px', color: '#1C2820' }}>{a.nome}</h4>
                <p style={{ fontSize: '13px', color: '#4A6552', margin: '0 0 12px', lineHeight: 1.6, fontWeight: 300 }}>
                  {a.descrizione?.substring(0, 100)}...
                </p>
                
                <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: '#8FA897', marginBottom: '16px', flexWrap: 'wrap' }}>
                  <span>🛏 {a.camere} camere</span>
                  <span>🚿 {a.bagni} bagni</span>
                  <span>📐 {a.metri_quadri} m²</span>
                  <span>👤 {a.max_ospiti} ospiti</span>
                </div>

                <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                  {a.wifi && <span style={{ fontSize: '11px', background: '#F0F7F1', color: '#2D4A35', padding: '3px 8px', borderRadius: '100px' }}>📶 WiFi</span>}
                  {a.parcheggio && <span style={{ fontSize: '11px', background: '#F0F7F1', color: '#2D4A35', padding: '3px 8px', borderRadius: '100px' }}>🚗 Parcheggio</span>}
                  {a.aria_condizionata && <span style={{ fontSize: '11px', background: '#F0F7F1', color: '#2D4A35', padding: '3px 8px', borderRadius: '100px' }}>❄️ A/C</span>}
                  {a.animali_ammessi && <span style={{ fontSize: '11px', background: '#F0F7F1', color: '#2D4A35', padding: '3px 8px', borderRadius: '100px' }}>🐾 Animali</span>}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '16px', borderTop: '1px solid #D8E4DB' }}>
                  <div>
                    <span style={{ fontSize: '24px', fontWeight: 400, color: '#1C2820' }}>€ {a.prezzo}</span>
                    <span style={{ fontSize: '12px', color: '#8FA897' }}> / notte</span>
                  </div>
                  <Link href={`/appartamento/${a.id}`} style={{ background: '#2D4A35', color: 'white', padding: '10px 20px', textDecoration: 'none', fontSize: '13px', borderRadius: '3px' }}>
                    Vedi dettagli →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#1C2820', padding: '40px', textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '13px' }}>
        <p>© 2026 FuoriPorta · Appartamenti a 20 minuti da Milano</p>
      </footer>

    </main>
  )
}