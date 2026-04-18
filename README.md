# 🌿 MindMate – Your Mental Health Companion

**MindMate** is a calm and engaging frontend app built with **React** and **TailwindCSS** to help users care for their mental well-being.
 
---

## 🚀 Features

- **Mood Tracker**  
  Log daily mood using emojis & notes. Mood history is visualized with a smooth Chart.js line chart.

- **Journal and Sentiment Analysis**  
  Write daily entries and get instant emotion feedback (Positive/Neutral/Negative) powered by simple sentiment logic or should you integrate an AI API later.

- **Anonymous Vent Space**  
  A safe, anonymous place to express feelings – posts are auto-deleted after 10 minutes for privacy.

- **Daily Affirmations**  
  Receive a new uplifting message every day, with a history of past affirmations saved in localStorage.

- **Guided Breathing Exercises**  
  Interactive breathing circle animation with timer phases (Inhale/Hold/Exhale), designed to be calming and easy to follow.

- **Dark Mode**  
  Easily switch between light and dark themes, with preference saved between sessions.

---

## 🛠️ Tech Stack

- **Frontend**: React.js + TailwindCSS + Chart.js  
- **Storage**: Browser `localStorage` for moods, journal entries, and affirmations  
- **Animations & UI**: CSS animations (breathing circle, fade-in), responsive design, mobile-first  
- **Optional**: Hooks ready for AI/sentiment APIs or Firebase integration

---

## 📁 Project Structure

/src
/components
- MoodTracker.jsx
- Journal.jsx
- VentSpace.jsx
- Affirmations.jsx
- Breathing.jsx

App.jsx

index.jsx
/public

index.html
README.md
tailwind.config.js
package.json

yaml
Copy
Edit

---

## ⚙️ Setup & Run Locally

1. Clone the repo  
   ```bash
   git clone https://github.com/Mayank-cyber-cell/MindMate.git
Install dependencies

bash
Copy
Edit
cd MindMate
npm install
Run in development mode

bash
Copy
Edit
npm start
✨ Future Roadmap
🔐 Add user authentication (Firebase or similar) to sync data across devices

🌐 Integrate backend API with AI sentiment analysis (e.g., OpenAI GPT)

☁️ Deploy to Vercel or Netlify for live demo access

📩 Email reminders or automatic affirmations via backend scheduling

❤️ Why MindMate
This project shows both empathy and technical skills: emotion tracking, interactive UI, data visualization, and modular design. It's a strong highlight for both your resume and portfolio.

👤 Author
Mayank (cyber-cell) • GitHub: Mayank-cyber-cell

# 📄 License
Released under the MIT License. Feel free to use and adapt responsibly!
