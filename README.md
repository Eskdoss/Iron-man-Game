# Life of Iron Man - 2D Side Scroller Game

A thrilling Iron Man-themed 2D side-scrolling game built with HTML5 Canvas, CSS, and vanilla JavaScript. Fly as Iron Man, shoot enemies, collect power-ups, and survive as long as possible!

## 🎮 Game Features

- **Smooth Iron Man Movement**: Fly in all directions using WASD or arrow keys
- **Laser Shooting System**: Fire repulsors with spacebar
- **Dynamic Enemy Spawning**: Enemies spawn randomly from the right side
- **Collision Detection**: Realistic collision system for all game objects
- **Score System**: Earn points by destroying enemies
- **Lives System**: Start with 3 lives, lose one when hit by enemies
- **Power-ups**: Collect health boosts and score multipliers
- **Progressive Difficulty**: Game gets harder as your score increases
- **Pause Functionality**: Press P to pause/resume the game
- **Responsive Design**: Optimized for different screen sizes
- **Visual Effects**: Explosions, glowing effects, and smooth animations

## 🕹️ Controls

| Key | Action |
|-----|--------|
| **W** or **↑** | Move Up |
| **A** or **←** | Move Left |
| **S** or **↓** | Move Down |
| **D** or **→** | Move Right |
| **Spacebar** | Shoot Laser |
| **P** | Pause/Resume Game |

## 🚀 How to Play

1. **Start the Game**: Click the "Start Game" button on the main screen
2. **Control Iron Man**: Use WASD or arrow keys to navigate through the sky
3. **Shoot Enemies**: Press spacebar to fire repulsor lasers at incoming enemies
4. **Avoid Collisions**: Don't let enemies hit Iron Man or you'll lose a life
5. **Collect Power-ups**: 
   - 🟢 Green power-ups restore health
   - 🟡 Yellow power-ups give bonus points
6. **Survive**: The game gets progressively harder - see how long you can last!
7. **Game Over**: When you lose all lives, your final score will be displayed

## 📁 Project Structure

```
/IronMan-Game/
│
├── index.html          # Main HTML file with game UI
├── style.css           # CSS styling and animations
├── script.js           # Game logic and mechanics
├── assets/             # Directory for game assets
│   ├── images/         # Sprite images (future enhancement)
│   └── audio/          # Sound effects (future enhancement)
└── README.md           # This documentation file
```

## 🛠️ Technical Details

### Technologies Used
- **HTML5**: Game structure and Canvas element
- **CSS3**: Styling, animations, and responsive design
- **JavaScript (ES6+)**: Game logic, physics, and interactions
- **Canvas API**: 2D rendering and graphics

### Game Architecture
- **Game Loop**: Smooth 60fps animation using `requestAnimationFrame`
- **Object-Oriented Design**: Separate classes for different game entities
- **Collision Detection**: AABB (Axis-Aligned Bounding Box) collision system
- **State Management**: Centralized game state handling
- **Event-Driven Input**: Responsive keyboard controls

### Performance Optimizations
- Efficient object pooling for bullets and enemies
- Optimized rendering with minimal canvas operations
- Smart collision detection with spatial optimization
- Memory management for removed game objects

## 🎯 Game Mechanics

### Scoring System
- **Enemy Destruction**: +10 points per enemy
- **Score Power-up**: +50 bonus points
- **Level Progression**: Every 100 points increases difficulty

### Difficulty Scaling
- Enemy spawn rate increases with level
- Enemy movement speed multiplier: `1 + (level - 1) * 0.2`
- More challenging enemy patterns at higher levels

### Power-up System
- **Health Power-up** (Green): Restores 1 life (max 3 lives)
- **Score Power-up** (Yellow): Grants 50 bonus points
- Power-ups spawn randomly with low probability

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- No additional installations required!

### Running the Game
1. Clone or download this repository
2. Open `index.html` in your web browser
3. Click "Start Game" and enjoy!

### Local Development
```bash
# Clone the repository
git clone <repository-url>

# Navigate to the game directory
cd IronMan-Game

# Open in your preferred code editor
code .

# Serve locally (optional, for development)
# You can use any local server like Live Server extension in VS Code
# or Python's built-in server:
python -m http.server 8000
```

## 🤝 Contributing

We welcome contributions to make this game even better! Here's how you can help:

### Ways to Contribute
1. **Bug Reports**: Found a bug? Open an issue with details
2. **Feature Requests**: Have an idea? Share it in the issues
3. **Code Contributions**: Submit pull requests with improvements
4. **Art Assets**: Create sprites, backgrounds, or sound effects
5. **Documentation**: Improve this README or add code comments

### Development Guidelines
1. **Code Style**: Use consistent indentation and meaningful variable names
2. **Comments**: Add comments for complex game logic
3. **Testing**: Test your changes across different browsers
4. **Performance**: Ensure changes don't impact game performance

### Contribution Process
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test thoroughly
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

## 🎨 Future Enhancements

### Planned Features
- [ ] **Sound Effects**: Laser sounds, explosions, background music
- [ ] **Sprite Graphics**: Replace rectangles with detailed Iron Man sprites
- [ ] **Animated Background**: Moving clouds and city skyline
- [ ] **Boss Battles**: Special enemy encounters
- [ ] **Weapon Upgrades**: Different laser types and power levels
- [ ] **Local Storage**: Save high scores
- [ ] **Mobile Support**: Touch controls for mobile devices
- [ ] **Multiplayer Mode**: Local co-op gameplay

### Enhancement Ideas
- Particle effects for explosions and thrusters
- Different enemy types with unique behaviors
- Shield power-up for temporary invincibility
- Combo system for consecutive hits
- Achievement system
- Multiple difficulty levels

## 🐛 Known Issues

- None currently reported! Please report any bugs you find.

## 📱 Browser Compatibility

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 11+
- ✅ Edge 79+
- ❌ Internet Explorer (not supported)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Inspired by classic side-scrolling games
- Iron Man character design inspired by Marvel Comics
- Built with love for the gaming community

## 📞 Support

If you encounter any issues or have questions:
1. Check the [Issues](../../issues) page for existing solutions
2. Create a new issue with detailed information
3. Include your browser version and operating system

---

**Enjoy playing Life of Iron Man! 🦾**

*May the arc reactor be with you!*
