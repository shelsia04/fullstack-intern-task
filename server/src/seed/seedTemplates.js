const Template = require("../models/Template");

const samples = [
  {
    name: "Startup Landing Page",
    description: "Clean landing page for SaaS startups with CTA and pricing section.",
    thumbnail_url: "https://picsum.photos/seed/startup/400/250",
    category: "Landing",
  },
  {
    name: "E-commerce Product Page",
    description: "Product detail page template with gallery, reviews and add-to-cart.",
    thumbnail_url: "https://picsum.photos/seed/ecom/400/250",
    category: "E-commerce",
  },
  {
    name: "Portfolio Minimal",
    description: "Minimal portfolio template for developers and designers.",
    thumbnail_url: "https://picsum.photos/seed/portfolio/400/250",
    category: "Portfolio",
  },
  {
    name: "Agency Website",
    description: "Agency template with services, testimonials, and contact form sections.",
    thumbnail_url: "https://picsum.photos/seed/agency/400/250",
    category: "Business",
  },
  {
    name: "Blog / Magazine",
    description: "Blog template with featured posts, categories and newsletter block.",
    thumbnail_url: "https://picsum.photos/seed/blog/400/250",
    category: "Blog",
  },

  // ✅ NEW 4 templates (total 9)
  {
    name: "Dashboard Analytics",
    description: "Modern admin dashboard with charts, KPIs, and sidebar navigation.",
    thumbnail_url: "https://picsum.photos/seed/dashboard/400/250",
    category: "Dashboard",
  },
  {
    name: "Mobile App Landing",
    description: "Landing page optimized for mobile apps with download CTA.",
    thumbnail_url: "https://picsum.photos/seed/mobile/400/250",
    category: "Landing",
  },
  {
    name: "Restaurant Website",
    description: "Beautiful restaurant template with menu, gallery, and booking section.",
    thumbnail_url: "https://picsum.photos/seed/restaurant/400/250",
    category: "Business",
  },
  {
    name: "Course / LMS Template",
    description: "Online course platform template with lessons and progress tracking.",
    thumbnail_url: "https://picsum.photos/seed/course/400/250",
    category: "Education",
  },
];

async function seedTemplatesIfEmpty() {
  const count = await Template.countDocuments();
  if (count === 0) {
    await Template.insertMany(samples);
    console.log(`✅ Seeded ${samples.length} templates`);
  } else {
    console.log("ℹ️ Templates already exist, skipping seed");
  }
}

module.exports = seedTemplatesIfEmpty;
