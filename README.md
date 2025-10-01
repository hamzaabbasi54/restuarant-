# Food Blog – Recipes App

A full‑stack MERN application for creating, browsing, liking, editing and deleting food recipes with image uploads, JWT-based login, and a clean, responsive UI.

## Features
- User authentication (signup/login) with JWT
- Create, read, update, and delete recipes (CRUD)
- Image upload for recipe cover images (Multer + static hosting)
- Like/favorite recipes (client-side persisted in localStorage)
- “My Recipes” page for logged-in users (edit/delete controls)
- “Favorites” page that aggregates liked recipes
- Recipe details page with formatted content
- Responsive, card-based grid layout

## Tech Stack
- Backend: Node.js, Express, MongoDB, Mongoose, Multer, JWT, CORS
- Frontend: React (Vite), React Router, React Icons, Axios
- Runtime: Node 18+

## Project Structure
```text
food/
  backend/
    config/connectionDb.js        # MongoDB connection (Mongoose)
    controller/
      recipe.js                   # Recipe CRUD + upload controller
      user.js                     # Auth: signup, login, getUser
    models/
      recipe.js                   # Recipe schema/model
      user.js                     # User schema/model
    public/images/                # Uploaded images (served statically)
    routes/
      recipe.js                   # /recipe API routes
      user.js                     # /signup, /login, /user/:id
    server.js                     # Express app bootstrap
    package.json
  frontend/
    src/
      components/                 # Navbar, Footer, RecipeItem, etc.
      pages/                      # Home, MyRecipes, Add/Edit, FavRecipes, RecipeDetails
      App.jsx                     # Global routing and state
      App.css                     # Global styles
    package.json
```

## Data Models (MongoDB)
- Recipe (`models/recipe.js`)
  - `title: String` (required)
  - `ingredients: Array` of strings (required)
  - `instruction: String` (required)
  - `time: Number` (required; minutes)
  - `coverImage: String | null` (server filename)
- User (`models/user.js`)
  - `email: String` (required, unique)
  - `password: String` (bcrypt hash)

## Backend API
Base URL: `http://localhost:3000`

- Auth
  - `POST /signup` – body: `{ email, password }` → `{ token, user }`
  - `POST /login` – body: `{ email, password }` → `{ token, user }`
  - `GET /user/:id` – returns public user info
- Recipes (`routes/recipe.js`)
  - `GET /recipe` – list all recipes
  - `GET /recipe/:id` – get a recipe by id
  - `POST /recipe` – create recipe with multipart form data
    - fields: `title`, `time`, `ingredients` (comma-separated), `instruction`, `file` (image)
    - requires header: `authorization: bearer <token>`
  - `PUT /recipe/:id` – update recipe (JSON body)
  - `DELETE /recipe/:id` – delete recipe by id

### Image Uploads
- Handled by Multer (`controller/recipe.js`) with disk storage
- Files saved to `backend/public/images`
- Served via `express.static('public')` → image URL: `http://localhost:3000/images/<filename>`

## Frontend Overview
- Routing (`App.jsx`)
  - `/` (Home): shows hero + latest recipes grid, heart to like when logged in
  - `/myrecipe`: shows recipes list with edit/delete (only when logged in)
  - `/favrecipe`: shows liked recipes (localStorage-backed)
  - `/addrecipe`: create a recipe (multipart form)
  - `/edit/:id`: edit a recipe (pre-filled form)
  - `/recipe/:id`: recipe details page
- Global State in `App.jsx`
  - `recipes` – fetched from backend
  - `favoriteIds` – liked recipe ids (persisted to `localStorage`)
  - `isLogin` – derived from `localStorage.token`, with `storage` event syncing
  - Updaters exposed to pages/components:
    - `handleRecipeAdded(newRecipe)` – prepends to `recipes`
    - `handleRecipeDeleted(id)` – removes from `recipes`
    - `handleToggleFavorite(id)` – toggles id in `favoriteIds`
- Major Components
  - `RecipeItem` – renders a grid of recipe cards with image, title, time, heart; conditional edit/delete actions
  - `Navbar` – login modal launcher and guarded nav links
  - `Modal`, `InputForm` – login/signup UX

## Auth & Guarding UI
- Login state comes from `localStorage.getItem('token')`
- Edit/Delete action icons are only visible where `isLogin === true`
- Heart (like) only shows when logged in
- Navigating to “my recipe” and “favourites” prompts login when not authenticated

## Favorites
- Client-only persistence using `localStorage.favoriteRecipeIds`
- `FavRecipes` filters `recipes` by `favoriteIds`
- Heart icon toggles membership in `favoriteIds`

## Styling
- Responsive grid via CSS grid (`.card-container` with `auto-fill`/`minmax`)
- Cards are consistent height with cropped images
- Spacing avoids navbar overlap; `.recipe { margin-top: 6rem }`

## Environment Setup
### Prerequisites
- Node.js 18+
- MongoDB instance (local or Atlas)

### Environment Variables (backend)
Create `backend/.env` with these keys (do not commit values):
- `CONNECTION_STRING`
- `SECRET_KEY`
- `PORT`

### Install & Run
Open two terminals.

Backend:
```bash
cd backend
npm install
npm run dev
```

Frontend:
```bash
cd frontend
npm install
npm run dev
```
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`

## Using the App
1. Click “login” and create/login a user.
2. “Share Your recipe” to add a new recipe (image optional).
3. Click a card to open its details page.
4. Heart a card to add to favourites (only logged-in).
5. Go to “my recipe” to edit or delete (only logged-in).
6. “favourites” shows the liked recipes list.

## API Notes & Examples
Create recipe (curl):
```bash
curl -X POST http://localhost:3000/recipe \
  -H "authorization: bearer <TOKEN>" \
  -F title="Margherita Pizza" \
  -F time=25 \
  -F ingredients="flour, yeast, tomatoes, mozzarella" \
  -F instruction="Knead, proof, top, bake" \
  -F file=@/path/to/image.jpg
```

Update recipe:
```bash
curl -X PUT http://localhost:3000/recipe/<ID> \
  -H 'Content-Type: application/json' \
  -d '{"title":"New Title","time":30,"ingredients":["a","b"],"instruction":"..."}'
```

## Security Considerations
- JWT expiry is 1h; tokens are stored in `localStorage` (sufficient for demo, not ideal for high‑security apps)
- No server-side authorization checks are implemented for recipe ownership; add middleware to validate the user owns the recipe before edit/delete
- File uploads: consider validating mime types and using a CDN/object storage in production

## Deployment Tips
- Serve frontend as static assets (Vite build) behind a reverse proxy
- Host backend behind HTTPS (e.g., Nginx) and set appropriate CORS and security headers
- Use environment variables for secrets and DB strings
- Store images in object storage (S3, Cloud Storage) rather than local disk

## Troubleshooting
- “Navbar overlap” – ensure `.recipe { margin-top: 6rem }` is present
- Images not loading – confirm `express.static('public')` and filename stored in DB; check `http://localhost:3000/images/<filename>`
- Login not reflected – token lives in `localStorage`; the app listens to `storage` events but a full page refresh may be needed if other tabs modify it
- Favorites missing after reload – ensure `localStorage.favoriteRecipeIds` is set and valid JSON

## Scripts
Backend:
- `npm run dev` – start server with nodemon

Frontend:
- `npm run dev` – start Vite dev server
- `npm run build` – production build
- `npm run preview` – preview build locally

## License
MIT (or your preferred license)
