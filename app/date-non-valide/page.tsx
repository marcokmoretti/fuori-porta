import Link from 'next/link'

export default function DateNonValide() {
  return (
    <main style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>❌ Date non valide</h1>
      <p>La data di check-out deve essere successiva alla data di check-in.</p>
      <Link href="/" style={{ color: '#2D4A35', fontWeight: 'bold' }}>
        ← Torna alla home
      </Link>
    </main>
  )
}