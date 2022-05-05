const axios = require("axios");
const dotenv = require("dotenv");
const {
  GraphQLSchema,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
} = require("graphql");

dotenv.config();

const CoordinatesType = new GraphQLObjectType({
  name: "CoordinatesType",
  fields: () => ({
    latitude: { type: GraphQLFloat },
    longitude: { type: GraphQLFloat },
  }),
});

const LocationType = new GraphQLObjectType({
  name: "LocationType",
  fields: () => ({
    display_address: { type: GraphQLList(GraphQLString) },
  }),
});

const CategoryType = new GraphQLObjectType({
  name: "CategoryType",
  fields: () => ({
    title: { type: GraphQLString },
  }),
});

const BusinessType = new GraphQLObjectType({
  name: "BusinessType",
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    image_url: { type: GraphQLString },
    url: { type: GraphQLString },
    is_closed: { type: GraphQLBoolean },
    review_count: { type: GraphQLFloat },
    rating: { type: GraphQLFloat },
    coordinates: { type: CoordinatesType },
    price: { type: GraphQLString },
    location: { type: LocationType },
    display_phone: { type: GraphQLString },
    categories: { type: GraphQLList(CategoryType) },
  }),
});

const OpensType = new GraphQLObjectType({
  name: "OpensType",
  fields: () => ({
    id: { type: GraphQLString },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    restaurants: {
      type: new GraphQLList(BusinessType),
      resolve(parent, args) {
        return axios
          .get(
            "https://api.yelp.com/v3/businesses/search?term=sushi&location=Vancouver",
            {
              headers: {
                Authorization: `Bearer ${process.env.YELP_API_KEY}`,
              },
            }
          )
          .then((res) => res.data.businesses);
      },
    },
    opens: {
      type: new GraphQLList(OpensType),
      resolve(parent, args) {
        return axios
          .get(
            "https://api.yelp.com/v3/businesses/search?term=sushi&location=Vancouver&open_now=true",
            {
              headers: {
                Authorization: `Bearer ${process.env.YELP_API_KEY}`,
              },
            }
          )
          .then((res) => res.data.businesses);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQueryType,
});
