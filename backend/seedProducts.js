// backend/seedProducts.js
// Seeds ALL products from the original Products.jsx design file
// Run: node seedProducts.js
import './loadEnv.js';
import connectDB from './config/db.js';
import Product from './models/Product.js';

const seed = async () => {
  await connectDB();
  console.log('✓ Connected to MongoDB. Seeding products...\n');

  // Clear existing products
  await Product.deleteMany({});
  console.log('✓ Old products cleared\n');

  const products = [
    // ─────────────────────────────────────────────────────────────
    // WHITE ONIONS (category: 'Onions', subCategory: 'White Onion')
    // ─────────────────────────────────────────────────────────────
    {
      slug: 'dehydrated-white-onion-flakes',
      name: 'Dehydrated White Onion Flakes',
      category: 'Onions',
      subCategory: 'White Onion',
      shortDesc: 'Premium-quality white onion flakes made from carefully selected fresh white onions, dried hygienically to less than 6% moisture. Machine clean and Sortex grade quality.',
      description: `Premium-quality white onion flakes made from carefully selected fresh white onions sourced from Mahuva, Gujarat — India's largest onion processing belt. The onions are peeled, sliced to uniform 8-15mm / 15-20mm sizes, and hot-air dried under strict hygiene controls to achieve less than 6% moisture content.

Cresta Foods offers Machine Clean (MC) and Sortex Grade quality. Available in standard 8-15mm cut or as per buyer specification. ETO Treated and Steam Sterilized grades available on request. Complete Certificate of Analysis (COA) provided per batch.

Ideal for food processing industries, soups, sauces, canned food, and fast food garnishing. 1:10 rehydration ratio restores the texture and aroma of fresh onions.`,
      image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=800&q=80',
      gallery: ['https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=800&q=80'],
      badge: 'Sortex Grade',
      featured: true,
      specifications: [
        { label: 'Origin', value: 'India - Mahuva, Gujarat' },
        { label: 'Cut Size', value: '8-15mm / 15-20mm / As per buyer' },
        { label: 'Color', value: 'Creamy White to Light Beige' },
        { label: 'Taste & Aroma', value: 'Characteristic, Pungent, Free from off-odor' },
        { label: 'Moisture', value: 'Max 6.0%' },
        { label: 'Shelf Life', value: '24 Months' },
      ],
      specificationTable: {
        headers: ['Parameter', 'Specification', 'Test Method'],
        rows: [
          ['Origin', 'India - Mahuva, Gujarat', '-'],
          ['Cut Size', '8-15mm / 15-20mm / As per buyer', 'Sieve Analysis'],
          ['Color', 'Creamy White to Light Beige', '-'],
          ['Taste & Aroma', 'Characteristic, Pungent, Free from off-odor', 'Organoleptic'],
          ['Moisture', 'Max 6.0%', 'Hot Air Oven Method'],
          ['Shelf Life', '24 Months', '-'],
        ],
      },
      certifications: ['FSSAI', 'HACCP', 'ISO 22000', 'BRCGS', 'Halal', 'Kosher', 'APEDA', 'COA (Per Batch)'],
      applications: ['Food Processing', 'Soups', 'Sauces', 'Canned Food', 'Fast Food Garnishing'],
      packaging: '25 kg multi-wall paper bags with polythene liner',
      storageGuidelines: 'Store in a cool, dry place below 25°C. Keep away from direct sunlight and moisture.',
      whyChoose: [
        { title: 'Sortex Grade Quality', desc: 'Machine-cleaned and Sortex-sorted for best appearance and quality' },
        { title: 'Mahuva Origin', desc: "Sourced from India's premium onion processing belt" },
        { title: 'Custom Cut Sizes', desc: 'Available in 8-15mm, 15-20mm, or as per buyer specification' },
        { title: 'ETO / Steam Grade', desc: 'ETO Treated and Steam Sterilized grades available on request' },
      ],
      status: 'PUBLISHED',
      sort_order: 1,
      meta_title: 'Dehydrated White Onion Flakes | Cresta Foods',
      meta_description: 'Export-grade dehydrated white onion flakes from Mahuva, Gujarat. FSSAI, HACCP, ISO 22000 certified. 8-15mm & 15-20mm cut sizes. Custom specification available.',
      meta_keywords: 'dehydrated white onion flakes, white onion flakes exporter, dried onion flakes India',
    },
    {
      slug: 'dehydrated-white-onion-powder',
      name: 'Dehydrated White Onion Powder',
      category: 'Onions',
      subCategory: 'White Onion',
      shortDesc: 'Fine, free-flowing off-white powder ground to 80-100 mesh using stainless steel hammer mills with in-built cooling to preserve volatile flavor compounds.',
      description: `Fine, free-flowing off-white powder produced by milling premium dehydrated white onion flakes using stainless steel hammer mills with in-built cooling systems to preserve volatile flavor compounds.

Ground to 80-100 mesh fineness ensuring excellent solubility of over 80% and uniform flavor distribution. Used extensively in seasoning mixes, ready-to-eat foods, soups, gravies, and marinades.

An anti-caking agent option is available. Steam Sterilized grade available for hygiene-sensitive applications. Instant solubility makes it ideal for industrial food formulations.`,
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&q=80',
      gallery: ['https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&q=80'],
      badge: 'Ultra Fine',
      featured: true,
      specifications: [
        { label: 'Appearance', value: 'White to light cream, fine free-flowing powder' },
        { label: 'Particle Size', value: '80-100 Mesh' },
        { label: 'Color', value: 'Off White / Creamy White' },
        { label: 'Taste & Aroma', value: 'Characteristic, Pungent' },
        { label: 'Moisture', value: 'Max 6.0%' },
        { label: 'Shelf Life', value: '24 Months' },
      ],
      specificationTable: {
        headers: ['Parameter', 'Specification', 'Test Method'],
        rows: [
          ['Appearance', 'White to light cream, fine free-flowing powder', '-'],
          ['Particle Size', '80-100 Mesh', 'Sieve Analysis'],
          ['Color', 'Off White / Creamy White', '-'],
          ['Taste & Aroma', 'Characteristic, Pungent', 'Organoleptic'],
          ['Moisture', 'Max 6.0%', 'ISO 939'],
          ['Shelf Life', '24 Months', '-'],
        ],
      },
      keyProperties: [
        'Ultra-Fine 80-100 Mesh',
        'Instant Solubility (>80%)',
        'Concentrated Flavor',
        'Steam Sterilized Grade available',
        'Anti-Caking Option',
      ],
      certifications: ['FSSAI', 'HACCP', 'ISO 22000', 'BRCGS', 'Halal', 'Kosher', 'APEDA', 'COA'],
      applications: ['Seasoning Mixes', 'Ready-to-Eat Foods', 'Soups', 'Gravies', 'Marinades'],
      packaging: '25 kg multi-wall paper bags with polythene liner',
      storageGuidelines: 'Store in a cool, dry place below 25°C in airtight conditions. Keep away from moisture and strong odors.',
      whyChoose: [
        { title: 'Ultra-Fine Grind', desc: '80-100 mesh for instant solubility and uniform flavor' },
        { title: 'Flavor Preservation', desc: 'Hammer mills with cooling to retain volatile aroma compounds' },
        { title: 'Anti-Caking Option', desc: 'Anti-caking agent available for enhanced flowability' },
        { title: 'Steam Sterilized', desc: 'Available in Steam Sterilized grade for hygiene-sensitive use' },
      ],
      status: 'PUBLISHED',
      sort_order: 2,
      meta_title: 'Dehydrated White Onion Powder | Cresta Foods',
      meta_description: 'Premium white onion powder, 80-100 mesh, instant solubility. FSSAI, HACCP, ISO 22000 certified. For seasoning mixes, soups, gravies, and industrial food applications.',
      meta_keywords: 'dehydrated white onion powder, onion powder exporter, white onion powder India',
    },
    {
      slug: 'dehydrated-white-kibbled-onion',
      name: 'Dehydrated White Kibbled Onion',
      category: 'Onions',
      subCategory: 'White Onion',
      shortDesc: 'Prepared from hand-picked fresh white onions, peeled, sliced, and hot-air dried to a uniform 3-5mm size. Perfect 1:10 replacement ratio for fresh onions.',
      description: `Prepared from hand-picked fresh white onions sourced from Gujarat's Mahuva region. The onions are peeled, sliced and then hot-air dried at controlled temperatures to achieve a uniform 3-5mm kibbled size with less than 6% moisture.

Kibbled onion is widely used in dry soup mixes, seasoning mixes, and processed foods where a mid-size cut is required — smaller than flakes but larger than minced. Available in custom cut sizes per buyer specification.

Cresta Foods' white kibbled onion offers a perfect 1:10 replacement ratio for fresh onions, making it a highly efficient and convenient ingredient for food manufacturers.`,
      image: 'https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=800&q=80',
      gallery: ['https://images.unsplash.com/photo-1606923829579-0cb981a83e2e?w=800&q=80'],
      badge: 'Export Grade',
      featured: false,
      specifications: [
        { label: 'Origin', value: 'India - Mahuva, Gujarat' },
        { label: 'Cut Size', value: '3-5 mm / As per buyer' },
        { label: 'Color', value: 'Creamy White to Light Beige' },
        { label: 'Taste & Aroma', value: 'Characteristic, Pungent' },
        { label: 'Moisture', value: 'Max 6.0%' },
        { label: 'Shelf Life', value: '24 Months' },
      ],
      specificationTable: {
        headers: ['Parameter', 'Specification', 'Test Method'],
        rows: [
          ['Origin', 'India - Mahuva, Gujarat', '-'],
          ['Cut Size', '3-5 mm / As per buyer', 'Sieve Analysis'],
          ['Color', 'Creamy White to Light Beige', '-'],
          ['Taste & Aroma', 'Characteristic, Pungent', 'Organoleptic'],
          ['Moisture', 'Max 6.0%', 'Hot Air Oven Method'],
          ['Shelf Life', '24 Months', '-'],
        ],
      },
      certifications: ['FSSAI', 'HACCP', 'ISO 22000', 'BRCGS', 'Halal', 'Kosher', 'APEDA', 'COA'],
      applications: ['Dry Soup Mixes', 'Seasoning Mixes', 'Processed Foods'],
      packaging: '25 kg multi-wall paper bags with polythene liner',
      storageGuidelines: 'Store in a cool, dry place below 25°C. Keep away from direct sunlight and moisture.',
      whyChoose: [
        { title: '1:10 Rehydration Ratio', desc: 'Perfect replacement for fresh onion in industrial food production' },
        { title: 'Uniform 3-5mm Size', desc: 'Consistent cut size for predictable performance in all applications' },
        { title: 'Hand-Picked Origin', desc: 'Sourced from premium Gujarat-origin fresh white onions' },
      ],
      status: 'PUBLISHED',
      sort_order: 3,
      meta_title: 'Dehydrated White Kibbled Onion | Cresta Foods',
      meta_description: 'Export quality white kibbled onion in 3-5mm size. FSSAI, HACCP, ISO 22000 certified. For dry soup mixes, seasonings, and processed foods.',
      meta_keywords: 'white kibbled onion, dehydrated kibbled onion exporter, kibbled onion India',
    },
    {
      slug: 'dehydrated-white-onion-chopped',
      name: 'Dehydrated White Onion Chopped',
      category: 'Onions',
      subCategory: 'White Onion',
      shortDesc: 'Uniform 5-8mm cubes made by washing, peeling, and chopping fresh white onions. Rehydrates to look and feel like freshly chopped onions.',
      description: `Uniform 5-8mm cubes made by washing, peeling, and mechanically chopping fresh white onions from Gujarat. The chopped onions are then hot-air dried to remove moisture content to below 6%.

Dehydrated white onion chopped rehydrates beautifully to look and feel like freshly chopped onions, making it an ideal ingredient for ready-to-eat meals, soups, fast food toppings, and salads.

Custom cut sizes available as per buyer specification. ETO Treated and Steam Sterilized grades can be provided upon request. Full COA issued per batch.`,
      image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&q=80',
      gallery: ['https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&q=80'],
      badge: 'Premium Grade',
      featured: false,
      specifications: [
        { label: 'Origin', value: 'India - Mahuva, Gujarat' },
        { label: 'Cut Size', value: '5-8 mm / As per buyer' },
        { label: 'Color', value: 'Creamy White to Light Beige' },
        { label: 'Moisture', value: 'Max 6.0%' },
        { label: 'Shelf Life', value: '24 Months' },
      ],
      specificationTable: {
        headers: ['Parameter', 'Specification', 'Test Method'],
        rows: [
          ['Origin', 'India - Mahuva, Gujarat', '-'],
          ['Cut Size', '5-8 mm / As per buyer', 'Sieve Analysis'],
          ['Color', 'Creamy White to Light Beige', '-'],
          ['Moisture', 'Max 6.0%', 'Hot Air Oven'],
          ['Shelf Life', '24 Months', '-'],
        ],
      },
      certifications: ['FSSAI', 'HACCP', 'ISO 22000', 'BRCGS', 'Halal', 'Kosher', 'APEDA', 'COA'],
      applications: ['Ready-to-Eat Meals', 'Soups', 'Fast Food Toppings', 'Salads'],
      packaging: '25 kg multi-wall paper bags with polythene liner',
      storageGuidelines: 'Store in a cool, dry place below 25°C. Keep away from direct sunlight and moisture.',
      whyChoose: [
        { title: 'Freshly Chopped Rehydration', desc: 'Rehydrates to the texture and appearance of freshly chopped onion' },
        { title: 'Uniform 5-8mm Cubes', desc: 'Consistent sizing for visual appeal and even cooking' },
        { title: 'Versatile Applications', desc: 'Suitable for soups, RTE meals, and gourmet food toppings' },
      ],
      status: 'PUBLISHED',
      sort_order: 4,
      meta_title: 'Dehydrated White Onion Chopped | Cresta Foods',
      meta_description: 'Premium dehydrated white onion chopped in 5-8mm cubes. FSSAI, HACCP certified. Ideal for RTE meals, soups, and food processing.',
      meta_keywords: 'dehydrated chopped onion, white onion chopped exporter, dried onion cubes India',
    },
    {
      slug: 'dehydrated-white-onion-minced',
      name: 'Dehydrated White Onion Minced',
      category: 'Onions',
      subCategory: 'White Onion',
      shortDesc: 'Washed and peeled onions minced into 1-3mm fine granules and hot-air dried. Instantly infuses flavor smoothly into recipes.',
      description: `Washed and peeled white onions are minced into 1-3mm fine granules using food-grade equipment and then hot-air dried under hygiene-controlled conditions.

Dehydrated white onion minced is finer than kibbled or chopped cuts, making it perfect for sauces, gravies, catering food, seasonings, and fine meat products where the onion should dissolve smoothly into the formulation.

Instantly infuses flavor into recipes without visible onion chunks. Available in custom granule size per buyer specification. COA provided per batch.`,
      image: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=800&q=80',
      gallery: ['https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=800&q=80'],
      badge: 'Fine Granules',
      featured: false,
      specifications: [
        { label: 'Origin', value: 'India - Mahuva, Gujarat' },
        { label: 'Cut Size', value: '1-3 mm / As per buyer' },
        { label: 'Color', value: 'Creamy White to Light Beige' },
        { label: 'Moisture', value: 'Max 6.0%' },
        { label: 'Shelf Life', value: '24 Months' },
      ],
      specificationTable: {
        headers: ['Parameter', 'Specification', 'Test Method'],
        rows: [
          ['Origin', 'India - Mahuva, Gujarat', '-'],
          ['Cut Size', '1-3 mm / As per buyer', 'Sieve Analysis'],
          ['Color', 'Creamy White to Light Beige', '-'],
          ['Moisture', 'Max 6.0%', 'Hot Air Oven'],
          ['Shelf Life', '24 Months', '-'],
        ],
      },
      certifications: ['FSSAI', 'HACCP', 'ISO 22000', 'BRCGS', 'Halal', 'Kosher', 'APEDA', 'COA'],
      applications: ['Sauces', 'Gravies', 'Catering Food', 'Seasonings', 'Fine Meat Products'],
      packaging: '25 kg multi-wall paper bags with polythene liner',
      storageGuidelines: 'Store in a cool, dry place below 25°C. Keep away from direct sunlight and moisture.',
      whyChoose: [
        { title: 'Smooth Flavor Infusion', desc: 'Dissolves seamlessly into sauces and gravies without visible chunks' },
        { title: '1-3mm Fine Granules', desc: 'Perfect for fine food formulations and seasoning applications' },
        { title: 'Food-Grade Processing', desc: 'Hygienic mincing and drying to preserve flavor and safety' },
      ],
      status: 'PUBLISHED',
      sort_order: 5,
      meta_title: 'Dehydrated White Onion Minced | Cresta Foods',
      meta_description: 'Export quality dehydrated white onion minced in 1-3mm granules. FSSAI, HACCP certified. Ideal for sauces, gravies, and seasonings.',
      meta_keywords: 'dehydrated minced onion, white onion minced exporter, dried onion granules India',
    },

    // ─────────────────────────────────────────────────────────────
    // RED & PINK ONIONS (category: 'Onions', subCategory: 'Red & Pink Onion')
    // ─────────────────────────────────────────────────────────────
    {
      slug: 'red-onion-flakes',
      name: 'Red Onion Flakes',
      category: 'Onions',
      subCategory: 'Red & Pink Onion',
      shortDesc: 'Premium fresh red onions processed into flakes. Delivers the pungent aroma and deep flavor of fresh red onions without the hassle of peeling.',
      description: `Premium fresh red onions processed into flakes, delivering the pungent aroma and deep flavor of fresh red onions without the hassle of peeling. Sourced from premium growing regions across India including Maharashtra and Rajasthan.

The onions are carefully selected, washed, peeled, sliced to 5-15mm uniform flake size, and hot-air dried under strict quality controls to below 6% moisture. The striking deep red and purple color is naturally preserved throughout the drying process.

Ideal for canned foods, meat products, soups, stews, and gourmet seasoning blends. Available with ETO treatment and steam sterilization on request. Full COA per batch.`,
      image: 'https://images.unsplash.com/photo-1620574387995-0160967f52f4?w=800&q=80',
      gallery: ['https://images.unsplash.com/photo-1620574387995-0160967f52f4?w=800&q=80'],
      badge: 'Deep Flavor',
      featured: true,
      specifications: [
        { label: 'Color', value: 'Deep Red / Purple' },
        { label: 'Size', value: '5mm to 15mm' },
        { label: 'Moisture', value: 'Max 6%' },
        { label: 'Shelf Life', value: '12 Months' },
      ],
      specificationTable: {
        headers: ['Parameter', 'Specification', 'Test Method'],
        rows: [
          ['Color', 'Deep Red / Purple', '-'],
          ['Size', '5mm to 15mm', '-'],
          ['Moisture', 'Max 6%', '-'],
          ['Shelf Life', '12 Months', '-'],
        ],
      },
      certifications: ['FSSAI', 'HACCP', 'ISO 22000', 'BRCGS', 'Halal', 'Kosher', 'APEDA', 'COA'],
      applications: ['Canned Foods', 'Meat Products', 'Soups', 'Stews', 'Gourmet Seasoning Blends'],
      packaging: '25 kg multi-wall paper bags with polythene liner',
      storageGuidelines: 'Store in a cool, dry, dark place below 25°C. Protect from light to preserve color.',
      whyChoose: [
        { title: 'Deep Natural Color', desc: 'Naturally preserved deep red and purple color throughout processing' },
        { title: 'Premium Indian Origin', desc: 'Sourced from premium red onion growing regions of Maharashtra and Rajasthan' },
        { title: 'Pungent Aroma Preserved', desc: 'High-pungency aroma and flavor retained with controlled drying' },
      ],
      status: 'PUBLISHED',
      sort_order: 6,
      meta_title: 'Red Onion Flakes | Cresta Foods',
      meta_description: 'Premium dehydrated red onion flakes, deep red color, max 6% moisture. FSSAI, HACCP, ISO 22000 certified. For canned foods, meat products, and seasoning blends.',
      meta_keywords: 'red onion flakes, dehydrated red onion flakes exporter, dried red onion India',
    },
    {
      slug: 'red-onion-powder',
      name: 'Red Onion Powder',
      category: 'Onions',
      subCategory: 'Red & Pink Onion',
      shortDesc: 'Finely ground concentrated spice that dissolves instantly. Ensures uniform flavor profile in sauces, gravies, and marinades.',
      description: `Finely ground to 100 mesh, red onion powder is a concentrated spice that dissolves instantly, ensuring a uniform flavor profile in sauces, gravies, and marinades.

Made from premium dehydrated red onions processed using stainless steel grinding equipment with cooling to preserve the characteristic pinkish-red color and intense flavor. The fine 100 mesh powder ensures rapid dispersion and solubility in liquid formulations.

Widely used in seasoning blends, spice mixes, and instant food premixes. Available with anti-caking agent and steam sterilized grades on request.`,
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&q=80',
      gallery: ['https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&q=80'],
      badge: '100 Mesh Fine',
      featured: false,
      specifications: [
        { label: 'Color', value: 'Pinkish-Red' },
        { label: 'Texture', value: 'Fine free-flowing powder (100 mesh)' },
        { label: 'Moisture', value: 'Max 5%' },
        { label: 'Shelf Life', value: '12 Months' },
      ],
      specificationTable: {
        headers: ['Parameter', 'Specification', 'Test Method'],
        rows: [
          ['Color', 'Pinkish-Red', '-'],
          ['Texture', 'Fine free-flowing powder (100 mesh)', '-'],
          ['Moisture', 'Max 5%', '-'],
          ['Shelf Life', '12 Months', '-'],
        ],
      },
      certifications: ['FSSAI', 'HACCP', 'ISO 22000', 'BRCGS', 'Halal', 'Kosher', 'APEDA', 'COA'],
      applications: ['Seasonings', 'Spice Mixes', 'Instant Food Premixes'],
      packaging: '25 kg multi-wall paper bags with polythene liner',
      storageGuidelines: 'Store in cool, dry, airtight conditions. Protect from moisture and strong light.',
      whyChoose: [
        { title: 'Pinkish-Red Color', desc: 'Natural color preserved for visual appeal in seasonings and spice blends' },
        { title: '100 Mesh Fineness', desc: 'Instant solubility and uniform flavor dispersion in liquid applications' },
        { title: 'Concentrated Flavor', desc: 'High-pungency concentrated flavor for minimal usage in formulations' },
      ],
      status: 'PUBLISHED',
      sort_order: 7,
      meta_title: 'Red Onion Powder | Cresta Foods',
      meta_description: 'Premium red onion powder, 100 mesh, pinkish-red color. FSSAI, HACCP certified. For seasonings, spice mixes, and instant food formulations.',
      meta_keywords: 'red onion powder, dehydrated red onion powder exporter, red onion powder India',
    },
    {
      slug: 'pink-onion-flakes',
      name: 'Pink Onion Flakes',
      category: 'Onions',
      subCategory: 'Red & Pink Onion',
      shortDesc: 'Known for their mild and slightly sweet flavor. Provides an excellent look and balanced taste without overpowering the dish.',
      description: `Pink onion flakes are known for their mild and slightly sweet flavor profile, providing an excellent visual appeal and balanced taste without overpowering the dish. Processed from premium pink onion varieties grown in select regions of India.

These flakes exhibit a beautiful light pink to white-pink color, making them visually attractive in finished food products. They deliver a milder, slightly sweet onion character compared to red or white onions.

Ideal for salads, dry soups, vegetable mixes, and continental dishes. Available in 5-15mm standard cut or custom specification. COA provided per batch. ETO Treated grade available on request.`,
      image: 'https://images.unsplash.com/photo-1620574387995-0160967f52f4?w=800&q=80',
      gallery: ['https://images.unsplash.com/photo-1620574387995-0160967f52f4?w=800&q=80'],
      badge: 'Mild & Sweet',
      featured: false,
      specifications: [
        { label: 'Color', value: 'Light Pink / White-Pink' },
        { label: 'Size', value: '5mm to 15mm' },
        { label: 'Moisture', value: 'Max 6%' },
        { label: 'Shelf Life', value: '12 Months' },
      ],
      specificationTable: {
        headers: ['Parameter', 'Specification', 'Test Method'],
        rows: [
          ['Color', 'Light Pink / White-Pink', '-'],
          ['Size', '5mm to 15mm', '-'],
          ['Moisture', 'Max 6%', '-'],
          ['Shelf Life', '12 Months', '-'],
        ],
      },
      certifications: ['FSSAI', 'HACCP', 'ISO 22000', 'BRCGS', 'Halal', 'Kosher', 'APEDA', 'COA'],
      applications: ['Salads', 'Dry Soups', 'Vegetable Mixes', 'Continental Dishes'],
      packaging: '25 kg multi-wall paper bags with polythene liner',
      storageGuidelines: 'Store in a cool, dry, dark place below 25°C. Protect from light to preserve natural pink color.',
      whyChoose: [
        { title: 'Mild Sweet Flavor', desc: 'Perfect for dishes requiring a balanced, non-overpowering onion taste' },
        { title: 'Attractive Pink Color', desc: 'Light pink to white-pink color for visual appeal in food products' },
        { title: 'Versatile Use', desc: 'Suitable for salads, continental dishes, and premium seasoning blends' },
      ],
      status: 'PUBLISHED',
      sort_order: 8,
      meta_title: 'Pink Onion Flakes | Cresta Foods',
      meta_description: 'Premium pink onion flakes with mild sweet flavor, light pink color. FSSAI, HACCP certified. For salads, dry soups, and continental food applications.',
      meta_keywords: 'pink onion flakes, dehydrated pink onion flakes exporter, pink onion India',
    },
    {
      slug: 'pink-onion-powder',
      name: 'Pink Onion Powder',
      category: 'Onions',
      subCategory: 'Red & Pink Onion',
      shortDesc: 'A secret ingredient for adding mild, sweet onion flavor to dishes. Provides uniform texture and taste.',
      description: `Pink onion powder is a secret ingredient for adding mild, sweet onion flavor to dishes, providing uniform texture and taste. Processed from premium pink onions and finely ground to 100 mesh fineness.

The pale pink color and gentle flavor make it a unique ingredient for snack seasonings, infant food, and savory batters where a softer, less pungent onion character is required. Ideal where the onion must enhance rather than dominate the overall flavor profile.

Available with anti-caking agent option for improved flowability. Steam Sterilized grade available for sensitive applications including infant food products.`,
      image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&q=80',
      gallery: ['https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&q=80'],
      badge: 'Pale Pink',
      featured: false,
      specifications: [
        { label: 'Color', value: 'Pale Pink' },
        { label: 'Texture', value: 'Fine free-flowing powder (100 mesh)' },
        { label: 'Moisture', value: 'Max 5%' },
        { label: 'Shelf Life', value: '12 Months' },
      ],
      specificationTable: {
        headers: ['Parameter', 'Specification', 'Test Method'],
        rows: [
          ['Color', 'Pale Pink', '-'],
          ['Texture', 'Fine free-flowing powder (100 mesh)', '-'],
          ['Moisture', 'Max 5%', '-'],
          ['Shelf Life', '12 Months', '-'],
        ],
      },
      keyProperties: [
        'Mild Sweet Onion Flavor',
        'Pale Pink Natural Color',
        '100 Mesh Ultra-Fine',
        'Suitable for Infant Food Applications',
        'Anti-Caking Option Available',
      ],
      certifications: ['FSSAI', 'HACCP', 'ISO 22000', 'BRCGS', 'Halal', 'Kosher', 'APEDA', 'COA'],
      applications: ['Snack Seasonings', 'Infant Food', 'Savory Batters'],
      packaging: '25 kg multi-wall paper bags with polythene liner',
      storageGuidelines: 'Store in cool, dry, airtight conditions. Protect from moisture, light, and strong odors.',
      whyChoose: [
        { title: 'Gentle Flavor Profile', desc: 'Mild sweet onion flavor ideal for sensitive or premium food formulations' },
        { title: 'Infant Food Grade', desc: 'Available in Steam Sterilized grade suitable for infant food products' },
        { title: 'Pale Pink Uniformity', desc: 'Consistent pale pink color for visual and flavor uniformity in products' },
      ],
      status: 'PUBLISHED',
      sort_order: 9,
      meta_title: 'Pink Onion Powder | Cresta Foods',
      meta_description: 'Premium pink onion powder, pale pink, 100 mesh, mild sweet flavor. FSSAI, HACCP certified. For snack seasonings, infant food, and savory batters.',
      meta_keywords: 'pink onion powder, dehydrated pink onion powder exporter, pink onion powder India',
    },

    // ─────────────────────────────────────────────────────────────
    // GUAR GUM POWDERS (category: 'Guar', subCategory: 'Hydrocolloids')
    // ─────────────────────────────────────────────────────────────
    {
      slug: 'food-grade-guar-gum-powder',
      name: 'Food Grade Guar Gum Powder',
      category: 'Guar',
      subCategory: 'Hydrocolloids',
      shortDesc: 'Pure natural thickener derived from Indian guar seeds, 100% safe for human consumption. Sourced from audited mills in Rajasthan, guaranteeing top purity and viscosity.',
      description: `Pure natural thickener derived from Indian guar seeds, 100% safe for human consumption. Sourced exclusively from audited mills in Rajasthan — the global hub of guar cultivation — guaranteeing top purity and viscosity.

Cresta Foods' Food Grade Guar Gum Powder is available in 100 Mesh, 200 Mesh, and 300 Mesh grades with viscosity ranging from 3000-7000+ CPS at 1% solution. It functions as a superior thickener, stabilizer, binder, and emulsifier across multiple food applications.

Key functional properties include Superior Thickening (8 times the thickening power of corn starch), Excellent Stabilization (prevents syneresis in dairy and frozen foods), Emulsification support, Fat Replacement capability, and Dietary Fiber source.

Applications include Sauces, Ice Creams, Dressings, Low-calorie foods, Dairy products, Baked goods, Beverages, and Pharmaceutical formulations.`,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
      gallery: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80'],
      badge: 'Best Seller',
      featured: true,
      specifications: [
        { label: 'Viscosity (1% Sol. 25°C, 20 rpm)', value: '3000-3500 Cps Min. (100/200 Mesh)' },
        { label: 'Viscosity Max Limit', value: 'Up to 7000 Cps Max' },
        { label: 'Moisture', value: '12% Max.' },
        { label: 'Proteins', value: '5.0% Max.' },
        { label: 'pH Range', value: '5.5 – 7.0' },
        { label: 'Assay (Galactomannan)', value: '80% Min.' },
      ],
      specificationTable: {
        headers: ['Parameter', 'Specification', 'Test Method'],
        rows: [
          ['Viscosity (1% Sol. 25°C, 20 rpm)', '3000-3500 Cps Min. (100/200 Mesh)', 'Brookfield'],
          ['Viscosity Max Limit', 'Up to 7000 Cps Max', '-'],
          ['Moisture', '12% Max.', '-'],
          ['Proteins', '5.0% Max.', '-'],
          ['pH Range', '5.5 – 7.0', '-'],
          ['Assay (Galactomannan)', '80% Min.', '-'],
        ],
      },
      keyProperties: [
        'Superior Thickening',
        'Excellent Stabilization (Prevents Syneresis)',
        'Emulsification',
        'Fat Replacement',
        'Dietary Fiber Source',
      ],
      whyChoose: [
        { title: 'Rajasthan Origin', desc: 'Sourced from audited mills in the global hub of guar cultivation' },
        { title: 'Multi-Grade Available', desc: '100, 200, and 300 mesh grades for targeted food applications' },
        { title: 'High Viscosity Guaranteed', desc: '3000-7000+ CPS with NABL-accredited third-party COA' },
        { title: 'Superior Thickening Power', desc: '8x the thickening power of corn starch at minimal usage levels' },
      ],
      applications: ['Sauces', 'Ice Creams', 'Dressings', 'Low-Calorie Foods', 'Dairy Products', 'Baked Goods', 'Beverages', 'Pharmaceuticals'],
      packaging: '25 kg multi-wall paper bags with polythene liner',
      storageGuidelines: 'Store in a cool, dry place. Avoid humidity. Keep tightly sealed after opening.',
      certifications: ['FSSAI', 'ISO 22000', 'HACCP', 'Halal Certified', 'COA'],
      status: 'PUBLISHED',
      sort_order: 10,
      meta_title: 'Food Grade Guar Gum Powder | Cresta Foods',
      meta_description: 'Premium food grade guar gum powder, 100/200/300 mesh, 3000-7000+ CPS. FSSAI, ISO 22000, HACCP, Halal certified. For sauces, ice cream, dairy, and pharmaceuticals.',
      meta_keywords: 'food grade guar gum powder, guar gum exporter India, guar gum powder Rajasthan',
    },
    {
      slug: 'industrial-grade-guar-gum-powder',
      name: 'Industrial Grade Guar Gum Powder',
      category: 'Guar',
      subCategory: 'Hydrocolloids',
      shortDesc: 'Hydrocolloid polymer capable of forming a highly viscous colloidal dispersion in cold water without heating. Cost-effective thickener and suspension stabilizer.',
      description: `Industrial Grade Guar Gum Powder is a versatile hydrocolloid polymer capable of forming a highly viscous colloidal dispersion in cold water without heating — making it a highly cost-effective thickener and suspension stabilizer across demanding industrial applications.

Sourced from premium guar varieties processed at state-of-the-art facilities in Rajasthan. Available in 100 Mesh, 200 Mesh, and 300 Mesh grades with viscosity ranging from 2500-9000 CPS.

Key functional properties include High Viscosity & Rapid Hydration, Fluid Loss Control (critical in oil & gas drilling), Suspension & Binding (paper, textile), Thermal Stability, and Water Retention.

Primary industrial applications: Oil & Gas Drilling Fluids (Fracking), Textile Printing (as a sizing and printing agent), Paper Manufacturing (as a fiber bonding agent), Mining, and Explosives manufacturing.`,
      image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=800&q=80',
      gallery: ['https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=800&q=80'],
      badge: 'Export Grade',
      featured: true,
      specifications: [
        { label: 'Viscosity (Cps Min.)', value: '2500 - 3500 (100/200/300 Mesh)' },
        { label: 'Viscometer 1% Max', value: 'Up to 9000 Max' },
        { label: 'Moisture', value: '12% Max' },
        { label: 'Proteins / pH', value: '5.0% Max / 5.5 – 7.0' },
        { label: 'Assay', value: '80% Min' },
      ],
      specificationTable: {
        headers: ['Parameter', 'Specification', 'Test Method'],
        rows: [
          ['Viscosity (Cps Min.)', '2500 - 3500 (100/200/300 Mesh)', '-'],
          ['Viscometer 1% Max', 'Up to 9000 Max', '-'],
          ['Moisture', '12% Max', '-'],
          ['Proteins / pH', '5.0% Max / 5.5 – 7.0', '-'],
          ['Assay', '80% Min', '-'],
        ],
      },
      keyProperties: [
        'High Viscosity & Rapid Hydration',
        'Fluid Loss Control',
        'Suspension & Binding',
        'Thermal Stability',
        'Water Retention',
      ],
      whyChoose: [
        { title: 'Cold Water Solubility', desc: 'Forms highly viscous dispersion in cold water without heating — highly cost-effective' },
        { title: 'Fluid Loss Control', desc: 'Critical performance in oil & gas drilling fluid applications' },
        { title: 'Multi-Grade Available', desc: '100, 200, 300 mesh grades for specific industrial process requirements' },
        { title: 'REACH Compliant', desc: 'Fully documented with MSDS, Phytosanitary, and COA archive' },
      ],
      applications: ['Oil & Gas Drilling (Fracking)', 'Textile Printing', 'Paper Manufacturing', 'Mining', 'Explosives'],
      packaging: '25 kg multi-wall paper bags',
      storageGuidelines: 'Store in a cool, dry place. Avoid direct contact with water. Keep sealed in original packaging.',
      certifications: ['ISO 9001', 'REACH Compliant', 'MSDS Sheet', 'Phytosanitary', 'COA Archive'],
      status: 'PUBLISHED',
      sort_order: 11,
      meta_title: 'Industrial Grade Guar Gum Powder | Cresta Foods',
      meta_description: 'Industrial grade guar gum powder, 100/200/300 mesh, up to 9000 CPS. For oil & gas drilling, textile printing, paper manufacturing, and mining.',
      meta_keywords: 'industrial guar gum powder, guar gum for drilling, industrial hydrocolloid India',
    },

    // ─────────────────────────────────────────────────────────────
    // GUAR MEAL FEEDS (category: 'Guar', subCategory: 'Animal Feed')
    // ─────────────────────────────────────────────────────────────
    {
      slug: 'guar-meal-korma-roasted',
      name: 'Guar Meal Korma (Roasted)',
      category: 'Guar',
      subCategory: 'Animal Feed',
      shortDesc: 'Germ portion of the guar seed. Roasted at high temperatures to eliminate anti-nutritional factors. A high-protein feed ingredient with excellent digestibility.',
      description: `Guar Meal Korma is derived from the germ portion of the guar seed — the high-protein, high-energy fraction separated during guar gum processing. It is roasted at high temperatures to effectively eliminate trypsin inhibitors and other anti-nutritional factors, significantly improving digestibility.

With 45-50% crude protein content, Guar Meal Korma is one of the most concentrated protein feed ingredients available for cattle, poultry, swine, and aquaculture applications.

Recommended inclusion rates: Cattle Feed up to 30%, Poultry Feed up to 10%, Swine feed as per formulation, Aqua Feed for shrimp and fish.

Cresta Foods sources and exports APEDA-registered Guar Meal Korma with full process verification documentation. Export-ready documentation including COA, Phytosanitary Certificate, and Origin Certificate provided.`,
      image: 'https://images.unsplash.com/photo-1618151313441-bc79b11e5090?w=800&q=80',
      gallery: ['https://images.unsplash.com/photo-1618151313441-bc79b11e5090?w=800&q=80'],
      badge: 'High Protein',
      featured: true,
      specifications: [
        { label: 'Crude Protein', value: '45 – 50%' },
        { label: 'Crude Fat (Oil)', value: '4 – 8%' },
        { label: 'Moisture', value: '3 – 10%' },
        { label: 'Ash / Sand & Silica', value: '1 – 6% / 1 – 2%' },
      ],
      specificationTable: {
        headers: ['Parameter', 'Specification', 'Test Method'],
        rows: [
          ['Crude Protein', '45 – 50%', '-'],
          ['Crude Fat (Oil)', '4 – 8%', '-'],
          ['Moisture', '3 – 10%', '-'],
          ['Ash / Sand & Silica', '1 – 6% / 1 – 2%', '-'],
        ],
      },
      keyProperties: [
        'High crude protein 45-50% for livestock and poultry',
        'Roasted to eliminate trypsin inhibitors and anti-nutritional factors',
        'Excellent digestibility compared to raw guar meal',
        'High fat content (4-8%) as energy source',
        'APEDA registered and export-ready documentation',
      ],
      whyChoose: [
        { title: 'Highest Protein Concentration', desc: '45-50% crude protein — one of the most concentrated feed ingredients available' },
        { title: 'Roasting Eliminates ANFs', desc: 'High-temperature roasting removes trypsin inhibitors for safe inclusion' },
        { title: 'APEDA Registered', desc: 'Fully registered with APEDA with complete export documentation' },
        { title: 'Trusted by Feed Manufacturers', desc: 'Reliable supply with consistent quality and process verification' },
      ],
      applications: ['Cattle Feed (up to 30%)', 'Poultry Feed (up to 10%)', 'Swine Feed', 'Aqua Feed'],
      packaging: '50 kg woven polypropylene bags',
      storageGuidelines: 'Store in a cool, dry, well-ventilated area. Protect from moisture and pests. Use within shelf life.',
      certifications: ['APEDA Registered', 'Process Verified', 'Export Ready Documentation'],
      status: 'PUBLISHED',
      sort_order: 12,
      meta_title: 'Guar Meal Korma (Roasted) | Cresta Foods',
      meta_description: 'APEDA registered guar meal korma with 45-50% crude protein. Roasted for maximum digestibility. For cattle, poultry, swine, and aqua feed formulations.',
      meta_keywords: 'guar meal korma, roasted guar meal exporter, guar meal animal feed India',
    },
    {
      slug: 'guar-meal-churi',
      name: 'Guar Meal Churi',
      category: 'Guar',
      subCategory: 'Animal Feed',
      shortDesc: 'Outer husk of the guar seed mixed with germ, available as a coarse powder. Rich in protein and fiber, a highly economical energy feed for cattle and aquaculture.',
      description: `Guar Meal Churi is derived from the outer husk of the guar seed mixed with germ portions, available as a coarse powder. It is rich in both protein (~40%) and carbohydrate energy sources (~45%), making it a highly economical and balanced feed ingredient for cattle and aquaculture.

The combination of protein, fiber, and carbohydrate energy in Churi makes it ideal for dairy cattle milk production enhancement, poultry egg production improvement, and fish and shrimp feed formulations.

Churi provides essential amino acids as a cost-effective alternative to Soy Meal, sustained energy release, and improved gut health due to its natural fiber content. Widely used by Indian and export feed manufacturers due to its value-for-money protein content.

APEDA registered with complete export-ready documentation. Available in standard 50 kg woven bags or bulk per buyer specification.`,
      image: 'https://images.unsplash.com/photo-1618151313441-bc79b11e5090?w=800&q=80',
      gallery: ['https://images.unsplash.com/photo-1618151313441-bc79b11e5090?w=800&q=80'],
      badge: 'Economical',
      featured: false,
      specifications: [
        { label: 'Crude Protein Base', value: '~40%' },
        { label: 'Carbohydrate Energy Source', value: '~45%' },
        { label: 'Crude Fat', value: '~3%' },
        { label: 'Crude Fiber', value: '~10%' },
      ],
      specificationTable: {
        headers: ['Parameter', 'Specification', 'Test Method'],
        rows: [
          ['Crude Protein Base', '~40%', '-'],
          ['Carbohydrate Energy Source', '~45%', '-'],
          ['Crude Fat', '~3%', '-'],
          ['Crude Fiber', '~10%', '-'],
        ],
      },
      keyProperties: [
        'Provides essential amino acids',
        'Cost-effective alternative to Soy Meal',
        'Sustained energy & gut health',
        'Rich in natural dietary fiber',
        'Ideal for dairy and aquaculture feed',
      ],
      whyChoose: [
        { title: 'Economical Protein Source', desc: 'Cost-effective alternative to soy meal with ~40% crude protein content' },
        { title: 'Sustained Energy Release', desc: '~45% carbohydrate energy source for sustained energy in livestock' },
        { title: 'Gut Health Benefits', desc: '~10% crude fiber content for improved digestion and gut health' },
        { title: 'Versatile Applications', desc: 'Suitable for dairy cattle, poultry egg production, and aquaculture' },
      ],
      applications: ['Dairy Cattle Milk Production', 'Poultry Egg Production', 'Fish and Shrimp Feed Formulations'],
      packaging: '50 kg woven polypropylene bags',
      storageGuidelines: 'Store in a cool, dry, well-ventilated area. Protect from moisture and pests. Use within shelf life.',
      certifications: ['APEDA Registered', 'Process Verified', 'Export Ready Documentation'],
      status: 'PUBLISHED',
      sort_order: 13,
      meta_title: 'Guar Meal Churi | Cresta Foods',
      meta_description: 'APEDA registered guar meal churi with ~40% crude protein and ~45% energy source. Economical alternative to soy meal for dairy, poultry, and aqua feed.',
      meta_keywords: 'guar meal churi, guar churi exporter, guar meal animal feed India',
    },
  ];

  await Product.insertMany(products);
  console.log(`✅ ${products.length} products seeded successfully!\n`);
  console.log('Products seeded:');
  products.forEach((p, i) => {
    console.log(`  ${i + 1}. [${p.category} / ${p.subCategory}] ${p.name} (slug: ${p.slug})`);
  });

  process.exit(0);
};

seed().catch((err) => {
  console.error('❌ Seed error:', err);
  process.exit(1);
});
