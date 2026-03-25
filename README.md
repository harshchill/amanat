<div align="center">
  <h1>✨ Amanat</h1>
  <p><strong>A Modern Warranty & Service Management Platform</strong></p>
  <p>Seamlessly manage product warranties, service tickets, and customer relationships with an intuitive, elegant interface.</p>
  
  ![Version](https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000)
  ![License](https://img.shields.io/badge/license-MIT-green.svg)
  ![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
  ![Status](https://img.shields.io/badge/status-Active-success)
</div>

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [User Roles](#user-roles)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [API Routes](#api-routes)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

**Amanat** is a comprehensive warranty and service management platform designed for modern e-commerce businesses. It provides a complete solution for tracking product warranties, managing repair tickets, and maintaining customer relationships across multiple user roles.

Built with cutting-edge technologies, Amanat delivers a sleek, responsive user experience with enterprise-grade reliability and performance.

---

## ✨ Features

### 🛍️ Customer Features
- **Product Catalog** - Browse and view detailed product information with warranty details
- **Warranty Tracking** - Monitor active warranties on purchased items
- **Service Tickets** - Create and track repair requests with real-time status updates
- **Purchase History** - View complete purchase history and warranty coverage

### 🏪 Shop Owner Features
- **Dashboard Analytics** - Track sales metrics and business insights at a glance
- **Inventory Management** - Manage product catalog and pricing
- **Sales Management** - Monitor and track all customer transactions
- **Warranty Configuration** - Set warranty terms for products

### 🔧 Technician Features
- **Ticket Management** - View and manage service requests efficiently
- **Repair Status Updates** - Update ticket status through repair lifecycle
- **Service Center Dashboard** - Centralized view of all pending repairs
- **Ticket Prioritization** - Organize work efficiently with status filtering

### 🔐 Security & Authentication
- **NextAuth.js Integration** - Secure, OAuth-ready authentication
- **Password Encryption** - BCrypt-based password security
- **Role-Based Access Control** - Three-tier permission system
- **Session Management** - Secure, persistent user sessions

---

## 👥 User Roles

| Role | Description | Key Permissions |
|------|-------------|-----------------|
| **Customer** | End users purchasing products | View products, create tickets, track warranties |
| **Shop Owner** | Merchants selling products | Manage inventory, view sales, configure warranties |
| **Service Center** | Repair technicians | View tickets, manage repairs, update status |

---

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-19.2.3-61DAFB?logo=react&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-16.1.4-000000?logo=next.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4?logo=tailwind-css&logoColor=white)

### Backend & Database
![Prisma](https://img.shields.io/badge/Prisma-7.3.0-2D3748?logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Neon-336791?logo=postgresql&logoColor=white)
![Next.js API Routes](https://img.shields.io/badge/Next.js%20API%20Routes-REST-000000)

### Authentication & Security
![NextAuth.js](https://img.shields.io/badge/NextAuth.js-4.24.13-595B66?logo=next-auth&logoColor=white)
![bcryptjs](https://img.shields.io/badge/bcryptjs-3.0.3-FF6B6B)

### Development Tools
![ESLint](https://img.shields.io/badge/ESLint-9-4B32C3?logo=eslint&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)

---

## 📦 Installation

### Prerequisites
- Node.js 18 or higher
- PostgreSQL database (Neon recommended)
- npm or yarn package manager

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/amanat.git
   cd amanat
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env.local` file in the project root:
   ```env
   # Database
   DATABASE_URL="postgresql://user:password@host/database"
   
   # NextAuth Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here
   
   # Authentication Providers (Optional)
   GITHUB_ID=your-github-id
   GITHUB_SECRET=your-github-secret
   ```

4. **Setup Database**
   ```bash
   npx prisma migrate dev --name init
   ```

5. **Generate Prisma Client**
   ```bash
   npx prisma generate
   ```

---

## 🚀 Quick Start

### Development Server

Start the development server with hot-reload:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The page automatically updates as you make changes.

### Production Build

Build for production:

```bash
npm run build
npm start
```

### Linting

Run ESLint to check code quality:

```bash
npm run lint
```

---

## 📁 Project Structure

```
amanat/
├── app/
│   ├── api/                    # API routes
│   │   ├── auth/              # Authentication endpoints
│   │   ├── product/           # Product management
│   │   ├── solditem/          # Sold items management
│   │   └── user/              # User management
│   ├── components/            # Reusable React components
│   ├── dashboard/             # Customer dashboard
│   ├── login/                 # Login page
│   ├── signup/                # Signup page
│   ├── shopOwner/             # Shop owner routes
│   ├── technician/            # Technician routes
│   ├── globals.css            # Global styles
│   ├── layout.js              # Root layout
│   ├── page.js                # Home page
│   └── provider.js            # Context providers
├── lib/
│   ├── api.js                 # API utilities
│   └── prisma.js              # Prisma client
├── prisma/
│   └── schema.prisma          # Database schema
├── src/generated/             # Generated Prisma types
├── public/                    # Static assets
└── package.json               # Project dependencies
```

---

## ⚙️ Configuration

### Tailwind CSS

The project uses Tailwind CSS v4 with modern features. Configure theme colors in `tailwind.config.mjs`:

```javascript
// Customize colors, fonts, and responsive breakpoints
```

### NextAuth.js

Authentication is configured in `app/api/auth/[...nextauth]/route.js`. Customize providers and callbacks as needed.

### Prisma ORM

Database models are defined in `prisma/schema.prisma`. Run migrations after schema changes:

```bash
npx prisma migrate dev --name description-of-change
```

---

## 🔌 API Routes

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/[...nextauth]` - NextAuth callbacks
- `GET /api/auth/session` - Get current session

### Products
- `GET /api/product` - List all products
- `POST /api/product` - Create product (Shop Owner only)
- `PUT /api/product/:id` - Update product
- `DELETE /api/product/:id` - Delete product

### Sold Items
- `GET /api/solditem` - List sold items
- `POST /api/solditem` - Create sold item record
- `GET /api/solditem/:id` - Get item details

### Users
- `GET /api/user` - Get user profile
- `PUT /api/user` - Update user profile
- `GET /api/user/:id` - Get user by ID

---

## 📊 Database Schema

### Core Models

**User**
- Customers, Shop Owners, and Service Centers
- Role-based access control (CUSTOMER, SHOP_OWNER, SERVICE_CENTER)
- Password-secured authentication

**Product**
- Product catalog with warranty information
- Model numbers and warranty duration tracking
- Associated sold items

**SoldItem**
- Individual physical items/units
- Unique serial numbers for tracking
- Owner and seller relationships
- Associated service tickets

**Ticket**
- Service/repair requests
- Status tracking (PENDING, APPROVED, IN_REPAIR, REJECTED, COMPLETED)
- Linked to specific sold items
- Timestamps and descriptions

---

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Follow ESLint configuration
- Use meaningful variable and function names
- Add comments for complex logic
- Keep components small and focused

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 🌟 Support

For support, email us or create an issue in the repository. We're here to help!

---

<div align="center">
  <p><strong>Built with 💙 by the Amanat Team</strong></p>
  <p>Simplifying warranty management, one ticket at a time.</p>
</div>
