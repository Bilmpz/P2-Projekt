import express from "express"
import authRoutes from "./routes/authRoutes.js" 
import groupRoutes from "./routes/groupRoutes.js"
import authMiddleware from "./middleware/authMiddleware.js"
import cors from 'cors'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'


const app = express()

app.use(cors({ origin: 'http://127.0.0.1:5500' }))
app.use(express.json())
app.use("/auth", authRoutes)
app.use("/groups", groupRoutes)

// Get the file path from the URL of the current module
const __filename = fileURLToPath(import.meta.url)
// Get the directory name from the file path
const __dirname = dirname(__filename)

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../../frontend"));



console.log(__dirname)
console.log(__filename)

//Middleware
app.use(express.json())
//Serves the HTML file from the /public dicrectory
// Tells express to serve all files from the public folder as static assets/ file. 
// Any requests for the css files will be resolved to the public directory
app.use(express.static(path.join(__dirname, '../../frontend')))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/Loginside/index.html'))
})


export default app