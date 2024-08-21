## Bank Website

**Description:**

A secure and responsive bank website built using the MERN stack, providing both user and admin interfaces for account management, transactions, and real-time statistics.

**Features:**

- **User Authentication:** Secure registration and login with bcrypt and JWT tokens.
- **Account Management:** Users can view account details, perform transactions, transfer money, deposit, withdraw, and recharge.
- **Admin Panel:** Real-time statistics with React Chart and Material React Table, including new users, daily transactions, and money usage. Admins can manage user accounts and monitor all transactions.
- **Responsive Design:** The website is fully responsive and optimized for all devices.
- **Version Control:** Git is used for version control and collaboration.

**Tech Stack:**

- MongoDB
- Express.js
- React.js
- Node.js
- bcrypt
- JWT
- Axios
- React Chart
- Material React Table
- Git

**Installation:**

1. **Clone the repository:**
   ```bash
   git clone https://github.com/joseph-mv/BankWebsite.git
   ```
2. **Install backend  dependencies:**
   ```bash
   cd backend
   npm install

   ```
3. **Reinstall Bcrypt module:**
"The bcrypt module comes in versions for both x86 (32-bit) and x64 (64-bit) systems. Ensure you install the version compatible with your system."
   ```bash
   npm uninstall bcrypt 
   ```   
   ```bash
   npm install bcrypt 
   ```  
4. **Set up environment variables:**
   Create a `.env` file in `backend` folder and add the following variable:
   ```
   TOKEN_SECRET=your_jwt_token_secret
   ```
5. **Install frontend  dependencies:**
 - Client-side
   ```bash
   cd ../client
   npm install

   ```
 - Admin-side
   ```bash
   cd ../admin
   npm install

   ```
6. **Set up environment variables:**
 - Client-side: Create a .env file in the client folder:
   ```
   REACT_APP_BASE_URL=http://localhost:9000
   ```   
- Admin-side: Create a .env file in the client folder:
   ```
   REACT_APP_BASE_URL=http://localhost:9000
   ```  
**Usage:**

1. **Run the backend server:**
- Open a terminal and navigate to the backend directory, then run:
   ```bash
   npm start
   ```
2. **Run the client-side frontend server:**
- Open a new terminal, navigate to the client directory, and run:
   ```bash
   npm start
   ```  
3. **Run the admin-side frontend server:**
- Open a new terminal, navigate to the admin directory, and run:
   ```bash
   npm start
   ```    

**Contributing:**

Contributions are welcome! Please follow these guidelines:

1. **Fork the repository.**
2. **Create a new branch:** `git checkout -b feature/your-feature`
3. **Make your changes.**
4. **Commit your changes:** `git commit -m 'Add new feature'`
5. **Push to your branch:** `git push origin feature/your-feature`
6. **Create a pull request.**

**License:**

[MIT License]

**Acknowledgements:**

* Thanks to the React.js and MERN stack communities for their excellent tools and resources..
