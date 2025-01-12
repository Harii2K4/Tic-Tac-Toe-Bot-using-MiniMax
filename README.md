# Tic Tac Toe Web App

This is a **Tic Tac Toe** web application built using **Vite** and **React**. The app allows players to:

- Play against another player in multiplayer mode.
- Play against a bot powered by the Minimax algorithm for challenging AI gameplay.

## Features

- **Multiplayer Mode**: Play with friends locally on the same device.
- **Bot Mode**: Challenge an AI opponent that uses the Minimax algorithm for strategic moves.
- **Responsive Design**: Optimized for different screen sizes using TailwindCSS.
- **Interactive UI**: Clean and user-friendly interface built with modern UI components.

## Tech Stack

- **Frontend**: React + Vite
- **Styling**: TailwindCSS
- **AI Logic**: Minimax Algorithm

## Installation

Follow these steps to set up and run the project locally:

### Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (v16 or higher)
- npm (comes with Node.js) or yarn

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/Tic-Tac-Toe-WebApp-With-MiniMax
   cd Tic-Tac-Toe-WebApp-With-MiniMax
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Install required packages:

   ```bash
   npm install @radix-ui/react-slot
   npm install lucide-react
   npm install class-variance-authority
   npm install clsx
   npm install tailwindcss-animate
   npm install tailwindcss postcss autoprefixer
   npm install @radix-ui/react-icons
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open your browser and navigate to:

   ```
   http://localhost:5173
   ```

## Usage

1. Select the desired game mode: Multiplayer or Play Against Bot.
2. Follow the on-screen instructions to play.
3. Enjoy the game!

## Project Structure

```plaintext
Tic-Tac-Toe-WebApp-With-MiniMax/
├── node_modules/          # Installed dependencies
├── public/                # Static assets served by the app
├── src/                   # Main source code
│   ├── assets/            # Static assets like images or icons
│   │   └── react.svg
│   ├── components/        # React components
│   │   ├── ui/            # Reusable UI components
│   │   │   ├── button.jsx
│   │   │   ├── card.jsx
│   │   │   ├── input.jsx
│   │   │   └── TicTacToe.jsx
│   ├── lib/               # Utility functions and libraries
│   │   └── utils.js
│   ├── App.css            # App-specific CSS
│   ├── App.jsx            # Main app component
│   ├── index.css          # Global CSS
│   ├── main.jsx           # Entry point
├── .gitignore             # Files to ignore in Git
├── eslint.config.js       # ESLint configuration
├── index.html             # Main HTML file
├── package-lock.json      # Auto-generated lock file for npm
├── package.json           # Project dependencies and scripts
├── postcss.config.js      # PostCSS configuration
├── README.md              # Project documentation
├── tailwind.config.js     # TailwindCSS configuration
└── vite.config.js         # Vite configuration

```

## Dependencies

This project uses the following dependencies:

- **@radix-ui/react-slot**: For building reusable components.
- **lucide-react**: A library of beautiful icons.
- **class-variance-authority**: For managing TailwindCSS class variance.
- **clsx**: Utility for constructing `className` strings.
- **tailwindcss-animate**: For animations in TailwindCSS.
- **tailwindcss**, **postcss**, **autoprefixer**: Core tools for styling the app.
- **@radix-ui/react-icons**: Radix icons for UI components.

## Contributing

Contributions are welcome! If you have suggestions for improvements or new features, feel free to fork the repository and create a pull request.

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgements

- Thanks to the creators of React, TailwindCSS, and Radix for their amazing tools and libraries.


