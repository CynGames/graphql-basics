import { mergeTypeDefs } from '@graphql-tools/merge';

import author from './author';
import book from './book';

const typeDefs = [author, book];

export default mergeTypeDefs(typeDefs);
