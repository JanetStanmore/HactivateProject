# TheMinuteMen - Parcel Notification System

[![CircleCI](https://circleci.com/gh/JanetStanmore/TheMinuteMen.svg?style=svg)](https://circleci.com/gh/JanetStanmore/TheMinuteMen)
[![DeepSource](https://deepsource.io/gh/JanetStanmore/TheMinuteMen.svg/?label=active+issues&show_trend=true)](https://deepsource.io/gh/JanetStanmore/TheMinuteMen/?ref=repository-badge)

A parcel notification system for university students built with React and Firebase.

## 🚀 Features

### For Students
- **Real-time Notifications**: Get instant email alerts when your parcels arrive at the gate.
- **Order Tracking**: View all your orders with status updates (pending, arrived, picked up).
- **Secure Authentication**: Email/password login with role-based access.
- **Responsive Design**: Works seamlessly on desktop and mobile.

### For Security Personnel
- **Mark Arrivals**: Mark parcels as arrived and send email notifications.
- **Order Management**: View all pending orders.

## 🛠 Tech Stack

- **Frontend**: React 18
- **Backend**: Firebase (Auth, Firestore)
- **Deployment**: Vercel/Netlify (CI/CD with CircleCI)
- **Testing**: Jest, React Testing Library

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- Or use GitHub Codespaces/Replit for instant setup

### Local Development
```bash
# Clone the repo
git clone https://github.com/JanetStanmore/TheMinuteMen.git
cd TheMinuteMen

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Supabase credentials

# Start development server
npm start
```

### Using Dev Container (VS Code)
1. Open in VS Code
2. Click "Reopen in Container"
3. Run `npm start`

### Using Cloud IDEs
- **Replit**: Import from GitHub, run `npm start`
- **GitHub Codespaces**: Create codespace, run `npm start`

## 🗄 Database Setup

Run these SQL commands in your Supabase SQL Editor:

```sql
-- Users table
CREATE TABLE users (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL CHECK (length(name) >= 2 AND length(name) <= 50),
  email text NOT NULL UNIQUE,
  userId uuid NOT NULL UNIQUE,
  role text DEFAULT 'student' CHECK (role IN ('student', 'guard', 'admin'))
);

-- Orders table
CREATE TABLE orders (
  id text PRIMARY KEY,
  userId uuid NOT NULL,
  userName text NOT NULL,
  userEmail text NOT NULL,
  orderId text NOT NULL,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'arrived', 'picked_up')),
  notificationType text DEFAULT 'email' CHECK (notificationType IN ('email', 'sms', 'whatsapp')),
  productName text,
  carrier text,
  trackingNumber text,
  paymentStatus text DEFAULT 'paid' CHECK (paymentStatus IN ('paid', 'cod')),
  deliveryTime timestamptz,
  otp text,
  arrivedAt timestamptz,
  createdAt timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Policies (adjust as needed)
CREATE POLICY "Users can view own data" ON users FOR SELECT USING (auth.uid() = userId);
CREATE POLICY "Guards can view all orders" ON orders FOR SELECT USING (
  EXISTS (SELECT 1 FROM users WHERE users.userId = auth.uid() AND users.role IN ('guard', 'admin'))
);
```

## 🔧 Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run lint` - Check code quality

## 🚀 Deployment

### Vercel (Recommended)
1. Connect GitHub repo to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Netlify
1. Connect repo
2. Set build command: `npm run build`
3. Set publish directory: `build`

## 🤝 Contributing

1. Fork the repo
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push: `git push origin feature/amazing-feature`
5. Open PR

## 📄 License

MIT License - see [LICENSE](LICENSE) file.

## 🙏 Acknowledgments

- Built for Hacktivate Hackathon
- Inspired by real-world parcel delivery challenges in universities
- Thanks to Supabase for amazing backend-as-a-service

## 📞 Support

For issues, email: support@minutemen.app or open a GitHub issue.

---

**MinuteMen** - Making parcel pickup effortless! 📦✨

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
