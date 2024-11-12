# PDF Co-Viewer

PDF Co-Viewer is a collaborative application designed for viewing and interacting with PDF documents. It allows multiple users to view the same document in real-time, supporting a range of features for synchronized PDF exploration.

## Features

- **Real-time Collaboration**: Multiple users can view the same PDF document in sync.
- **User Interface**: Simple and interactive UI for seamless PDF navigation.
- **Backend Server**: Node.js server for managing user connections and handling requests.

## Installation

### Prerequisites

- **Node.js**: Ensure you have Node.js installed (visit [Node.js download page](https://nodejs.org/) if needed).
  
### Steps

1. Clone the repository.
2. Open the project directory.
3. Install dependencies using Node Package Manager (NPM).

## Usage

1. Start the server.
2. Open your browser and navigate to `http://localhost:3000` to start using the application.

## Project Structure

- **server.js**: Main server file to handle connections and server logic.
- **public/**: Contains static assets, such as HTML and CSS files.
- **node_modules/**: Directory for installed dependencies (auto-generated).
- **package.json**: Manages project dependencies and scripts.

## Dependencies

This project uses the following key dependencies:
- `express`: For server setup and handling HTTP requests.
- `socket.io`: For real-time, bidirectional communication between clients and server.
