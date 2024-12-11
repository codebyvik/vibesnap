
# VibeSnap

VibeSnap is a cutting-edge social media application designed to provide a seamless and engaging user experience. Built with modern web technologies, it features intuitive user interactions, smooth infinite scrolling, and responsive design, making it ideal for users across devices.



## Features

### User Authentication
- Sign up and log in using email and password.
- Google login integration.
- Persistent sessions to keep users logged in.

### Social Media Feed
- Post text, images, and videos with ease.
- Multi-image upload support for a single post.
- Infinite scrolling for a continuous content experience.

### User Profiles
- Update personal details like bio, name, and profile picture.
- "My Posts" section showcasing user-generated content.

### Interactive Video Handling
- Auto-play videos when in view and pause when out of view for better engagement.

### Content Sharing
- Share posts seamlessly across other platforms.

### Responsive Design
- Optimized for viewing on mobile, tablet, and desktop devices.


## Tech Stack

**Frontend:** React.js, Vite, Tailwind CSS

**Backend:** Firebase (Authentication, Firestore)

**State Management:** React

## Prerequisites
- Ensure Node.js is installed on your system.

- Set up a Firebase project for backend functionalities
## Installation

Clone the repository:

```bash
 git clone https://github.com/codebyvik/vibesnap.git
```
    
Navigate to the project directory:

```bash
cd vibesnap
```
Install dependencies:
```bash
npm install
```
Configure Firebase by creating a .env file in the root directory:
```bash
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id

VITE_CLOUDINARY_CLOUD_NAME = your-cloudinary-name
VITE_CLOUDINARY_UPLOAD_URL = your-cloudinary-upload-url
VITE_CLOUDINARY_UPLOAD_PRESET= your-cloudinary-upload-preset
```

Start the development server:
```bash
npm run dev
```
## License

This project is open-source and available under the [MIT](https://choosealicense.com/licenses/mit/) License.



