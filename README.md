# PetAd Backend 🐾

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![NestJS](https://img.shields.io/badge/NestJS-10+-E0234E.svg)](https://nestjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16+-336791.svg)](https://www.postgresql.org/)
[![Stellar](https://img.shields.io/badge/Stellar-Blockchain-7D00FF.svg)](https://stellar.org/)

A robust, scalable backend API and Stellar blockchain integration layer for the PetAd platform, enabling secure pet adoption and temporary custody management with blockchain-backed trust guarantees.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Environment Setup](#environment-setup)
  - [Database Setup](#database-setup)
  - [Stellar Setup](#stellar-setup)
  - [Running the Server](#running-the-server)
- [Project Structure](#project-structure)
- [Core Workflows](#core-workflows)
  - [Adoption Process](#adoption-process)
  - [Temporary Custody](#temporary-custody)
- [API Documentation](#api-documentation)
- [Security](#security)
- [Scripts](#scripts)
- [Testing](#testing)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)

---

## 🌟 Overview

PetAd Backend is the server-side application powering the PetAd platform. It manages all business logic, user authentication, pet data, and orchestrates blockchain escrow operations via the Stellar network. The backend serves as the trusted intermediary between users and the blockchain, ensuring secure, transparent pet adoption and custody transactions.

---

## ✨ Features

- **🔐 Authentication & Authorization** - JWT-based auth with role-based access control (RBAC)
- **🐕 Pet Management** - CRUD operations for pet listings with advanced search
- **❤️ Adoption Workflows** - End-to-end adoption process management
- **⏰ Temporary Custody Lifecycle** - Time-bound pet custody agreements
- **💰 Escrow & Payments** - Stellar blockchain-backed payment processing
- **📄 Document Management** - Secure upload, storage, and verification
- **🔔 Background Jobs** - Scheduled tasks and event-driven notifications
- **📊 Audit Logging** - Comprehensive activity tracking for compliance
- **🔗 Blockchain Integration** - Stellar SDK for on-chain trust layer

---

## 🛠️ Tech Stack

| Technology | Purpose | Version |
|------------|---------|---------|
| **NestJS** | Progressive Node.js framework | 10+ |
| **TypeScript** | Type-safe backend development | 5.0+ |
| **PostgreSQL** | Primary relational database | 16+ |
| **Prisma ORM** | Type-safe database client | Latest |
| **Redis** | Caching and job queues | 7+ |
| **Stellar SDK** | Blockchain integration | Latest |
| **Passport** | Authentication middleware | Latest |
| **Bull** | Background job processing | Latest |

---

## 🏗️ Architecture

```
┌─────────────────┐
│   Frontend      │
│   (React)       │
└────────┬────────┘
         │ REST API
         ▼
┌─────────────────────────────────────┐
│         NestJS Backend              │
│  ┌──────────────────────────────┐  │
│  │  Controllers & Services      │  │
│  └──────────────────────────────┘  │
│  ┌──────────────────────────────┐  │
│  │  Business Logic Layer        │  │
│  └──────────────────────────────┘  │
│  ┌──────────────────────────────┐  │
│  │  Stellar Integration Layer   │  │
│  └──────────────────────────────┘  │
└─────┬───────────────────┬──────────┘
      │                   │
      ▼                   ▼
┌──────────────┐   ┌──────────────┐
│  PostgreSQL  │   │    Redis     │
│  (Prisma)    │   │  (Cache/Jobs)│
└──────────────┘   └──────────────┘
      │
      ▼
┌──────────────────────────────┐
│   Stellar Blockchain         │
│   (Testnet/Mainnet)          │
└──────────────────────────────┘
```

---

## 📦 Prerequisites

Ensure you have the following installed:

- **Node.js** `>= 20.0.0`
- **npm** `>= 10.0.0` or **pnpm** `>= 8.0.0`
- **PostgreSQL** `>= 16.0`
- **Redis** `>= 7.0`
- **Docker** (optional, for containerized setup)

**Check versions:**

```bash
node --version
npm --version
psql --version
redis-server --version
```

---

## 🚀 Getting Started

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-org/petad-backend.git
cd petad-backend
```

2. **Install dependencies**

```bash
npm install
```

Or using pnpm:

```bash
pnpm install
```

---

### Environment Setup

Create a `.env` file in the project root:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/petad

# Redis
REDIS_URL=redis://localhost:6379

# Stellar Configuration
STELLAR_NETWORK=testnet  # Options: testnet | public
STELLAR_SECRET_KEY=S...  # Your Stellar secret key
STELLAR_PUBLIC_KEY=G...  # Your Stellar public key
STELLAR_HORIZON_URL=https://horizon-testnet.stellar.org

# Authentication
JWT_SECRET=your-super-secure-jwt-secret-min-32-chars
JWT_EXPIRATION=7d

# Application
PORT=3000
NODE_ENV=development

# File Upload
MAX_FILE_SIZE=10485760  # 10MB in bytes
UPLOAD_DEST=./uploads

# Email (Optional)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=

# Monitoring (Optional)
SENTRY_DSN=
```

> **⚠️ CRITICAL:** Never commit `.env` files or secret keys to version control. Add `.env` to `.gitignore`.

---

### Database Setup

1. **Create PostgreSQL database**

```bash
createdb petad
```

2. **Run migrations**

```bash
npx prisma migrate dev --name init
```

3. **Generate Prisma Client**

```bash
npx prisma generate
```

4. **Seed database (optional)**

```bash
npm run seed
```

**View database in Prisma Studio:**

```bash
npx prisma studio
```

---

### Stellar Setup

#### Create a Testnet Wallet

1. **Generate a new keypair** using Stellar Laboratory:
   - Visit: https://laboratory.stellar.org/#account-creator?network=test

2. **Fund your account** using Friendbot:
   - Visit: https://friendbot.stellar.org
   - Enter your public key
   - Click "Get test network lumens"

3. **Add keys to `.env`:**

```env
STELLAR_NETWORK=testnet
STELLAR_SECRET_KEY=S...  # Keep this secret!
STELLAR_PUBLIC_KEY=G...  # Your account address
```

#### Production Setup (Mainnet)

For production, use a **hardware wallet** or **secure key management service**:

```env
STELLAR_NETWORK=public
STELLAR_HORIZON_URL=https://horizon.stellar.org
```

> **🔒 Security Best Practice:** Never store mainnet secret keys in `.env` files. Use environment variables, secrets managers (AWS Secrets Manager, HashiCorp Vault), or hardware security modules (HSMs).

---

### Running the Server

**Development mode** (with hot reload):

```bash
npm run start:dev
```

**Production mode:**

```bash
npm run build
npm run start:prod
```

**Debug mode:**

```bash
npm run start:debug
```

The API will be available at:

```
http://localhost:3000
```

**Health check:**

```bash
curl http://localhost:3000/health
```

---

## 📁 Project Structure

```
src/
├── auth/                 # Authentication & authorization
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── jwt.strategy.ts
│   └── guards/
├── users/                # User management
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── dto/
├── pets/                 # Pet listings and management
│   ├── pets.controller.ts
│   ├── pets.service.ts
│   └── entities/
├── adoption/             # Adoption workflow
│   ├── adoption.controller.ts
│   ├── adoption.service.ts
│   └── dto/
├── custody/              # Temporary custody management
│   ├── custody.controller.ts
│   ├── custody.service.ts
│   └── entities/
├── payments/             # Payment processing
│   ├── payments.controller.ts
│   ├── payments.service.ts
│   └── dto/
├── stellar/              # Blockchain integration layer
│   ├── stellar.service.ts
│   ├── stellar.module.ts
│   ├── escrow.service.ts
│   └── utils/
├── jobs/                 # Background job processing
│   ├── jobs.module.ts
│   └── processors/
├── notifications/        # Email & push notifications
│   ├── notifications.service.ts
│   └── templates/
├── common/               # Shared utilities
│   ├── decorators/
│   ├── filters/
│   ├── guards/
│   ├── interceptors/
│   └── pipes/
├── config/               # Configuration management
│   └── configuration.ts
├── prisma/               # Database schema and migrations
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
├── main.ts               # Application entry point
└── app.module.ts         # Root module
```

**Key Directories:**

- **`auth/`** - JWT authentication, guards, strategies
- **`stellar/`** - All blockchain-related code (escrow, transactions)
- **`jobs/`** - Bull queues for background tasks (custody timers, notifications)
- **`common/`** - Shared decorators, filters, pipes, guards
- **`prisma/`** - Database schema, migrations, seed data

---

## 🔄 Core Workflows

### Adoption Process

```
┌──────────────────────────────────────────────────────────┐
│               Adoption Workflow                          │
└──────────────────────────────────────────────────────────┘

1. User submits adoption request
   ├─→ POST /adoption/requests
   └─→ {petId, userId, documents, reason}

2. Backend validates documents
   ├─→ Document verification service
   ├─→ Background check (optional)
   └─→ Status: PENDING_REVIEW

3. Admin approves request
   ├─→ PATCH /adoption/requests/:id/approve
   └─→ Status: APPROVED

4. Escrow created on Stellar
   ├─→ Stellar service creates 2-of-2 multisig escrow
   ├─→ Adoption fee locked
   └─→ Transaction hash recorded

5. Adoption finalized
   ├─→ POST /adoption/complete/:id
   ├─→ Escrow released to shelter
   ├─→ On-chain receipt created
   └─→ Status: COMPLETED

6. Notifications sent
   ├─→ Email to adopter
   ├─→ Email to shelter
   └─→ Push notification
```

**Code Example:**

```typescript
// adoption/adoption.service.ts
async createAdoption(dto: CreateAdoptionDto) {
  // 1. Validate pet availability
  const pet = await this.prisma.pet.findUnique({
    where: { id: dto.petId }
  });
  
  if (!pet || pet.status !== 'AVAILABLE') {
    throw new BadRequestException('Pet not available');
  }

  // 2. Create adoption request
  const adoption = await this.prisma.adoption.create({
    data: {
      ...dto,
      status: 'PENDING_REVIEW'
    }
  });

  // 3. Create Stellar escrow
  const escrow = await this.stellarService.createEscrow({
    amount: pet.adoptionFee,
    adopter: dto.userId,
    shelter: pet.shelterId
  });

  // 4. Update with blockchain reference
  return this.prisma.adoption.update({
    where: { id: adoption.id },
    data: { 
      escrowId: escrow.transactionHash,
      status: 'ESCROW_CREATED'
    }
  });
}
```

---

### Temporary Custody

```
┌──────────────────────────────────────────────────────────┐
│            Temporary Custody Workflow                    │
└──────────────────────────────────────────────────────────┘

1. Custody agreement created
   ├─→ POST /custody/create
   └─→ {petId, duration, deposit}

2. Escrow locked on Stellar
   ├─→ Time-locked escrow contract
   ├─→ Deposit held in multisig account
   └─→ Status: ACTIVE

3. Background timer scheduled
   ├─→ Bull queue job created
   ├─→ Cron: Check custody end time
   └─→ Notifications sent before expiry

4. Custody completion
   ├─→ Auto-release at end time OR
   ├─→ Manual early completion
   └─→ Escrow released based on conditions

5. Settlement
   ├─→ No violations → Full deposit returned
   ├─→ Violations → Partial/no refund
   └─→ Status: COMPLETED
```

**Code Example:**

```typescript
// custody/custody.service.ts
async createCustody(dto: CreateCustodyDto) {
  // 1. Create custody agreement
  const custody = await this.prisma.custody.create({
    data: {
      ...dto,
      startDate: new Date(),
      endDate: addDays(new Date(), dto.durationDays),
      status: 'PENDING'
    }
  });

  // 2. Lock escrow
  const escrow = await this.stellarService.createTimeLockEscrow({
    amount: dto.deposit,
    custodian: dto.userId,
    releaseDate: custody.endDate
  });

  // 3. Schedule completion job
  await this.jobsService.scheduleCustodyCompletion({
    custodyId: custody.id,
    executeAt: custody.endDate
  });

  return custody;
}
```

---

## 📚 API Documentation

### Base URL

```
http://localhost:3000/api/v1
```

### Authentication

All protected endpoints require a JWT token:

```bash
Authorization: Bearer <your-jwt-token>
```

### Key Endpoints

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| `POST` | `/auth/register` | Create new user account | ❌ |
| `POST` | `/auth/login` | Login and receive JWT | ❌ |
| `GET` | `/pets` | List all available pets | ❌ |
| `GET` | `/pets/:id` | Get pet details | ❌ |
| `POST` | `/adoption/requests` | Submit adoption request | ✅ |
| `PATCH` | `/adoption/:id/approve` | Approve adoption (admin) | ✅ Admin |
| `POST` | `/custody/create` | Create custody agreement | ✅ |
| `GET` | `/users/me` | Get current user profile | ✅ |

**Swagger Documentation:**

Access interactive API docs at:

```
http://localhost:3000/api/docs
```

---

## 🔒 Security

### Best Practices Implemented

✅ **No Personal Data on Blockchain**
- Only transaction hashes and escrow IDs stored on-chain
- PII remains in encrypted PostgreSQL database

✅ **Encrypted Document Storage**
- Files encrypted at rest using AES-256
- Access controlled via signed URLs with expiration

✅ **Backend Signs All Blockchain Transactions**
- Private keys never exposed to frontend
- All Stellar transactions server-signed

✅ **Role-Based Access Control (RBAC)**
- `USER`, `ADMIN`, `SHELTER` roles
- Guards enforce permissions at controller level

✅ **Audit Logging**
- All sensitive operations logged with timestamps
- User actions tracked for compliance

✅ **Input Validation**
- DTOs with `class-validator` decorators
- SQL injection prevention via Prisma ORM
- XSS protection through sanitization

✅ **Rate Limiting**
- Prevents brute force attacks
- Configurable per endpoint

### Security Headers

```typescript
// main.ts
app.use(helmet());
app.enableCors({
  origin: process.env.FRONTEND_URL,
  credentials: true
});
```

---

## 📜 Scripts

| Command | Description |
|---------|-------------|
| `npm run start` | Start application |
| `npm run start:dev` | Development mode with hot reload |
| `npm run start:debug` | Debug mode |
| `npm run start:prod` | Production mode |
| `npm run build` | Build for production |
| `npm run test` | Run unit tests |
| `npm run test:e2e` | Run end-to-end tests |
| `npm run test:cov` | Generate coverage report |
| `npm run lint` | Lint code with ESLint |
| `npm run format` | Format code with Prettier |
| `npm run prisma:migrate` | Run database migrations |
| `npm run prisma:generate` | Generate Prisma Client |
| `npm run prisma:studio` | Open Prisma Studio |
| `npm run seed` | Seed database with sample data |

---

## 🧪 Testing

### Unit Tests

```bash
npm run test
```

### E2E Tests

```bash
npm run test:e2e
```

### Coverage Report

```bash
npm run test:cov
```

**Example Test:**

```typescript
// adoption/adoption.service.spec.ts
describe('AdoptionService', () => {
  let service: AdoptionService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AdoptionService, PrismaService, StellarService],
    }).compile();

    service = module.get<AdoptionService>(AdoptionService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should create adoption request', async () => {
    const dto = { petId: '1', userId: 'user-1', reason: 'Love pets' };
    const result = await service.createAdoption(dto);
    
    expect(result.status).toBe('PENDING_REVIEW');
    expect(result.petId).toBe('1');
  });
});
```

---

## 🚀 Deployment

### Recommended Stack

| Component | Service | Notes |
|-----------|---------|-------|
| **Backend** | AWS ECS / Google Cloud Run / Railway | Docker container |
| **Database** | AWS RDS PostgreSQL / Supabase | Managed service |
| **Redis** | AWS ElastiCache / Upstash | Managed Redis |
| **Storage** | AWS S3 / Cloudflare R2 | Document uploads |
| **Monitoring** | Sentry / DataDog | Error tracking |

---

### Docker Deployment

**Dockerfile:**

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY package*.json ./
EXPOSE 3000
CMD ["node", "dist/main"]
```

**Build and run:**

```bash
docker build -t petad-backend .
docker run -p 3000:3000 --env-file .env petad-backend
```

---

### Docker Compose (Local Development)

```yaml
version: '3.8'

services:
  backend:
    build: .
    ports:
      - "3000:3000"
    env_file: .env
    depends_on:
      - postgres
      - redis

  postgres:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: petad
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  pgdata:
```

**Start services:**

```bash
docker-compose up -d
```

---

### Environment Variables (Production)

Ensure these are set in your deployment platform:

```bash
DATABASE_URL=postgresql://...
REDIS_URL=redis://...
STELLAR_NETWORK=public
STELLAR_SECRET_KEY=<use-secrets-manager>
JWT_SECRET=<use-secrets-manager>
NODE_ENV=production
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Write tests** for new functionality
4. **Ensure all tests pass** (`npm run test`)
5. **Lint your code** (`npm run lint`)
6. **Commit with conventional commits** (`feat:`, `fix:`, `docs:`, etc.)
7. **Push to your fork** (`git push origin feature/amazing-feature`)
8. **Open a Pull Request**

**Code Review Checklist:**
- [ ] Tests added/updated
- [ ] Documentation updated
- [ ] No security vulnerabilities introduced
- [ ] Environment variables documented
- [ ] Breaking changes clearly noted

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with ❤️ for transparent, trustworthy pet adoption
- Powered by [Stellar](https://stellar.org) blockchain technology
- Inspired by the mission to connect pets with loving homes

---

## 📞 Support

For questions, issues, or feature requests:

- **GitHub Issues:** [github.com/your-org/petad-backend/issues](https://github.com/your-org/petad-backend/issues)
- **Email:** dev@petad.com
- **Discord:** [Join our developer community](https://discord.gg/petad)
- **Documentation:** [docs.petad.com](https://docs.petad.com)

---

## 🔗 Related Projects

- **Frontend:** [petad-frontend](https://github.com/your-org/petad-frontend)
- **Mobile App:** [petad-mobile](https://github.com/your-org/petad-mobile)
- **Smart Contracts:** [petad-contracts](https://github.com/your-org/petad-contracts)

---

**Made with 🐾 by the PetAd Team**
