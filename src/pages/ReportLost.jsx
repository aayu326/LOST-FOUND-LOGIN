import TermsModal from '../components/TermsModal';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../supabaseClient'

function ReportLost() {
  const [agreedToTerms, setAgreedToTerms] = useState(false);
const [showTermsModal, setShowTermsModal] = useState(false);
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    color: '',
    location: '',
    date_lost: '',
    contact_name: '',
    contact_info: '',
    image: null
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData(prev => ({ ...prev, image: file }))
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const uploadImage = async (file) => {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random()}.${fileExt}`
    const filePath = `${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('item-images')
      .upload(filePath, file)

    if (uploadError) throw uploadError

    const { data: { publicUrl } } = supabase.storage
      .from('item-images')
      .getPublicUrl(filePath)

    return publicUrl
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      let imageUrl = null
      if (formData.image) {
        imageUrl = await uploadImage(formData.image)
      }

      const { data, error: insertError } = await supabase
        .from('lost_items')
        .insert([{
          title: formData.title,
          description: formData.description,
          color: formData.color,
          location: formData.location,
          date_lost: formData.date_lost,
          contact_name: formData.contact_name,
          contact_info: formData.contact_info,
          image_url: imageUrl
        }])
        .select()

      if (insertError) throw insertError

      if (data && data[0]) {
        await checkForMatches(data[0].id, imageUrl)
      }

      navigate('/lost')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const checkForMatches = async (lostItemId, lostImageUrl) => {
    try {
      const apiUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/find-matches`
      const headers = {
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      }

      await fetch(apiUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          item_id: lostItemId,
          item_type: 'lost',
          image_url: lostImageUrl
        })
      })
    } catch (err) {
      console.error('Error checking for matches:', err)
    }
  }

  return (
    <div>
      <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h3>Report Lost Item</h3>

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Item Name *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Black Wallet"
              required
            />
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the item in detail..."
              required
            />
          </div>

          <div className="form-group">
            <label>Upload Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Preview" />
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Color *</label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleChange}
              placeholder="e.g., Black"
              required
            />
          </div>

          <div className="form-group">
            <label>Where was it lost? *</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g., Library Building"
              required
            />
          </div>

          <div className="form-group">
            <label>Date Lost *</label>
            <input
              type="date"
              name="date_lost"
              value={formData.date_lost}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Your Name *</label>
            <input
              type="text"
              name="contact_name"
              value={formData.contact_name}
              onChange={handleChange}
              placeholder="Your full name"
              required
            />
          </div>

          <div className="form-group">
            <label>Contact Info *</label>
            <input
              type="text"
              name="contact_info"
              value={formData.contact_info}
              onChange={handleChange}
              placeholder="Email or phone number"
              required
            />
          </div>
          {/* Terms Checkbox */}
<div className="form-group" style={{
  background: '#f7fafc',
  padding: '15px',
  borderRadius: '8px',
  marginBottom: '20px'
}}>
  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
    <input
      type="checkbox"
      checked={agreedToTerms}
      onChange={(e) => setAgreedToTerms(e.target.checked)}
      required
      style={{ marginTop: '3px', cursor: 'pointer' }}
    />
    <span style={{ fontSize: '14px' }}>
      I agree to the{' '}
      <button
        type="button"
        onClick={() => setShowTermsModal(true)}
        style={{
          color: '#667eea',
          textDecoration: 'underline',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontWeight: '600'
        }}
      >
 Terms and Conditions
      </button>
      {' '}and confirm that I will not upload illegal or inappropriate content. *
    </span>
  </label>
</div>


{/* Terms Modal */}
<TermsModal 
  isOpen={showTermsModal}
  onClose={() => setShowTermsModal(false)}
  onAccept={() => setAgreedToTerms(true)}
/>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
            style={{ width: '100%' }}
          >
            {loading ? 'Submitting...' : 'Submit Lost Item Report'}
          </button>
        </form>
      </div>
    </div>
  )
}
export default ReportLost
