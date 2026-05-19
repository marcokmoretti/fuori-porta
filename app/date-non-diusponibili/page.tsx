import Link from 'next/link'

export default function DateNonDisponibili() {
  return (
    <main style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>❌ Date non disponibili</h1>
      <p>Le date selezionate si sovrappongono a una prenotazione esistente.</p>
      <p>Torna indietro e scegli date diverse.</p>
      <Link href="/" style={{ color: '#2D4A35', fontWeight: 'bold' }}>
        ← Torna alla home
      </Link>
    </main>
  )
}