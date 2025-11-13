# 🌲 GhibliWorld - Interactive Experience

An immersive web application that explores the Studio Ghibli universe with floating film nodes in space, cinematic animations, and a mini game.

![Studio Ghibli](https://img.shields.io/badge/Studio-Ghibli-4CAF50?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.0-61DAFB?style=for-the-badge&logo=react)
![Framer Motion](https://img.shields.io/badge/Framer-Motion-FF0055?style=for-the-badge)

## ✨ Features

- **🌫️ Cinematic Intro**: Misty welcome animation into the Ghibli world
- **🎬 Floating Films**: Your favorite Ghibli films floating as nodes in space
- **🔍 Film Details**: Click any film to see complete information
- **🎮 Mini Game**: Calcifer vs No-Face - epic battle between iconic characters
- **🧭 React Router**: Smooth navigation between scenes
- **📱 Responsive**: Adaptive design for all devices
- **🎨 Fluid Animations**: Smooth transitions with Framer Motion
- **🪝 Custom Hook**: Efficient data handling from the Ghibli API

## 🛠️ Tech Stack

- **React 18** - Core library
- **React Router** - Scene navigation
- **Framer Motion** - Animations and transitions
- **Tailwind CSS** - Styling and design
- **Ghibli API** - Official Studio Ghibli data
- **Custom Hook** - useGhibliFilms for data management
- **pnpm** - Package manager

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/ghibliworld.git

# Enter the directory
cd ghibliworld

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

The application will be available at `http://localhost:5173`


## 📁 Project Structure

```
ghibliworld/
├── src/
│   ├── components/
│   │   ├── MistLayer.jsx       # Mist animation
│   │   ├── FilmOrb.jsx         # Floating film node
│   │   └── ...
│   ├── scenes/
│   │   ├── IntroScene.jsx      # Intro scene
│   │   ├── ForestScene.jsx     # Floating films
│   │   ├── DetailScene.jsx     # Film details
│   │   ├── GameScene.jsx       # Calcifer vs No-Face
│   │   └── ...
│   ├── hooks/
│   │   └── useGhibliFilms.js   # Ghibli API hook
│   ├── App.jsx
│   └── main.jsx
├── public/
│   └── assets/
├── package.json
├── vercel.json
└── README.md
```

## 🎯 Usage

### Navigation

1. **Intro Scene**: The mist welcomes you to the Ghibli world
2. **Forest Scene**: Explore favorite films floating in space
3. **Detail Scene**: Click any film to see:
   - Title and description
   - Release year
   - Director
   - Score
4. **Game Scene**: Play Calcifer vs No-Face

### Game Controls

- Click  to control Calcifer
- Face off against the mysterious No-Face
- Have fun in the Ghibli universe!


## 🌐 API

This project uses the [Studio Ghibli API](https://ghibliapi.vercel.app/):

```javascript
// Main endpoint
https://ghibliapi.vercel.app/films
```

## 🎨 Technical Features

### Custom Hook: useGhibliFilms

```javascript
const { films, loading, error } = useGhibliFilms();
```

Handles:
- Fetch data from Ghibli API
- Loading and error states
- Favorite films logic

### Films as Floating Nodes

Films are not in a static grid, but float in space as interactive orbs:

```javascript
// Each film is a floating node
<FilmOrb 
  film={film}
  onClick={() => navigate(`/detail/${film.id}`)}
/>
```

### Animations with Framer Motion

```javascript
// Animation example
<motion.div
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.8 }}
  transition={{ duration: 0.5 }}
/>
```

## 🤝 Contributing

Contributions are welcome. Please:

1. Fork the project
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add: AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [Studio Ghibli](https://www.ghibli.jp/) for creating magical worlds
- [Ghibli API](https://ghibliapi.vercel.app/) for providing the data
- React and Framer Motion communities

## 👤 Author

**Your Name**
- GitHub: [@RuthDanielaAguirre](https://github.com/RuthDanielaAguirre)
- Linkedin: [your-portfolio.com](https://www.linkedin.com/in/ruth-daniela-aguirre/)

---

⭐ If you liked this project, give it a star on GitHub!

*Made with ❤️ and a bit of Ghibli magic*