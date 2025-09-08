# 🌌 Interactive Particle Galaxy

A mesmerizing web-based particle system that simulates a galaxy with gravitational physics, interactive controls, and stunning visual effects. Create your own cosmic masterpiece with thousands of particles dancing through space!

![Galaxy Demo](https://img.shields.io/badge/Status-Live-brightgreen) ![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white) ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## ✨ Features

### 🎮 Interactive Controls
- **Particle Count**: Adjust from 100 to 2000 particles
- **Gravity Strength**: Control gravitational pull (0-2x)
- **Speed Control**: Modify simulation speed (0.1x-3x)
- **Color Modes**: 5 stunning color schemes
  - 🌈 Rainbow - Dynamic color cycling
  - 🌌 Galaxy - Deep space blues and purples
  - 🔥 Fire - Warm reds and oranges
  - 🌊 Ocean - Cool blues and teals
  - ⚡ Neon - Bright electric colors

### 🖱️ Mouse Interactions
- **Click**: Create gravitational wells that attract particles
- **Hover**: Real-time mouse tracking for enhanced interactivity

### 🎯 Special Effects
- **Particle Trails**: Beautiful trailing effects behind each particle
- **Gravitational Physics**: Realistic particle-to-particle interactions
- **Glow Effects**: Radial gradients and dynamic lighting
- **Connection Lines**: Particles form connections when nearby
- **Big Bang**: Explosive particle dispersion effect
- **Boundary Wrapping**: Seamless edge-to-edge particle movement

### 🎨 Visual Features
- **Glassmorphism UI**: Modern frosted glass control panel
- **Gradient Animations**: Smooth color transitions
- **Responsive Design**: Works on desktop and mobile
- **Fade Trails**: Elegant particle history visualization
- **Dynamic Sizing**: Particles vary in size and brightness

## 🚀 Live Demo

[**🌌 Experience the Galaxy**](https://r91781585-tech.github.io/interactive-particle-galaxy/)

## 🛠️ Technologies Used

- **HTML5 Canvas**: High-performance 2D rendering
- **Vanilla JavaScript**: Pure JS with advanced physics calculations
- **CSS3**: Modern styling with animations and glassmorphism
- **Responsive Design**: Mobile-friendly interface

## 📱 How to Use

1. **🖱️ Click anywhere** on the canvas to create gravitational wells
2. **🎛️ Adjust controls** in the right panel:
   - Increase particle count for denser galaxies
   - Modify gravity for different orbital behaviors
   - Change speed for slow-motion or time-lapse effects
   - Switch color modes for different aesthetics
3. **🔄 Reset** to clear all attractors and restart
4. **⏸️ Pause/Play** to freeze or resume the simulation
5. **💥 Big Bang** for explosive particle effects

## 🎯 Physics Simulation

The galaxy uses realistic physics principles:

- **Gravitational Force**: F = G × (m1 × m2) / r²
- **Particle Interactions**: Repulsion at close distances
- **Velocity Integration**: Smooth acceleration and movement
- **Boundary Conditions**: Toroidal topology (wrap-around edges)
- **Friction**: Gradual velocity decay for stability

## 🎨 Color Modes Explained

| Mode | Description | Best For |
|------|-------------|----------|
| 🌈 **Rainbow** | Full spectrum cycling | General use, vibrant displays |
| 🌌 **Galaxy** | Deep space colors | Realistic space simulation |
| 🔥 **Fire** | Warm red/orange tones | Dramatic, energetic scenes |
| 🌊 **Ocean** | Cool blue/teal palette | Calm, flowing movements |
| ⚡ **Neon** | Bright electric colors | High-contrast, modern look |

## 🔧 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/r91781585-tech/interactive-particle-galaxy.git
   cd interactive-particle-galaxy
   ```

2. **Open in browser**:
   ```bash
   # Simply open index.html in your browser
   # Or use a local server:
   python -m http.server 8000
   # Then visit: http://localhost:8000
   ```

3. **No dependencies required!** Pure HTML/CSS/JS

## 🎮 Controls Reference

| Control | Function | Range |
|---------|----------|-------|
| Particles | Number of particles in simulation | 100-2000 |
| Gravity | Gravitational force strength | 0.0-2.0 |
| Speed | Simulation speed multiplier | 0.1-3.0 |
| Color Mode | Visual color scheme | 5 options |
| Reset | Clear attractors, restart particles | - |
| Pause/Play | Toggle simulation | - |
| Big Bang | Explosive particle dispersion | - |

## 🌟 Advanced Features

### Particle System
- Individual particle physics with mass and velocity
- Trail rendering with fade effects
- Life cycle management with regeneration
- Dynamic color shifting based on movement

### Gravitational Wells
- Mouse-click generated attractors
- Pulsing visual effects
- Automatic decay over time
- Mass-based attraction calculations

### Performance Optimizations
- Efficient collision detection
- Selective connection line rendering
- Canvas optimization techniques
- Smooth 60fps animation

## 🎯 Future Enhancements

- [ ] 3D particle rendering
- [ ] Sound reactive particles
- [ ] Preset galaxy configurations
- [ ] Export/save galaxy states
- [ ] VR/AR support
- [ ] Multi-touch gestures
- [ ] Particle collision effects
- [ ] Custom particle shapes

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch
3. Make your improvements
4. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Inspired by real galaxy formation simulations
- Physics calculations based on N-body problem solutions
- Visual effects inspired by modern space visualization tools

---

**🌌 Create your own universe - one particle at a time!**

*Made with ❤️ and lots of ☕*