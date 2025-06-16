# Football Community Platform

A modern web and mobile platform for organizing, joining, and managing football matches, connecting players, and building a vibrant football community.

## Features
- Create, browse, and join football matches
- Real-time chat between users
- Player profiles and match history
- Stadium map integration
- Ratings, MVP voting, and comments
- Notifications and reporting
- Multi-language support (English, French, Arabic)
- Responsive web frontend (React + Vite + Tailwind CSS)
- Mobile app (React Native)
- Secure authentication (JWT)

## Tech Stack
- **Frontend:** React.js, Vite, Tailwind CSS, React Router, i18n
- **Backend:** Node.js, Express.js, MongoDB (Mongoose)
- **Real-time:** Socket.IO
- **Mobile:** React Native (Expo)
- **Authentication:** JWT

## Project Structure
- `backend/` — Node.js/Express API, MongoDB models, controllers, routes
- `frontend/` — React web app (Vite), all UI and logic
- `mobile/` — React Native mobile app

## Getting Started

### Backend
1. `cd backend`
2. `npm install`
3. Create a `.env` file (see `.env.example` if available)
4. `npm start`

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm run dev`

### Mobile
1. `cd mobile`
2. `npm install`
3. `npx expo start`

## API Endpoints
- User, Match, Comment, Message, Notification, Stadium, Report, Vote (see `backend/routes/`)

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
[MIT](LICENSE)

## Contact
- Email: support@example.com
- [About Page](frontend/src/Pages/About/about.jsx)

---

*This project is for educational and community-building purposes. Enjoy playing and connecting!*
