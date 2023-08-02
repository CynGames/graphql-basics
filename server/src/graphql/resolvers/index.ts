import { mergeResolvers } from '@graphql-tools/merge';

import author from './author.resolver';
import book from './book.resolver';
import user from './user.resolver';

const resolvers = [author, book, user];

export default mergeResolvers(resolvers);
