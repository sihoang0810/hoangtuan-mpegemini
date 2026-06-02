import { getServiceBySlugSync, getProductBySlugSync, getBlogPostBySlug, getServicesSync, getProductsSync, getBlogPostsSync } from './src/lib/sanity';

console.log("=== DIAGNOSING SERVICES ===");
const servicesBaoLoc = getServicesSync('bao-loc');
const servicesHcm = getServicesSync('ho-chi-minh');
console.log(`Bao Loc services count: ${servicesBaoLoc.length}`);
console.log(`HCM services count: ${servicesHcm.length}`);

const serviceSlug = 'sua-dien';
const srvBaoLoc = getServiceBySlugSync(serviceSlug, 'bao-loc');
const srvHcm = getServiceBySlugSync(serviceSlug, 'ho-chi-minh');
console.log(`Lookup '${serviceSlug}' in Bao Loc:`, srvBaoLoc ? srvBaoLoc.title : 'NOT FOUND');
console.log(`Lookup '${serviceSlug}' in HCM:`, srvHcm ? srvHcm.title : 'NOT FOUND');

console.log("\n=== DIAGNOSING PRODUCTS ===");
const productsBaoLoc = getProductsSync('bao-loc');
const productsHcm = getProductsSync('ho-chi-minh');
console.log(`Bao Loc products count: ${productsBaoLoc.length}`);
console.log(`HCM products count: ${productsHcm.length}`);

// Let's print some slugs of products
console.log("Bao Loc product slugs:", productsBaoLoc.slice(0, 5).map(p => p.slug));

const productSlug = 'camera-wifi-ezviz-c6n';
const prdBaoLoc = getProductBySlugSync(productSlug, 'bao-loc');
const prdHcm = getProductBySlugSync(productSlug, 'ho-chi-minh');
console.log(`Lookup '${productSlug}' in Bao Loc:`, prdBaoLoc ? prdBaoLoc.name : 'NOT FOUND');
console.log(`Lookup '${productSlug}' in HCM:`, prdHcm ? prdHcm.name : 'NOT FOUND');

console.log("\n=== DIAGNOSING BLOGS ===");
const blogsBaoLoc = getBlogPostsSync('bao-loc');
const blogsHcm = getBlogPostsSync('ho-chi-minh');
console.log(`Bao Loc blogs count: ${blogsBaoLoc.length}`);
console.log(`HCM blogs count: ${blogsHcm.length}`);

console.log("Bao Loc blog slugs:", blogsBaoLoc.slice(0, 5).map(b => b.slug));

const blogSlug = 'sua-dien-dan-dung-tai-bao-loc';
const blogBaoLocSync = blogsBaoLoc.find(b => b.slug === blogSlug);
console.log(`Lookup '${blogSlug}' in Bao Loc directly:`, blogBaoLocSync ? blogBaoLocSync.title : 'NOT FOUND');
