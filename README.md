# FPTU Survival Guide

A comprehensive web platform designed to help first-year students at FPT University Da Nang navigate their college experience. Built with Next.js, React, and AI-powered assistance.

## Features

### 🏠 Homepage & Navigation
- Modern, responsive landing page with hero section
- Quick access to all major sections
- Statistics showcasing community engagement
- Latest updates and news feed
- Beautiful gradient design with smooth animations

### 📚 Knowledge Base
Four comprehensive guides for first-year students:

1. **Vovinam Training Guide** (`/knowledge-base/vovinam`)
   - Introduction to Vietnamese martial art
   - Training schedules and locations
   - Basic techniques and drills
   - Belt ranking system
   - Success tips and FAQs

2. **Music & Arts Culture** (`/knowledge-base/music`)
   - Campus music clubs and organizations
   - Traditional Vietnamese instruments
   - Performance events and opportunities
   - Learning resources and contacts

3. **Military Training Program** (`/knowledge-base/military`)
   - Program overview and objectives
   - Physical fitness tests and standards
   - Military drills and formations
   - Uniforms and equipment guidelines
   - Rules and success tips

4. **Student Life & Campus** (`/knowledge-base/student-life`)
   - Housing and dormitory information
   - Dining options and budgeting
   - Transportation and campus map
   - Student clubs and activities
   - Money management tips

### 👥 Community Q&A Forum
- Browse and search community questions
- Filter by categories and tags
- View detailed question pages with answers
- Community voting system
- Post new questions with the form (`/community/new`)
- Community guidelines and best practices

### 🤖 AI Assistant (FPTU Assistant)
- Real-time conversational AI chatbot
- Intelligent responses about FPTU topics
- Suggested questions for new users
- Uses OpenAI's GPT-4o-mini model
- Professional system prompt trained for student support
- API route: `/api/chat`

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **UI Components**: shadcn/ui
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **AI Integration**: Vercel AI SDK 6
- **Fonts**: Geist and Geist Mono (Google Fonts)
- **Language**: TypeScript
- **Package Manager**: npm/pnpm

## Project Structure

```
/app
  ├── page.tsx              # Homepage
  ├── layout.tsx            # Root layout with metadata
  ├── globals.css           # Global styles & design tokens
  ├── knowledge-base/
  │   ├── page.tsx          # Knowledge base hub
  │   ├── vovinam/page.tsx  # Vovinam guide
  │   ├── music/page.tsx    # Music guide
  │   ├── military/page.tsx # Military training guide
  │   └── student-life/page.tsx # Student life guide
  ├── community/
  │   ├── page.tsx          # Community Q&A forum
  │   ├── new/page.tsx      # Create new question
  │   └── questions/[id]/page.tsx # Question detail
  ├── assistant/
  │   └── page.tsx          # AI Assistant chatbot
  └── api/
      └── chat/
          └── route.ts      # Chat API endpoint

/components
  ├── ui/                   # shadcn UI components
  │   ├── button.tsx
  │   ├── card.tsx
  │   └── ... (50+ other components)
  └── theme-provider.tsx

/public                      # Static assets

/styles/globals.css         # Tailwind imports

/lib/utils.ts              # Utility functions
```

## Getting Started

### Installation

1. Clone the repository or download the project
2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm run start
```

## Design System

### Color Palette
- **Primary**: Vibrant purple/blue (oklch(0.50 0.16 262))
- **Accent**: Lighter purple (oklch(0.55 0.16 260))
- **Background**: Clean white (oklch(0.98 0.001 209.4))
- **Dark Mode**: Deep navy (oklch(0.12 0.03 260))
- **Neutral**: Grays for text and borders

### Typography
- **Heading Font**: Geist (sans-serif)
- **Body Font**: Geist (sans-serif)
- **Monospace Font**: Geist Mono

### Spacing & Layout
- Uses Tailwind spacing scale (4px base unit)
- Flexbox-first layout approach
- Responsive design with mobile-first approach
- Max-width container: 7xl (80rem)

## AI Assistant Configuration

The FPTU Assistant uses a custom system prompt to provide helpful guidance:
- Trained on FPTU-specific information
- Covers all knowledge base topics
- Professional yet friendly tone
- Directs to campus offices for urgent matters

To customize AI responses, edit the `FPTU_SYSTEM_PROMPT` in `/app/api/chat/route.ts`.

## Features to Add (Future Enhancements)

1. **Database Integration**
   - Store questions, answers, and user data
   - Implement with Supabase or Neon

2. **User Authentication**
   - Student login system
   - User profiles and history
   - Voting on questions/answers

3. **Persistence Layer**
   - Save chat conversations
   - Cache community questions
   - Analytics and insights

4. **Rich Media Support**
   - Image uploads for questions/answers
   - Video tutorials
   - Embedded forms

5. **Advanced Features**
   - Full-text search
   - Topic recommendations
   - User reputation system
   - Email notifications

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect to Vercel
3. Environment variables are auto-configured
4. Deploy with one click

### Other Platforms
The app uses standard Next.js patterns and works with:
- Netlify
- AWS Amplify
- Docker containers

## Environment Variables

Currently uses Vercel AI Gateway (no additional setup needed). For custom LLM providers, add:
- `OPENAI_API_KEY` (if using OpenAI directly)
- Other provider keys as needed

## Contributing & Customization

### Adding a New Guide
1. Create folder in `/app/knowledge-base/[guide-name]/`
2. Create `page.tsx` with expandable sections
3. Add to the guides array in `/app/knowledge-base/page.tsx`

### Modifying Styles
- Edit design tokens in `/app/globals.css`
- Use Tailwind utility classes in components
- Follow the color system and typography

### Updating Content
All content is static in components. To connect to a database:
1. Create API routes in `/app/api/`
2. Fetch data from database
3. Update components to use dynamic content

## Performance Optimizations

- Server-side rendering where possible
- Image optimization with Next.js Image component
- CSS-in-JS with Tailwind for minimal bundle
- Code splitting with dynamic imports
- Responsive images for mobile

## Accessibility

- Semantic HTML elements (main, header, nav, footer)
- ARIA labels and roles where needed
- Screen reader friendly text
- Color contrast compliance
- Keyboard navigation support

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This project is created for FPT University. All content about FPTU should be verified with official sources.

## Support

For issues or questions:
1. Check the AI Assistant chatbot
2. Review the Community Q&A forum
3. Contact FPTU Student Services

---

**Made with care for first-year students at FPTU Da Nang** 🎓
