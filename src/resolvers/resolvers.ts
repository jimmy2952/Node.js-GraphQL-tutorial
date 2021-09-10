import { UserResolver } from './users-resolvers';

export const resolvers = {
  Query: {
    getUsers: (parent: any, args: any, context: any) => UserResolver.getUsers(),
    getUser: (parent: any, args: any, context: any) => UserResolver.getUser(args.request)
  },
  Mutation: {
    createUser: (parent: any, args: any, context: any) => UserResolver.createUser(args.request),
    updateUser: (parent: any, args: any, context: any) => UserResolver.updateUser(args.request),
    deleteUser: (parent: any, args: any, context: any) => UserResolver.deleteUser(args.request)
  }
};
