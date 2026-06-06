import fs from 'fs';
import path from 'path';
import { LOCALIZED_BLOGS } from './src/data/localizedBlog';

const DOMAIN = 'https://hoangtuanmpe.com';

const LOCATIONS = ['bao-loc', 'ho-chi-minh'] as const;

const STATIC_SUBPAGES = [
  '', // Location Home
  '/dich-vu',
  '/du-an',
  '/san-pham',
  '/bang-gia',
  '/blog',
  '/lien-he',
  '/dieu-khoan',
  '/bao-mat'
];

const SERVICE_SLUGS = [
  'sua-dien', 'sua-chap-dien', 'sua-aptomat', 'lap-dat-dien', 'do-duong-dien-am-tuong',
  'sua-nuoc', 'sua-ro-ri-nuoc', 'lap-may-bom', 'sua-ong-nuoc-am', 'lap-dat-thiet-bi-nuoc',
  'lap-camera', 'sua-camera', 'camera-gia-dinh', 'camera-cua-hang',
  'do-ro-ri-nuoc', 'sieu-am-do-ong-am', 'do-duong-nuoc-am', 'kiem-tra-ro-ri-khong-duc-tuong'
];

const PRODUCT_SLUGS = [
  "camera-wifi-ezviz-c6n",
  "camera-imou-ranger-2",
  "camera-out-ezviz-h8c",
  "camera-out-imou-bullet-2c",
  "camera-ip-poe-hikvision-1023",
  "camera-ip-poe-dahua-1230s",
  "camera-ptz-hikvision-2de4425",
  "camera-ptz-dahua-sd49425",
  "dau-ghi-hcm-dahua-1104",
  "dau-ghi-hikvision-7104ni",
  "o-cung-seagate-skyhawk-2tb",
  "o-cung-wd-purple-2tb-wd20purz",
  "switch-poe-dahua-pfs3006",
  "switch-poe-tp-link-sf1005lp",
  "nguon-camera-hikvision-ds-2fa1202",
  "nguon-camera-dahua-dh-pfm321d-en",
  "cb-rcbo-panasonic-16a-giat",
  "cb-rcbo-schneider-32a-giat",
  "cb-mcb-panasonic-2p32a",
  "cb-mcb-sino-2p32a-dandung",
  "cong-tac-dien-panasonic-wev5001h",
  "cong-tac-schneider-avataron-a",
  "o-cam-doi-3-chau-panasonic-halumie",
  "o-cam-schneider-avataron-a",
  "smart-switch-tuya-wifi-4b",
  "cong-tac-thong-minh-javis-3-nut-zigbee",
  "downlight-philips-marcasite-9w",
  "downlight-rang-dong-at10-9w-khoet90",
  "led-bulb-philips-mycare-12w",
  "led-bulb-rang-dong-led-a70n1-12w",
  "led-floodlight-rang-dong-cp06-50w",
  "led-floodlight-philips-bvp150-50w",
  "exhaust-fan-panasonic-fv20-amtran",
  "exhaust-fan-senko-ht150-amtran",
  "day-cap-dien-cadivi-sup-2x15",
  "cap-dong-don-cadivi-vc-2.5",
  "booster-pump-panasonic-a-130jack",
  "booster-pump-wilo-pb-201ea-duc",
  "water-pump-panasonic-gp-200jxk",
  "water-pump-pentax-pm45",
  "water-pump-tsurumi-lsc14s",
  "water-pump-mastra-ms750",
  "filter-ro-karofi-kaq-u05-10loi",
  "filter-ro-kangaroo-kg10a3-nonglanh",
  "water-heater-ariston-blu-30r-safe",
  "water-heater-ferroli-verdi-20l",
  "van-dong-bi-ren-minh-hoa-miha-dn15",
  "van-phao-ngat-nuoc-dong-minh-hoa-dn20",
  "voi-ho-dong-tay-gat-minh-hoa-mbv-dn15",
  "voi-chau-rut-bat-nong-lanh-inox-304-sanji",
  "ong-nhua-ppr-chiunhiet-tienphong-d20",
  "ong-nhua-ppr-chiunhiet-binhminh-d25",
  "ong-nhua-pvc-binh-minh-phi21-day",
  "ong-nhua-pvc-tien-phong-phi-27-day",
  "dong-ho-do-nuoc-zenner-mnk-dn15-duc",
  "dong-ho-nuoc-sach-asahi-gmk-dn15"
];

const PROJECT_SLUGS = [
  "sua-dien-biet-thu-dalat",
  "do-tim-ro-ri-nhatrang",
  "lap-dat-camera-xuong-may",
  "bao-tri-dien-nuoc-khach-san"
];

function generate() {
  const currentDate = new Date().toISOString().split('T')[0];
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Add root domain page
  xml += `  <url>\n    <loc>${DOMAIN}/</loc>\n    <lastmod>${currentDate}</lastmod>\n    <changefreq>daily</changefreq>\n    <priority>1.0</priority>\n  </url>\n`;

  LOCATIONS.forEach(loc => {
    // 1. Base / static pages
    STATIC_SUBPAGES.forEach(sub => {
      const priority = sub === '' ? '1.0' : '0.8';
      const changefreq = sub === '' ? 'daily' : 'weekly';
      xml += `  <url>\n    <loc>${DOMAIN}/${loc}${sub}</loc>\n    <lastmod>${currentDate}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>\n`;
    });

    // 2. Services details
    SERVICE_SLUGS.forEach(slug => {
      xml += `  <url>\n    <loc>${DOMAIN}/${loc}/dich-vu/${slug}</loc>\n    <lastmod>${currentDate}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.9</priority>\n  </url>\n`;
    });

    // 3. Products details
    PRODUCT_SLUGS.forEach(slug => {
      xml += `  <url>\n    <loc>${DOMAIN}/${loc}/san-pham/${slug}</loc>\n    <lastmod>${currentDate}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
    });

    // 4. Projects details
    PROJECT_SLUGS.forEach(slug => {
      xml += `  <url>\n    <loc>${DOMAIN}/${loc}/du-an/${slug}</loc>\n    <lastmod>${currentDate}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
    });

    // 5. Dynamic Blog details directly loaded from localized record
    const locationData = LOCALIZED_BLOGS[loc];
    if (locationData && locationData.posts) {
      locationData.posts.forEach(post => {
        xml += `  <url>\n    <loc>${DOMAIN}/${loc}/blog/${post.slug}</loc>\n    <lastmod>${currentDate}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.6</priority>\n  </url>\n`;
      });
    }
  });

  xml += '</urlset>\n';

  const outputDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const outputPath = path.join(outputDir, 'sitemap.xml');
  fs.writeFileSync(outputPath, xml, 'utf8');
  console.log(`Successfully generated dynamic sitemap with ${xml.split('<url>').length - 1} links to ${outputPath}`);

  const distDir = path.join(process.cwd(), 'dist');
  if (fs.existsSync(distDir)) {
    try {
      fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml, 'utf8');
      console.log(`Successfully mirrored dynamic sitemap to dist/sitemap.xml`);
    } catch (distErr) {
      console.error(`Failed to mirror sitemap to dist:`, distErr);
    }
  }
}

generate();
