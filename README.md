# EmailOutreach Pro - AI-Powered Cold Email SaaS

A full-stack SaaS application for cold email outreach and automation, similar to Instantly.ai. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

### ✅ Implemented
- **User Authentication**: Email/password login and registration
- **Dashboard**: Overview of campaigns, contacts, and performance metrics
- **Email Account Integration**: Connect Gmail, Outlook, and SMTP accounts
- **Campaign Builder**: Create multi-step email sequences with AI assistance
- **Contact Management**: Import, manage, and segment contacts
- **Analytics Dashboard**: Track opens, clicks, replies, and performance
- **Email Warmup Engine**: Automated inbox warming for better deliverability
- **Automation Rules**: Reply detection, bounce handling, and smart logic
- **AI Integration**: Generate email content and subject lines

### 🔧 Tech Stack
- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Charts**: Chart.js with React wrapper
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Authentication**: JWT tokens
- **AI**: OpenAI GPT-4 API integration
- **Database**: Mock data (easily replaceable with PostgreSQL/Prisma)

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Optional: PostgreSQL database
- Optional: OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd email-outreach-saas
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` with your configuration:
   ```env
   # Database (Optional - currently using mock data)
   DATABASE_URL="postgresql://username:password@localhost:5432/email_outreach_db"

   # Authentication
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"

   # OpenAI (Optional - will use demo mode if not provided)
   OPENAI_API_KEY="your-openai-api-key"

   # Email Configuration (Optional)
   SMTP_HOST="smtp.gmail.com"
   SMTP_PORT=587
   SMTP_USER="your-email@gmail.com"
   SMTP_PASS="your-app-password"
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Demo Credentials

For testing, you can use these demo credentials:

- **Email**: admin@example.com
- **Password**: password

Or:

- **Email**: demo@example.com  
- **Password**: password

## Key Features Walkthrough

### 1. Authentication
- Sign up with email/password
- Login with existing credentials
- JWT-based authentication

### 2. Dashboard
- Overview of campaign performance
- Email volume charts
- Recent campaign activity
- Quick stats and metrics

### 3. Campaign Builder
- Multi-step email sequences
- AI-powered content generation
- A/B testing capabilities
- Personalization variables
- Scheduling and automation

### 4. Email Accounts
- Connect Gmail via OAuth (demo mode)
- Connect Outlook via OAuth (demo mode)
- Manual SMTP/IMAP configuration
- Warmup status monitoring
- Deliverability tracking

### 5. Contact Management
- Import contacts from CSV/Excel
- Contact segmentation
- Status tracking (active, replied, bounced, unsubscribed)
- Bulk actions
- Custom fields support

### 6. Analytics
- Campaign performance metrics
- Email volume trends
- Response type breakdown
- Deliverability insights
- Exportable reports

### 7. Automation & Warmup
- Email warmup engine
- Reply detection rules
- Bounce handling
- Unsubscribe processing
- Custom automation rules

## API Structure

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### AI Integration
- `POST /api/ai/generate-email` - Generate email content with AI

### Data Models (Mock)
- Users, Campaigns, Contacts, Email Accounts
- Campaign sequences and automation rules
- Performance metrics and analytics

## Customization

### Adding Real Database
1. Install Prisma: `npm install prisma @prisma/client`
2. Create `prisma/schema.prisma` with your models
3. Replace mock data with Prisma queries
4. Run migrations: `npx prisma migrate dev`

### Email Provider Integration
1. Add OAuth providers in `next-auth` configuration
2. Implement SMTP/IMAP connections with `nodemailer`
3. Add email sending queue with Redis/Bull
4. Implement webhook handlers for email events

### AI Enhancement
1. Add OpenAI API key to environment
2. Customize prompts in `/api/ai/generate-email`
3. Add more AI features (tone analysis, reply classification)

### Production Deployment
1. Set up PostgreSQL database
2. Configure environment variables
3. Add rate limiting and security headers
4. Set up monitoring and logging
5. Deploy to Vercel, AWS, or your preferred platform

## File Structure

```
src/
├── app/
│   ├── auth/                 # Authentication pages
│   ├── dashboard/            # Main application
│   │   ├── campaigns/        # Campaign management
│   │   ├── contacts/         # Contact management
│   │   ├── email-accounts/   # Email account integration
│   │   ├── analytics/        # Analytics dashboard
│   │   └── automation/       # Automation & warmup
│   ├── api/                  # API routes
│   └── globals.css           # Global styles
├── components/               # Reusable components (if needed)
└── lib/                      # Utility functions (if needed)
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Review the code comments for implementation details

## Roadmap

- [ ] Real database integration (PostgreSQL + Prisma)
- [ ] Email provider OAuth flows
- [ ] Advanced AI features
- [ ] Team collaboration features
- [ ] Webhook integrations
- [ ] Advanced analytics and reporting
- [ ] Mobile responsive improvements
- [ ] API documentation
- [ ] Unit and integration tests