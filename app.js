const express = require('express');
const graphqlHTTP = require('express-graphql');
const app = express();
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

//allows cross origin requests

app.use(cors());


mongoose.connect('mongodb://127.0.0.1:27017/graphql');
mongoose.connection.once('open', ()=> {
    console.log('connected');
})

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(4000, ()=> {
    console.log('now listening on port 4000');
});  