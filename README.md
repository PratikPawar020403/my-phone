# 📱 PhoneOS Portfolio

 An interactive, fully functional web portfolio designed to mimic a modern mobile operating system.

## ✨ Overview

**PhoneOS Portfolio** reimagines the traditional developer portfolio as a dynamic, touch-friendly mobile interface. Users can explore my skills, projects, and background by interacting with familiar "apps" in a simulated OS environment.

It features real-time theming, smooth animations, and a responsive design that works beautifully on both desktop and mobile.


## 🚀 Key Features

### 🎨 Dynamic Themes
Switch instantly between distinct visual styles:
*   **Frutiger Aero**: A nostalgic, glossy, and vibrant aesthetic (Early 2000s tech).
*   **Cyber**: A futuristic, high-contrast, dark-mode interface with glitch effects.

### 📱 Applications
*   **📂 Files**: Browse my resume, certificates, and research papers in a file system view.
*   **🎵 Music**: A fully interactive music player (includes "Mock" demo tracks).
*   **📞 Contact**: A rotary dialer interface to "call" (contact) me.
*   **📧 Mail**: A simulated inbox showcasing communication style.
*   **📸 Camera**: (Mock) Camera interface demonstration.
*   **🖼️ Identity**: A gallery and timeline of my personal journey.
*   **🛠️ Projects**: App store style showcase of my technical projects.
*   **⚙️ Settings**: Configure the OS experience (Theme, Wallpaper, etc.).

---

## 🛠️ Tech Stack

*   **Framework**: [React 19](https://react.dev/)
*   **Build Tool**: [Vite](https://vitejs.dev/)
*   **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
*   **Language**: [TypeScript](https://www.typescriptlang.org/)
*   **Icons**: [Lucide React](https://lucide.dev/)

---

## ⚡ Getting Started

### Prerequisites
*   Node.js (v18 or higher recommended)
*   npm

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/PratikPawar020403/my-phone.git
    cd phoneos-portfolio
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```

4.  **Open your browser:**
    Navigate to `http://localhost:5173` to launch the OS.

---

## 📦 Building for Production

To create an optimized production build:

```bash
npm run build
```

The output will be in the `dist` directory, ready for deployment.

### Type Checking
To run explicit type checks without building:
```bash
npx tsc --noEmit
```

---

## ☁️ Deployment (Netlify)

This project is configured for **Netlify**.

*   **Build Command**: `npm run build`
*   **Publish Directory**: `dist`
*   **SPA Handling**: Includes `_redirects` and `netlify.toml` for seamless client-side routing.

---

## 👤 Author

**Pratik Pawar**

*   [GitHub](https://github.com/PratikPawar020403)
*   [LinkedIn](https://www.linkedin.com/in/pratik-s-pawar-780443358/)
*   [Email](mailto:pratikpawar0222@gmail.com)

---

<p align="center">
  <i>"It's not just a portfolio, it's an experience."</i>
</p>
