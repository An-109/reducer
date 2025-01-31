# E-Commerce Platform with Redux

## Description

This project is a refactored version of an e-commerce platform that utilizes Redux for global state management instead of React's Context API. The application allows users to browse products, add items to the shopping cart, and complete the checkout process using the Stripe API.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Deployment](#deployment)
- [License](#license)
- [Contributing](#contributing)
- [Questions](#questions)

## Installation

To install and run this project locally, follow these steps:

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/repository-name.git
   ```
2. Navigate to the project directory:
   ```sh
   cd repository-name
   ```
3. Install dependencies for both client and server:
   ```sh
     npm run install
   ```
4. Create an `.env` file in the `server` directory and add your Stripe API keys.
5. Start the development build:
   ```sh
   npm run build && npm run seed
   ```
6. Start the React server:
   ```sh
   npm run develop
   ```

## Usage

- Users can register and log in.
- Products are displayed and categorized.
- Users can add/remove items from the cart.
- Checkout is handled using Stripe.

## Technologies Used

- React
- Redux
- Redux Toolkit
- React Router
- Stripe API
- Node.js
- Express.js
- MongoDB

## Features

- Uses Redux for global state management
- Fully functional shopping cart
- Secure Stripe payment integration
- Responsive UI

## Deployment

This application is deployed on Render.

- **Live App:** [https://your-deployed-app-url.com](https://reducer-zohl.onrender.com)
- **GitHub Repository:** [reducer](https://github.com/An-109/reducer.git)

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! Please submit a pull request for any improvements.

## Questions

For questions, contact me at:
- GitHub: [your-username](https://github.com/your-username)
- Email: your-email@example.com
