import { LOCALIZED_BLOGS } from './src/data/localizedBlog.ts';

const blLoc = (LOCALIZED_BLOGS as any)['bao-loc'];
const bl = blLoc && blLoc.posts ? blLoc.posts : [];
const hcmLoc = (LOCALIZED_BLOGS as any)['ho-chi-minh'];
const hcm = hcmLoc && hcmLoc.posts ? hcmLoc.posts : [];

console.log("1. File name containing the blog records:");
console.log("src/data/localizedBlog.ts\n");

console.log("2. Exact number of Bao Loc articles:");
console.log(bl.length + "\n");

console.log("3. Exact number of Ho Chi Minh articles:");
console.log(hcm.length + "\n");

console.log("4. First 10 slugs from Bao Loc:");
bl.slice(0, 10).forEach(b => console.log(b.slug));
console.log("");

console.log("5. First 10 slugs from Ho Chi Minh:");
hcm.slice(0, 10).forEach(b => console.log(b.slug));
console.log("");

const countWords = (html) => {
    if (!html) return 0;
    const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    if (!text) return 0;
    return text.split(' ').length;
};

console.log("6. Count total words of:");
console.log("- article #1 Bao Loc: " + countWords(bl[0]?.content));
console.log("- article #1 Ho Chi Minh: " + countWords(hcm[0]?.content));
console.log("");

const all = [...bl, ...hcm];
let totalWords = 0;
let min = Infinity;
let max = 0;
all.forEach(b => {
    const cw = countWords(b?.content);
    totalWords += cw;
    if (cw < min) min = cw;
    if (cw > max) max = cw;
});

console.log("7. Word count report:");
console.log("- shortest article word count: " + min);
console.log("- longest article word count: " + max);
console.log("- average article word count: " + Math.round(totalWords / all.length));
console.log("");

console.log("TOTAL_ARTICLES=" + all.length);
console.log("TOTAL_WORDS=" + totalWords);
console.log("AVERAGE_WORDS=" + Math.round(totalWords / all.length));
