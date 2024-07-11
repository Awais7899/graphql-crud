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
    async createRecord(_, args, context) {
      let collection = await Product;
      let record = {
        ...args.record, 
        id : 
      }
      const insert = await collection.create(args.record);
      console.warn(insert);
      if (insert.acknowledged)
        return { args };
      return null;
    },
    async updateRecord(_, args, context) {
      const id = new ObjectId(args.id);
      let query = { _id: new ObjectId(id) };
      let collection = await Product;
      const update = await collection.updateOne(
        query,
        { $set: { ...args } }
      );

      if (update.acknowledged)
        return await collection.findOne(query);

      return null;
    },
    async deleteRecord(_, { id }, context) {
      let collection = await Product;
      const dbDelete = await collection.deleteOne({ _id: new ObjectId(id) });
      return dbDelete.acknowledged && dbDelete.deletedCount == 1 ? true : false;
    },
  },
};

export default resolvers;