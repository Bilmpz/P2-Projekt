import express from "express"
import authRoutes from "./routes/authRoutes.js" 
import groupRoutes from "./routes/groupRoutes.js"
import postRoutes from "./routes/postRoutes.js"
import authMiddleware from "./middleware/authMiddleware.js"
import loadUserGroups from "./middleware/LoadUserGroups.js"
import cors from 'cors'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import cookieParser from "cookie-parser";
import expressLayouts from "express-ejs-layouts";


const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// --- Generel middleware (gælder alt) ---
app.use(cors({ origin: 'http://127.0.0.1:5500' }))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Active buttons
app.use((req, res, next) => {
    res.locals.currentPath = req.path;
    next();
});

// --- View engine ---
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "../../frontend/views"))
app.use(expressLayouts)
app.set("layout", "layouts/main")

// --- Statiske filer (public) ---
app.use(express.static(path.join(__dirname, '../../frontend/public')))

// --- PUBLIC ROUTES (ingen login krævet) --- 
app.get('/', (req, res) => {
    res.render("pages/index", { layout: false })
})
app.use("/auth", authRoutes)

// --- Herfra og ned: kræver login ---
app.use(authMiddleware)
app.use(loadUserGroups)

app.use("/main/post", postRoutes)
app.use("/main/groups", groupRoutes)
 

export default app