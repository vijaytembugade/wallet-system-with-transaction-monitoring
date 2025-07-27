## Project Overview

#### Live Link

Frontend : https://e-wallwt-vt.netlify.app/

Backend Apis :https://wallet-system-with-transaction-monitoring.onrender.com

## Index

- [Project Overview](#project-overview)
- [How to setup locally](#how-to-setup-locally)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [API Documentation](#api-documentation)
  - [Wallets](#wallets)
  - [Transactions](#transactions)
    - [Get Transactions](#get-transactions)
    - [Create Transaction](#create-transaction)
    - [Get Transaction Details](#get-transaction-details)
- [Error Handling](#error-handling)
- [Frontend Design and View](#frontend-design-and-view)
  - [Operation page](#operation-page)
  - [Transaction Page](#transaction-page)

### How to setup locally

#### Backend Setup

1. **Clone the repository:**

   ```bash
   git clone <your-repo-url>
   cd <repo-folder>/backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   - Copy `.env.example` to `.env` and fill in the required values (e.g., `MONGODB_URI`, `PORT`).

4. **Start the backend server:**

   ```bash
   npm run dev
   ```

   The backend server will start on the port specified in your `.env` file (default is usually `3000`).

5. **API will be available at:**
   ```
   http://localhost:<PORT>
   ```

**Note:**

- Make sure MongoDB is running locally or update the `MONGODB_URI` in your `.env` to point to your MongoDB instance.

#### Frontend Setup

1. **Navigate to the frontend directory:**

   ```bash
   cd ../frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   - Copy `.env.example` to `.env` and fill in the required values (e.g., `VITE_API_URL`).

4. **Start the frontend development server:**

   ```bash
   npm run dev
   ```

   The frontend will typically be available at:

   ```
   http://localhost:5173
   ```

**Note:**

- Ensure the backend server is running and the `VITE_API_URL` in your `.env` file points to the correct backend API endpoint.

### Database Used

- **MongoDB**: The application uses MongoDB as the primary database for storing wallet and transaction data.

### NPM Packages Used

#### Backend

- **mongoose**: ODM for MongoDB, used for schema definitions and database operations.
- **express**: Web framework for building the REST API.
- **dotenv**: Loads environment variables from a `.env` file.
- **cors**: Enables Cross-Origin Resource Sharing.

#### Frontend

- **react**: JavaScript library for building user interfaces.
- **react-dom**: Serves as the entry point to the DOM and server renderers for React.
- **typescript**: Adds static typing to JavaScript.
- **eslint**: Linting utility for maintaining code quality.
- **vite**: Fast frontend build tool and development server.

## Database Schema Documentation

### Models Overview

The wallet system uses MongoDB , consists of two main entities: `Wallet` and `Transaction`. The relationship between these models follows a one-to-many pattern where one wallet can have multiple transactions.

### Wallet Model

**Schema Definition:** `backend/models/wallet.model.js`

| Field       | Type     | Constraints                 | Description                                |
| ----------- | -------- | --------------------------- | ------------------------------------------ |
| `_id`       | ObjectId | Auto-generated, Primary Key | Unique identifier for the wallet           |
| `balance`   | Number   | Required                    | Current balance amount in the wallet       |
| `username`  | String   | Required, Unique, Indexed   | Unique username associated with the wallet |
| `createdAt` | Date     | Auto-generated              | Timestamp when wallet was created          |
| `updatedAt` | Date     | Auto-generated              | Timestamp when wallet was last updated     |

**Indexes:**

- `username`: Unique index for fast lookups and ensuring uniqueness

### Transaction Model

**Schema Definition:** `backend/models/transaction.model.js`

| Field           | Type     | Constraints                                     | Description                                    |
| --------------- | -------- | ----------------------------------------------- | ---------------------------------------------- |
| `_id`           | ObjectId | Auto-generated, Primary Key                     | Unique identifier for the transaction          |
| `amount`        | Number   | Required, Min: 0.0001, Max: 1000000000000000000 | Transaction amount                             |
| `type`          | String   | Required, Enum: [`CREDIT`, `DEBIT`]             | Type of transaction                            |
| `walletId`      | ObjectId | Required, References: Wallet                    | Foreign key linking to the wallet              |
| `onRampBalance` | Number   | Optional                                        | Balance after the transaction (optional field) |
| `description`   | String   | Optional                                        | Additional description for the transaction     |
| `createdAt`     | Date     | Auto-generated                                  | Timestamp when transaction was created         |
| `updatedAt`     | Date     | Auto-generated                                  | Timestamp when transaction was last updated    |

**Transaction Types:**

- `CREDIT`: Money added to the wallet
- `DEBIT`: Money deducted from the wallet

### Relationships

```
Wallet (1) ←→ (N) Transaction
```

- **One-to-Many Relationship**: One wallet can have multiple transactions
- **Foreign Key**: `Transaction.walletId` references `Wallet._id`
- **Referential Integrity**: Enforced through Mongoose schema references

### Entity Relationship Diagram

```
┌─────────────────┐         ┌─────────────────┐
│     Wallet      │         │   Transaction   │
├─────────────────┤         ├─────────────────┤
│ _id (PK)        │◄────────┤ walletId (FK)   │
│ balance         │         │ _id (PK)        │
│ username (UQ)   │         │ amount          │
│ createdAt       │         │ type            │
│ updatedAt       │         │ onRampBalance   │
└─────────────────┘         │ description     │
                            │ createdAt       │
                            │ updatedAt       │
                            └─────────────────┘
```

### Business Rules

1. **Wallet Constraints:**

   - Each username must be unique across the system
   - Balance represents the current available funds

2. **Transaction Constraints:**

   - Transaction amounts must be between 0.0001 and 1,000,000,000,000,000,000
   - Each transaction must be associated with a valid wallet
   - Transaction type is restricted to CREDIT or DEBIT operations

3. **Data Integrity:**
   - All transactions maintain a reference to their parent wallet
   - Timestamps are automatically managed for audit trails
   - Wallet balance should be updated based on transaction history

## API Documentation

### Base URL

```
http://localhost:3000
```

### Authentication

Currently, no authentication is required for any endpoints.

---

### Wallet Management APIs

#### 1. Setup Wallet

**Endpoint:** `POST /setup/`

**Prod-Endpoint:** `https://wallet-system-with-transaction-monitoring.onrender.com/setup/`

**Description:** Creates a new wallet with initial balance and sets up the first transaction.

**Request Body:**

```json
{
  "username": "string (required)",
  "balance": "number (required, > 0)"
}
```

**Response:**

- **Success (200):**

```json
{
  "data": [
    {
      "_id": "wallet_id",
      "username": "string",
      "balance": "number",
      "createdAt": "date",
      "updatedAt": "date"
    }
  ]
}
```

- **Error (400):**

```json
{
  "message": "error_message"
}
```

**Validation Rules:**

- `username` is required
- `balance` is required and must be greater than 0
- Creates an initial CREDIT transaction with description "Initial Wallet Setup"

---

#### 2. Get All Wallets

**Endpoint:** `GET /wallet/get-all-wallets`

**Prod-Endpoint:** `https://wallet-system-with-transaction-monitoring.onrender.com/wallet/get-all-wallets/`

**Description:** Retrieves a list of all wallets in the system.

**Parameters:** None

**Query Parameters:** None

**Response:**

- **Success (200):**

```json
{
  "data": [
    {
      "_id": "wallet_id",
      "username": "string",
      "balance": "number",
      "createdAt": "date",
      "updatedAt": "date"
    }
  ]
}
```

---

#### 3. Get Wallet Details

**Endpoint:** `GET /wallet/:walletId`

**Prod-Endpoint:** `https://wallet-system-with-transaction-monitoring.onrender.com/wallet/:walletId/`

**Description:** Retrieves details of a specific wallet by its ID.

**Path Parameters:**

- `walletId` (string, required) - The unique identifier of the wallet

**Response:**

- **Success (200):**

```json
{
  "data": {
    "_id": "wallet_id",
    "username": "string",
    "balance": "number",
    "createdAt": "date",
    "updatedAt": "date"
  }
}
```

- **Error (404):**

```json
{
  "message": "Wallet not found"
}
```

---

### Transaction APIs

#### 4. Create Transaction

**Endpoint:** `POST /transact/:walletId`

**Prod-Endpoint:** `https://wallet-system-with-transaction-monitoring.onrender.com/transact/:walletId`

**Description:** Creates a new transaction (credit or debit) for a specific wallet.

**Path Parameters:**

- `walletId` (string, required) - The unique identifier of the wallet

**Request Body:**

```json
{
  "amount": "number (required, > 0)",
  "type": "string (required, enum: 'CREDIT' | 'DEBIT')",
  "description": "string (optional)"
}
```

**Response:**

- **Success (200):**

```json
{
  "message": "Transaction created successfully",
  "data": [
    {
      "_id": "transaction_id",
      "walletId": "wallet_id",
      "amount": "number",
      "type": "CREDIT | DEBIT",
      "description": "string",
      "onRampBalance": "number",
      "createdAt": "date",
      "updatedAt": "date"
    }
  ]
}
```

- **Error (500):**

```json
{
  "message": "Transaction failed",
  "error": "error_message"
}
```

**Validation Rules:**

- `walletId`, `amount`, and `type` are required
- `amount` must be greater than 0
- For DEBIT transactions, amount cannot exceed current wallet balance
- Wallet balance is automatically updated after successful transaction

**Transaction Types:**

- `CREDIT`: Adds money to the wallet
- `DEBIT`: Deducts money from the wallet

---

#### 5. Get Transaction Details

**Endpoint:** `GET /transaction/`

**Prod-Endpoint:** `https://wallet-system-with-transaction-monitoring.onrender.com/transaction/`

**Description:** Retrieves transaction history for a specific wallet with pagination support.

**Query Parameters:**

- `walletId` (string, required) - The unique identifier of the wallet
- `skip` (number, optional) - Number of records to skip for pagination
- `limit` (number, optional) - Maximum number of records to return
- `sortBy` (object or string, optional) - Sort order for the results (default: `{ "createdAt": -1 }` for newest first)

**Example Request:**

```
GET /transaction/?walletId=507f1f77bcf86cd799439011&skip=0&limit=10&sortBy={createdAt: asc}
```

**Response:**

- **Success (200):**

```json
{
  "data": [
    {
      "_id": "transaction_id",
      "walletId": "wallet_id",
      "amount": "number",
      "type": "CREDIT | DEBIT",
      "description": "string",
      "onRampBalance": "number",
      "createdAt": "date",
      "updatedAt": "date"
    }
  ],
  "total": "number"
}
```

- **Error (404):**

```json
{
  "message": "Transaction not found"
}
```

- **Error (500):**

```json
{
  "message": "Transaction details failed to fetch",
  "error": "error_message"
}
```

**Notes:**

- Results are sorted by `createdAt` in descending order (newest first)
- Returns total count of transactions for the wallet
- Supports pagination through `skip` and `limit` parameters

---

### Error Handling

All endpoints follow standard HTTP status codes:

- **200** - Success
- **400** - Bad Request (validation errors)
- **404** - Not Found (resource doesn't exist)
- **500** - Internal Server Error

Common error response format:

```json
{
  "message": "error_description",
  "error": "detailed_error_message"
}
```

## Frontend Design and View

### Operation page

<img width="2862" height="1344" alt="image" src="https://github.com/user-attachments/assets/5d590f28-7fbc-4444-ae4d-03d7dd20bf82" />

### Transaction Page

<img width="2840" height="1360" alt="image" src="https://github.com/user-attachments/assets/873bacee-3ebe-4417-b11d-785209402c08" />
