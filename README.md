# Syntra Project

This repository contains the **Syntra Project**, divided into two parts:  
- **Client (Frontend)** – React-based user interface.  
- **Server (Backend)** – Node.js/Express backend with database integration.  

The project demonstrates clean code structure, modular design, and scalable architecture.  

---

## 📂 Project Structure

```
syntra/
│── client/          # Frontend (React.js)
│   ├── src/
│   │   ├── pages/   # Different pages for app navigation
│   │   ├── components/ # Reusable UI components
│   │   │── dashboard/   # Dashboard
│   └── package.json
│
│── server/          # Backend (Node.js/Express)
│   ├── routes/      # API route definitions
│   ├── controllers/ # Business logic
│   ├── models/      # Database models/schema
│   ├── connection/  # DB connection and env configs
│   └── package.json
│
└── README.md
```

---

## ⚙️ Setup Instructions

1. Clone the repository  
   ```bash
   git clone https://github.com/arjun-rastogi/syntra.git
   cd syntra
   ```

2. Install dependencies for both client and server  
   ```bash
   cd client && npm install
   cd ../server && npm install
   ```

     ```

3. Start the development servers  
   ```bash
   # Backend
   cd server && npm start

   # Frontend
   cd client && npm start
   ```

---

## 💻 Client (Frontend)

- Built with **React.js**.  
- Organized into `pages` for routing and `components` for reusability.  
- Uses **React Router** for navigation between pages.  
- Handles state management to sync with backend API responses.  
- Provides a responsive and user-friendly UI.  

---

## 🔧 Server (Backend)

- Built with **Node.js + Express.js**.  
- Handles API requests for CRUD operations.  
- Uses **controllers** for business logic and **routes** for API endpoints.  
- Error handling and validation implemented for reliability.  

---

## 🗄️ Database

- Database structure and queries are documented in this repository.  
- Tables/Collections include:  
-- 1. Leads Table
CREATE TABLE `leads` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `status` ENUM('new', 'in-progress', 'closed') DEFAULT 'new',
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Tasks Table
CREATE TABLE `tasks` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `assigned_id` INT NOT NULL,
  `assigned_to` VARCHAR(100) NOT NULL,
  `status` ENUM('pending', 'in-progress', 'completed') DEFAULT 'pending',
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`assigned_id`) REFERENCES `team`(`id`)
);

-- 3. Team Table
CREATE TABLE `team` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(150) UNIQUE NOT NULL,
  `status` ENUM('active', 'inactive') DEFAULT 'active',
  `created` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Users Table
CREATE TABLE `users` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(100) NOT NULL,
  `email` VARCHAR(150) UNIQUE NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


(Details are explained further in the **README** sections inside the `server/` folder.)  

---

## 🚀 Future Improvements

If given more time, I would:  
- Add **unit tests** for both client and server.  
- Improve **frontend styling** with animations and design polish.  
- Enhance **backend performance** for large dataset handling.  
- Expand documentation for developer onboarding.  

---

## 🙌 Feedback  

I have shared the deliverables and would greatly appreciate your feedback.  
Your insights will help me refine and improve both the frontend and backend implementations.  

---

👨‍💻 **Author:** Arjun Rastogi  
📎 GitHub: [arjun-rastogi](https://github.com/arjun-rastogi)  
