import { mergeTypeDefs } from '@graphql-tools/merge';

import author from './author';
import book from './book';
import user from './user';

const typeDefs = [author, book, user];

export default mergeTypeDefs(typeDefs);
