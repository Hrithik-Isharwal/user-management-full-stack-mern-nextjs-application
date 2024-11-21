const express = require('express');
const userRoutes = require('./routes/userRoutes');
const sequelize = require('./config/index');
const User = require('./models/users');
const app = express();

const cors = require('cors');
app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json());

require('./config/index');

const port = 8080;

app.use('/api', userRoutes);

app.get('/', function(req, res){
    res.send("Home Page");
})

sequelize.sync({ force: false })
  .then(() => {
    console.log('Database synced successfully');
  })
  .catch(err => {
    console.error('Error syncing database:', err);
  });

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`);
})