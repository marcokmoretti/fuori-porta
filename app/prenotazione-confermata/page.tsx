import Link from 'next/link'

export default function Confermata() {
  return (
    <main style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>🎉 Prenotazione confermata!</h1>
      <p>Grazie per aver prenotato. Riceverai una email di conferma a breve.</p>
      <Link href="/" style={{ color: '#2D4A35', fontWeight: 'bold' }}>
        ← Torna alla home
      </Link>
    </main>
  )
}