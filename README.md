<div align="center">

# 💰 FinTrack

### A personal finance management platform built with **FastAPI**, **React**, and **PostgreSQL**.

Track income, expenses, transfers, and multiple wallets while gaining meaningful financial insights through interactive dashboards and analytics. FinTrack was built to explore modern full-stack development practices while following clean architecture, scalable backend design, and modular frontend development.

<br>

![Python](https://img.shields.io/badge/Python-3.13-blue?logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-0.116-009688?logo=fastapi)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-17-336791?logo=postgresql)
![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-2.0-red)
![JWT](https://img.shields.io/badge/Auth-JWT-orange)
![Vite](https://img.shields.io/badge/Vite-Frontend-646CFF?logo=vite)
![License](https://img.shields.io/badge/Status-Active-success)

</div>

---

# Overview

FinTrack is a full-stack personal finance management application designed to help users organise and analyse their finances through a clean, intuitive interface.

The application enables users to manage multiple wallets, categorise expenses, record income and transfers, and visualise spending patterns through interactive charts and analytics. While offering a complete personal finance experience, the project also focuses on demonstrating production-inspired software architecture and engineering practices.

The backend is built using **FastAPI**, following a layered architecture consisting of **Routers**, **Services**, and **Queries**, ensuring a clear separation between HTTP handling, business logic, and database operations. The frontend is developed with **React**, using reusable components and a centralised API layer for predictable state management.

FinTrack was developed as a portfolio project to strengthen full-stack development skills while building an application that closely resembles the structure of modern production systems.

---

# Screenshots

> Replace the placeholders below with screenshots after deployment.

## Authentication

| Login | Register |
|-------|----------|
| ![](assets/login.png) | ![](assets/register.png) |

---

## Dashboard

![](assets/dashboard.png)

---

## Wallet Management

![](assets/wallets.png)

---

## Category Management

![](assets/categories.png)

---

## Transaction Management

![](assets/transactions.png)

---

## Analytics

![](assets/analytics.png)

---

## Profile

![](assets/profile.png)

---

# Features

## Authentication

- Secure user registration and login
- JWT-based authentication
- Protected API endpoints
- User-specific data isolation

---

## Dashboard

A centralised overview of the user's financial activity.

Features include:

- Financial summary cards
- Wallet overview
- Category overview
- Recent transactions
- Quick financial snapshot

---

## Wallet Management

Organise finances across multiple wallets.

Features include:

- Create wallets
- Edit wallet details
- Delete wallets
- Automatic balance updates

---

## Category Management

Organise expenses using custom categories.

Features include:

- Create categories
- Edit categories
- Delete categories
- Category-wise expense tracking

---

## Transaction Management

Supports three transaction types:

- Income
- Expense
- Transfer

Features include:

- Create transactions
- Edit transactions
- Automatic wallet balance updates
- Complete transaction history
- Linked transfer records between wallets

---

## Analytics

Gain insights into spending behaviour through interactive visualisations.

Metrics include:

- Savings Rate
- Average Daily Spending
- Largest Expense
- Largest Income
- Top Spending Category
- Most Used Wallet
- Most Active Spending Day
- Most Frequent Category
- Expense Transaction Count

Interactive Charts:

- Income vs Expense Bar Chart
- Category Breakdown Pie Chart

Supported Time Ranges:

- Last 7 Days
- Last 30 Days
- Last 90 Days
- Last 1 Year

---

## Profile

View account information and usage statistics.

Features include:

- User information
- Member since
- Wallet count
- Category count
- Transaction count
- Days active

---

# Tech Stack

| Category | Technology |
|----------|------------|
| Frontend | React 19 |
| Routing | React Router DOM |
| HTTP Client | Axios |
| Charts | Recharts |
| Icons | Lucide React |
| Backend | FastAPI |
| Language | Python 3 |
| ORM | SQLAlchemy 2.0 (Async) |
| Validation | Pydantic v2 |
| Database | PostgreSQL |
| Authentication | JWT |
| API Documentation | Swagger / OpenAPI |
| Build Tool | Vite |
| Version Control | Git & GitHub |
| Deployment | Vercel (Frontend), Render (Backend) |

# Architecture

FinTrack follows a layered architecture that separates request handling, business logic, and database operations into independent layers. This approach improves maintainability, readability, and scalability while keeping each layer focused on a single responsibility.

```text
                     React Frontend
                            │
                            │ Axios
                            ▼
                    FastAPI Router Layer
                            │
                            ▼
                     Service Layer
                            │
                            ▼
                      Query Layer
                            │
                            ▼
                     PostgreSQL Database
```

### Router Layer

The router layer defines all API endpoints and acts as the application's entry point.

Responsibilities:

- Receive HTTP requests
- Validate request parameters
- Authenticate protected endpoints
- Delegate requests to the service layer
- Return API responses

---

### Service Layer

The service layer contains all business logic.

Responsibilities include:

- Transaction validation
- Wallet balance updates
- Analytics generation
- Profile aggregation
- Coordinating multiple database queries

CRUD operations are handled in the service layer.

---

### Query Layer

The query layer contains all SQLAlchemy database query operations.

Responsibilities include:

- CRUD operations
- Aggregate queries
- Statistical calculations
- Database filtering
- Counting and summarising data

Keeping queries separate from services improves readability and allows database logic to be reused across multiple features.

---

### Schema Layer

Pydantic schemas define the API contract between the frontend and backend.

Schemas are divided into two categories:

- Domain Schemas
- Response Schemas

This separation clearly distinguishes database entities from API-specific response models.

---

### Frontend

The frontend follows a component-based architecture using React.

Each page retrieves data through a centralised Axios client before passing it down to reusable presentational components.

This approach results in predictable data flow, reusable UI components, and easier maintenance.

---

# Database Design

The application revolves around four primary entities.

```text
                 User
                  │
     ┌────────────┼────────────┐
     │            │            │
     ▼            ▼            ▼
  Wallet      Category    Transaction
                  ▲            │
                  └────────────┘
```

## User

Stores authentication and account information.

Primary fields:

- Name
- Email
- Password Hash
- Created At

Relationships:

- One User → Many Wallets
- One User → Many Categories
- One User → Many Transactions

---

## Wallet

Represents a financial account.

Examples:

- Cash
- Bank Account
- Credit Card
- Savings Account

Primary fields:

- Name
- Wallet Type
- Current Balance

Each wallet maintains its own running balance.

---

## Category

Used to organise expense transactions.

Examples:

- Food
- Shopping
- Transport
- Bills
- Entertainment

Categories belong to individual users and are used throughout analytics.

---

## Transaction

Represents every financial activity within the application.

Each transaction stores:

- Wallet
- Category (nullable)
- Amount
- Transaction Type
- Note
- Timestamp

Supported transaction types:

- Income
- Expense
- Transfer

Transfers are internally represented using two linked transaction records sharing a common transfer identifier.

---

# Key Design Decisions

## Layered Backend Architecture

The backend separates routing, business logic, and database operations into independent layers.

Benefits:

- Improved maintainability
- Better readability
- Easier testing
- Cleaner code organisation

---

## Dedicated Query Layer

Rather than placing SQLAlchemy queries inside services, every database operation is isolated into dedicated query modules.

This allows services to focus purely on business logic while making query functions reusable across multiple features.

---

## Automatic Wallet Balance Management

Wallet balances are updated whenever transactions are created, edited, or transferred.

This avoids recalculating balances on every request, significantly improving performance while maintaining consistency.

---

## Transfer Representation

Transfers are stored as two transaction records linked through a shared transfer identifier.

This design ensures:

- Accurate wallet histories
- Simple balance updates
- Complete audit trails
- Cleaner analytics

---

## Aggregated Analytics Endpoint

Instead of making separate requests for every chart and summary card, all analytics data is generated server-side and returned through a single endpoint.

Benefits:

- Fewer frontend requests
- Faster page loading
- Simpler state management
- Easier future expansion

---

## Response Schemas

Dashboard, Analytics, and Profile responses are separated from entity schemas.

This keeps API response models independent from database models and makes complex aggregated responses easier to maintain.

---

## Async Database Operations

The backend uses SQLAlchemy's asynchronous API together with FastAPI.

Benefits include:

- Non-blocking database operations
- Better scalability
- Improved request handling under concurrent load

---

## Component-Based Frontend

The frontend is built using reusable React components.

Each page is composed of smaller UI components that receive data through props rather than performing independent API requests.

This keeps components reusable, predictable, and easy to test.

# API Overview

The backend exposes a RESTful API built with FastAPI. All protected endpoints require a valid JWT access token.

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Authenticate a user |
| GET | `/api/auth/me` | Retrieve current user information |
| GET | `/api/dashboard` | Retrieve dashboard summary |
| GET | `/api/profile` | Retrieve profile information |
| GET | `/api/analytics` | Retrieve analytics data |
| GET / POST / PATCH / DELETE | `/api/wallet` | Wallet management |
| GET / POST / PATCH / DELETE | `/api/category` | Category management |
| GET / POST / PATCH | `/api/transaction` | Transaction management |
| POST | `/api/transaction/transfer` | Transfer funds between wallets |

---

# Installation

## Clone the Repository

```bash
git clone https://github.com/<your-username>/FinTrack.git
cd FinTrack
```

---

## Backend Setup

Create a virtual environment.

```bash
python -m venv .venv
```

Activate the virtual environment.

**Windows**

```bash
.venv\Scripts\activate
```

**Linux / macOS**

```bash
source .venv/bin/activate
```

Install dependencies.
(requirements.txt contains extra dependencies because I built this project in a shared virtual environment by mistake)

```bash
pip install -r requirements.txt
```

Configure the environment variables.

```bash
cp .env.example .env
```

Run the backend.

```bash
uvicorn app.main:app --reload
```

---

## Frontend Setup

Navigate to the frontend.

```bash
cd frontend
```

Install dependencies.

```bash
npm install
```

Start the development server.

```bash
npm run dev
```

The frontend will be available at:

```text
http://localhost:5173
```

---

# Environment Variables

## Backend

Create a `.env` file inside the backend directory.

```env
DATABASE_URL=postgresql+asyncpg://<username>:<password>@localhost:5432/fintrack

SECRET_KEY=your_secret_key

ALGORITHM=HS256

ACCESS_TOKEN_EXPIRE_MINUTES=30
```

---

# Acknowledgements

This project focuses not only on implementing features but also on applying software engineering principles such as clean architecture, modular design, separation of concerns, and maintainable code.

Building FinTrack provided hands-on experience with designing scalable REST APIs, managing relational databases, structuring full-stack applications, and integrating interactive data visualisation into a modern web application.

---

<div align="center">

### ⭐ If you found this project interesting, consider giving it a star!

</div>