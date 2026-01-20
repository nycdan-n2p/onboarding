# Net2Phone Agent Onboarding Flow

A complete onboarding simulation for Net2Phone Agent that guides users through registration, email verification, work type selection, integration setup, and finally introduces them to the AI agent chat interface.

## Features

- **Homepage**: Modern landing page with hero section and CTA
- **Registration**: Collect user name, company, and email
- **Email Verification**: 6-digit token verification system
- **Work Type Selection**: 12 different work categories to choose from
- **Integration Selection**: Connect multiple apps (Gmail, Slack, Notion, etc.)
- **Integration Modal**: Secure connection flow with privacy information
- **Chat Interface**: AI agent welcome and guidance system

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Build

```bash
npm run build
```

## Flow Overview

1. **Homepage** (`/`) - Landing page with product information
2. **Registration** (`/register`) - User information collection
3. **Email Verification** (`/verify-email`) - Token-based email verification
4. **Work Type Selection** (`/work-type`) - Select profession/work type
5. **Integration Selection** (`/integrations`) - Connect workspace apps
6. **Chat Interface** (`/chat`) - AI agent welcome and interaction

## Tech Stack

- React 18
- React Router DOM
- Vite
- Lucide React (Icons)
- CSS3 with modern styling

## Features in Detail

### Token System
- Users receive 10,000 trial tokens upon registration
- Token count displayed in chat interface

### Integration System
- 12 pre-configured integrations available
- Modal-based connection flow
- Visual feedback for connected apps
- Multiple integrations can be connected

### AI Agent
- Personalized welcome message
- Context-aware responses
- Integration count awareness
- Guided next steps

## Notes

- Email verification tokens are stored in localStorage for demo purposes
- Integration connections are simulated (no actual API calls)
- All user data is stored in React Context (not persisted to backend)
