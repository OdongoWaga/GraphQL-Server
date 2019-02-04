const express = require('express');
const graphqlHTTP = require('express-graphql');
const app = express();
const schema = require('./schema/schema');
const mongoose = require('mongoose');


mongoose.connect('mongodb://user:userpassword26@ds121415.mlab.com:21415/codeit');
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