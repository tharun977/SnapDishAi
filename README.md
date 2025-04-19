# 🍽️ SnapDish AI
**SnapDish AI** is an innovative AI-powered web application that transforms the way users interact with food. By leveraging advanced computer vision and AI technologies, SnapDish AI allows users to identify dishes from images and discover detailed recipes, making cooking more accessible and enjoyable for everyone

![SnapDish AI Banner](./public/images/snapdish-banner.png)

---

## 📌 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Key Components](#key-components)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

---

## 🚀 Features

- **AI-Powered Dish Recognition*: Upload or capture images of dishes, and the AI identifies them to suggest relevant recips.
- **Ingredient-Based Search*: Input ingredients to receive recipe suggestions tailored to available ites.
- **User-Friendly Interface*: Responsive and intuitive UI built with Next.js and Tailwind CS.
- **Team Showcase*: Highlighting the team behind SnapDish AI with profiles and rols.
- **Contact & Engagement*: Easy-to-use contact form and call-to-action sections to engage uses.

---

## 🛠️ Tech Stack

- **Frontend*: Next.js, React, TailwindCSS
- **Backend*: Supabase (PostgreSQL, Auth, Storge)
- **AI & Machine Learning*: Ultralytics YOLO for image recogniion
- **APIs*: TheMealDB for recipe ata
- **Deployment*: Vecel

---

## ⚙️ Getting Started

### Prerequisites
- Node.js >= 4.x
- npm or arn
- Supabase accunt

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/snapdish-ai.git
   cd snapdish-ai
   ``


2. **Install dependencies**:

   ```bash
   npm install
   # or
   yarn install
   ``


3. **Set up environment variables**:

   Create a `.env.local` file in the root directory and add your Supabase credentials:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ``


4. **Run the development server**:

   ```bash
   npm run dev
   # or
   yarn dev
   ``


   Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 📁 Project Structre


```bash
├── components/          # Reusable UI components
├── lib/                 # Supabase client and utility functions
├── pages/               # Next.js pages
├── public/              # Static assets
├── styles/              # Global styles
├── .env.local           # Environment variables
├── tailwind.config.js   # Tailwind CSS configuration
└── README.md            # Project documentation```


---

## 🧩 Key Components

### `lib/supabase/clientts`

Initializes the Supabase client for client-side operaions.

### `lib/supabase/serverts`

Sets up the Supabase client for server-side operations, ensuring secure data hanling.

### `components/ui/button.sx`

Custom button component styled with Tailwind CSS, used across the appliction.

### `pages/about.sx`

Displays information about SnapDish AI, its mission, story, and the team behid it.

---

## 🔐 Environment Varibles

Ensure the following environment variables are set in your `.env.local fie:


```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-ky
``


Replace `your-supabase-url` and `your-supabase-anon-key` with your actual Supabase project URL and anonymos key.

---

## 🤝 Contriuting

Contributions are welcome! Please follow thes steps

1. Fork the repsitoy.
2. Create a new branch: `git checkout -b feature/your-featur-nam`.
3. Commit your changes: `git commit -m 'Add your feture`.
4. Push to the branch: `git push origin feature/your-featur-nam`.
5. Open a pull equest.

---

## 📄 icense

This project is licensed under the [MIT License](ICENSE).

---

For more information and updates, visit our [official website](https://snapdish.ai) or follow us on [Twitter](https://twitter.com/snapish_ai).

--- 
