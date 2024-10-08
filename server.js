const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const recipeRoutes = require('./routes/recipeRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: ['https://recipe-sharing-web.vercel.app'],
  method: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}))

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/recipes', recipeRoutes);

app.use(express.static(path.resolve(__dirname, "frontend", "build")));


app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});


const PORT = process.env.PORT || 30003

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
