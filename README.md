
# Student Management Dashboard

A responsive React-based dashboard for managing student information with Firebase authentication, built with Material-UI.

## Demo Video

https://github.com/user-attachments/assets/6068f7d1-3206-43e2-a510-a10821bd5789


## Features

### Core Features
- 🔒 **Firebase Authentication** (Login/Logout)
- 👥 **View Student List** with pagination
- ➕ **Add New Students** (protected route)
- 🔍 **Filter Students** by course
- 🔎 **Search Students** by name or email
- 📝 **View Student Details** (protected route)
- 📱 **Fully Responsive** design

### Bonus Features
- ✏️ **Edit Existing Students**
- 🗑️ **Delete Students** with confirmation
- 🔄 **Sort Students** by name, course, or year
- ⏳ **Loading States** with visual feedback
- 🗄️ **Data Persistence** using localStorage
- 🎨 **Professional UI** with Material-UI
- 📲 **Mobile-Friendly** interface
- 📝 **Form Validation** for all inputs

## Technology Stack

- **Frontend**: React (Vite)
- **UI Framework**: Material-UI (MUI)
- **State Management**: React Context API
- **Routing**: React Router DOM
- **Form Handling**: React Hook Form
- **Authentication**: Firebase Auth
- **Mock API**: localStorage with simulated delays
- **Icons**: Material Icons

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/student-management-dashboard.git
```
2. Navigate to the project directory:

```bash
cd student-management-dashboard
```
3. Install dependencies:

```bash
npm install
```
4. Create a .env file in the root directory with your Firebase config:
```bash
env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```
5. Start the development server:

```bash
npm run dev
```
## Firebase Setup
1. Go to the Firebase Console

2. Create a new project

3. Enable Email/Password authentication:

4. Go to Authentication → Sign-in method

5. Enable Email/Password provider

6. Register a web app to get your Firebase config

7. Add test users manually in the Authentication section

## Project Structure
```bash
student-management-dashboard/
├── public/               # Static files
├── src/
│   ├── assets/           # Static assets
│   ├── components/       # Reusable components
│   ├── contexts/         # Context providers
│   ├── firebase/         # Firebase configuration
│   ├── hooks/            # Custom hooks
│   ├── pages/            # Page components
│   ├── services/         # API/services
│   ├── styles/           # Global styles
│   ├── App.jsx           # Main app component
│   └── main.jsx          # App entry point
├── .env                  # Environment variables
├── .gitignore
├── package.json
└── README.md
```

## Available Scripts
npm run dev: Start development server
npm run build: Create production build
npm run lint: Run ESLint
npm run preview: Preview production build

## Testing Credentials
For demonstration purposes, you can use these test credentials (after creating the users in Firebase):

Admin User:
```bash
Email: admin@example.com
Password: Admin@123
```
Regular User:
```bash
Email: user@example.com
Password: User@123
```
## Mock Data
The application comes with initial mock data:

```bash
[
  { id: '1', name: 'Alice Wonderland', email: 'alice@example.com', course: 'Computer Science', year: 3 },
  { id: '2', name: 'Bob The Builder', email: 'bob@example.com', course: 'Engineering', year: 2 },
  // ... more sample students
]
```
## Deployment
To deploy to Firebase Hosting:

1. Install Firebase CLI:

```bash
npm install -g firebase-tools
```
2. Login to Firebase:

```bash
firebase login
```
3. Initialize Firebase project:

```bash
firebase init
```
4. Select Hosting

Choose your Firebase project
Set dist as public directory
Configure as single-page app: Yes
Set up automatic builds: No

5. Build and deploy:

```bash
npm run build
```


## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments
Material-UI for the component library
Firebase for authentication
React community for awesome tools and libraries
