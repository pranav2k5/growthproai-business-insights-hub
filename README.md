# 🚀 Business Insights Hub – GrowthProAI Full Stack Intern Assignment

This is a full stack web application built for the **GrowthProAI Full Stack Internship Assignment**. The app allows local business owners to input their business name and location, and get back SEO-friendly headlines, ratings, and reviews, simulating a business dashboard interface.

---

## 📁 Project Structure

```
project-root/
├── src/
│   ├── components/
│   └── services/
├── .env
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── server.mjs
├── loader.mjs
├── tailwind.config.js
└── vite.config.ts
```

---

## 🛠 Tech Stack

### 🖥️ Frontend
- **React**
- **Vite**
- **Tailwind CSS**
- **TypeScript**

### 🌐 Backend
- **Node.js**
- **Express.js**
- **CORS**

### 🧰 Tooling
- **ESLint**
- **Concurrently**
- **PostCSS**

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/pranav2k5/growthproai-business-insights-hub.git
cd growthproai-business-insights-hub
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the application

This will start both the frontend (Vite) and the backend server (Express):

```bash
npm start
```

This uses the script: `concurrently "npm run server" "npm run client"`

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3000

---

## 📡 API Endpoints

### POST /business-data
Returns mock rating, reviews, and generated SEO headline.

**Request Body:**
```json
{
  "name": "Cake & Co",
  "location": "Mumbai"
}
```

**Response:**
```json
{
  "rating": 4.5,
  "reviews": 102,
  "headline": "Why Cake & Co is Mumbai's Sweetest Spot in 2025"
}
```

### GET /regenerate-headline
Returns a new random headline for the given business.

**Example:**
```
GET /regenerate-headline?name=Cake%20%26%20Co&location=Mumbai
```

**Response:**
```json
{
  "headline": "Discover the Magic of Cake & Co in Mumbai – A 2025 Favorite!"
}
```

---

## 🧪 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run client` | Runs Vite development server |
| `npm run server` | Runs Node backend with custom loader |
| `npm start` | Runs frontend and backend concurrently |
| `npm run build` | Builds the production frontend |
| `npm run preview` | Serves the built frontend |
| `npm run lint` | Runs ESLint on the codebase |

---

## 🌍 Deployment (Optional)

If deployed, you can add live URLs here:

- 🔗 **Frontend**: [Live Link]
- 🔗 **Backend**: [Live Link]

---

## 📨 Submission Instructions

1. Ensure this README.md clearly explains how to set up and run the app
2. Email your submission with the subject:
   ```
   Submission: Full Stack Intern Assignment [Your Name]
   ```
3. Attach the GitHub repo link and deployed links (if any)

---

## 🧑‍💻 Author

**Pranav Manikanta**
- GitHub: [@pranav2k5](https://github.com/pranav2k5)

Built with ❤️ for GrowthProAI

---

## 📝 Features

- ✅ Responsive design with Tailwind CSS
- ✅ Full stack architecture with React + Express
- ✅ SEO headline generation
- ✅ Mock business ratings and reviews
- ✅ Professional dashboard interface
- ✅ TypeScript support
- ✅ Modern development tooling

---

## 🔧 Development Notes

- No database required - uses mock data for demonstration
- Fully responsive and mobile-friendly
- Clean, professional UI/UX design
- Proper error handling and loading states
