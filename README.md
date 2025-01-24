# Credit Service

This is the Credit Service for **Manamon**. It provides functionalities to manage user credit balances and transaction histories.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Technologies](#technologies)

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd credit
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage

To start the application, run:
```
npm start
```
The application will be available at `http://localhost:8080`.

## API Endpoints

- **GET /credit/{userId}**  
  Retrieve the credit balance for a specific user.

- **POST /credit/update**  
  Update the credit balance after a transaction (purchase, match winnings, sale).

- **GET /credit/{userId}/transactions**  
  Retrieve the complete transaction history for a user.

## Technologies

- **TypeScript**
- **Express**
- **MongoDB**
- **RabbitMQ** for message bus statistics

## License

This project is licensed under the MIT License.