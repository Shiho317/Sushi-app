const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');
const mongoose = require('mongoose');
const userRoute = require('./routes/Users');
const favouriteRoute = require('./routes/Favourites');

dotenv.config();

app.use(express.json());

mongoose.connect(process.env.MONGO_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('mongoDB connected.'))
.catch(err => console.log(err));

app.use(function (req, res, next) {
  //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next();
});


app.use('/api/users', userRoute);
app.use('/api/favourites', favouriteRoute);

app.use(cors());
app.use(express.static('public'));

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true
  })
);

const port = process.env.PORT || 8888;

app.listen(port, () => console.log(`server is listening at ${port}.`))