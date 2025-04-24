# 🍽️ SnapDish AI

**SnapDish AI** is an innovative AI-powered web application that transforms the way users interact with food. By leveraging advanced computer vision and AI technologies, SnapDish AI allows users to identify dishes from images and discover detailed recipes, making cooking more accessible and enjoyable for everyone.

![SnapDish AI Banner](./public/images/snapdish-banner.png)

## 📌 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [Key Components](#key-components)
- [AI Integration](#ai-integration)
- [Environment Variables](#environment-variables)
- [Development Roadmap](#development-roadmap)
- [Milestones](#milestones)
- [Contributing](#contributing)
- [License](#license)

## 🚀 Features

- **AI-Powered Dish Recognition**: Upload or capture images of dishes, and the AI identifies them to suggest relevant recipes.
- **Multi-Model AI Processing**: Uses a cascade of AI models (Gemini, TensorFlow.js, YOLO) for accurate food recognition.
- **Detailed Recipe Generation**: Get comprehensive recipes with ingredients, step-by-step instructions, and cooking tips.
- **User Authentication**: Secure login and registration system using Supabase authentication.
- **Recipe Saving**: Save favorite recipes to your profile for easy access later.
- **Responsive Design**: User-friendly interface built with Next.js and Tailwind CSS that works on all devices.
- **Dark/Light Mode**: Toggle between dark and light themes for comfortable viewing in any environment.

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TailwindCSS, shadcn/ui
- **Backend**: Next.js Server Components and Server Actions
- **Authentication**: Supabase Auth
- **Database**: Supabase PostgreSQL
- **Storage**: Supabase Storage
- **AI & Machine Learning**:
  - Google Gemini Pro Vision API for primary image recognition
  - TensorFlow.js for fallback image recognition
  - YOLO for object detection as a second fallback
- **Deployment**: Vercel

## ⚙️ Getting Started

### Prerequisites
- Node.js >= 18.x
- npm or yarn
- Supabase account
- Google Gemini API key (for AI image recognition)

### Installation

1. **Clone the repository**:

   \`\`\`bash
   git clone https://github.com/yourusername/snapdish-ai.git
   cd snapdish-ai
   \`\`\`

2. **Install dependencies**:

   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Set up environment variables**:

   Create a `.env.local` file in the root directory and add your credentials:

   \`\`\`env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

   # AI API Keys
   GEMINI_API_KEY=your_gemini_api_key
   
   # Application Settings
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   \`\`\`

4. **Set up the database**:

   Run the SQL setup script in your Supabase SQL editor to create the necessary tables:

   \`\`\`sql
   -- Create profiles table if it doesn't exist
   CREATE TABLE IF NOT EXISTS profiles (
     id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
     username TEXT UNIQUE,
     full_name TEXT,
     avatar_url TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Create recipes table if it doesn't exist
   CREATE TABLE IF NOT EXISTS recipes (
     id TEXT PRIMARY KEY,
     name TEXT NOT NULL,
     description TEXT,
     image_url TEXT,
     ingredients JSONB NOT NULL,
     instructions JSONB NOT NULL,
     cooking_time TEXT,
     difficulty TEXT,
     servings INTEGER,
     cuisine TEXT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );

   -- Create user_recipes table if it doesn't exist
   CREATE TABLE IF NOT EXISTS user_recipes (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
     recipe_id TEXT NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     UNIQUE(user_id, recipe_id)
   );

   -- Create dish_identifications table if it doesn't exist
   CREATE TABLE IF NOT EXISTS dish_identifications (
     id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
     user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
     image_url TEXT,
     identified_dish TEXT,
     recipe_id TEXT REFERENCES recipes(id) ON DELETE SET NULL,
     confidence_score FLOAT,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   \`\`\`

5. **Run the development server**:

   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

   Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

\`\`\`bash
├── app/                  # Next.js App Router pages and layouts
│   ├── about/            # About page
│   ├── api/              # API routes
│   ├── auth/             # Authentication related pages
│   ├── contact/          # Contact page
│   ├── features/         # Features page
│   ├── profile/          # User profile page
│   ├── recipe/           # Recipe display page
│   ├── signin/           # Sign in page
│   ├── actions.ts        # Server actions
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/           # Reusable UI components
│   ├── auth/             # Authentication components
│   ├── image-uploader.tsx # Image upload component
│   ├── profile/          # Profile-related components
│   ├── recipe/           # Recipe-related components
│   ├── theme-provider.tsx # Theme provider
│   ├── theme-toggle.tsx  # Theme toggle button
│   └── ui/               # UI components from shadcn/ui
├── lib/                  # Utility functions and services
│   ├── ai/               # AI-related functions
│   │   ├── gemini-vision.ts # Gemini Vision API integration
│   │   ├── groq-vision.ts   # GroqCloud API integration
│   │   ├── recipe-generation.ts # Recipe generation logic
│   │   ├── tensorflow-recognition.ts # TensorFlow.js integration
│   │   └── yolo-detection.ts # YOLO detection integration
│   ├── api/              # API-related functions
│   │   └── recipe-service.ts # Recipe API service
│   ├── supabase/         # Supabase client and utilities
│   │   ├── client.ts     # Client-side Supabase client
│   │   ├── database.types.ts # Database type definitions
│   │   ├── server.ts     # Server-side Supabase client
│   │   └── storage-service.ts # Storage service
│   └── utils/            # Utility functions
│       └── image-processing.ts # Image processing utilities
├── public/               # Static assets
│   └── images/           # Image assets
├── utils/                # Additional utilities
│   └── supabase/         # Supabase utilities
│       └── middleware.ts # Supabase middleware
├── middleware.ts         # Next.js middleware
├── next.config.js        # Next.js configuration
├── package.json          # Project dependencies
├── tailwind.config.ts    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
\`\`\`

## 🗄️ Database Schema

### Profiles Table
| Column      | Type      | Description                           |
|-------------|-----------|---------------------------------------|
| id          | UUID      | Primary key, references auth.users(id) |
| username    | TEXT      | Unique username                       |
| full_name   | TEXT      | User's full name                      |
| avatar_url  | TEXT      | URL to user's avatar image            |
| created_at  | TIMESTAMP | Creation timestamp                    |
| updated_at  | TIMESTAMP | Last update timestamp                 |

### Recipes Table
| Column        | Type      | Description                           |
|---------------|-----------|---------------------------------------|
| id            | TEXT      | Primary key                           |
| name          | TEXT      | Recipe name                           |
| description   | TEXT      | Recipe description                    |
| image_url     | TEXT      | URL to recipe image                   |
| ingredients   | JSONB     | List of ingredients                   |
| instructions  | JSONB     | List of instructions                  |
| cooking_time  | TEXT      | Estimated cooking time                |
| difficulty    | TEXT      | Recipe difficulty level               |
| servings      | INTEGER   | Number of servings                    |
| cuisine       | TEXT      | Cuisine type                          |
| created_at    | TIMESTAMP | Creation timestamp                    |
| updated_at    | TIMESTAMP | Last update timestamp                 |

### User Recipes Table
| Column      | Type      | Description                           |
|-------------|-----------|---------------------------------------|
| id          | UUID      | Primary key                           |
| user_id     | UUID      | References auth.users(id)             |
| recipe_id   | TEXT      | References recipes(id)                |
| created_at  | TIMESTAMP | Creation timestamp                    |

### Dish Identifications Table
| Column           | Type      | Description                           |
|------------------|-----------|---------------------------------------|
| id               | UUID      | Primary key                           |
| user_id          | UUID      | References auth.users(id)             |
| image_url        | TEXT      | URL to uploaded image                 |
| identified_dish  | TEXT      | Name of identified dish               |
| recipe_id        | TEXT      | References recipes(id)                |
| confidence_score | FLOAT     | AI confidence score                   |
| created_at       | TIMESTAMP | Creation timestamp                    |

## 🧩 Key Components

### Image Uploader
The core component that handles image uploads and triggers the AI recognition process. It provides visual feedback during processing and handles errors gracefully.

### AI Recognition System
A cascading system that tries multiple AI models in sequence to ensure the most accurate dish identification:
1. Google Gemini Vision API (primary)
2. TensorFlow.js MobileNet (first fallback)
3. YOLO object detection (second fallback)

### Recipe Display
A comprehensive recipe display component that shows ingredients, instructions, cooking time, difficulty, and other recipe details in an easy-to-follow format.

### Authentication System
A secure authentication system built with Supabase Auth that handles user registration, login, and session management.

## 🤖 AI Integration

SnapDish AI uses a multi-model approach to ensure accurate food recognition:

### Google Gemini Vision API
- Primary AI model for image recognition
- Provides high-accuracy dish identification
- Generates detailed descriptions of identified dishes

### TensorFlow.js MobileNet
- Fallback model if Gemini API fails
- Runs directly in the browser
- Pre-trained on a wide variety of objects, including food items

### YOLO Object Detection
- Second fallback for image recognition
- Specialized in detecting multiple objects in a single image
- Used when other models fail to identify the dish

## 🔐 Environment Variables

Ensure the following environment variables are set in your `.env.local` file:

\`\`\`env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# AI API Keys
GEMINI_API_KEY=your_gemini_api_key

# Application Settings
NEXT_PUBLIC_APP_URL=http://localhost:3000
\`\`\`

## 🗺️ Development Roadmap

### Phase 1: Core Functionality (Completed)
- ✅ Basic application setup with Next.js and Tailwind CSS
- ✅ Image upload and processing
- ✅ AI-powered dish recognition
- ✅ Recipe display
- ✅ User authentication
- ✅ Save recipes functionality

### Phase 2: Enhanced AI and UX (Current)
- ✅ Multi-model AI approach for better accuracy
- ✅ Google Gemini Vision API integration
- ✅ Improved error handling and fallbacks
- ✅ Dark/light mode toggle
- ✅ Responsive design improvements
- ⬜ Recipe search functionality
- ⬜ Recipe filtering by cuisine, difficulty, etc.

### Phase 3: Advanced Features (Upcoming)
- ⬜ Ingredient-based recipe search
- ⬜ User recipe submissions
- ⬜ Recipe ratings and reviews
- ⬜ Social sharing features
- ⬜ Nutritional information
- ⬜ Dietary restrictions and preferences

### Phase 4: Mobile and Expansion (Future)
- ⬜ Progressive Web App (PWA) support
- ⬜ Native mobile app development
- ⬜ Recipe collections and meal planning
- ⬜ Shopping list generation
- ⬜ Integration with grocery delivery services
- ⬜ Multi-language support

## 🏆 Milestones

| Milestone | Description | Target Date | Status |
|-----------|-------------|-------------|--------|
| MVP Launch | Basic functionality with image recognition and recipe display | March 2023 | ✅ Completed |
| AI Enhancement | Integration of multiple AI models for better accuracy | May 2023 | ✅ Completed |
| User Profiles | User authentication and profile management | July 2023 | ✅ Completed |
| Recipe Management | Save, organize, and manage recipes | September 2023 | ✅ Completed |
| Search & Discovery | Advanced search and filtering capabilities | December 2023 | 🔄 In Progress |
| Social Features | Sharing, ratings, and community features | March 2024 | ⬜ Planned |
| Mobile Optimization | PWA and mobile app development | June 2024 | ⬜ Planned |
| Internationalization | Multi-language support and global cuisine expansion | September 2024 | ⬜ Planned |

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Commit your changes: `git commit -m 'Add your feature'`
5. Push to the branch: `git push origin feature/your-feature-name`
6. Open a pull request

Please ensure your code follows the project's coding standards and includes appropriate tests.

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

For more information and updates, visit our [official website](https://snapdishai.vercel.app) or follow us on [Twitter](https://twitter.com/echotharun).
\`\`\`

## 3. Let's update the actions.ts file to use the real Gemini API:
