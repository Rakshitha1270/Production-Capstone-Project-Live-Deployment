# Capstone Catalog — Production Capstone Project

A responsive catalog-management web app built with HTML, CSS, and vanilla JavaScript.

## Features
- Responsive layout for desktop and mobile
- Demo Login and Register UI
- Create, read, update, and delete catalog items (CRUD)
- Search by item name, category, or description
- Catalog and demo session persistence using browser `localStorage`
- Delete confirmation and Indian Rupee price formatting
- Starter catalog data

## Run locally
1. Extract the ZIP.
2. Open `index.html` in a modern browser.
3. No build step or package installation is needed.

## Deploy with GitHub Pages
1. Create a **public** GitHub repository, for example `production-capstone-catalog`.
2. Upload `index.html`, `style.css`, `script.js`, and `README.md` to the repository root.
3. Open **Settings → Pages**.
4. Under Build and deployment, select **Deploy from a branch**.
5. Select branch `main` and folder `/ (root)`, then Save.
6. Wait for publishing. Copy the public URL shown in Settings → Pages.

You can also deploy this static folder using Netlify.

## Architecture
```text
Browser
 ├── index.html  → page structure and forms
 ├── style.css   → responsive user interface
 └── script.js   → events, CRUD, search, localStorage
                       └── Browser localStorage
```

## Important security note
This is a **front-end demonstration**, not production-secure authentication. The login form does not verify real credentials or issue JWTs. Data is saved only in the current browser, not in a shared database. Do not enter a real password. For production, implement a backend API, password hashing, server-side authentication/authorization, and a database.

## Submission
Submit both:
- **GitHub repository URL** — your actual public repository URL.
- **Live deployment URL** — the URL shown by GitHub Pages or Netlify after deployment.

Replace example names with your actual repository and published URL.
