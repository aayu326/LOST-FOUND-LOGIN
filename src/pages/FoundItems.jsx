import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import TermsModal from '../components/TermsModal';
import { Link } from 'react-router-dom';

function FoundItems() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('found_items')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error) {
      setItems(data);
    }
    setLoading(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return <div className="loading">Loading found items...</div>;
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h2 style={{ fontSize: '32px', fontWeight: '700' }}>Found Items</h2>
        <Link to="/report-found" className="btn btn-secondary">Report Found Item</Link>
      </div>

      {items.length === 0 ? (
        <div className="empty-state">
          <h3>No Found Items Yet</h3>
          <p>Be the first to report a found item</p>
          <Link to="/report-found" className="btn btn-secondary" style={{ marginTop: '16px' }}>
            Report Found Item
          </Link>
        </div>
      ) : (
        <div className="grid">
          {items.map(item => (
            <div key={item.id} className="item-card">
              {item.image_url ? (
                <img src={item.image_url} alt={item.title} />
              ) : (
                <div style={{
                  width: '100%',
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
                <p>{item.description}</p>
                <div className="item-meta">
                  <span className="badge badge-color">{item.color}</span>
                  <span className="badge badge-location">{item.location}</span>
                  <span className="badge badge-date">{formatDate(item.date_found)}</span>
                </div>
                <div style={{ marginTop: '12px', fontSize: '14px', color: 'var(--text-light)' }}>
                  <strong>Contact:</strong> {item.contact_name}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ✅ Terms Modal */}
      <TermsModal 
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        onAccept={() => setAgreedToTerms(true)}
      />
    </div>
  );
}

export default FoundItems;