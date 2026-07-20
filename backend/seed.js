// backend/seed.js — Seeds permissions, roles, and initial content data
// Run: node seed.js
import './loadEnv.js';
import connectDB from './config/db.js';
import Role from './models/Role.js';
import Permission from './models/Permission.js';
import Statistic from './models/Statistic.js';
import Faq from './models/Faq.js';
import SeoSetting from './models/SeoSetting.js';
import Blog from './models/Blog.js';
import Product from './models/Product.js';
import { PERMISSIONS } from './constants/permissions.js';

const seed = async () => {
  await connectDB();
  console.log('Connected to MongoDB. Starting seed...');

  // ── Permissions ──────────────────────────────────────────────────────────────
  await Permission.deleteMany({});
  const permDocs = await Permission.insertMany(
    PERMISSIONS.map(([name, slug]) => ({ name, slug }))
  );
  const permMap = {};
  permDocs.forEach((p) => { permMap[p.slug] = p._id; });
  console.log(`✓ ${permDocs.length} permissions seeded`);

  // ── Roles ────────────────────────────────────────────────────────────────────
  await Role.deleteMany({});

  const adminRole = await Role.create({
    name: 'admin',
    description: 'Super administrator with full access',
    permissions: permDocs.map((p) => p._id),
  });

  const editorSlugs = [
    'view_dashboard', 'manage_hero_slides', 'manage_products', 'manage_blogs',
    'manage_faqs', 'manage_clients', 'manage_statistics', 'manage_inquiries', 'manage_seo',
  ];
  await Role.create({
    name: 'editor',
    description: 'Can manage content but not users or roles',
    permissions: editorSlugs.map((s) => permMap[s]).filter(Boolean),
  });

  await Role.create({
    name: 'user',
    description: 'Standard staff member',
    permissions: [permMap['view_dashboard']].filter(Boolean),
  });

  console.log('✓ 3 roles seeded (admin, editor, user)');

  // ── Statistics ────────────────────────────────────────────────────────────────
  await Statistic.deleteMany({});
  await Statistic.insertMany([
    { label: 'Revenue', value: 120.2, suffix: 'M+', prefix: '$', decimals: 1, icon: '💰', description: 'Annual revenue', sort_order: 0 },
    { label: 'Employees', value: 2.0, suffix: 'K+', prefix: '', decimals: 1, icon: '👥', description: 'Global workforce', sort_order: 1 },
    { label: 'Countries', value: 40, suffix: '+', prefix: '', decimals: 0, icon: '🌍', description: 'Export destinations', sort_order: 2 },
    { label: 'Brands', value: 10, suffix: '+', prefix: '', decimals: 0, icon: '🏷️', description: 'Brand portfolio', sort_order: 3 },
    { label: 'Years Experience', value: 30, suffix: '+', prefix: '', decimals: 0, icon: '🏆', description: 'Industry expertise', sort_order: 4 },
    { label: 'Plants', value: 1, suffix: '', prefix: '', decimals: 0, icon: '🏭', description: 'Manufacturing facility', sort_order: 5 },
    { label: 'Certifications', value: 10, suffix: '+', prefix: '', decimals: 0, icon: '✅', description: 'Quality certifications', sort_order: 6 },
    { label: 'Clients', value: 5.0, suffix: 'K+', prefix: '', decimals: 1, icon: '🤝', description: 'Satisfied clients', sort_order: 7 },
  ]);
  console.log('✓ Statistics seeded');

  // ── FAQs ──────────────────────────────────────────────────────────────────────
  await Faq.deleteMany({});
  await Faq.insertMany([
    { question: 'What is the minimum order quantity for Guar Gum or Dehydrated Onions?', answer: 'Our standard minimum order quantity is 1 full container (FCL — 20ft). For first-time buyers, we can discuss LCL options.', sort_order: 0 },
    { question: 'Do you offer product samples before committing to a full order?', answer: 'Yes. We provide pre-shipment product samples for qualified buyers. Please share your specification sheet or intended application.', sort_order: 1 },
    { question: 'What certifications do your products carry?', answer: 'FSSAI, FSSC 22000, ISO 22000, HACCP, APEDA, Halal, Kosher, BRCGS, and GMP certifications. Full COA from NABL-accredited labs provided.', sort_order: 2 },
    { question: 'What are the lead times for export orders?', answer: 'Standard lead time is 2–4 weeks from order confirmation and advance payment receipt.', sort_order: 3 },
    { question: 'Can you provide ETO treated or Steam Sterilized onion products?', answer: 'Yes. ETO Treated and Steam Sterilized products are available upon request.', sort_order: 4 },
    { question: 'What incoterms and payment terms do you offer?', answer: 'We offer FOB (Mundra Port), CIF, and CFR. Payment terms are typically LC at sight or TT advance.', sort_order: 5 },
  ]);
  console.log('✓ FAQs seeded');

  // ── SEO Settings ──────────────────────────────────────────────────────────────
  await SeoSetting.deleteMany({});
  await SeoSetting.insertMany([
    { page_slug: 'home', page_name: 'Home', title: 'Cresta Foods | Premium Guar Gum & Dehydrated Onion Exporters from India', description: 'Cresta Foods is India\'s trusted exporter of premium Guar Gum Powder and Dehydrated Onion products. Certified, specification-driven sourcing from Rajasthan and Gujarat.', keywords: 'guar gum exporter, dehydrated onion exporter, India food exporter, guar gum powder, onion powder' },
    { page_slug: 'about', page_name: 'About Us', title: 'About Cresta Foods | 30+ Years of Sourcing Excellence', description: 'Learn about Cresta Foods\' 30-year journey in premium food ingredient sourcing and export.', keywords: 'Cresta Foods, about us, food exporter India' },
    { page_slug: 'products', page_name: 'Products', title: 'Our Products | Guar Gum & Dehydrated Onion Range', description: 'Explore our complete range of Guar Gum Powder and Dehydrated Onion products.', keywords: 'guar gum products, dehydrated onion products, food ingredients India' },
    { page_slug: 'contact', page_name: 'Contact', title: 'Contact Cresta Foods | Get a Quote', description: 'Get in touch with Cresta Foods for export inquiries, samples, and pricing.', keywords: 'contact Cresta Foods, food export inquiry, guar gum quote' },
    { page_slug: 'blogs', page_name: 'Blogs', title: 'Blog | Cresta Foods Industry Insights', description: 'Read industry insights, product guides, and export tips from Cresta Foods.', keywords: 'food industry blog, guar gum news, export insights' },
  ]);
  console.log('✓ SEO settings seeded');

  // ── Products (seed from existing data) ────────────────────────────────────────
  const existingProducts = await Product.countDocuments();
  if (existingProducts === 0) {
    await Product.insertMany([
      {
        slug: 'food-grade-guar-gum',
        name: 'Food Grade Guar Gum Powder',
        category: 'Guar',
        subCategory: 'Hydrocolloids',
        shortDesc: 'Natural plant-based thickener and stabilizer for food, beverage, dairy, baking, and pharmaceutical applications.',
        description: 'Derived from the endosperm of guar beans, our Food Grade Guar Gum Powder is a high-performance thickening, binding, and stabilizing agent. Available in 100, 200, and 300 mesh grades with customizable viscosity from 3500 to 7000+ CPS.',
        image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&q=80',
        gallery: ['https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&q=80'],
        badge: 'Best Seller',
        featured: true,
        specifications: [
          { label: 'Grades Available', value: '100 Mesh, 200 Mesh, 300 Mesh' },
          { label: 'Viscosity', value: '3500–7000+ CPS' },
          { label: 'Moisture', value: 'Max 12%' },
          { label: 'Shelf Life', value: '24 months' },
        ],
        whyChoose: [
          { title: 'Grade-Specific Sourcing', desc: '100, 200, 300 Mesh for targeted applications' },
          { title: 'Viscosity Guaranteed', desc: '3500–7000+ CPS with third-party COA' },
        ],
        applications: ['Dairy Products & Ice Cream', 'Sauces, Soups & Dressings', 'Baked Goods', 'Pharmaceuticals'],
        packaging: '25 kg multi-wall paper bags with polythene liner',
        certifications: ['FSSAI', 'ISO 22000', 'FSSC 22000', 'Halal', 'Kosher'],
        status: 'PUBLISHED',
        sort_order: 0,
      },
      {
        slug: 'industrial-grade-guar-gum',
        name: 'Industrial Grade Guar Gum Powder',
        category: 'Guar',
        subCategory: 'Hydrocolloids',
        shortDesc: 'High-performance industrial hydrocolloid for oil & gas drilling, paper manufacturing, textile printing.',
        description: 'Our Industrial Grade Guar Gum is one of the most versatile natural polymers. Cold water soluble, high viscosity at low concentrations.',
        image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=800&q=80',
        badge: 'Export Grade',
        featured: true,
        applications: ['Oil & Gas Drilling Fluids', 'Paper Manufacturing', 'Textile Printing'],
        packaging: '25 kg multi-wall paper bags',
        certifications: ['ISO 22000', 'FSSC 22000', 'APEDA Registered'],
        status: 'PUBLISHED',
        sort_order: 1,
      },
      {
        slug: 'dehydrated-white-onion',
        name: 'Dehydrated White Onion Products',
        category: 'Onions',
        subCategory: 'White Onion',
        shortDesc: 'Premium dehydrated white onion from Mahuva, Gujarat — available as Flakes, Powder, Kibbled, Chopped, and Minced.',
        description: 'Processed under controlled conditions to preserve natural flavor, aroma, texture. Machine Clean and Sortex Grade available.',
        image: 'https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=800&q=80',
        badge: 'Premium Grade',
        featured: true,
        applications: ['Soups & Sauces', 'Ready Meals', 'Seasonings'],
        packaging: '25 kg multi-wall paper bags',
        certifications: ['FSSAI', 'HACCP', 'ISO 22000', 'Halal'],
        status: 'PUBLISHED',
        sort_order: 2,
      },
      {
        slug: 'dehydrated-red-pink-onion',
        name: 'Dehydrated Red & Pink Onion Products',
        category: 'Onions',
        subCategory: 'Red & Pink Onion',
        shortDesc: 'Premium dehydrated red and pink onion flakes and powder — deep flavor, vibrant color.',
        description: 'Processed from premium field-fresh onions, offering perfect pungent aroma and deep flavor.',
        image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&q=80',
        featured: true,
        applications: ['Canned Foods', 'Seasoning Blends', 'Snack Seasonings'],
        packaging: '25 kg multi-wall paper bags',
        certifications: ['FSSAI', 'HACCP', 'ISO 22000', 'Halal'],
        status: 'PUBLISHED',
        sort_order: 3,
      },
    ]);
    console.log('✓ Products seeded');
  } else {
    console.log(`ℹ  Products already exist (${existingProducts}), skipping`);
  }

  // ── Blogs (seed from existing data) ──────────────────────────────────────────
  const existingBlogs = await Blog.countDocuments();
  if (existingBlogs === 0) {
    await Blog.insertMany([
      {
        slug: 'potato-flakes-global-food-industry',
        title: 'The Rising Demand for Potato Flakes in the Global Food Industry',
        excerpt: 'Explore how dehydrated potato flakes have become an indispensable ingredient across food service, retail, and industrial food manufacturing sectors worldwide.',
        content: '<h2>Introduction</h2><p>The global dehydrated potato market has witnessed exponential growth over the past decade.</p>',
        category: 'Industry Insights',
        author: 'Cresta Foods Editorial Team',
        date: '2025-04-15',
        readTime: '5 min read',
        image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=800&q=80',
        featured: true,
        tags: ['Potato Flakes', 'Food Industry', 'Export'],
        status: 'PUBLISHED',
      },
      {
        slug: 'sustainability-in-potato-farming',
        title: 'Sustainable Potato Farming: Our Commitment to the Environment',
        excerpt: 'How Cresta Foods is pioneering sustainable agricultural practices to reduce our environmental footprint.',
        content: '<h2>Our Sustainability Vision</h2><p>Sustainability is not just a buzzword at Cresta Foods.</p>',
        category: 'Sustainability',
        author: 'Sustainability Team',
        date: '2025-02-10',
        readTime: '6 min read',
        image: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4e6?w=800&q=80',
        featured: true,
        tags: ['Sustainability', 'Farming'],
        status: 'PUBLISHED',
      },
      {
        slug: 'haccp-food-safety-standards',
        title: 'HACCP & ISO 22000: Our Unwavering Commitment to Food Safety',
        excerpt: 'Understanding the rigorous food safety protocols that ensure every Cresta Foods product meets international standards.',
        content: '<h2>Food Safety as a Core Value</h2><p>At Cresta Foods, food safety is non-negotiable.</p>',
        category: 'Quality Assurance',
        author: 'QA Team',
        date: '2025-01-18',
        readTime: '4 min read',
        image: 'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=800&q=80',
        featured: false,
        tags: ['HACCP', 'ISO 22000', 'Food Safety'],
        status: 'PUBLISHED',
      },
    ]);
    console.log('✓ Blogs seeded');
  } else {
    console.log(`ℹ  Blogs already exist (${existingBlogs}), skipping`);
  }

  console.log('\n✅ Database seeded successfully!');
  console.log('Next step: Create an admin user using promote-admin.js');
  process.exit(0);
};

seed().catch((err) => {
  console.error('Seed error:', err);
  process.exit(1);
});
