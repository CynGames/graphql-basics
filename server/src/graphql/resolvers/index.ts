import { mergeResolvers } from '@graphql-tools/merge';

import author from './author';
import book from './book';

const resolvers = [author, book];

export default mergeResolvers(resolvers);
