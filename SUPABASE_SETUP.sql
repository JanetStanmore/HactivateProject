-- TheMinuteMen Supabase Database Setup
-- Run these SQL commands in your Supabase SQL Editor
-- This creates the database structure for the parcel notification system

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL CHECK (length(name) >= 2 AND length(name) <= 50),
  email text NOT NULL UNIQUE,
  userId uuid NOT NULL UNIQUE,
  isSecurity boolean DEFAULT false,
  role text DEFAULT 'student' CHECK (role IN ('student', 'guard', 'admin')),
  created_at timestamptz DEFAULT now()
);

-- Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id text PRIMARY KEY,
  userId uuid NOT NULL,
  userName text NOT NULL,
  userEmail text NOT NULL UNIQUE CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$'),
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
  expectedDate text,
  createdAt timestamptz DEFAULT now(),
  FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE
);

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- RLS Policies for Users Table
CREATE POLICY "Users can view own data"
  ON users
  FOR SELECT
  USING (auth.uid() = userId);

CREATE POLICY "Users can update own data"
  ON users
  FOR UPDATE
  USING (auth.uid() = userId);

-- RLS Policies for Orders Table
-- Students can view their own orders
CREATE POLICY "Students can view own orders"
  ON orders
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.userId = auth.uid() 
      AND users.role = 'student'
      AND orders.userId = users.userId
    )
  );

-- Guards and admins can view all orders
CREATE POLICY "Guards and admins can view all orders"
  ON orders
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.userId = auth.uid() 
      AND users.role IN ('guard', 'admin')
    )
  );

-- Guards and admins can update orders
CREATE POLICY "Guards and admins can update orders"
  ON orders
  FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.userId = auth.uid() 
      AND users.role IN ('guard', 'admin')
    )
  );

-- Create indexes for better performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_orders_userId ON orders(userId);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_userEmail ON orders(userEmail);