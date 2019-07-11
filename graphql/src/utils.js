const jwt = require("jsonwebtoken");
const APP_SECRET = "GraphQL-is-aw3some"; // 사용자를 위해 발행하는 JWT에 서명하는데 사용

function getUserId(context) {
  const Authorization = context.request.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    const { userId } = jwt.verify(token, APP_SECRET);
    return userId;
  }

  throw new Error("Not authenticated");
}

module.exports = {
  APP_SECRET,
  getUserId
};
