# urlShortyy

urlShortyy is a URL shortening service that allows users to input a long URL and receive a shortened version of it. The service is built using Node.js, Express, Firebase Firestore, and EJS for templating.

## Features

- Shorten long URLs to a more manageable length.
- Redirect users from the shortened URL to the original URL.
- Store URL mappings in Firebase Firestore.
- Simple and clean user interface.

## Project Structure


- [`config.js`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fhome%2Fnikhil%2Fprogramming%2Furlshortyy%2Fconfig.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/home/nikhil/programming/urlshortyy/config.js"): Contains configuration variables.
- [`fbConfig.js`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fhome%2Fnikhil%2Fprogramming%2Furlshortyy%2FfbConfig.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/home/nikhil/programming/urlshortyy/fbConfig.js"): Initializes Firebase with the project's configuration.
- [`index.js`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fhome%2Fnikhil%2Fprogramming%2Furlshortyy%2Findex.js%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/home/nikhil/programming/urlshortyy/index.js"): Main server file that handles URL shortening and redirection.
- [`package.json`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fhome%2Fnikhil%2Fprogramming%2Furlshortyy%2Fpackage.json%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/home/nikhil/programming/urlshortyy/package.json"): Contains project metadata and dependencies.
- [`vercel.json`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fhome%2Fnikhil%2Fprogramming%2Furlshortyy%2Fvercel.json%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/home/nikhil/programming/urlshortyy/vercel.json"): Configuration for deploying the project on Vercel.
- [`views/`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fhome%2Fnikhil%2Fprogramming%2Furlshortyy%2Fviews%2F%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/home/nikhil/programming/urlshortyy/views/"): Contains EJS templates for rendering HTML pages.

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/urlshortyy.git
    cd urlshortyy
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a [`.env`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fhome%2Fnikhil%2Fprogramming%2Furlshortyy%2F.env%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "/home/nikhil/programming/urlshortyy/.env") file in the root directory and add your Firebase API key:
    ```env
    API_KEY=your_firebase_api_key
    ```

4. Start the development server:
    ```sh
    npm run dev
    ```

## Usage

1. Open your browser and navigate to [`http://localhost:5555`](command:_github.copilot.openSymbolFromReferences?%5B%22http%3A%2F%2Flocalhost%3A5555%22%2C%5B%7B%22uri%22%3A%7B%22%24mid%22%3A1%2C%22fsPath%22%3A%22%2Fhome%2Fnikhil%2Fprogramming%2Furlshortyy%2Fconfig.js%22%2C%22external%22%3A%22file%3A%2F%2F%2Fhome%2Fnikhil%2Fprogramming%2Furlshortyy%2Fconfig.js%22%2C%22path%22%3A%22%2Fhome%2Fnikhil%2Fprogramming%2Furlshortyy%2Fconfig.js%22%2C%22scheme%22%3A%22file%22%7D%2C%22pos%22%3A%7B%22line%22%3A0%2C%22character%22%3A25%7D%7D%5D%5D "Go to definition").
2. Enter a long URL in the input field and click "Go".
3. The shortened URL will be displayed. Click on it to be redirected to the original URL.

## Deployment

The project is configured to be deployed on Vercel. To deploy, follow these steps:

1. Install the Vercel CLI:
    ```sh
    npm install -g vercel
    ```

2. Deploy the project:
    ```sh
    vercel
    ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License.