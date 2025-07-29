# ShitPost AI-Powered Platform

## Overview

This is a full-stack TypeScript application built with React on the frontend and Express.js on the backend. The platform provides AI-powered career services including resume submission, developer hiring applications, and AI-powered career insights. The application uses a modern tech stack with shadcn/ui components, TanStack Query for state management, and Drizzle ORM for database operations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for development and build processes
- **Routing**: Wouter for client-side routing
- **UI Components**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state management
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API endpoints under `/api` prefix
- **File Uploads**: Multer middleware for handling resume file uploads
- **Error Handling**: Centralized error handling middleware
- **Development**: Hot reload with Vite integration in development mode

### Database Architecture
- **ORM**: Drizzle ORM for type-safe database operations
- **Database**: PostgreSQL (configured for Neon Database)
- **Schema**: Located in `shared/schema.ts` with Zod validation schemas
- **Migrations**: Drizzle Kit for database migrations in `migrations/` directory

## Key Components

### Core Data Models
1. **Users**: Basic user authentication system
2. **Resumes**: Job seeker resume submissions with file upload
3. **Developer Applications**: Developer job applications with queue system
4. **AI Queries**: AI-powered career advice and insights

### ShitPost AI Features
- **Subscription Tiers**: Basic ($14.99), Pro ($24.99), Ultra ($34.99)
- **Content Creation**: Video clipping, caption generation, 3D content creation
- **Analytics**: Algorithm breakdowns for TikTok, Instagram, YouTube
- **Tools**: Script writing, thumbnail assistance, online video editor
- **Limits**: Basic (50hrs), Pro (75hrs), Ultra (unlimited) monthly footage

### API Endpoints
- `POST /api/resumes` - Resume submission with file upload
- `POST /api/developer-applications` - Developer job application submission
- `POST /api/ai-queries` - AI query processing
- `GET /api/*` - Various GET endpoints for data retrieval

### Frontend Pages
1. **Home** (`/`) - Landing page with hero section and feature cards, now links to ShitPost AI
2. **About Us** (`/about`) - Company information, mission, values, and team (Founded in 2025 by 4 friends: Helmi, Laith, Bader, Mohammed)
3. **ShitPost AI** (`/shitpost-ai`) - Main AI product page with subscription tiers and features
4. **AI Tool** (`/ai-tool`) - AI-powered career insights interface (renamed to Career AI)
5. **Get Employed** (`/get-employed`) - Resume submission form
6. **Developer Hiring** (`/developer-hiring`) - Developer application form
7. **404 Page** - Not found error page

### Storage System
- **Interface**: `IStorage` abstraction for data operations
- **Implementation**: `DatabaseStorage` using PostgreSQL with Drizzle ORM
- **Database**: PostgreSQL database with tables for users, resumes, developer applications, and AI queries
- **Connection**: Neon Database with connection pooling

## Data Flow

1. **Client Requests**: Frontend makes API calls using TanStack Query
2. **API Processing**: Express server handles requests with appropriate middleware
3. **Data Validation**: Zod schemas validate input data
4. **Storage Operations**: Drizzle ORM manages database interactions
5. **Response Handling**: Standardized JSON responses with error handling
6. **Client Updates**: TanStack Query manages cache updates and UI state

## External Dependencies

### UI and Styling
- **Radix UI**: Primitive components for accessibility
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **Class Variance Authority**: Utility for managing component variants

### Development Tools
- **Vite**: Build tool and development server
- **TypeScript**: Type safety and developer experience
- **ESBuild**: Fast JavaScript bundler for production
- **PostCSS**: CSS processing with Autoprefixer

### Database and Validation
- **Drizzle ORM**: Type-safe database toolkit
- **Zod**: Schema validation library
- **Neon Database**: Serverless PostgreSQL provider

### File Handling
- **Multer**: Express middleware for file uploads
- **File Validation**: PDF, DOC, DOCX support with 5MB limit

## Deployment Strategy

### Development Environment
- **Port Configuration**: Server runs on configurable port
- **Hot Reload**: Vite provides instant feedback during development
- **Error Overlay**: Runtime error modal for debugging
- **Logging**: Request/response logging for API endpoints

### Production Build
- **Frontend**: Vite builds optimized static assets to `dist/public`
- **Backend**: ESBuild bundles server code to `dist/index.js`
- **Static Serving**: Express serves built frontend in production
- **Environment Variables**: Database URL and other config via environment

### Database Management
- **Schema Deployment**: `drizzle-kit push` for schema updates
- **Migration System**: Organized migration files in `migrations/` directory
- **Connection Pooling**: Configured for production database connections

### File Upload Strategy
- **Memory Storage**: Files stored in memory during processing
- **Size Limits**: 5MB maximum file size
- **Type Validation**: Restricted to document formats (PDF, DOC, DOCX)
- **Error Handling**: Comprehensive file upload error management