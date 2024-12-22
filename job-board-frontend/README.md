# Helper4U Jobs Frontend

This is the frontend for the **Helper4U Jobs** platform, built using Next.js. It allows admins to manage job postings and users to interact with the job listing and application functionalities.

---

## Features

- **Admin Dashboard**:
  - Authenticate admin users.
  - Add new job listings.
  - View all job listings.

---

## Requirements

- Node.js (v14+ recommended)
- Supabase Project with Authentication Enabled

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/Sha1kh4/Helper
cd helper4u-jobs/job-board-frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run the Development Server

```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`.

---

## Deployment

To deploy the frontend, use any static hosting provider like Vercel or Netlify.

1. Build the production files:

   ```bash
   npm run build
   ```

2. Serve the files:
   ```bash
   npm start
   ```

---

## Directory Structure

- `pages/`: Contains all route files for the app.
- `components/`: Shared React components.
- `utils/`: Contains utility functions, such as the Supabase client.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Author

**Shaikh Adnan**  
[Portfolio](https://sha1kh4.me) | [Resume](https://sha1kh4.me/resume)
