import { mergeResolvers } from '@graphql-tools/merge';

import author from './author';
import book from './book';
import user from './user';

const resolvers = [author, book, user];

export default mergeResolvers(resolvers);
