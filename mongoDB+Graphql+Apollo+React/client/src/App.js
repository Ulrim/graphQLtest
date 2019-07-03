import React from 'react';
import { Query, Mutation } from "react-apollo";
import { gql } from "apollo-boost";

// const CREATE_USER = () => {
//   let name, age, gender;
//   return (
//   <Mutation
//     query={gql`
//       mutation {
//         createUser(input:{
//           name: ${name}
//           age: ${age}
//           gender: ${gender}
//         }){
//           name
//           age
//           gender
//         }
//       }
//     `}
//   >
//     안녕
//   </Mutation>
// );}

const USER_LIST = () => (
  <Query
    query={gql`
    query {
      allUser {
        _id
        name
        gender
      }
    }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>error</p>;

      return data.allUser.map(({ _id, name, gender }) => (
        <div key={_id}> 
          {name} : {gender}
        </div>
      ));
    }}
  </Query>
);

const App = () => (
    <div>
      <h2>My first Apollo app</h2>
      <USER_LIST />
    </div>
);

export default App;
