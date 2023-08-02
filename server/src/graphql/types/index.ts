import { mergeTypeDefs } from '@graphql-tools/merge';

import author from './author.types';
import book from './book.types';
import user from './user.types';

const typeDefs = [author, book, user];

export default mergeTypeDefs(typeDefs);
