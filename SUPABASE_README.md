# Supabase Setup Documentation

## Overview
TheMinuteMen supports **both Firebase and Supabase** as backend options. This guide walks you through setting up Supabase.

## Supabase Credentials
Your project credentials are already configured:
- **URL**: `https://pgmyiwjnekmrwfuzmoli.supabase.co`
- **Anon Key**: Already set in `.env` file

## Database Setup

### Step 1: Run SQL Migration
1. Go to your Supabase dashboard
2. Navigate to **SQL Editor**
3. Create a new query
4. Copy all contents from `SUPABASE_SETUP.sql` 
5. Run the migration

This will create:
- `users` table with email constraints and role management
- `orders` table with status tracking and delivery details
- Row Level Security (RLS) policies for data protection
- Indexes for performance optimization

### Step 2: Database Schema

**Users Table:**
- `id`: UUID primary key
- `name`: User's full name (2-50 characters)
- `email`: Unique email address
- `userId`: Firebase/Auth user ID (unique)
- `isSecurity`: Boolean flag for security personnel
- `role`: 'student', 'guard', or 'admin'
- `created_at`: Timestamp

**Orders Table:**
- `id`: Text primary key
- `userId`: Foreign key to users table
- `userName`: Student's name
- `userEmail`: Student's email (with validation)
- `orderId`: Order reference number
- `status`: 'pending', 'arrived', or 'picked_up'
- `notificationType`: 'email', 'sms', or 'whatsapp'
- `productName`: Item being delivered
- `carrier`: Delivery company
- `trackingNumber`: Tracking reference
- `paymentStatus`: 'paid' or 'cod'
- `expectedDate`: Delivery date
- `arrivedAt`: When package arrived
- `createdAt`: Creation timestamp

### Step 3: Row Level Security (RLS)

The SQL setup includes RLS policies:
- **Students**: Can only view their own orders
- **Guards/Admins**: Can view and update all orders
- **All Users**: Can view their own profile data

## Usage in Code

### Import Supabase Client
```javascript
import { supabase } from '../config/supabase.config';
```

### Authentication Example
```javascript
// Sign up
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'secure_password',
  options: {
    data: { name: 'John Doe' }
  }
});

// Sign in
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'secure_password'
});

// Sign out
await supabase.auth.signOut();
```

### Database Operations
```javascript
// Create order
const { data, error } = await supabase
  .from('orders')
  .insert([{ userId, userName, userEmail, orderId, ... }]);

// Fetch orders
const { data, error } = await supabase
  .from('orders')
  .select('*')
  .eq('userId', userId);

// Update order
const { data, error } = await supabase
  .from('orders')
  .update({ status: 'arrived' })
  .eq('id', orderId);

// Delete order
const { data, error } = await supabase
  .from('orders')
  .delete()
  .eq('id', orderId);
```

## Environment Variables
Make sure your `.env` file includes:
```
REACT_APP_SUPABASE_URL=https://pgmyiwjnekmrwfuzmoli.supabase.co
REACT_APP_SUPABASE_ANON_KEY=sb_publishable_EAxKPMMbqJnuOns3ATR9WQ_S80kRjWV
```

## Troubleshooting

**Issue**: RLS policies preventing data access
- Solution: Ensure the authenticated user's UUID matches the userId in the users table

**Issue**: Email validation errors
- Solution: Ensure userEmail field has valid email format

**Issue**: Foreign key constraint violations
- Solution: Ensure user exists in users table before creating orders

## Switching Between Firebase and Supabase

The project supports both backends. To use Supabase services instead of Firebase:
- Use `signUpWithSupabase.js` instead of `signUpWithEmail.js`
- Use `signInWithSupabase.js` instead of `signInWithEmail.js`
- Use `orderManagementSupabase.js` instead of `orderManagement.js`

## Additional Resources
- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Supabase Realtime](https://supabase.com/docs/guides/realtime)