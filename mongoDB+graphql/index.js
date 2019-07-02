import express from "express";
import graphlHTTP from "express-graphql";
import mongoose from "mongoose";
import schema from "./schema";

const app = express();
const Port = 3000;
const uri =
  "uri를 추가해주세요.";

mongoose.Promise = global.Promise;
mongoose.connect(uri, { useNewUrlParser: true });

app.get("/", (req, res) => {
  res.json({
    msg: "Welcome to GraphQL"
  });
});

app.use(
  "/graphql",
  graphlHTTP({
    schema: schema,
    graphiql: true
  })
);

app.listen(Port, () => {
  console.log(`Server is listening on Port ${Port}`);
});
