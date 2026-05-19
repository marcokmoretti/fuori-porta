import { supabase } from '../supabase'

export default async function Admin() {
  const { data: prenotazioni, error } = await supabase
    .from('prenotazioni')
    .select(`
      *,
      appartamenti (nome, prezzo)
    `)
    .order('created_at', { ascending: false })

  if (error) return <p>Errore: {error.message}</p>

  return (
    <main style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>Admin · Prenotazioni ricevute</h1>
      <p>{prenotazioni.length} prenotazioni totali</p>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '24px' }}>
        <thead>
          <tr style={{ background: '#2D4A35', color: 'white' }}>
            <th style={th}>ID</th>
            <th style={th}>Appartamento</th>
            <th style={th}>Ospite</th>
            <th style={th}>Email</th>
            <th style={th}>Check-in</th>
            <th style={th}>Check-out</th>
            <th style={th}>Stato</th>
            <th style={th}>Totale</th>
          </tr>
        </thead>
        <tbody>
          {prenotazioni.map(p => (
            <tr key={p.id} style={{ borderBottom: '1px solid #ccc' }}>
              <td style={td}>{p.id}</td>
              <td style={td}>{p.appartamenti?.nome}</td>
              <td style={td}>{p.nome_ospite}</td>
              <td style={td}>{p.email_ospite}</td>
              <td style={td}>{p.check_in}</td>
              <td style={td}>{p.check_out}</td>
              <td style={td}>{p.stato}</td>
              <td style={td}>{p.totale ? `€ ${p.totale}` : '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}

const th = { padding: '12px 16px', textAlign: 'left' as const }
const td = { padding: '12px 16px' }