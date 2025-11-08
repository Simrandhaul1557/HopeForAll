# Hope Beacon Nexus

A modern, responsive NGO website built with React, TypeScript, and Vite, featuring a clean UI and essential NGO functionalities.

![Hope Beacon Nexus Screenshot](https://i.imgur.com/your-screenshot-url.png)

## ✨ Features

- **Responsive Design**: Works on all devices
- **Modern UI**: Built with shadcn/ui and Tailwind CSS
- **Donation System**: Integrated with Razorpay for secure payments
- **Blog System**: Share stories and updates
- **Volunteer Management**: Sign up and manage volunteers
- **Event Management**: Create and showcase events

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui
- **State Management**: React Query
- **Form Handling**: React Hook Form
- **Routing**: React Router
- **Backend**: Node.js, Express, MongoDB
- **Payment Gateway**: Razorpay

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm 9+
- MongoDB (local or MongoDB Atlas)
- Razorpay account (for payment processing)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Simrandhaul1557/HopeForAll.git
   cd hope-beacon-nexus
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   npm install
   
   # Install backend dependencies
   cd backend
   npm install
   cd ..
   ```

3. **Set up environment variables**
   - Copy `.env.example` to `.env` in both root and backend directories
   - Update the variables with your configuration

4. **Start the development servers**
   ```bash
   # Start frontend (from root directory)
   npm run dev
   
   # In a new terminal, start backend
   cd backend
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:8080
   - Backend API: http://localhost:5000

## 🔧 Environment Variables

### Frontend (`.env`)
```env
VITE_API_URL=http://localhost:5000/api
VITE_RAZORPAY_KEY=rzp_test_1DP5mmOlF5G5ag
NODE_ENV=development
```

### Backend (`.env`)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ngo_website
RAZORPAY_KEY_ID=rzp_test_1DP5mmOlF5G5ag
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

## 🚀 Deployment

### Frontend Deployment (Vercel)
1. Push your code to GitHub
2. Import the repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy!

### Backend Deployment (Render/Railway)
1. Push your code to GitHub
2. Create a new web service on Render/Railway
3. Set environment variables
4. Deploy!

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for the amazing UI components
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS
- [Vite](https://vitejs.dev/) for the build tooling

---

Made with ❤️ by Simran K Dhaul | HopeForAll
