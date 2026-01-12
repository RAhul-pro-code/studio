# Invoice Recovery CRM

This is a mini internal CRM built with Next.js that allows PayAssured to track clients, their unpaid invoices, and the recovery and follow-up progress.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Form Management**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Data Fetching & Mutations**: Next.js Server Actions

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:9002](http://localhost:9002) with your browser to see the result.

## Database Schema

This project uses in-memory mock data to simulate a database. The intended relational schema is as follows:

### `clients` table

| Column         | Type         | Constraints            |
|----------------|--------------|------------------------|
| `id`           | `VARCHAR(255)` | `PRIMARY KEY`          |
| `client_name`  | `VARCHAR(255)` | `NOT NULL`             |
| `company_name` | `VARCHAR(255)` | `NOT NULL`             |
| `city`         | `VARCHAR(255)` | `NOT NULL`             |
| `contact_person`|`VARCHAR(255)` | `NOT NULL`             |
| `phone`        | `VARCHAR(255)` | `NOT NULL`             |
| `email`        | `VARCHAR(255)` | `NOT NULL`, `UNIQUE`   |
| `created_at`   | `TIMESTAMP`  | `DEFAULT CURRENT_TIMESTAMP` |

### `cases` table

| Column               | Type         | Constraints                 |
|----------------------|--------------|-----------------------------|
| `id`                 | `VARCHAR(255)` | `PRIMARY KEY`               |
| `client_id`          | `VARCHAR(255)` | `FOREIGN KEY (clients.id)`  |
| `invoice_number`     | `VARCHAR(255)` | `NOT NULL`                  |
| `invoice_amount`     | `DECIMAL(10,2)`| `NOT NULL`                  |
| `invoice_date`       | `DATE`       | `NOT NULL`                  |
| `due_date`           | `DATE`       | `NOT NULL`                  |
| `status`             | `VARCHAR(50)`| `NOT NULL`                  |
| `last_follow_up_notes`| `TEXT`       |                             |
| `created_at`         | `TIMESTAMP`  | `DEFAULT CURRENT_TIMESTAMP` |
