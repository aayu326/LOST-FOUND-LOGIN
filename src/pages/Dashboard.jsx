import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';

function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    lostItems: 0,
    foundItems: 0,
    matches: 0
  });
  const [myLostItems, setMyLostItems] = useState([]);
  const [myFoundItems, setMyFoundItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, [user]);

  const fetchUserData = async () => {
    setLoading(true);

    // Fetch user's lost items
    const { data: lostData } = await supabase
      .from('lost_items')
      .select('*')
      .eq('contact_info', user.email)
      .order('created_at', { ascending: false });

    // Fetch user's found items
    const { data: foundData } = await supabase
      .from('found_items')
      .select('*')
      .eq('contact_info', user.email)
      .order('created_at', { ascending: false });

    setMyLostItems(lostData || []);
    setMyFoundItems(foundData || []);
    
    setStats({
      lostItems: lostData?.length || 0,
      foundItems: foundData?.length || 0,
      matches: 0 // You can calculate this based on your matches table
    });

    setLoading(false);
  };

  if (loading) {
    return <div style={{ padding: '40px', textAlign: 'center' }}>Loading dashboard...</div>;
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '8px' }}>
          Welcome back, {user.user_metadata?.full_name || 'User'}! 👋
        </h1>
        <p style={{ color: '#718096' }}>{user.email}</p>
      </div>

      {/* Stats Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        marginBottom: '40px'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '24px',
          borderRadius: '12px',
          color: 'white'
        }}>
          <div style={{ fontSize: '36px', fontWeight: '700', marginBottom: '8px' }}>
            {stats.lostItems}
          </div>
          <div style={{ fontSize: '16px', opacity: 0.9 }}>Lost Items Reported</div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          padding: '24px',
          borderRadius: '12px',
          color: 'white'
        }}>
          <div style={{ fontSize: '36px', fontWeight: '700', marginBottom: '8px' }}>
            {stats.foundItems}
          </div>
          <div style={{ fontSize: '16px', opacity: 0.9 }}>Found Items Reported</div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
          padding: '24px',
          borderRadius: '12px',
          color: 'white'
        }}>
          <div style={{ fontSize: '36px', fontWeight: '700', marginBottom: '8px' }}>
            {stats.matches}
          </div>
          <div style={{ fontSize: '16px', opacity: 0.9 }}>Potential Matches</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '40px'
      }}>
        <Link to="/report-lost" className="btn btn-primary" style={{
          padding: '16px',
          textAlign: 'center',
          textDecoration: 'none'
        }}>
          📱 Report Lost Item
        </Link>
        <Link to="/report-found" className="btn btn-secondary" style={{
          padding: '16px',
          textAlign: 'center',
          textDecoration: 'none'
        }}>
          🎁 Report Found Item
        </Link>
        <Link to="/matches" className="btn" style={{
          padding: '16px',
          textAlign: 'center',
          textDecoration: 'none',
          background: '#f59e0b',
          color: 'white'
        }}>
          🔍 View Matches
        </Link>
      </div>

      {/* My Items */}
      <div>
        <h2 style={{ fontSize: '24px', marginBottom: '20px' }}>My Recent Items</h2>
        
        {myLostItems.length === 0 && myFoundItems.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '40px',
            background: '#f7fafc',
            borderRadius: '12px'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📦</div>
            <p style={{ color: '#718096' }}>You haven't reported any items yet</p>
          </div>
        ) : (
          <>
            {myLostItems.length > 0 && (
              <div style={{ marginBottom: '32px' }}>
                <h3 style={{ fontSize: '18px', marginBottom: '16px', color: '#667eea' }}>
                  My Lost Items ({myLostItems.length})
                </h3>
                <div className="grid">
                  {myLostItems.slice(0, 3).map(item => (
                    <div key={item.id} className="item-card">
                      {item.image_url ? (
                        <img src={item.image_url} alt={item.title} />
                      ) : (
                        <div style={{
                          height: '200px',
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '48px'
                        }}>
                          📱
                        </div>
                      )}
                      <div className="item-card-content">
                        <h4>{item.title}</h4>
                        <p>{item.description.substring(0, 100)}...</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {myFoundItems.length > 0 && (
              <div>
                <h3 style={{ fontSize: '18px', marginBottom: '16px', color: '#10b981' }}>
                  My Found Items ({myFoundItems.length})
                </h3>
                <div className="grid">
                  {myFoundItems.slice(0, 3).map(item => (
                    <div key={item.id} className="item-card">
                      {item.image_url ? (
                        <img src={item.image_url} alt={item.title} />
                      ) : (
                        <div style={{
                          height: '200px',
                          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '48px'
                        }}>
                          🎁
                        </div>
                      )}
                      <div className="item-card-content">
                        <h4>{item.title}</h4>
                        <p>{item.description.substring(0, 100)}...</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;