import fs from 'fs';
import { getBlogPostsSync } from './src/lib/sanity';

console.log("posts:", getBlogPostsSync('bao-loc').length);
