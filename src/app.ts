import express, { Application, Request, Response } from 'express';
import connectDB from './config';
import 'dotenv/config';
import morgan from 'morgan';
import router from './routes';
import path from 'path';
import cors from "cors";
import errorHandler from './middleware/errorHandler';
const app: Application = express();



// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cors({
  origin: '*',
}));
connectDB();
//upload
app.use("/uploads", express.static(path.join(__dirname, '../uploads')));

// Routes
app.get("/", (req, res) => {
  res.send("API is running");
});
app.use('/api/v1', router);
app.use("*", (req: Request, res: Response) => {
  res.status(404).json({ success: false, message: "Route not found" });
});
app.use(errorHandler)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});