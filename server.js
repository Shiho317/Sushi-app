const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema');

dotenv.config();

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