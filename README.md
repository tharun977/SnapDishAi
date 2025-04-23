

🍽️ SnapDish AI

SnapDish AI is an innovative AI-powered web application that transforms the way users interact with food. By leveraging advanced computer vision and AI technologies, SnapDish AI allows users to identify dishes from images and discover detailed recipes, making cooking more accessible and enjoyable for everyone.


⸻

📌 Table of Contents
	•	Features
	•	Tech Stack
	•	Getting Started
	•	Project Structure
	•	Key Components
	•	Environment Variables
	•	Contributing
	•	License

⸻

🚀 Features
	•	AI-Powered Dish Recognition:
Upload or capture images of dishes, and the AI identifies them to suggest relevant recipes.
	•	Ingredient-Based Search:
Input ingredients to receive recipe suggestions tailored to available items.
	•	User-Friendly Interface:
Responsive and intuitive UI built with Next.js and Tailwind CSS.
	•	Team Showcase:
Highlighting the team behind SnapDish AI with profiles and roles.
	•	Contact & Engagement:
Easy-to-use contact form and call-to-action sections to engage users.

⸻

🛠️ Tech Stack
	•	Frontend: Next.js, React, TailwindCSS
	•	Backend: Supabase (PostgreSQL, Auth, Storage)
	•	AI & Machine Learning: Ultralytics YOLO for image recognition
	•	APIs: TheMealDB for recipe data
	•	Deployment: Vercel

⸻

⚙️ Getting Started

Prerequisites
	•	Node.js >= 14.x
	•	npm or yarn
	•	Supabase account

Installation
	1.	Clone the repository:

git clone https://github.com/yourusername/snapdish-ai.git
cd snapdish-ai


	2.	Install dependencies:

npm install
# or
yarn install


	3.	Set up environment variables:
Create a .env.local file in the root directory and add your Supabase credentials:

NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key


	4.	Run the development server:

npm run dev
# or
yarn dev

Open http://localhost:3000 to view the application.

⸻

📁 Project Structure

├── components/          # Reusable UI components
├── lib/                 # Supabase client and utility functions
├── pages/               # Next.js pages
├── public/              # Static assets
├── styles/              # Global styles
├── .env.local           # Environment variables
├── tailwind.config.js   # Tailwind CSS configuration
└── README.md            # Project documentation



⸻

🧩 Key Components

lib/supabase/client.ts

Initializes the Supabase client for client-side operations.

lib/supabase/server.ts

Sets up the Supabase client for server-side operations, ensuring secure data handling.

components/ui/button.tsx

Custom button component styled with Tailwind CSS, used across the application.

pages/about.tsx

Displays information about SnapDish AI, its mission, story, and the team behind it.

⸻

🔐 Environment Variables

Ensure the following environment variables are set in your .env.local file:

NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

Replace your-supabase-url and your-supabase-anon-key with your actual Supabase project URL and anonymous key.

⸻

🤝 Contributing

Contributions are welcome! Please follow these steps:
	1.	Fork the repository.
	2.	Create a new branch: git checkout -b feature/your-feature-name.
	3.	Commit your changes: git commit -m 'Add your feature'.
	4.	Push to the branch: git push origin feature/your-feature-name.
	5.	Open a pull request.

⸻

📄 License

This project is licensed under the MIT License.

⸻

For more information and updates, visit our official website or follow us on Twitter.

