# Lost & Found AI System

A smart lost and found management system powered by AI matching algorithms. Perfect for college campuses, offices, and communities.

## Features

- **Report Lost Items**: Upload photos and details of lost items
- **Report Found Items**: Upload photos and details of found items
- **AI-Powered Matching**: Automatic matching based on:
  - Color similarity
  - Location proximity
  - Description matching
  - Date correlation
- **Match Scores**: See similarity scores (0-100%) for potential matches
- **Image Storage**: Secure cloud storage for item photos
- **Real-time Updates**: Instant notifications when matches are found

## Tech Stack

### Frontend
- React 18
- Vite (build tool)
- React Router (navigation)
- Modern CSS (responsive design)

### Backend
- Supabase Database (PostgreSQL)
- Supabase Storage (image uploads)
- Supabase Edge Functions (AI matching)

### AI Matching Algorithm
The system uses a multi-factor similarity algorithm that considers:
- **Color Match** (30 points): Exact or partial color matching
- **Location Match** (25 points): Same or similar locations
- **Title Similarity** (25 points): Text similarity in item names
- **Description Match** (20 points): Description text analysis
- **Date Proximity** (10 points): Items reported within similar timeframes

## Database Schema

### lost_items
- `id`: Unique identifier
- `title`: Item name
- `description`: Detailed description
- `image_url`: Photo URL
- `color`: Primary color
- `location`: Where lost
- `date_lost`: Date lost
- `contact_name`: Reporter name
- `contact_info`: Contact details
- `status`: active/found/closed

### found_items
- `id`: Unique identifier
- `title`: Item name
- `description`: Detailed description
- `image_url`: Photo URL
- `color`: Primary color
- `location`: Where found
- `date_found`: Date found
- `contact_name`: Reporter name
- `contact_info`: Contact details
- `status`: active/matched/returned

### matches
- `id`: Match identifier
- `lost_item_id`: Reference to lost item
- `found_item_id`: Reference to found item
- `similarity_score`: AI match score (0-100)
- `status`: pending/confirmed/rejected

## How to Use

### For Users

1. **Lost Something?**
   - Click "Report Lost Item"
   - Upload a photo (optional but recommended)
   - Fill in details: name, color, location, date
   - Add your contact information
   - Submit

2. **Found Something?**
   - Click "Report Found Item"
   - Upload a photo (optional but recommended)
   - Fill in details: name, color, location, date
   - Add your contact information
   - Submit

3. **Check Matches**
   - Visit the "Matches" page
   - See potential matches with similarity scores
   - High scores (70%+) are very likely matches
   - Contact information is displayed for coordination

### Match Score Interpretation

- **70-100%**: High confidence match - likely the same item
- **40-69%**: Medium confidence - worth investigating
- **30-39%**: Low confidence - possible match

## Project Structure

```
lost-and-found-ai/
├── src/
│   ├── pages/
│   │   ├── Home.jsx              # Landing page
│   │   ├── ReportLost.jsx        # Lost item form
│   │   ├── ReportFound.jsx       # Found item form
│   │   ├── LostItems.jsx         # Browse lost items
│   │   ├── FoundItems.jsx        # Browse found items
│   │   └── Matches.jsx           # View matches
│   ├── App.jsx                   # Main app component
│   ├── main.jsx                  # Entry point
│   ├── supabaseClient.js         # Supabase configuration
│   └── index.css                 # Global styles
├── supabase/
│   ├── functions/
│   │   └── find-matches/         # AI matching Edge Function
│   └── migrations/               # Database migrations
├── package.json
├── vite.config.js
└── index.html
```

## Future Enhancements

### Advanced AI Features
- **CLIP Image Similarity**: Use OpenAI's CLIP model for visual matching
- **Object Detection**: Automatically identify item categories
- **Color Detection**: AI-powered color recognition from images

### Additional Features
- User authentication
- Email/SMS notifications
- Search and filters
- Item categories
- Admin dashboard
- Mobile app (React Native)
- QR code generation for items
- Integration with campus security
- Statistics and analytics

## Why This Project Stands Out

1. **Real-World Problem**: Solves a common campus/community issue
2. **AI Integration**: Modern tech stack with practical AI application
3. **Full-Stack**: Demonstrates frontend, backend, and database skills
4. **Production-Ready**: Complete with image uploads, matching, and notifications
5. **Scalable**: Clean architecture ready for expansion
6. **Portfolio Showcase**: Perfect for demonstrating modern web development skills

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

The application is production-ready and can be deployed to:
- Vercel (recommended for frontend)
- Netlify
- Railway
- Any platform supporting Node.js

Supabase provides the backend infrastructure with automatic scaling.

## License

MIT

## Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

---

Built with React, Supabase, and AI
