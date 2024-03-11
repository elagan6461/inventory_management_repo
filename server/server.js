const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const cookieParser = require('cookie-parser')
app.use(express.json(), express.urlencoded({ extended:true }))
app.use(cors({credentials:true, origin:'http://localhost:5173'}))
app.use(cookieParser())
require('./config/mongoose.config')
const userRoutes = require('./routes/user.routes')
userRoutes(app)

require('./config/mongoose.config')

require('./routes/inventory.routes')(app)

app.listen(8000, () => console.log('The server is running on Port 8000'));
