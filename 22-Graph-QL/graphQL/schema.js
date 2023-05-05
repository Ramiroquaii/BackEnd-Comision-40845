const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLFloat, GraphQLInt, GraphQLList, GraphQLSchema } = require('graphql');
const { getProductos, getProductoByName, updateProductPrice, updateProductPrice2 } = require('./resolver.js');

const ProductoType = new GraphQLObjectType({
    name: 'Producto',
    fields: () => ({
        _id: { type: GraphQLString },
        name: { type: GraphQLString },
        price: { type: GraphQLFloat },
        photo: { type: GraphQLString }
    })
});

const MessageType = new GraphQLObjectType({
    name: 'Mensaje',
    fields: () => ({
        message: { type: GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        productos: {
            type: new GraphQLList(ProductoType),
            resolve: getProductos
        },
        producto: {
            type: new GraphQLList(ProductoType),
            args: {
                prodName: { type: GraphQLString }
            },
            resolve: (parent, args) => getProductoByName(args.prodName)
        },
        productoUpdate: {
            type: new GraphQLList(MessageType),
            args: {
                prodName: { type: GraphQLString },
                newPrice: { type: GraphQLFloat }
            },
            resolve: (parent, args) => updateProductPrice(args.prodName, args.newPrice)
        },
    }
});

const RootMutation = new GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
        productoUpdateMutation: {
            type: MessageType,
            args: {
                prodName: { type: GraphQLNonNull(GraphQLString) },
                newPrice: { type: GraphQLNonNull(GraphQLFloat) }
            },
            resolve: (parent, args) => updateProductPrice2(args.prodName, args.newPrice)
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
});
