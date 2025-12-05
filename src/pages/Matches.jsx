import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

function Matches() {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMatches()
  }, [])

  const fetchMatches = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('matches')
      .select(`
        *,
        lost_items(*),
        found_items(*)
      `)
      .order('similarity_score', { ascending: false })

    if (!error) {
      setMatches(data)
    }
    setLoading(false)
  }

  const getScoreClass = (score) => {
    if (score >= 70) return 'high'
    if (score >= 40) return 'medium'
    return 'low'
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (loading) {
    return <div className="loading">Loading matches...</div>
  }

  return (
    <div>
      <h2 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '32px' }}>
        Potential Matches
      </h2>

      {matches.length === 0 ? (
        <div className="empty-state">
          <h3>No Matches Yet</h3>
          <p>Matches will appear here when items are reported</p>
        </div>
      ) : (
        <div>
          {matches.map(match => (
            <div key={match.id} className="card" style={{ marginBottom: '24px' }}>
              <div className={`match-score ${getScoreClass(match.similarity_score)}`}>
                Match Score: {Math.round(match.similarity_score)}%
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginTop: '24px' }}>
                <div>
                  <h4 style={{ marginBottom: '16px', color: 'var(--primary)' }}>Lost Item</h4>
                  {match.lost_items.image_url && (
                    <img
                      src={match.lost_items.image_url}
                      alt={match.lost_items.title}
                      style={{ width: '100%', borderRadius: '8px', marginBottom: '16px' }}
                    />
                  )}
                  <h5 style={{ fontSize: '18px', marginBottom: '8px' }}>{match.lost_items.title}</h5>
                  <p style={{ color: 'var(--text-light)', marginBottom: '12px' }}>
                    {match.lost_items.description}
                  </p>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
                    <span className="badge badge-color">{match.lost_items.color}</span>
                    <span className="badge badge-location">{match.lost_items.location}</span>
                    <span className="badge badge-date">{formatDate(match.lost_items.date_lost)}</span>
                  </div>
                  <div style={{ fontSize: '14px', color: 'var(--text-light)' }}>
                    <strong>Contact:</strong> {match.lost_items.contact_name}<br />
                    <strong>Info:</strong> {match.lost_items.contact_info}
                  </div>
                </div>

                <div>
                  <h4 style={{ marginBottom: '16px', color: 'var(--secondary)' }}>Found Item</h4>
                  {match.found_items.image_url && (
                    <img
                      src={match.found_items.image_url}
                      alt={match.found_items.title}
                      style={{ width: '100%', borderRadius: '8px', marginBottom: '16px' }}
                    />
                  )}
                  <h5 style={{ fontSize: '18px', marginBottom: '8px' }}>{match.found_items.title}</h5>
                  <p style={{ color: 'var(--text-light)', marginBottom: '12px' }}>
                    {match.found_items.description}
                  </p>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '12px' }}>
                    <span className="badge badge-color">{match.found_items.color}</span>
                    <span className="badge badge-location">{match.found_items.location}</span>
                    <span className="badge badge-date">{formatDate(match.found_items.date_found)}</span>
                  </div>
                  <div style={{ fontSize: '14px', color: 'var(--text-light)' }}>
                    <strong>Contact:</strong> {match.found_items.contact_name}<br />
                    <strong>Info:</strong> {match.found_items.contact_info}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Matches
