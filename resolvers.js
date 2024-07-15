import Product from "./model.js";

const resolvers = {
  Query: {
    async record(_, { id }) {
      let collection = await Product;
      return await collection.findById(id);
    },
    async records(_, __, context) {
      let collection = await Product;
      const records = await collection.find({});
      return records;
    },
  },
  Record: {
    id: (parent) => parent.id ?? parent._id,
  },
  Mutation: {
    async createRecord(_, { record }, context) {
      try {
        const newRecord = new Product({
          ...record,
          id: Math.random().toString(36), // Generating a unique id
        });
        const result = await newRecord.save();
        return {
          id: result._id,
          name: result.name,
          quantity: result.quantity,
          price: result.price,
        };
      } catch (error) {
        console.error(error);
        throw new Error("Error creating record");
      }
    },
    async updateRecord(_, args, context) {
      try {
        const result = await Product.findByIdAndUpdate(args.id , {
          name: args.name, 
          price: args.price, 
          quantity: args.quantity
        } , {new : true});
        return {
          id: result._id,
          name: result.name,
          quantity: result.quantity,
          price: result.price,
        };
      } catch (error) {
        console.error(error);
        throw new Error("Error updated --- record");
      }
    },
  }
};

export default resolvers;
