import express from "express";
import mongoose from "mongoose";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/typeDefs";

// mongodb 설정
const dbName = "test";
const uri = `mongodb+srv://user_01:wjdtjr321@ulrim-qjcii.gcp.mongodb.net/${dbName}?retryWrites=true&w=majority`;
mongoose.Promise = global.Promise;
mongoose.connect(uri, { useNewUrlParser: true });

const app = express();
const port = 8080;
const server = new ApolloServer({
  typeDefs,
  resolvers
});
server.applyMiddleware({ app });

app.use(express.json()); // body parser
app.use(cors());

app.listen(port, () => {
  console.log(
    `서버 실행!! 포트는? http://localhost:${port}${server.graphqlPath}`
  );
});
