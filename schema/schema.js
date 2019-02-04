const graphql = require('graphql');
const _ = require('lodash');

const {GraphQLObjectType, 
        GraphQLString, 
        GraphQLSchema,
        GraphQLID,
        GraphQLInt
    }=graphql;

var movies =[
    {name: 'Transformer', genre: 'Sci-Fi', id: '1' },
    {name: 'Get Out', genre: 'Thriller', id: '2' },
    {name: 'Lion King', genre: 'Animated', id: '3' },

];

var directors = [
    {name: 'Brandon Knight', age: 45, id: '1'},
    {name: 'Jordan Peele', age: 40 , id: '2'},
    {name: 'Michael Paul', age: 39, id: '3'},
]

 

const MovieType= new GraphQLObjectType({
    name: 'Movie',
    fields: ()=> ({
        id:{type: GraphQLID},
        name:{type:GraphQLString},
        genre:{type:GraphQLInt}
    })

}); 
const DirectorType= new GraphQLObjectType({
    name: 'Director',
    fields: ()=> ({
        id:{type: GraphQLID},
        name:{type:GraphQLString },
        age:{type:GraphQLInt }
    })

}); 
 
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        movie: {
            type: MovieType,
            args: {id:{type: GraphQLID}},
            resolve (parent, args){
                //code to get data from the database

                return _.find(movies,{id: args.id});
            }
        },
        director: {
            type: DirectorType,
            args: {id:{type:GraphQLID}},
            resolve(parent,args) {

                return _.find(directors, {id: args.id});
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})