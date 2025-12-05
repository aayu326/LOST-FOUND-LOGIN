import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { supabase } from '../supabaseClient'

function Home() {
  const [stats, setStats] = useState({
    lostItems: 0,
    foundItems: 0,
    matches: 0
  })

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    const { data: lostItems } = await supabase
      .from('lost_items')
      .select('id', { count: 'exact', head: true })

    const { data: foundItems } = await supabase
      .from('found_items')
      .select('id', { count: 'exact', head: true })

    const { data: matches } = await supabase
      .from('matches')
      .select('id', { count: 'exact', head: true })

    setStats({
      lostItems: lostItems?.length || 0,
      foundItems: foundItems?.length || 0,
      matches: matches?.length || 0
    })
  }

  return (
    <div>
      <div className="hero">
        <h2>Lost Something? Found Something?</h2>
        <p>AI-powered system to reunite lost items with their owners</p>
        <div className="cta-buttons">
          <Link to="/report-lost" className="btn btn-primary">Report Lost Item</Link>
          <Link to="/report-found" className="btn btn-secondary">Report Found Item</Link>
          <Link to="/matches" className="btn btn-outline">View Matches</Link>
        </div>
      </div>

      <div className="grid">
        <div className="card" style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '48px', color: 'var(--primary)', marginBottom: '8px' }}>
            {stats.lostItems}
          </h3>
          <p style={{ fontSize: '18px', color: 'var(--text-light)' }}>Lost Items Reported</p>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '48px', color: 'var(--secondary)', marginBottom: '8px' }}>
            {stats.foundItems}
          </h3>
          <p style={{ fontSize: '18px', color: 'var(--text-light)' }}>Found Items Reported</p>
        </div>

        <div className="card" style={{ textAlign: 'center' }}>
          <h3 style={{ fontSize: '48px', color: 'var(--accent)', marginBottom: '8px' }}>
            {stats.matches}
          </h3>
          <p style={{ fontSize: '18px', color: 'var(--text-light)' }}>Potential Matches</p>
        </div>
      </div>

      <div style={{ marginTop: '64px' }}>
        <h3 style={{ textAlign: 'center', marginBottom: '32px', fontSize: '32px' }}>How It Works</h3>
        <div className="grid">
          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📷</div>
            <h4 style={{ marginBottom: '8px' }}>Upload Photo</h4>
            <p style={{ color: 'var(--text-light)' }}>
              Take a clear photo of the lost or found item
            </p>
          </div>

          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🤖</div>
            <h4 style={{ marginBottom: '8px' }}>AI Matching</h4>
            <p style={{ color: 'var(--text-light)' }}>
              Our AI analyzes images and details to find matches
            </p>
          </div>

          <div className="card" style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>🔔</div>
            <h4 style={{ marginBottom: '8px' }}>Get Notified</h4>
            <p style={{ color: 'var(--text-light)' }}>
              View potential matches with similarity scores
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
