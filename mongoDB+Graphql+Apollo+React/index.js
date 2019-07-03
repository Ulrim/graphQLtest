import express from 'express';
import mongoose from 'mongoose';
import { ApolloServer, gql }from 'apollo-server-express';
import User from './models/user';
import cors from 'cors';

// mongodb 설정
const dbName = "test";
const uri = ``
mongoose.Promise = global.Promise;
mongoose.connect(uri, { useNewUrlParser: true });

const typeDefs = gql`

    type User {
        _id: ID!
        name: String!
        age: Int!
        gender: String!
    }

    type Query {
        getUser(_id: ID!): User
        allUser: [User]
    }

    input UserInput {
        name: String!
        age: Int!
        gender: String!
    }

    type Mutation {
        createUser(input: UserInput): User
        updateUser(_id: ID!, input: UserInput): User
        deleteUser(_id: ID!): User
    }
`;

const resolvers = {
    Query: {
        async getUser(root, { _id }){
            return await User.findById(_id);
        }, // new
        async allUser() {
            return await User.find();
        }
    },
    Mutation: {
        async createUser(root, { input }) {
            return await User.create(input);
        },
        async updateUser(root, { _id, input }) {
            return await User.findOneAndUpdate(
                { _id }, 
                input, 
                { new: true }
            );
        },
        async deleteUser(root, { _id }) {
            return await User.findOneAndDelete({ _id });
        }
    }
};
const app = express();
const port = 8080;
const server = new ApolloServer({
    typeDefs,
    resolvers
})
server.applyMiddleware({ app });

app.use(express.json()); // body parser
app.use(cors());


app.listen(port, () => {
    console.log(`서버 실행!! 포트는? http://localhost:${port}${server.graphqlPath}`);
});
