import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useState } from 'react'

function Navbar() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [showDropdown, setShowDropdown] = useState(false)

  const handleLogout = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <div className="container" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        padding: '0 20px'
      }}>
        <Link to="/dashboard" className="logo">
          🔍 Lost & Found AI
        </Link>
        
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/lost">Lost Items</Link>
          <Link to="/found">Found Items</Link>
          <Link to="/matches">Matches</Link>
          
          {/* User Profile Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '20px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              👤 {user?.user_metadata?.full_name || 'User'}
            </button>
            
            {showDropdown && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                marginTop: '8px',
                background: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                minWidth: '200px',
                zIndex: 1000
              }}>
                <div style={{
                  padding: '12px 16px',
                  borderBottom: '1px solid #e2e8f0'
                }}>
                  <div style={{ fontWeight: '600', fontSize: '14px', marginBottom: '4px' }}>
                    {user?.user_metadata?.full_name || 'User'}
                  </div>
                  <div style={{ fontSize: '12px', color: '#718096' }}>
                    {user?.email}
                  </div>
                </div>
                
                <Link
                  to="/dashboard"
                  onClick={() => setShowDropdown(false)}
                  style={{
                    display: 'block',
                    padding: '12px 16px',
                    color: '#2d3748',
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#f7fafc'}
                  onMouseLeave={(e) => e.target.style.background = 'transparent'}
                >
                  📊 Dashboard
                </Link>
                
                <Link
                  to="/report-lost"
                  onClick={() => setShowDropdown(false)}
                  style={{
                    display: 'block',
                    padding: '12px 16px',
                    color: '#2d3748',
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#f7fafc'}
                  onMouseLeave={(e) => e.target.style.background = 'transparent'}
                >
                  📱 Report Lost
                </Link>
                
                <Link
                  to="/report-found"
                  onClick={() => setShowDropdown(false)}
                  style={{
                    display: 'block',
                    padding: '12px 16px',
                    color: '#2d3748',
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.background = '#f7fafc'}
                  onMouseLeave={(e) => e.target.style.background = 'transparent'}
                >
                  🎁 Report Found
                </Link>
                
                <div style={{ borderTop: '1px solid #e2e8f0' }}>
                  <button
                    onClick={handleLogout}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: 'transparent',
                      border: 'none',
                      color: '#e53e3e',
                      textAlign: 'left',
                      fontSize: '14px',
                      cursor: 'pointer',
                      transition: 'background 0.2s'
                    }}
                    onMouseEnter={(e) => e.target.style.background = '#fff5f5'}
                    onMouseLeave={(e) => e.target.style.background = 'transparent'}
                  >
                    🚪 Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar