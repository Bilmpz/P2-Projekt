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
import messageRoutes from "./routes/messageRoutes.js"

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// --- Generel middleware (gælder alt) ---
app.use(cors({ origin: 'http://127.0.0.1:5500' }))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

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
app.use("/auth", authRoutes)   // <-- FLYTTET OP, før authMiddleware

// --- Herfra og ned: kræver login ---
app.use(authMiddleware)        // sætter req.userId
app.use(loadUserGroups)        // sætter res.locals.groups

app.use("/main/post", postRoutes)
app.use("/main/groups", groupRoutes)
app.use("/api/messages", messageRoutes)

export default app