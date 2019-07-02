import product from "./models/product";
export const resolvers = {
  Query: {
    async getProduct(root, { _id }) {
      // 아이디로 조회
      return await product.findById(_id);
    },
    async allProducts() {
      return await product.find();
    }
  },
  Mutation: {
    async createProduct(root, { input }) {
      // 만들기
      return await product.create(input);
    },
    async updateProduct(root, { _id, input }) {
      return await product.findOneAndUpdate({ _id }, input, { new: true });
    },
    async deleteProduct(root, { _id }) {
      return await product.findOneAndRemove({ _id });
    }
  }
};
