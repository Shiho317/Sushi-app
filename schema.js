const axios = require('axios');
const dotenv = require('dotenv');
const { 
  GraphQLSchema, 
  GraphQLInt, 
  GraphQLBoolean, 
  GraphQLString, 
  GraphQLList, 
  GraphQLObjectType
} = require('graphql');

dotenv.config();

const CoordinatesType = new GraphQLObjectType({
  name: 'CoordinatesType',
  fields: () => ({
    latitude: {type: GraphQLInt},
    longitude: {type: GraphQLInt}
  })
})

const LocationType = new GraphQLObjectType({
  name: 'LocationType',
  fields: () => ({
    display_address: {type: GraphQLList(GraphQLString)},
  })
})

const BuisinessType = new GraphQLObjectType({
  name: 'BuisinessType',
  fields: () => ({
    id: {type: GraphQLString},
    name: {type: GraphQLString},
    image_url: {type: GraphQLString},
    is_closed: {type: GraphQLBoolean},
    review_count: {type: GraphQLInt},
    rating: {type: GraphQLInt},
    coordinates: {type: CoordinatesType},
    price: {type: GraphQLString},
    location: {type: LocationType},
    display_phone: {type: GraphQLString}
  })
})

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    buisinesses: {
      type: new GraphQLList(BuisinessType),
      resolve(parent, args) {
        return axios
          .get('https://api.yelp.com/v3/businesses/search?term=sushi&location=Vancouver', {
            headers: {
              'Authorization': `Bearer ${process.env.YELP_API_KEY}`
            }
          })
          .then(res => res.data)
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQueryType
});