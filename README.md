# ForkMaster

**Ethically forge your next big thing by building on the shoulders of giants.**

ForkMaster is a comprehensive Base Mini App that helps builders identify opportunities to ethically fork existing projects and build differentiated, valuable MiniApps on Base.

## Features

### 🔍 Niche Opportunity Finder
Analyzes popular or trending projects on Base and identifies underserved niches or potential improvements that haven't been fully explored.

### ⚖️ Ethical Forking Framework
Provides a step-by-step interactive guide and checklist for understanding licensing, attribution, and best practices when forking an existing project or idea.

### ✨ Value-Add Feature Generator
Suggests specific, data-driven feature enhancements or integrations that add significant value beyond the original project, tailored to the identified niche.

### 🧪 Rapid Differentiation Tester
Offers quick A/B testing prompts or template frames for Farcaster to gauge community interest in a proposed forked project's unique angle before significant development.

## Business Model

- **Micro-transactions**: Pay-per-analysis ($1 per project analysis)
- **Subscription**: Unlimited analyses for $10/month
- **Target**: Solo builders and small teams looking to validate ideas quickly

## Technical Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with shadcn/ui components
- **Language**: TypeScript
- **Deployment**: Base Mini App compatible

## API Integrations

- **Farcaster Hub/Graph API**: Project discovery and trending analysis
- **Base Contract Data**: On-chain activity and tokenomics analysis
- **OpenAI/Anthropic API**: Content generation and feature suggestions

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd forkmaster
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Add your API keys for Farcaster, Base, and OpenAI integrations.

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
forkmaster/
├── app/
│   ├── api/
│   │   ├── analyze/          # Project analysis endpoint
│   │   └── frame/            # Frame creation and management
│   ├── frame/[frameId]/      # Dynamic frame pages
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Main page
├── components/
│   ├── ui/                   # Reusable UI components
│   ├── AppShell.tsx          # Main layout component
│   ├── AnalysisCard.tsx      # Analysis results display
│   ├── NicheSuggestion.tsx   # Niche opportunity display
│   ├── EthicalChecklistItem.tsx # Ethical checklist items
│   └── FrameGenerator.tsx    # Frame creation interface
├── lib/
│   └── utils.ts              # Utility functions
└── types/
    └── index.ts              # TypeScript type definitions
```

## API Endpoints

### POST /api/analyze
Analyzes a Base project and returns niche opportunities, ethical considerations, feature suggestions, and differentiation tests.

**Request Body:**
```json
{
  "projectUrl": "https://example.com/project"
}
```

**Response:**
```json
{
  "niche": "Social DeFi Integration",
  "ethicalConsiderations": [...],
  "features": [...],
  "tests": [...]
}
```

### POST /api/frame
Creates a new Farcaster Frame for differentiation testing.

### GET /api/frame/[frameId]/image
Generates dynamic images for Farcaster Frames.

### POST /api/frame/[frameId]/response
Handles user interactions with Frames.

## Deployment

### Base Mini App Deployment
1. Build the application:
   ```bash
   npm run build
   ```

2. Deploy to your preferred hosting platform (Vercel, Netlify, etc.)

3. Configure environment variables for production

4. Set up Farcaster Frame metadata in your deployment

### Environment Variables
```env
# API Keys
FARCASTER_API_KEY=your_farcaster_api_key
BASE_API_KEY=your_base_api_key
OPENAI_API_KEY=your_openai_api_key

# Database (if using)
DATABASE_URL=your_database_url

# Other configuration
NEXT_PUBLIC_APP_URL=https://your-app-url.com
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For questions or support, please open an issue on GitHub or contact the development team.

---

**Built with ❤️ for the Base ecosystem**

