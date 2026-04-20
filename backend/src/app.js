import express from "express"
import authRoutes from "./routes/authRoutes.js" 
import groupRoutes from "./routes/groupRoutes.js"
import authMiddleware from "./middleware/authMiddleware.js"
import cors from 'cors'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'
import cookieParser from "cookie-parser";
import expressLayouts from "express-ejs-layouts";
import { getGroupsPage } from "./controllers/groupController.js"


const app = express()

app.use(cors({ origin: 'http://127.0.0.1:5500' }))
app.use(cookieParser())
app.use(express.json())

const __filename = fileURLToPath(import.meta.url)
// Get the directory name from the file path
const __dirname = dirname(__filename)

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../../frontend/views"));

app.use(expressLayouts);
app.set("layout", "layouts/main");


app.use("/auth", authRoutes)
//app.use("/groups", authMiddleware, groupRoutes)
app.use("/main/groups", authMiddleware, groupRoutes)

// Get the file path from the URL of the current module








console.log(__dirname)
console.log(__filename)

//Serves the HTML file from the /public dicrectory
// Tells express to serve all files from the public folder as static assets/ file. 
// Any requests for the css files will be resolved to the public directory
app.use(express.static(path.join(__dirname, '../../frontend/public')))

app.get('/', (req, res) => {
    //res.sendFile(path.join(__dirname, '../../frontend/index.html'))
    res.render("pages/index", { layout: false })
})


export default app