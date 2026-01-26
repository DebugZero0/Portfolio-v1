# Mac OS Portfolio Desktop

A modern, interactive portfolio application built with React and Vite that mimics the macOS desktop experience. This project showcases a developer's work through resizable, draggable windows with various interactive components.

## 🎯 Project Overview

This is a desktop-style portfolio application that provides an immersive user experience similar to the macOS operating system. It features multiple interactive windows, a dock-based navigation system, and a light/dark theme toggle. The application is responsive and works across different screen sizes.

## ✨ Features

- **MacOS-like Desktop Interface**: Draggable and resizable windows with window management
- **Multiple Interactive Windows**:
  - GitHub Projects showcase
  - Resume/CV viewer (PDF)
  - Spotify integration
  - Command Line Interface (CLI) emulator
  - Text Editor with file creation
  - About & Contact information
  - Notes application
  - File Explorer

- **Window Management**: 
  - Open, close, minimize, and restore windows
  - Z-index management to bring windows to front
  - Window position and size persistence
  - Smooth window transitions

- **Navigation System**:
  - macOS-style menu bar with Home, File, View, and Terminal menus
  - Dock with icon-based navigation
  - Dynamic date and time display
  - File/Folder management features

- **Theme Support**:
  - Light and Dark mode toggle
  - Context API-based theme management
  - Persistent theme preferences

- **File Management**:
  - Create new files with custom content
  - Open and browse files
  - File storage using localStorage
  - Text editor with file editing capabilities

- **Responsive Design**:
  - Mobile-friendly with warning for smaller screens
  - Adaptive layout for different screen sizes

## 🛠️ Technology Stack

- **React 19.2.0** - UI library
- **Vite 7.2.4** - Build tool and dev server
- **SCSS** - Styling with nested rules and variables
- **react-rnd** - Draggable and resizable windows
- **react-console-emulator** - CLI emulator
- **react-markdown** - Markdown rendering with GitHub Flavored Markdown
- **react-syntax-highlighter** - Code syntax highlighting
- **JetBrains Mono Font** - Monospace font for code display
- **ESLint** - Code quality and linting

## 📁 Project Structure

```
src/
├── App.jsx                 # Main application component with window state management
├── main.jsx               # React application entry point
├── app.scss               # Main application styles
├── context/
│   └── ThemeContext.jsx   # Theme provider and context for light/dark mode
├── Components/
│   ├── Nav.jsx            # Menu bar navigation component
│   ├── Doc.jsx            # Dock with navigation icons
│   ├── DateTime.jsx       # Real-time date and time display
│   ├── CreatedFiles.jsx   # File creation and management
│   ├── MobileWarning.jsx  # Mobile device warning
│   ├── windows/           # Individual window components
│   │   ├── MacWindow.jsx  # Base window wrapper (draggable, resizable)
│   │   ├── Github.jsx     # GitHub projects showcase
│   │   ├── Resume.jsx     # Resume/CV viewer
│   │   ├── Spotify.jsx    # Spotify integration
│   │   ├── Cli.jsx        # Command line interface emulator
│   │   ├── About.jsx      # About information
│   │   ├── Contact.jsx    # Contact information
│   │   ├── Note.jsx       # Notes application
│   │   ├── NewFile.jsx    # New file creation dialog
│   │   ├── OpenFolder.jsx # File browser
│   │   └── TextEditor.jsx # Text editor with file editing
│   └── *.scss             # Component-specific styles
├── assets/
│   └── github.json        # GitHub repository data
└── App styles and component styles

public/
├── doc-icon/              # Dock icon images
├── nav-logo/              # Navigation logo
├── notes.txt              # Default notes file
├── Developer.pdf          # Resume PDF
└── Background images      # Various wallpaper images
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Mac\ OS
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port displayed in terminal).

## 📝 Available Scripts

- `npm run dev` - Start the development server with HMR
- `npm run build` - Build the project for production
- `npm run lint` - Run ESLint to check code quality
- `npm run preview` - Preview the production build locally

## 🎨 Styling

The project uses SCSS for styling with:
- Nested selectors and variables for maintainability
- Responsive breakpoints for mobile devices
- CSS Grid and Flexbox for layout
- Smooth animations and transitions
- Theme-based color schemes

Key style files:
- [app.scss](src/app.scss) - Main application layout
- [nav.scss](src/nav.scss) - Navigation bar styles
- [doc.scss](src/doc.scss) - Dock styles
- Individual component `.scss` files for scoped styles

## 🔧 Configuration

### Vite Configuration
The project uses standard Vite configuration with React plugin. See [vite.config.js](vite.config.js) for details.

### ESLint Configuration
ESLint is configured for React development with the following rules:
- React refresh rules for hot module replacement
- React hooks rules for proper hooks usage
- See [eslint.config.js](eslint.config.js) for the complete configuration

## 📱 Browser Support

- Modern browsers with ES6+ support
- Responsive design for desktop and tablet
- Mobile warning for small screen devices

## 🎮 Usage

1. **Open Windows**: Click on dock icons or use the menu bar to open different windows
2. **Manage Windows**: Drag windows to move them, resize from corners/edges
3. **Minimize/Restore**: Click the minimize button or window title to minimize/restore
4. **Create Files**: Use File → New File menu to create new files
5. **Switch Themes**: Use View menu to toggle between light and dark modes
6. **Access Information**: Click on dock icons (LinkedIn, Email, GitHub, Resume) for quick links

## 📦 Dependencies

See [package.json](package.json) for the complete list of dependencies and their versions.

### Key Dependencies:
- React DOM for rendering
- react-rnd for window dragging and resizing
- react-markdown for markdown content rendering
- react-console-emulator for terminal emulation
- react-syntax-highlighter for code display
- Sass for stylesheet compilation

## 🔐 Data Persistence

The application uses browser localStorage to persist:
- Created files and their content
- Window layouts and positions
- User theme preferences

## 🚀 Deployment

To build for production:

```bash
npm run build
```

This creates an optimized build in the `dist/` directory that can be deployed to any static hosting service.

## 📄 License

This project is a personal portfolio application.

## 👨‍💻 Developer

Created as an interactive portfolio application to showcase development skills and creativity in UI/UX design.

## 👤 Author

**Ankan Nandi**

- **Email**: [ankannew2024@gmail.com](mailto:ankannew2024@gmail.com)
- **LinkedIn**: [ankan-nandi-57417a31a](https://www.linkedin.com/in/ankan-nandi-57417a31a/)
- **GitHub**: Available through the portfolio application

Feel free to reach out for collaboration, feedback, or any inquiries!
