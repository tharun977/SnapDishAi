
# 🍽️ SnapDish AI

**SnapDish AI** is an innovative AI-powered web application that transforms the way users interact with food. By leveraging advanced computer vision and AI technologies, SnapDish AI allows users to identify dishes from images and discover detailed recipes, making cooking more accessible and enjoyable for everyone.

![SnapDish AI Banner](./public/images/snapdish-banner.png)

## 📌 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Database Schema](#-database-schema)
- [Key Components](#-key-components)
- [AI Integration](#-ai-integration)
- [Environment Variables](#-environment-variables)
- [Development Roadmap](#-development-roadmap)
- [Milestones](#-milestones)
- [Contributing](#-contributing)
- [License](#-license)

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
  - Google Gemini Pro Vision API
  - TensorFlow.js
  - YOLO
- **Deployment**: Vercel

## ⚙️ Getting Started

### Prerequisites

- Node.js >= 18.x
- npm or yarn
- Supabase account
- Google Gemini API key

### Installation

```bash
git clone https://github.com/yourusername/snapdish-ai.git
cd snapdish-ai
npm install
# or
yarn install
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Database Setup

Use the following SQL in Supabase SQL editor:

```sql
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

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

CREATE TABLE IF NOT EXISTS user_recipes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  recipe_id TEXT NOT NULL REFERENCES recipes(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, recipe_id)
);

CREATE TABLE IF NOT EXISTS dish_identifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  image_url TEXT,
  identified_dish TEXT,
  recipe_id TEXT REFERENCES recipes(id) ON DELETE SET NULL,
  confidence_score FLOAT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Run the Server

```bash
npm run dev
# or
yarn dev
```

## 📁 Project Structure

```bash
├── app/
│   ├── about/
│   ├── api/
│   ├── auth/
│   ├── contact/
│   ├── features/
│   ├── profile/
│   ├── recipe/
│   ├── signin/
│   ├── actions.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── auth/
│   ├── image-uploader.tsx
│   ├── profile/
│   ├── recipe/
│   ├── theme-provider.tsx
│   ├── theme-toggle.tsx
│   └── ui/
├── lib/
│   ├── ai/
│   │   ├── gemini-vision.ts
│   │   ├── groq-vision.ts
│   │   ├── recipe-generation.ts
│   │   ├── tensorflow-recognition.ts
│   │   └── yolo-detection.ts
│   ├── api/
│   │   └── recipe-service.ts
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── database.types.ts
│   │   ├── server.ts
│   │   └── storage-service.ts
│   └── utils/
│       └── image-processing.ts
├── public/
│   └── images/
├── utils/
│   └── supabase/
│       └── middleware.ts
├── middleware.ts
├── next.config.js
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## 🗄️ Database Schema

### Profiles

| Column      | Type      | Description                            |
|-------------|-----------|----------------------------------------|
| id          | UUID      | PK, references auth.users(id)          |
| username    | TEXT      | Unique username                        |
| full_name   | TEXT      | User's full name                       |
| avatar_url  | TEXT      | URL to user's avatar image             |
| created_at  | TIMESTAMP | Creation timestamp                     |
| updated_at  | TIMESTAMP | Last update timestamp                  |

### Recipes

| Column        | Type      | Description                            |
|---------------|-----------|----------------------------------------|
| id            | TEXT      | Primary key                            |
| name          | TEXT      | Recipe name                            |
| description   | TEXT      | Recipe description                     |
| image_url     | TEXT      | Image URL                              |
| ingredients   | JSONB     | List of ingredients                    |
| instructions  | JSONB     | List of instructions                   |
| cooking_time  | TEXT      | Cooking time                           |
| difficulty    | TEXT      | Difficulty level                       |
| servings      | INTEGER   | Servings                               |
| cuisine       | TEXT      | Cuisine type                           |
| created_at    | TIMESTAMP | Creation timestamp                     |
| updated_at    | TIMESTAMP | Last update timestamp                  |

### User Recipes

| Column     | Type      | Description                            |
|------------|-----------|----------------------------------------|
| id         | UUID      | Primary key                            |
| user_id    | UUID      | References auth.users(id)              |
| recipe_id  | TEXT      | References recipes(id)                 |
| created_at | TIMESTAMP | Creation timestamp                     |

### Dish Identifications

| Column           | Type      | Description                          |
|------------------|-----------|--------------------------------------|
| id               | UUID      | Primary key                          |
| user_id          | UUID      | References auth.users(id)            |
| image_url        | TEXT      | URL to uploaded image                |
| identified_dish  | TEXT      | Name of identified dish              |
| recipe_id        | TEXT      | References recipes(id)               |
| confidence_score | FLOAT     | AI confidence score                  |
| created_at       | TIMESTAMP | Timestamp                            |

## 🧩 Key Components

- `image-uploader.tsx`: Handles image capture/upload.
- `theme-toggle.tsx`: Switch between light/dark mode.
- `gemini-vision.ts`: Integration with Google Gemini.
- `recipe-generation.ts`: Builds a recipe based on identified dish.
- `supabase/client.ts`: Client-side Supabase setup.

## 🤖 AI Integration

- **Primary**: Gemini Vision Pro API
- **Fallback 1**: TensorFlow.js (food models)
- **Fallback 2**: YOLOv5 object detection

## 🔐 Environment Variables

Configured in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
GEMINI_API_KEY=
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 🛣️ Development Roadmap

- [x] Image upload and AI processing
- [x] Recipe generation and storage
- [x] Profile page with saved recipes
- [ ] AI model confidence comparison
- [ ] Meal planning feature
- [ ] Multilingual recipe generation

## 📆 Milestones

- v1.0 – Basic functionality (AI + Recipes + Auth)
- v2.0 – User dashboard, saved recipes, dark mode
- v3.0 – Voice-based interaction (future)

## 🤝 Contributing

Contributions are welcome! Please fork the repository and create a PR.

## 🪪 License

This project is licensed under the [MIT License](LICENSE).

##

For more information and updates, visit our [official website](https://snapdishai.vercel.app) or follow us on [Twitter](https://twitter.com/echotharun).
