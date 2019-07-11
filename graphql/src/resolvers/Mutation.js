const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { APP_SECRET, getUserId } = require("../utils");

async function signup(parent, args, context, info) {
  // signup 비밀번호 암호화를 시킴 (bcrypt 라이브러리 사용)
  const password = await bcrypt.hash(args.password, 10);
  // prisma 클라이언트 인스턴스를 사용하여 데이터베이스 저장
  const user = await context.prisma.createUser({ ...args, password });
  // 토큰 생성 APP_SECRET, jwt 라이브러리 사용
  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user
  };
}

async function login(parent, args, context, info) {
  // 이메일 검색 찾지못하여 오류반환
  const user = await context.prisma.user({ email: args.email });
  if (!user) {
    throw new Error("No such user found");
  }

  // 데이터베이스에 저장된 암호와 비교 일치하지않으면 오류 반환
  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user
  };
}

function post(parent, args, context, info) {
  const userId = getUserId(context); // ID 검색
  return context.prisma.createLink({
    url: args.url,
    description: args.description,
    postedBy: { connect: { id: userId } }
  });
}

async function vote(parent, args, context, info) {
  const userId = getUserId(context); // ID 유효성 검사
  const linkExists = await context.prisma.$exists.vote({
    user: { id: userId },
    link: { id: args.linkId }
  });
  if (linkExists) {
    throw new Error(`Already voted for link: ${args.linkId}`);
  }

  return context.prisma.createVote({
    user: { connect: { id: userId } },
    link: { connect: { id: args.linkId } }
  });
}

module.exports = {
  signup,
  login,
  post,
  vote
};
