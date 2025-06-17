# ⚽ Football Community Platform

Welcome to the **Football Community Platform**! This is a modern web and mobile application for organizing, joining, and managing football matches, connecting players, and building a vibrant football community.

---

## 🚀 Features

- 🏟️ **Create, browse, and join football matches**
- 💬 **Real-time chat** between users
- 👤 **Player profiles** and match history
- 🗺️ **Stadium map integration**
- ⭐ **Ratings, MVP voting, and comments**
- 🔔 **Notifications** and reporting
- 🌐 **Multi-language support** (English, French, Arabic)
- 📱 **Responsive web frontend** (React + Vite + Tailwind CSS)
- 📲 **Mobile app** (React Native)
- 🔒 **Secure authentication** (JWT)

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Vite, Tailwind CSS, React Router, i18n
- **Backend:** Node.js, Express.js, MongoDB (Mongoose)
- **Real-time:** Socket.IO
- **Mobile:** React Native (Expo)
- **Authentication:** JWT

---

## 📁 Project Structure

```
project pfe/
├── backend/   # Node.js/Express API, MongoDB models, controllers, routes
├── frontend/  # React web app (Vite), all UI and logic
├── mobile/    # React Native mobile app
└── README.md  # Project documentation
```

---

## 🏁 Getting Started

### Backend
```bash
cd backend
npm install
# Create a .env file (see .env.example if available)
npm start
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Mobile
```bash
cd mobile
npm install
npx expo start
```

---

## 📚 API Endpoints
- User, Match, Comment, Message, Notification, Stadium, Report, Vote (see `backend/routes/`)

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

> *This project is for educational and community-building purposes. Enjoy playing and connecting!*
