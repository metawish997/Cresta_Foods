// backend/seedSeo.js
// Seeds comprehensive SEO settings for ALL pages of Cresta Foods
// Run: node seedSeo.js
import './loadEnv.js';
import connectDB from './config/db.js';
import SeoSetting from './models/SeoSetting.js';

const seed = async () => {
  await connectDB();
  console.log('✓ Connected to MongoDB. Seeding SEO settings...\n');

  // Clear all existing SEO settings
  await SeoSetting.deleteMany({});
  console.log('✓ Old SEO settings cleared\n');

  const seoSettings = [
    // ─────────────────────────────────────────────────────────────
    // HOME PAGE — /
    // ─────────────────────────────────────────────────────────────
    {
      page_slug: 'home',
      page_name: 'Home',
      title: 'Cresta Foods | Premium Guar Gum & Dehydrated Onion Exporters from India',
      description: 'Cresta Foods is India\'s leading exporter of premium Guar Gum Powder (Food & Industrial Grade) and Dehydrated Onion products (Flakes, Powder, Kibbled, Chopped, Minced). FSSAI, ISO 22000, HACCP, Halal, Kosher certified. Sourced from Rajasthan & Gujarat.',
      keywords: 'guar gum exporter India, dehydrated onion exporter India, guar gum powder manufacturer, onion powder exporter, food grade guar gum, industrial guar gum, white onion flakes exporter, red onion powder, guar meal korma, FSSAI certified food exporter, Cresta Foods',
    },

    // ─────────────────────────────────────────────────────────────
    // ABOUT / WHY US PAGE — /about
    // ─────────────────────────────────────────────────────────────
    {
      page_slug: 'about',
      page_name: 'About Us',
      title: 'About Cresta Foods | 30+ Years of Premium Food Export Excellence',
      description: 'Cresta Foods is a trusted Indian food ingredient exporter with 30+ years of sourcing excellence. Specializing in Guar Gum Powder and Dehydrated Onion products with global certifications (FSSAI, ISO 22000, HACCP, BRCGS, Halal, Kosher, APEDA). Export destinations across 40+ countries.',
      keywords: 'about Cresta Foods, food exporter India, guar gum exporter about us, dehydrated onion manufacturer India, APEDA registered exporter, food ingredient sourcing India, 30 years food export',
    },

    // ─────────────────────────────────────────────────────────────
    // PRODUCTS PAGE — /products
    // ─────────────────────────────────────────────────────────────
    {
      page_slug: 'products',
      page_name: 'Products',
      title: 'Products | Guar Gum Powder & Dehydrated Onion Range | Cresta Foods',
      description: 'Explore Cresta Foods\' complete export-grade product range: Dehydrated White Onion Flakes, Powder, Kibbled, Chopped & Minced; Red & Pink Onion Flakes & Powder; Food Grade & Industrial Guar Gum Powder; Guar Meal Korma & Churi. FSSAI, ISO 22000, HACCP certified.',
      keywords: 'guar gum powder products, dehydrated onion products, white onion flakes, white onion powder, red onion flakes, pink onion powder, food grade guar gum, industrial guar gum, guar meal korma, guar meal churi, food ingredients India export',
    },

    // ─────────────────────────────────────────────────────────────
    // CONTACT PAGE — /contact
    // ─────────────────────────────────────────────────────────────
    {
      page_slug: 'contact',
      page_name: 'Contact',
      title: 'Contact Cresta Foods | Request a Quote or Sample | Export Inquiries',
      description: 'Get in touch with Cresta Foods for export inquiries, product samples, pricing, and technical specifications. We supply Guar Gum Powder and Dehydrated Onion products globally. Contact us for FOB/CIF quotes, COA requests, and custom specifications.',
      keywords: 'contact Cresta Foods, food export inquiry, guar gum quote, dehydrated onion sample request, get a quote food ingredients, export inquiry India, FOB CIF food ingredients India',
    },

    // ─────────────────────────────────────────────────────────────
    // BLOGS PAGE — /blogs
    // ─────────────────────────────────────────────────────────────
    {
      page_slug: 'blogs',
      page_name: 'Blogs',
      title: 'Blog | Industry Insights on Guar Gum & Dehydrated Onions | Cresta Foods',
      description: 'Read Cresta Foods\' expert blog for industry insights on Guar Gum Powder, Dehydrated Onion exports, global food trade, quality certifications, and sustainable sourcing practices from India.',
      keywords: 'guar gum blog, dehydrated onion industry news, food export insights, guar gum market India, onion export India, food ingredient blog, food trade news',
    },

    // ─────────────────────────────────────────────────────────────
    // GLOBAL EXPORTS PAGE — /global-exports
    // ─────────────────────────────────────────────────────────────
    {
      page_slug: 'global-exports',
      page_name: 'Global Exports',
      title: 'Global Exports | Cresta Foods Exports to 40+ Countries Worldwide',
      description: 'Cresta Foods exports premium Guar Gum Powder and Dehydrated Onion products to 40+ countries across Europe, Middle East, Asia-Pacific, Americas, and Africa. FOB Mundra Port. Incoterms: FOB, CIF, CFR. APEDA registered exporter.',
      keywords: 'Cresta Foods global exports, guar gum exporter Europe, dehydrated onion export Middle East, India food ingredient exports, APEDA exporter, FOB Mundra Port, food export destinations India',
    },

    // ─────────────────────────────────────────────────────────────
    // APPLICATION PLATFORMS PAGE — /application-platforms
    // ─────────────────────────────────────────────────────────────
    {
      page_slug: 'application-platforms',
      page_name: 'Application Platforms',
      title: 'Application Platforms | Industries We Serve | Cresta Foods',
      description: 'Discover the wide range of industries Cresta Foods serves with Guar Gum Powder and Dehydrated Onion products: Food & Beverage, Dairy, Bakery, Pharmaceuticals, Oil & Gas, Textiles, Paper, Animal Feed, and more. Tailored ingredient solutions for every application.',
      keywords: 'guar gum applications, dehydrated onion applications, food grade guar gum uses, industrial guar gum uses, guar gum dairy, guar gum oil drilling, onion powder food processing, guar meal animal feed applications',
    },

    // ─────────────────────────────────────────────────────────────
    // MANUFACTURING EXCELLENCE PAGE — /manufacturing-excellence
    // ─────────────────────────────────────────────────────────────
    {
      page_slug: 'manufacturing-excellence',
      page_name: 'Manufacturing Excellence',
      title: 'Manufacturing Excellence | State-of-the-Art Processing | Cresta Foods',
      description: 'Cresta Foods operates state-of-the-art food processing facilities in Rajasthan and Gujarat. Our manufacturing excellence includes controlled drying, precision milling, Sortex cleaning, and rigorous quality control — ensuring every batch meets international standards.',
      keywords: 'Cresta Foods manufacturing, food processing India, guar gum processing plant, dehydrated onion factory India, FSSAI facility, food grade manufacturing India, ISO certified food plant',
    },

    // ─────────────────────────────────────────────────────────────
    // MEDIA PAGE — /media
    // ─────────────────────────────────────────────────────────────
    {
      page_slug: 'media',
      page_name: 'Media',
      title: 'Media Gallery | Cresta Foods Facilities, Products & Events',
      description: 'Explore the Cresta Foods media gallery featuring our processing facilities, product range, quality certifications, export operations, trade show presence, and team. See the quality behind every export shipment.',
      keywords: 'Cresta Foods media, food facility gallery, guar gum factory images, dehydrated onion processing images, food export company India gallery',
    },

    // ─────────────────────────────────────────────────────────────
    // INDIVIDUAL PRODUCT PAGES — /products/:slug
    // ─────────────────────────────────────────────────────────────

    // White Onion Products
    {
      page_slug: 'products/dehydrated-white-onion-flakes',
      page_name: 'Dehydrated White Onion Flakes',
      title: 'Dehydrated White Onion Flakes | Sortex Grade | Cresta Foods',
      description: 'Export-grade dehydrated white onion flakes from Mahuva, Gujarat. 8-15mm & 15-20mm cuts, max 6% moisture. FSSAI, HACCP, ISO 22000, BRCGS, Halal, Kosher, APEDA certified. COA per batch. Bulk export quantity available.',
      keywords: 'dehydrated white onion flakes, dried white onion flakes exporter, white onion flakes India, Mahuva onion flakes, sortex grade onion flakes, FSSAI onion flakes, onion flakes bulk export',
    },
    {
      page_slug: 'products/dehydrated-white-onion-powder',
      page_name: 'Dehydrated White Onion Powder',
      title: 'Dehydrated White Onion Powder | 80-100 Mesh | Cresta Foods',
      description: 'Premium dehydrated white onion powder, 80-100 mesh, instant solubility >80%, max 6% moisture. Steam sterilized grade available. FSSAI, HACCP, ISO 22000, BRCGS, Halal, Kosher certified. For seasoning mixes, soups, gravies, and industrial food applications.',
      keywords: 'white onion powder exporter, dehydrated onion powder India, 80 mesh onion powder, 100 mesh onion powder, onion powder seasoning, FSSAI onion powder, food grade onion powder',
    },
    {
      page_slug: 'products/dehydrated-white-kibbled-onion',
      page_name: 'Dehydrated White Kibbled Onion',
      title: 'Dehydrated White Kibbled Onion | 3-5mm | Cresta Foods',
      description: 'Export quality dehydrated white kibbled onion, 3-5mm uniform cut, max 6% moisture, 24 months shelf life. FSSAI, HACCP, ISO 22000, BRCGS, Halal, Kosher, APEDA certified. Perfect 1:10 rehydration ratio. For dry soup mixes and seasonings.',
      keywords: 'dehydrated kibbled onion, white kibbled onion exporter, 3-5mm onion, dried kibbled onion India, kibbled onion bulk export, onion for soup mix',
    },
    {
      page_slug: 'products/dehydrated-white-onion-chopped',
      page_name: 'Dehydrated White Onion Chopped',
      title: 'Dehydrated White Onion Chopped | 5-8mm | Cresta Foods',
      description: 'Export quality dehydrated white onion chopped, 5-8mm uniform cubes, max 6% moisture. FSSAI, HACCP, ISO 22000, BRCGS, Halal, Kosher, APEDA certified. Rehydrates like fresh chopped onion. For RTE meals, soups, and food toppings.',
      keywords: 'dehydrated chopped onion, white onion chopped exporter, dried onion cubes India, 5-8mm onion cubes, onion for ready meals, RTE onion ingredient',
    },
    {
      page_slug: 'products/dehydrated-white-onion-minced',
      page_name: 'Dehydrated White Onion Minced',
      title: 'Dehydrated White Onion Minced | 1-3mm Fine Granules | Cresta Foods',
      description: 'Export quality dehydrated white onion minced in 1-3mm fine granules, max 6% moisture. FSSAI, HACCP, ISO 22000, BRCGS, Halal, Kosher, APEDA certified. Dissolves seamlessly in sauces, gravies, and seasonings.',
      keywords: 'dehydrated minced onion, white onion minced exporter, dried onion granules India, 1-3mm onion granules, onion for sauces gravies, fine onion ingredient',
    },

    // Red & Pink Onion Products
    {
      page_slug: 'products/red-onion-flakes',
      page_name: 'Red Onion Flakes',
      title: 'Red Onion Flakes | Deep Red Color | Export Grade | Cresta Foods',
      description: 'Premium dehydrated red onion flakes, 5-15mm size, deep red/purple color, max 6% moisture. FSSAI, HACCP, ISO 22000, BRCGS, Halal, Kosher, APEDA certified. For canned foods, meat products, soups, and gourmet seasoning blends.',
      keywords: 'red onion flakes exporter, dehydrated red onion flakes India, deep red onion flakes, dried red onion flakes bulk, FSSAI red onion flakes export',
    },
    {
      page_slug: 'products/red-onion-powder',
      page_name: 'Red Onion Powder',
      title: 'Red Onion Powder | 100 Mesh | Pinkish-Red | Cresta Foods',
      description: 'Premium dehydrated red onion powder, 100 mesh, pinkish-red color, max 5% moisture, 12 months shelf life. FSSAI, HACCP, ISO 22000, BRCGS, Halal, Kosher certified. Instant solubility for seasonings, spice mixes, and instant food premixes.',
      keywords: 'red onion powder exporter India, dehydrated red onion powder, 100 mesh onion powder, pinkish red onion powder, red onion seasoning powder, food grade red onion powder',
    },
    {
      page_slug: 'products/pink-onion-flakes',
      page_name: 'Pink Onion Flakes',
      title: 'Pink Onion Flakes | Mild Sweet Flavor | Export Grade | Cresta Foods',
      description: 'Premium dehydrated pink onion flakes, 5-15mm, light pink color, mild sweet flavor, max 6% moisture. FSSAI, HACCP, ISO 22000, BRCGS, Halal, Kosher, APEDA certified. For salads, dry soups, vegetable mixes, and continental dishes.',
      keywords: 'pink onion flakes exporter, dehydrated pink onion flakes India, mild onion flakes, sweet onion flakes, pink onion export India',
    },
    {
      page_slug: 'products/pink-onion-powder',
      page_name: 'Pink Onion Powder',
      title: 'Pink Onion Powder | Pale Pink | Mild Flavor | Cresta Foods',
      description: 'Premium dehydrated pink onion powder, pale pink, 100 mesh, mild sweet onion flavor, max 5% moisture. FSSAI, HACCP, ISO 22000 certified. Available in steam sterilized grade for infant food. For snack seasonings, infant food, and savory batters.',
      keywords: 'pink onion powder exporter India, pale pink onion powder, mild onion powder, infant food onion powder, sweet onion powder export',
    },

    // Guar Gum Products
    {
      page_slug: 'products/food-grade-guar-gum-powder',
      page_name: 'Food Grade Guar Gum Powder',
      title: 'Food Grade Guar Gum Powder | 3000-7000+ CPS | Cresta Foods',
      description: 'Premium food grade guar gum powder from Rajasthan, India. Available in 100/200/300 mesh, 3000-7000+ CPS viscosity, max 12% moisture, min 80% galactomannan assay. FSSAI, ISO 22000, HACCP, Halal certified. For sauces, ice cream, dairy, baked goods, and pharmaceuticals.',
      keywords: 'food grade guar gum powder exporter, guar gum powder India Rajasthan, 3000 CPS guar gum, 7000 CPS guar gum, guar gum for ice cream, guar gum for dairy, guar gum thickener, Halal guar gum, FSSAI guar gum',
    },
    {
      page_slug: 'products/industrial-grade-guar-gum-powder',
      page_name: 'Industrial Grade Guar Gum Powder',
      title: 'Industrial Grade Guar Gum Powder | Up to 9000 CPS | Cresta Foods',
      description: 'Industrial grade guar gum powder from Rajasthan, India. 100/200/300 mesh, 2500-9000 CPS viscosity, REACH compliant with MSDS documentation. For oil & gas drilling, textile printing, paper manufacturing, and mining applications.',
      keywords: 'industrial guar gum powder exporter, guar gum for oil drilling, guar gum for fracking, guar gum textile printing, guar gum paper manufacturing, high viscosity guar gum India, REACH compliant guar gum',
    },

    // Guar Meal Products
    {
      page_slug: 'products/guar-meal-korma-roasted',
      page_name: 'Guar Meal Korma (Roasted)',
      title: 'Guar Meal Korma (Roasted) | 45-50% Protein | APEDA | Cresta Foods',
      description: 'APEDA registered guar meal korma (roasted) with 45-50% crude protein, 4-8% fat, max 10% moisture. Roasted to eliminate trypsin inhibitors for maximum digestibility. For cattle feed (up to 30%), poultry feed (up to 10%), swine, and aqua feed.',
      keywords: 'guar meal korma exporter, roasted guar meal India, guar korma protein feed, APEDA guar meal, high protein animal feed India, guar meal for cattle poultry, guar korma bulk export',
    },
    {
      page_slug: 'products/guar-meal-churi',
      page_name: 'Guar Meal Churi',
      title: 'Guar Meal Churi | Economical Protein Feed | APEDA | Cresta Foods',
      description: 'APEDA registered guar meal churi with ~40% crude protein, ~45% carbohydrate energy, ~10% crude fiber. Cost-effective alternative to soy meal for dairy cattle, poultry egg production, and fish & shrimp feed formulations.',
      keywords: 'guar meal churi exporter, guar churi India, economical animal feed India, guar churi dairy cattle, guar churi aquaculture, APEDA animal feed export, guar meal churi bulk',
    },
  ];

  await SeoSetting.insertMany(seoSettings);
  console.log(`✅ ${seoSettings.length} SEO settings seeded successfully!\n`);
  console.log('SEO pages seeded:');
  seoSettings.forEach((s, i) => {
    console.log(`  ${i + 1}. [${s.page_slug}] ${s.page_name}`);
  });

  process.exit(0);
};

seed().catch((err) => {
  console.error('❌ Seed error:', err);
  process.exit(1);
});
