const graphql = require('graphql');
const _ = require('lodash');

const {GraphQLObjectType, 
        GraphQLString, 
        GraphQLSchema,
        GraphQLID,
        GraphQLInt,
        GraphQLList
    }=graphql;

var movies =[
    {name: 'Transformer', genre: 'Sci-Fi', id: '1', directorId: '1' },
    {name: 'Get Out', genre: 'Thriller', id: '2', directorId: '2' },
    {name: 'Lion King', genre: 'Animated', id: '3', directorId: '3' },
    {name: 'Avengers', genre: 'BlockBuster', id: '4', directorId: '2' },
    {name: 'Men In Black', genre: 'Sci-Fi', id: '5', directorId: '3' },
    {name: '13', genre: 'documentary', id: '6', directorId: '3' },

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
        genre:{type:GraphQLString},
        director: {
            type: DirectorType,
            resolve(parent,args){

            return _.find(directors,{id:parent.directorId});
            }
        }

    })

}); 
const DirectorType= new GraphQLObjectType({
    name: 'Director',
    fields: ()=> ({
        id:{type: GraphQLID},
        name:{type:GraphQLString },
        age:{type:GraphQLInt }, 
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args){
                return _.filter(movies, {directorId:parent.id})
            }
        }
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
        },
        movies: {
            type: new GraphQLList(MovieType),
            resolve(parent, args) {
                return movies
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
})