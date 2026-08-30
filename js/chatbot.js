/**
 * WebNest AI Assistant — Intelligent Chatbot Engine
 * NLP-powered sales & support assistant for WebNest
 */
(function () {
  'use strict';

  // ========================================
  // CONFIGURATION
  // ========================================
  var WHATSAPP_NUMBER = '923281190004';
  var DEMO_BASE = 'https://abdullaab1221-crypto.github.io/webnest-demos/demos';

  // ========================================
  // WEBNEST KNOWLEDGE BASE
  // ========================================
  var KB = {
    about: {
      name: 'WebNest',
      tagline: 'Websites Made to Be Remembered.',
      description: 'WebNest creates beautiful digital experiences including personal gift sites, couple/love pages, birthday surprises, wedding invitations, memory books, business websites, e-commerce stores, and portfolios.',
      website: 'https://webnestofficial.wuaze.com/',
      whatsapp: 'https://wa.me/' + WHATSAPP_NUMBER,
      social: {
        facebook: 'https://www.facebook.com/100089895946225/',
        instagram: 'https://www.instagram.com/webnest_.official/',
        tiktok: 'https://www.tiktok.com/@webnest.official'
      }
    },

    categories: {
      ecommerce: {
        name: 'E-commerce Websites',
        icon: '🛍️',
        desc: 'Professional online stores with products, cart, checkout and business management',
        subcategories: {
          fashion: {
            name: 'Fashion Store',
            icon: '👔',
            desc: 'Premium fashion store with products, shopping cart, checkout, customer experience and admin management.',
            demos: [
              { id: 'WN-ECOM-FASHION-BAS-001', name: 'Fashion Store — Basic', pages: '5+', products: 20, price: 'Rs. 8,000+', features: ['Product catalog', 'Cart', 'Checkout', 'Admin panel'], demoUrl: DEMO_BASE + '/fashion/WN-ECOM-FASHION-BAS-001/index.html' },
              { id: 'WN-ECOM-FASHION-MOD-001', name: 'Fashion Store — Moderate', pages: '7+', products: 30, price: 'Rs. 15,000+', features: ['Wishlist', 'Customer accounts', 'Enhanced filters', 'Full admin dashboard'], demoUrl: DEMO_BASE + '/fashion/WN-ECOM-FASHION-MOD-001/index.html' },
              { id: 'WN-ECOM-FASHION-EXP-001', name: 'Fashion Store — Expert', pages: '10+', products: 45, price: 'Rs. 25,000+', features: ['Advanced features', 'Full e-commerce', 'Full admin'], demoUrl: DEMO_BASE + '/fashion/WN-ECOM-FASHION-EXP-001/index.html' }
            ]
          }
        }
      },
      business: {
        name: 'Business Websites',
        icon: '💼',
        desc: 'Professional websites for restaurants, salons, real estate and agencies',
        subcategories: {
          restaurant: {
            name: 'Restaurant',
            icon: '🍽️',
            desc: 'Premium restaurant websites with menu management, reservations, and gallery.',
            demos: [
              { id: 'WN-BIZ-REST-BAS-001', name: 'Restaurant — Basic', pages: '5', price: 'Rs. 5,000+', features: ['Menu', 'Gallery', 'Admin panel'], demoUrl: DEMO_BASE + '/business/WN-BIZ-REST-BAS-001/index.html' },
              { id: 'WN-BIZ-REST-MOD-001', name: 'Restaurant — Moderate', pages: '7', price: 'Rs. 8,000+', features: ['About page', 'Testimonials', 'Enhanced menu', 'Gallery management'], demoUrl: DEMO_BASE + '/business/WN-BIZ-REST-MOD-001/index.html' },
              { id: 'WN-BIZ-REST-EXP-001', name: 'Restaurant — Expert', pages: '10+', price: 'Rs. 12,000+', features: ['Reservations', 'Events', 'Offers', 'Full admin dashboard'], demoUrl: DEMO_BASE + '/business/WN-BIZ-REST-EXP-001/index.html' }
            ]
          },
          salon: {
            name: 'Salon',
            icon: '✂️',
            desc: 'Luxury salon websites with services, team profiles, booking, and gallery.',
            demos: [
              { id: 'WN-BIZ-SALON-BAS-001', name: 'Salon — Basic', pages: '5', price: 'Rs. 5,000+', features: ['Services', 'Pricing', 'Gallery', 'Contact'], demoUrl: DEMO_BASE + '/business/WN-BIZ-SALON-BAS-001/index.html' },
              { id: 'WN-BIZ-SALON-MOD-001', name: 'Salon — Moderate', pages: '7', price: 'Rs. 8,000+', features: ['Team profiles', 'Testimonials', 'Enhanced gallery'], demoUrl: DEMO_BASE + '/business/WN-BIZ-SALON-MOD-001/index.html' },
              { id: 'WN-BIZ-SALON-EXP-001', name: 'Salon — Expert', pages: '10+', price: 'Rs. 12,000+', features: ['Booking system', 'Packages', 'Full admin dashboard'], demoUrl: DEMO_BASE + '/business/WN-BIZ-SALON-EXP-001/index.html' }
            ]
          },
          realestate: {
            name: 'Real Estate',
            icon: '🏠',
            desc: 'Premium property websites with listings, search filters, agent profiles, and lead management.',
            demos: [
              { id: 'WN-BIZ-REAL-BAS-001', name: 'Real Estate — Basic', pages: '5', price: 'Rs. 5,000+', features: ['Listings', 'Filters', 'Property detail', 'Contact'], demoUrl: DEMO_BASE + '/business/WN-BIZ-REAL-BAS-001/index.html' },
              { id: 'WN-BIZ-REAL-MOD-001', name: 'Real Estate — Moderate', pages: '7', price: 'Rs. 8,000+', features: ['About', 'Testimonials', 'Enhanced property management'], demoUrl: DEMO_BASE + '/business/WN-BIZ-REAL-MOD-001/index.html' },
              { id: 'WN-BIZ-REAL-EXP-001', name: 'Real Estate — Expert', pages: '10+', price: 'Rs. 12,000+', features: ['Mortgage calculator', 'Agents', 'Services', 'Full admin'], demoUrl: DEMO_BASE + '/business/WN-BIZ-REAL-EXP-001/index.html' }
            ]
          },
          agency: {
            name: 'Agency',
            icon: '🏢',
            desc: 'Modern agency websites with portfolio, case studies, team, process, and lead management.',
            demos: [
              { id: 'WN-BIZ-AGENCY-BAS-001', name: 'Agency — Basic', pages: '5', price: 'Rs. 5,000+', features: ['Services', 'Portfolio', 'Stats', 'Contact form'], demoUrl: DEMO_BASE + '/business/WN-BIZ-AGENCY-BAS-001/index.html' },
              { id: 'WN-BIZ-AGENCY-MOD-001', name: 'Agency — Moderate', pages: '7', price: 'Rs. 8,000+', features: ['About', 'Team', 'Testimonials', 'Enhanced portfolio'], demoUrl: DEMO_BASE + '/business/WN-BIZ-AGENCY-MOD-001/index.html' },
              { id: 'WN-BIZ-AGENCY-EXP-001', name: 'Agency — Expert', pages: '10+', price: 'Rs. 12,000+', features: ['Process', 'Case studies', 'CRM', 'Full admin dashboard'], demoUrl: DEMO_BASE + '/business/WN-BIZ-AGENCY-EXP-001/index.html' }
            ]
          }
        }
      },
      couple: {
        name: 'Couple & Love',
        icon: '❤️',
        desc: 'Romantic digital experiences for couples',
        demos: [
          { id: 'WN-CL-BAS-001', name: 'Couple & Love — Basic', pages: '3', photos: 5, price: 'Rs. 1,500+', features: ['Hero', 'Story', 'Milestones', 'Photo gallery'], demoUrl: DEMO_BASE + '/couple/WN-CL-BAS-001/index.html' },
          { id: 'WN-CL-MOD-001', name: 'Couple & Love — Moderate', pages: '5', photos: 10, price: 'Rs. 3,000+', features: ['Timeline', 'More photos', 'Interactive effects'], demoUrl: DEMO_BASE + '/couple/WN-CL-MOD-001/index.html' },
          { id: 'WN-CL-EXP-001', name: 'Couple & Love — Expert', pages: '8', photos: 20, price: 'Rs. 5,000+', features: ['Filterable gallery', 'Flip messages', 'Final surprise'], demoUrl: DEMO_BASE + '/couple/WN-CL-EXP-001/index.html' }
        ]
      },
      birthday: {
        name: 'Birthday',
        icon: '🎂',
        desc: 'Celebrate with a personalized website',
        demos: [
          { id: 'WN-BD-BAS-001', name: 'Birthday — Basic', pages: '3', photos: 5, price: 'Rs. 1,500+', features: ['Hero', 'Story', 'Photo gallery'], demoUrl: DEMO_BASE + '/birthday/WN-BD-BAS-001/index.html' },
          { id: 'WN-BD-MOD-001', name: 'Birthday — Moderate', pages: '5', photos: 10, price: 'Rs. 3,000+', features: ['Story', 'Timeline', 'Gallery', 'Birthday messages'], demoUrl: DEMO_BASE + '/birthday/WN-BD-MOD-001/index.html' },
          { id: 'WN-BD-EXP-001', name: 'Birthday — Expert', pages: '8', photos: 20, price: 'Rs. 5,000+', features: ['Animations', 'Messages', 'Wishes', 'Surprise page'], demoUrl: DEMO_BASE + '/birthday/WN-BD-EXP-001/index.html' }
        ]
      },
      wedding: {
        name: 'Wedding',
        icon: '💍',
        desc: 'Beautiful wedding invitations online',
        demos: [
          { id: 'WN-WD-BAS-001', name: 'Wedding — Basic', pages: '3', photos: 5, price: 'Rs. 1,500+', features: ['Hero', 'Story', 'Photo gallery'], demoUrl: DEMO_BASE + '/wedding/WN-WD-BAS-001/index.html' },
          { id: 'WN-WD-MOD-001', name: 'Wedding — Moderate', pages: '5', photos: 10, price: 'Rs. 3,000+', features: ['Story', 'Events', 'Timeline', 'Gallery', 'RSVP'], demoUrl: DEMO_BASE + '/wedding/WN-WD-MOD-001/index.html' },
          { id: 'WN-WD-EXP-001', name: 'Wedding — Expert', pages: '8', photos: 20, price: 'Rs. 5,000+', features: ['Cinematic opening', 'Full RSVP system', 'Venue details'], demoUrl: DEMO_BASE + '/wedding/WN-WD-EXP-001/index.html' }
        ]
      },
      memories: {
        name: 'Memories',
        icon: '📸',
        desc: 'Preserve moments in digital form',
        demos: [
          { id: 'WN-ME-BAS-001', name: 'Memories — Basic', pages: '3', photos: 5, price: 'Rs. 1,500+', features: ['Hero', 'Story', 'Photo gallery'], demoUrl: DEMO_BASE + '/memories/WN-ME-BAS-001/index.html' },
          { id: 'WN-ME-MOD-001', name: 'Memories — Moderate', pages: '5', photos: 10, price: 'Rs. 3,000+', features: ['Chapters', 'Interactive timeline', 'Beautiful gallery'], demoUrl: DEMO_BASE + '/memories/WN-ME-MOD-001/index.html' },
          { id: 'WN-ME-EXP-001', name: 'Memories — Expert', pages: '8', photos: 20, price: 'Rs. 5,000+', features: ['Cinematic opening', 'Chapters', 'Interactive memory cards'], demoUrl: DEMO_BASE + '/memories/WN-ME-EXP-001/index.html' }
        ]
      },
      digitalgifts: {
        name: 'Digital Gifts',
        icon: '🎁',
        desc: 'Unique gifts that live on the web',
        demos: [
          { id: 'WN-DG-BAS-001', name: 'Digital Gifts — Basic', pages: '3', photos: 5, price: 'Rs. 1,500+', features: ['Gift opening animation', 'Personal message', 'Photo gallery'], demoUrl: DEMO_BASE + '/digital-gifts/WN-DG-BAS-001/index.html' },
          { id: 'WN-DG-MOD-001', name: 'Digital Gifts — Moderate', pages: '5', photos: 10, price: 'Rs. 3,000+', features: ['Gift opening', 'Story section', 'Timeline', 'Surprise flip cards'], demoUrl: DEMO_BASE + '/digital-gifts/WN-DG-MOD-001/index.html' },
          { id: 'WN-DG-EXP-001', name: 'Digital Gifts — Expert', pages: '8', photos: 20, price: 'Rs. 5,000+', features: ['Cinematic entrance', 'Timeline', 'Surprise cards', 'Grand finale'], demoUrl: DEMO_BASE + '/digital-gifts/WN-DG-EXP-001/index.html' }
        ]
      }
    },

    pricing: {
      general: [
        { name: 'Starter', price: 'From Rs. 1,000', features: ['Single page website', 'Basic customization', 'Mobile responsive', 'Standard delivery'] },
        { name: 'Standard', price: 'From Rs. 3,000', features: ['Multi-section website', 'Custom design', 'Animations and effects', 'Photo integration'] },
        { name: 'Premium', price: 'From Rs. 5,000', features: ['Full custom website', 'Advanced animations', 'Multiple pages', 'Priority support'], featured: true },
        { name: 'Business', price: 'From Rs. 8,000', features: ['E-commerce features', 'Payment integration', 'Admin dashboard', 'Ongoing support'] }
      ],
      range: 'Rs. 1,000 to Rs. 25,000+'
    },

    process: [
      { step: 'Choose', desc: 'Pick an experience from our showroom.' },
      { step: 'Explore', desc: 'Try the live demo and see how it feels.' },
      { step: 'Customize', desc: 'Tell us your names, content, photos and requirements.' },
      { step: 'Receive', desc: 'We customize your website and deliver your finished experience.' }
    ],

    faq: [
      { q: 'What type of websites does WebNest create?', a: 'We create personal gift sites, couple/love pages, birthday surprises, wedding invitations, memory books, business websites, e-commerce stores, portfolios and landing pages.' },
      { q: 'Can I customize a demo?', a: 'Absolutely! Every demo can be fully customized with your own colors, content, photos, names and requirements.' },
      { q: 'Can I order a website as a gift?', a: 'Yes! Personalized digital gifts are one of our specialties. We can create a beautiful surprise website for birthdays, anniversaries, Valentine\'s Day, or any special occasion.' },
      { q: 'Are the websites mobile friendly?', a: 'Yes, every website we create is fully responsive and looks great on desktops, tablets and mobile phones.' },
      { q: 'How much does a website cost?', a: 'Pricing depends on the type, sections, customization, animations and complexity. Packages range from Rs. 1,500 to Rs. 25,000+. Contact us for a custom quote.' },
      { q: 'Can I request a completely custom website?', a: 'Of course! If none of our showroom options fit your vision, we can build something completely custom from scratch.' },
      { q: 'Do you create business and e-commerce websites?', a: 'Yes! We create professional business websites for restaurants, salons, real estate and agencies, as well as full e-commerce fashion stores.' },
      { q: 'How do I place an order?', a: 'Simply click "Order on WhatsApp" or reach out through our contact. Tell us what you need and we\'ll guide you through the process.' }
    ]
  };

  // ========================================
  // ALL DEMO IDS (flat list for lookup)
  // ========================================
  var ALL_DEMOS = [];
  Object.keys(KB.categories).forEach(function (catKey) {
    var cat = KB.categories[catKey];
    if (cat.subcategories) {
      Object.keys(cat.subcategories).forEach(function (subKey) {
        if (cat.subcategories[subKey].demos) {
          cat.subcategories[subKey].demos.forEach(function (d) { ALL_DEMOS.push(d); });
        }
      });
    }
    if (cat.demos) {
      cat.demos.forEach(function (d) { ALL_DEMOS.push(d); });
    }
  });

  // ========================================
  // NLP ENGINE
  // ========================================

  // Stop words for English
  var STOP_WORDS_EN = new Set(['a','an','the','is','are','was','were','be','been','being','have','has','had','do','does','did','will','would','could','should','may','might','shall','can','to','of','in','for','on','with','at','by','from','as','into','through','during','before','after','above','below','between','out','off','over','under','again','further','then','once','here','there','when','where','why','how','all','each','every','both','few','more','most','other','some','such','no','not','only','own','same','so','than','too','very','just','because','but','and','or','if','while','about','up','its','it','i','me','my','we','our','you','your','they','them','their','this','that','these','those','what','which','who','whom']);

  // Roman Urdu / Urdu stop words
  var STOP_WORDS_UR = new Set(['hai','hain','ka','ke','ki','ko','se','me','ne','kya','ye','wo','yeh','woh','aur','ya','par','pe','ko','ka','ki','ke','se','me','ne','ka','hai','ho','ho','tha','thi','the','hoga','hogi','hoge','tha','thi','the','karo','karo','karna','karna','chahiye','chahiye','mujhe','mujhe','apko','apko','hum','hum','aap','aap','tum','tum','main','main','mera','mera','meri','meri','mere','mere','tera','tera','teri','teri','apna','apna','apni','apni']);

  // Urdu transliteration mappings
  var URDU_MAP = {
    'website': ['website', 'ویب سائٹ', 'ویب سائٹ'],
    'price': ['price', 'rate', 'rate', 'قیمت', 'پیسے', 'پیಸہ'],
    'cost': ['cost', 'قیمت', 'خرچہ'],
    'restaurant': ['restaurant', 'ریستوراں', 'دوکان', 'کھانے'],
    'salon': ['salon', 'سیلون', 'پارلر', 'جمالت'],
    'shop': ['shop', 'دوکان', 'اسٹور', 'فیشن', 'کپڑے'],
    'fashion': ['fashion', 'کپڑے', 'لبراس', 'فیشن'],
    'wedding': ['wedding', 'شادی', 'نکاح'],
    'birthday': ['birthday', 'جنتہ دن', 'سالگرہ'],
    'gift': ['gift', 'تحفہ', 'گفٹ', 'سپرائز'],
    'couple': ['couple', 'زوج', 'جفت', 'محبت', 'پیار'],
    'love': ['love', 'محبت', 'پیار'],
    'memory': ['memory', 'خاطرہ', 'یاد'],
    'memories': ['memories', 'خاطرے', 'یادیں'],
    'business': ['business', 'کاروبار', 'بزنس'],
    'order': ['order', 'آرڈر', 'مانگنا'],
    'want': ['want', 'چاہتا', 'چاہتی', 'چاہیے'],
    'need': ['need', 'ضرورت', 'چاہیے'],
    'create': ['create', 'بنانا', 'بنواؤنا'],
    'make': ['make', 'بنانا', 'بنواؤنا'],
    'buy': ['buy', 'خریدنا'],
    'how much': ['kitne paise', 'kitna', 'kitne', 'rate kya hai', 'price kya hai', 'paise', 'قیمت'],
    'demo': ['demo', 'ڈیمو', 'دیکھنا'],
    'package': ['package', 'پیکج'],
    'feature': ['feature', 'خصوصیات'],
    'customize': ['customize', 'تخصیص', 'تبدیلی'],
    'customize a demo': ['customize', 'تخصیص', 'تبدیلی'],
    'photos': ['photo', 'photos', 'تصویر', ' pictures', 'images'],
    'pages': ['page', 'pages', 'صفحہ', 'صفحے']
  };

  function tokenize(text) {
    return text.toLowerCase().replace(/[^\w\s\u0600-\u06FF]/g, ' ').split(/\s+/).filter(function (t) { return t.length > 1; });
  }

  function detectLanguage(text) {
    var lower = text.toLowerCase();
    var urduChars = /[\u0600-\u06FF]/;
    if (urduChars.test(text)) return 'urdu';

    var romanUrduPatterns = ['kya', 'hai', 'hain', 'mujhe', 'chahiye', 'karna', 'karo', 'aur', 'ya', 'mein', 'mera', 'meri', 'tera', 'teri', 'apna', 'apni', 'kaise', 'kaisa', 'kitna', 'kitne', 'kyun', 'kahan', 'kaun', 'kab', 'bhi', 'bahut', 'thoda', 'zyada', 'sab', 'kuch', 'ye', 'wo', 'yahan', 'wahan', 'isliye', 'kyunki', 'lekin', 'agar', 'toh', 'phir', 'abhi', 'kal', 'aaj', 'subah', 'raat', 'din'];
    var romanCount = 0;
    var words = lower.split(/\s+/);
    words.forEach(function (w) {
      if (romanUrduPatterns.indexOf(w) !== -1) romanCount++;
    });
    if (romanCount >= 1) return 'romanurdu';

    return 'english';
  }

  // Intent detection
  function detectIntent(text) {
    var lower = text.toLowerCase().trim();
    var tokens = tokenize(text);
    var allText = lower;

    // Demo ID lookup — check FIRST (highest priority for specific IDs)
    var demoMatch = allText.match(/wn[-\s]?(cl|bd|wd|me|dg|biz|ecom)[-\s]?(bas|mod|exp|rest|salon|real|agency|fashion)?[-\s]?(\d+)?/i) ||
                    allText.match(/WN[-]?[A-Z]+[-]?[A-Z]+[-]?\d+/i);
    if (demoMatch) {
      return 'demo_lookup';
    }

    // Price/cost intent
    if (/kitn[aeo]\s*(pais[ae]|rupee|price|rate)|rate\s*kya\s*hai|price\s*kya\s*hai|how\s*much|cost|price|pricing|rates?\b|paise|قیمت|خرچہ|expensive|cheap|afford|budget|mnge|saste/i.test(allText) ||
        tokens.some(function (t) { return ['price', 'cost', 'rate', 'rates', 'pricing', 'kitne', 'kitna', 'kitni', 'paise', 'rupee', 'rupees'].indexOf(t) !== -1; })) {
      return 'pricing';
    }

    // Photos — check BEFORE customization
    if (/photo|picture|image|tasveer|تصویر|album|gallery|own\s*photo|apni\s*tasveer|khud\s*ki/i.test(allText)) {
      return 'photos';
    }

    // Service inquiry
    if (/what.*(do|service|offer|provide|create|build|make)|services|kya\s*karte|سروس|service/i.test(allText)) {
      return 'services';
    }

    // About WebNest
    if (/what\s*(is|are)\s*(webnest|tum|aap|you)|who\s*(are|r)\s*(webnest|tum|aap|you)|webnest\s*kya\s*hai|介绍|about\s*(webnest|you)|tell\s*me\s*about|tumhara\s*naam|تمہارا\s*نام/i.test(allText)) {
      return 'about';
    }

    // Category-specific inquiries
    if (/restaurant|dokean|khanay|ristoren|resturant|ریستوراں/i.test(allText)) return 'restaurant';
    if (/salon|parlour|parlor|hair|beauty|saloon|سیلون/i.test(allText)) return 'salon';
    if (/real\s*estate|property|house|home\s*sell|ghar\s*bechna|real\s*estate/i.test(allText)) return 'realestate';
    if (/agency|company|firm|digital\s*agency|marketing/i.test(allText)) return 'agency';
    if (/fashion|kapray|kapron|clothes|clothing|dress|apparel|فیشن|لبراس|boutique|online\s*shop|online\s*store/i.test(allText)) return 'fashion';
    if (/ecommerce|e-commerce|online\s*shop|online\s*store|shop|store|buy|sell|فروخت/i.test(allText)) return 'ecommerce';
    if (/wedding|shadi|marriage|nikah|shaadi|شادی/i.test(allText)) return 'wedding';
    if (/birthday|janamdin|salgirah|jantadin|جنتہ\s*دن/i.test(allText)) return 'birthday';
    if (/couple|love|pyar|muhabbat|romantic|partner|boyfriend|girlfriend|husband|wife|محبت|پیار/i.test(allText)) return 'couple';
    if (/gift|surprise|tohfa|gift\s*for|gifting|تحفہ|surprise/i.test(allText)) return 'gift';
    if (/memories|yaadein|khatray|memories|خاطرے|یادیں/i.test(allText)) return 'memories';
    if (/digital|digital\s*gift/i.test(allText)) return 'digitalgift';

    // Ordering / How to order
    if (/how\s*(do\s*I|to|can\s*I)\s*(order|buy|get|place)|order\s*kaise|kaise\s*order|ordering|process|steps|کیسے\s*آرڈر|شروع|start/i.test(allText)) {
      return 'ordering';
    }

    // Customization
    if (/customiz|change|modify|edit|personaliz|tweak|alter/i.test(allText)) {
      return 'customization';
    }

    // Package inquiry
    if (/package|plan|tier|level| پیکج/i.test(allText)) {
      return 'packages';
    }

    // Greeting
    if (/^(hi|hello|hey|salam|assalam| salaam|aoa|aoa|السلام|assalamu|assalamo)\b/i.test(allText) || /^(hi|hello|hey|salam|salaam|aoa)$/i.test(allText)) {
      return 'greeting';
    }

    // Thank you
    if (/thank|shukriya|thanks|meherbani|شکریہ|bahut\s*accha|great|awesome|perfect|best/i.test(allText)) {
      return 'thanks';
    }

    // Lead collection signals — includes Roman Urdu patterns for "I want/need"
    if (/interested|i\s*want|i\s*need|chahiye|looking\s*for|chahta|chahti|please\s*help|help\s*me|share|contact|reach|whatsapp|banwani|banana\s*hai|bnwana|chahata|chahati|karni|karna\s*hai|want\s*to\s*order|want\s*a\s*website|mujhe.*chahiye|mujhe.*banana/i.test(allText) &&
        !/what|how|which|where|when|kya|kaise|kahan|kaun|kab|kyun/i.test(allText)) {
      return 'interest';
    }

    // FAQ
    if (/faq|question|queries|doubt|sawal|سوال/i.test(allText)) {
      return 'faq';
    }

    return 'unknown';
  }

  // Entity extraction
  function extractEntities(text) {
    var lower = text.toLowerCase();
    var entities = {};

    // Extract demo ID
    var demoMatch = lower.match(/wn[-\s]?(cl|bd|wd|me|dg|biz|ecom)[-\s]?(bas|mod|exp|rest|salon|real|agency|fashion)?[-\s]?(\d+)?/i);
    if (demoMatch) {
      var demoId = demoMatch[0].toUpperCase().replace(/\s+/g, '-');
      // Try to find matching demo
      ALL_DEMOS.forEach(function (d) {
        if (d.id.toLowerCase().indexOf(demoId.substring(0, 8)) !== -1 || demoId.indexOf(d.id.substring(0, 8).toLowerCase()) !== -1) {
          entities.demo = d;
        }
      });
    }

    // Extract budget
    var budgetMatch = lower.match(/(\d[\d,]*)\s*(rs|pkr|rupee|paise|hazar|hazaar|lakh)?/);
    if (budgetMatch) {
      entities.budget = budgetMatch[0].trim();
    }

    // Extract package level
    if (/basic|starter/i.test(lower)) entities.packageLevel = 'basic';
    else if (/moderate|mod|standard|mid/i.test(lower)) entities.packageLevel = 'moderate';
    else if (/expert|exp|premium|advanced|top/i.test(lower)) entities.packageLevel = 'expert';

    return entities;
  }

  // ========================================
  // RESPONSE GENERATION
  // ========================================

  function respond(intent, entities, lang, conversationState) {
    var responses = {};

    responses.about = function () {
      return lang === 'romanurdu'
        ? 'Main **WebNest** hoon! Hum khobsurat websites banate hain — gifts, couples, birthdays, weddings, memories, business aur e-commerce. Har website customize hoti hai aapki zaroorat ke mutabiq. 😊'
        : lang === 'urdu'
        ? 'میں **WebNest** ہوں! ہم خوبصورت ویب سائٹیں بناتے ہیں — گفٹس، کپلز، بIRTHDAYز، شادی، یادیں، بزنس اور ای کامرس۔ ہر ویب سائٹ آپ کی ضرورت کے مطابق کسٹمائز ہوتی ہے۔ 😊'
        : "I'm **WebNest** — we create beautiful websites made to be remembered! We build digital experiences for gifts, couples, birthdays, weddings, memories, business websites and e-commerce stores. Every website is fully customizable. 😊";
    };

    responses.services = function () {
      return lang === 'romanurdu'
        ? 'Hum ye services dete hain:\n\n' +
          '🛍️ **E-commerce** — Online stores (Fashion)\n' +
          '💼 **Business** — Restaurant, Salon, Real Estate, Agency\n' +
          '❤️ **Couple & Love** — Romantic websites\n' +
          '🎂 **Birthday** — Birthday surprise websites\n' +
          '💍 **Wedding** — Wedding invitation websites\n' +
          '📸 **Memories** — Memory books\n' +
          '🎁 **Digital Gifts** — Interactive gift websites\n\n' +
          'Kisi bhi category ke baare mein puchna ho toh batayein!'
        : lang === 'urdu'
        ? 'ہم یہ خدمات فراہم کرتے ہیں:\n\n' +
          '🛍️ **ای کامرس** — آن لائن اسٹور (فیشن)\n' +
          '💼 **بزنس** — ریستوراں، سیلون، ریل اسٹیٹ، ایجنسی\n' +
          '❤️ **کپل اینڈ لاو** — رومانٹک ویب سائٹیں\n' +
          '🎂 **بIRTHDAY** — بIRTHDAY سپرائز ویب سائٹیں\n' +
          '💍 **شادی** — شادی انوائٹیشن ویب سائٹیں\n' +
          '📸 **یادیں** — میموری بکس\n' +
          '🎁 **ڈیجیٹل گفٹس** — انٹراکٹو گفٹ ویب سائٹیں\n\n' +
          'کسی بھی کیٹیگری کے بارے میں پوچھنا ہو تو بتائیں!'
        : "Here are our services:\n\n" +
          "**E-commerce** — Online stores (Fashion with full admin)\n" +
          "**Business** — Restaurant, Salon, Real Estate, Agency websites\n" +
          "**Couple & Love** — Romantic digital experiences\n" +
          "**Birthday** — Birthday surprise websites\n" +
          "**Wedding** — Wedding invitation websites\n" +
          "**Memories** — Digital memory books\n" +
          "**Digital Gifts** — Interactive gift websites\n\n" +
          "Want details about any specific category? Just ask!";
    };

    responses.pricing = function () {
      return lang === 'romanurdu'
        ? 'WebNest ki pricing:\n\n' +
          '💰 **Starter** — Rs. 1,000 se shuru (1 page)\n' +
          '💰 **Standard** — Rs. 3,000 se shuru (multi-section)\n' +
          '💰 **Premium** — Rs. 5,000 se shuru (full custom) ⭐\n' +
          '💰 **Business** — Rs. 8,000 se shuru (e-commerce)\n\n' +
          '📊 Package ranges: Rs. 1,500 to Rs. 25,000+\n\n' +
          'Final price aapki website ki type, features aur customization par depend karta hai. Koi specific package dekhna hai?'
        : lang === 'urdu'
        ? 'ویب نیسٹ کی پرائسگ:\n\n' +
          '💰 **اسٹارٹر** — Rs. 1,000 سے شروع (1 صفحہ)\n' +
          '💰 **اسٹینڈرڈ** — Rs. 3,000 سے شروع (ملٹی سیکشن)\n' +
          '💰 **پریمیم** — Rs. 5,000 سے شروع (فل کسٹم) ⭐\n' +
          '💰 **بزنس** — Rs. 8,000 سے شروع (ای کامرس)\n\n' +
          '📊 پیکج رینج: Rs. 1,500 to Rs. 25,000+\n\n' +
          '-final قیمت آپ کی ویب سائٹ کی قسم، خصوصیات اور کسٹمائزیشن پر منحصر ہے۔ کوئی مخصوص پیکج دیکھنا ہے؟'
        : "WebNest pricing:\n\n" +
          "**Starter** — From Rs. 1,000 (single page)\n" +
          "**Standard** — From Rs. 3,000 (multi-section)\n" +
          "**Premium** — From Rs. 5,000 (full custom) ⭐ Most Popular\n" +
          "**Business** — From Rs. 8,000 (e-commerce features)\n\n" +
          "Package range: Rs. 1,500 to Rs. 25,000+\n\n" +
          "Final price depends on website type, features and customization. Want to see a specific package?";
    };

    responses.ordering = function () {
      return lang === 'romanurdu'
        ? 'Order karna bahut aasan hai:\n\n' +
          '1️⃣ **Choose** — Showroom se website choose karein\n' +
          '2️⃣ **Explore** — Live demo try karein\n' +
          '3️⃣ **Customize** — Apna content, photos aur requirements batayein\n' +
          '4️⃣ **Receive** — Hum customize karke deliver karenge\n\n' +
          'Abhi WhatsApp par order karein!'
        : lang === 'urdu'
        ? 'آرڈر کرنا بہت آسان ہے:\n\n' +
          '1️⃣ **منتخب کریں** — شوم سے ویب سائٹ منتخب کریں\n' +
          '2️⃣ **دریافت کریں** — لائیو ڈیمو ٹرائی کریں\n' +
          '3️⃣ **تخصیص دیں** — اپنا مواد، تصاویر اور ضروریات بتائیں\n' +
          '4️⃣ **وصول کریں** — ہم تخصیص دے کر ترسیل کریں گے\n\n' +
          'ابھی واٹس ایپ پر آرڈر کریں!'
        : "Ordering is simple — 4 easy steps:\n\n" +
          "**1. Choose** — Pick a website from our Showroom\n" +
          "**2. Explore** — Try the live demo\n" +
          "**3. Customize** — Share your content, photos and requirements\n" +
          "**4. Receive** — We customize and deliver your finished website\n\n" +
          "Ready to start? Order on WhatsApp!";
    };

    responses.customization = function () {
      return lang === 'romanurdu'
        ? 'Haan, bilkul! Har demo fully customize ho sakta hai:\n\n' +
          '🎨 Colors aur design change\n' +
          '📝 Apna content aur text\n' +
          '📷 Apni photos aur images\n' +
          '✨ Names, messages aur personal details\n' +
          '➕ Extra features add karna\n\n' +
          'Koi specific change chahiye?'
        : lang === 'urdu'
        ? 'ہاں، بالکل! ہر ڈیمو فلی کسٹمائز ہو سکتا ہے:\n\n' +
          '🎨 رنگ اور ڈیزائن تبدیل کریں\n' +
          '📝 اپنا مواد اور متن\n' +
          '📷 اپni تصاویر اور تصاویر\n' +
          '✨ نام، پیغامات اور ذاتی تفصیلات\n' +
          '➕ اضافی خصوصیات شامل کریں\n\n' +
          'کوئی مخصوص تبدیلی چاہیے؟'
        : "Yes, absolutely! Every demo is fully customizable:\n\n" +
          "**Colors & Design** — Match your style\n" +
          "**Content & Text** — Your words, your story\n" +
          "**Photos & Images** — Your own pictures\n" +
          "**Names & Messages** — Personal details\n" +
          "**Extra Features** — Add what you need\n\n" +
          "Any specific customization in mind?";
    };

    responses.photos = function () {
      return lang === 'romanurdu'
        ? 'Haan, aap apni photos use kar sakte hain! 📷\n\n' +
          'Package ke mutabiq photo limits:\n' +
          '• **Basic** — 5 photos\n' +
          '• **Moderate** — 10 photos\n' +
          '• **Expert** — 20 photos\n\n' +
          'Aapki photos website mein beautifully integrate ki jayengi.'
        : lang === 'urdu'
        ? 'ہاں، آپ اپni تصاویر استعمال کر سکتے ہیں! 📷\n\n' +
          'پیکج کے مطابق تصاویر کی حد:\n' +
          '• **بنیادی** — 5 تصاویر\n' +
          '• **درمیانی** — 10 تصاویر\n' +
          '• **ماہر** — 20 تصاویر\n\n' +
          'آپ کی تصاویر ویب سائٹ میں خوبصورتی سے شامل کی جائیں گی۔'
        : "Yes, you can absolutely use your own photos! 📷\n\n" +
          "**Basic package** — Up to 5 photos\n" +
          "**Moderate package** — Up to 10 photos\n" +
          "**Expert package** — Up to 20 photos\n\n" +
          "Your photos will be beautifully integrated into the website.";
    };

    responses.packages = function () {
      return lang === 'romanurdu'
        ? 'Humare paas 3 package levels hain:\n\n' +
          '📦 **Basic** — Simple, clean website (3-5 pages)\n' +
          '📦 **Moderate** — Enhanced features (5-7 pages)\n' +
          '📦 **Expert** — Full premium experience (8-10+ pages)\n\n' +
          'Kisi specific category ka package dekhna hai? Jaise Restaurant, Salon, Couple?'
        : lang === 'urdu'
        ? 'ہمارے پاس 3 پیکج لیولز ہیں:\n\n' +
          '📦 **بنیادی** — سادہ، صاف ویب سائٹ (3-5 صفحے)\n' +
          '📦 **درمیانی** — بہتر خصوصیات (5-7 صفحے)\n' +
          '📦 **ماہر** — مکمل پریمیم تجربہ (8-10+ صفحے)\n\n' +
          'کسی مخصوص کیٹیگری کا پیکج دیکھنا ہے؟ جیسے ریستوراں، سیلون، کپل؟'
        : "We have 3 package levels:\n\n" +
          "**Basic** — Simple, clean website (3-5 pages)\n" +
          "**Moderate** — Enhanced with more features (5-7 pages)\n" +
          "**Expert** — Full premium experience (8-10+ pages)\n\n" +
          "Want to see packages for a specific category?";
    };

    responses.greeting = function () {
      var hour = new Date().getHours();
      var timeGreeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening';
      return lang === 'romanurdu'
        ? timeGreeting + '! 👋 Main WebNest AI Assistant hoon.\n\n' +
          'Aapko kis type ki website chahiye? Neeche buttons press karein ya directly puchhein!'
        : lang === 'urdu'
        ? timeGreeting + '! 👋 میں ویب نیسٹ اے آئی اسسٹنٹ ہوں۔\n\n' +
          'آپ کو کس طرح کی ویب سائٹ چاہیے؟ نیچے بٹن دبائیں یا براہ راست پوچھیں!'
        : timeGreeting + "! 👋 I'm the **WebNest AI Assistant**.\n\n" +
          "What kind of website are you looking for? Tap a button below or just ask me anything!";
    };

    responses.thanks = function () {
      return lang === 'romanurdu'
        ? 'Shukriya! 😊 Agar aur koi sawal ho toh pooch sakte hain. Aapki website ka wait hai!'
        : lang === 'urdu'
        ? 'شکریہ! 😊 اگر اور کوئی سوال ہو تو پوچھ سکتے ہیں۔ آپ کی ویب سائٹ کا انتظار ہے!'
        : "You're welcome! 😊 If you have any more questions, feel free to ask. We're here to help!";
    };

    responses.faq = function () {
      var faqs = KB.faq.slice(0, 4);
      var result = 'Here are some common questions:\n\n';
      faqs.forEach(function (f, i) {
        result += '**Q: ' + f.q + '**\nA: ' + f.a + '\n\n';
      });
      result += 'Have a specific question? Just ask!';
      return result;
    };

    responses.demo_lookup = function () {
      if (entities.demo) {
        var d = entities.demo;
        var features = d.features ? d.features.join(', ') : '';
        return lang === 'romanurdu'
          ? 'Ye raha aapka demo: **' + d.id + '**\n\n' +
            '📦 **' + d.name + '**\n' +
            '📄 Pages: ' + d.pages + '\n' +
            '💰 Price: ' + d.price + '\n' +
            '✨ Features: ' + features + '\n\n' +
            '[🔗 Live Demo dekhein](' + d.demoUrl + ')\n\n' +
            'Isko order karna hai?'
          : lang === 'urdu'
          ? 'یہ رہا آپ کا ڈیمو: **' + d.id + '**\n\n' +
            '📦 **' + d.name + '**\n' +
            '📄 صفحے: ' + d.pages + '\n' +
            '💰 قیمت: ' + d.price + '\n' +
            '✨ خصوصیات: ' + features + '\n\n' +
            '[🔗 لائیو ڈیمو دیکھیں](' + d.demoUrl + ')\n\n' +
            'اسکو آرڈر کرنا ہے؟'
          : "Here's your demo: **" + d.id + "**\n\n" +
            "**" + d.name + "**\n" +
            "Pages: " + d.pages + "\n" +
            "Price: " + d.price + "\n" +
            "Features: " + features + "\n\n" +
            "[🔗 View Live Demo](" + d.demoUrl + ")\n\n" +
            "Want to order this one?";
      }
      return "I couldn't find that exact demo ID. Could you double-check it? You can also browse our categories to find what you need.";
    };

    responses.restaurant = function () {
      var cat = KB.categories.business.subcategories.restaurant;
      return lang === 'romanurdu'
        ? '🍽️ **Restaurant Websites**\n\n' +
          'Hum premium restaurant websites banate hain:\n\n' +
          cat.demos.map(function (d) { return '📦 **' + d.name + '** — ' + d.pages + ' pages — ' + d.price + '\n   Features: ' + d.features.join(', '); }).join('\n\n') + '\n\n' +
          'Konsa package dekhna hai? Ya WhatsApp par baat karein!'
        : lang === 'urdu'
        ? '🍽️ **ریستوراں ویب سائٹیں**\n\n' +
          'ہم پریمیم ریستوراں ویب سائٹیں بناتے ہیں:\n\n' +
          cat.demos.map(function (d) { return '📦 **' + d.name + '** — ' + d.pages + ' صفحے — ' + d.price + '\n   خصوصیات: ' + d.features.join(', '); }).join('\n\n') + '\n\n' +
          'کونسا پیکج دیکھنا ہے؟ یا واٹس ایپ پر بات کریں!'
        : "**Restaurant Websites** 🍽️\n\n" +
          "We create premium restaurant websites:\n\n" +
          cat.demos.map(function (d) { return "**" + d.name + "** — " + d.pages + " pages — " + d.price + "\nFeatures: " + d.features.join(', '); }).join('\n\n') + "\n\n" +
          "Which package interests you? Or chat with us on WhatsApp!";
    };

    responses.salon = function () {
      var cat = KB.categories.business.subcategories.salon;
      return lang === 'romanurdu'
        ? '✂️ **Salon Websites**\n\n' +
          'Hum luxury salon websites banate hain:\n\n' +
          cat.demos.map(function (d) { return '📦 **' + d.name + '** — ' + d.pages + ' pages — ' + d.price + '\n   Features: ' + d.features.join(', '); }).join('\n\n') + '\n\n' +
          'Konsa package dekhna hai?'
        : lang === 'urdu'
        ? '✂️ **سیلون ویب سائٹیں**\n\n' +
          'ہم لگژری سیلون ویب سائٹیں بناتے ہیں:\n\n' +
          cat.demos.map(function (d) { return '📦 **' + d.name + '** — ' + d.pages + ' صفحے — ' + d.price + '\n   خصوصیات: ' + d.features.join(', '); }).join('\n\n') + '\n\n' +
          'کونسا پیکج دیکھنا ہے؟'
        : "**Salon Websites** ✂️\n\n" +
          "We create luxury salon websites:\n\n" +
          cat.demos.map(function (d) { return "**" + d.name + "** — " + d.pages + " pages — " + d.price + "\nFeatures: " + d.features.join(', '); }).join('\n\n') + "\n\n" +
          "Which package interests you?";
    };

    responses.realestate = function () {
      var cat = KB.categories.business.subcategories.realestate;
      return lang === 'romanurdu'
        ? '🏠 **Real Estate Websites**\n\n' +
          cat.demos.map(function (d) { return '📦 **' + d.name + '** — ' + d.pages + ' pages — ' + d.price + '\n   Features: ' + d.features.join(', '); }).join('\n\n') + '\n\n' +
          'Konsa package dekhna hai?'
        : lang === 'urdu'
        ? '🏠 **ریل اسٹیٹ ویب سائٹیں**\n\n' +
          cat.demos.map(function (d) { return '📦 **' + d.name + '** — ' + d.pages + ' صفحے — ' + d.price + '\n   خصوصیات: ' + d.features.join(', '); }).join('\n\n') + '\n\n' +
          'کونسا پیکج دیکھنا ہے؟'
        : "**Real Estate Websites** 🏠\n\n" +
          cat.demos.map(function (d) { return "**" + d.name + "** — " + d.pages + " pages — " + d.price + "\nFeatures: " + d.features.join(', '); }).join('\n\n') + "\n\n" +
          "Which package interests you?";
    };

    responses.agency = function () {
      var cat = KB.categories.business.subcategories.agency;
      return lang === 'romanurdu'
        ? '🏢 **Agency Websites**\n\n' +
          cat.demos.map(function (d) { return '📦 **' + d.name + '** — ' + d.pages + ' pages — ' + d.price + '\n   Features: ' + d.features.join(', '); }).join('\n\n') + '\n\n' +
          'Konsa package dekhna hai?'
        : lang === 'urdu'
        ? '🏢 **ایجنسی ویب سائٹیں**\n\n' +
          cat.demos.map(function (d) { return '📦 **' + d.name + '** — ' + d.pages + ' صفحے — ' + d.price + '\n   خصوصیات: ' + d.features.join(', '); }).join('\n\n') + '\n\n' +
          'کونسا پیکج دیکھنا ہے؟'
        : "**Agency Websites** 🏢\n\n" +
          cat.demos.map(function (d) { return "**" + d.name + "** — " + d.pages + " pages — " + d.price + "\nFeatures: " + d.features.join(', '); }).join('\n\n') + "\n\n" +
          "Which package interests you?";
    };

    responses.fashion = function () {
      var cat = KB.categories.ecommerce.subcategories.fashion;
      return lang === 'romanurdu'
        ? '👔 **Fashion Store** (E-commerce)\n\n' +
          'Professional online fashion stores:\n\n' +
          cat.demos.map(function (d) { return '📦 **' + d.name + '** — ' + d.pages + ' pages, ' + d.products + ' products — ' + d.price + '\n   Features: ' + d.features.join(', '); }).join('\n\n') + '\n\n' +
          'Konsa package dekhna hai?'
        : lang === 'urdu'
        ? '👔 **فیشن اسٹور** (ای کامرس)\n\n' +
          'پیشہ ورانہ آن لائن فیشن اسٹور:\n\n' +
          cat.demos.map(function (d) { return '📦 **' + d.name + '** — ' + d.pages + ' صفحے، ' + d.products + ' پروڈکٹس — ' + d.price + '\n   خصوصیات: ' + d.features.join(', '); }).join('\n\n') + '\n\n' +
          'کونسا پیکج دیکھنا ہے؟'
        : "**Fashion Store** (E-commerce) 👔\n\n" +
          "Professional online fashion stores:\n\n" +
          cat.demos.map(function (d) { return "**" + d.name + "** — " + d.pages + " pages, " + d.products + " products — " + d.price + "\nFeatures: " + d.features.join(', '); }).join('\n\n') + "\n\n" +
          "Which package interests you?";
    };

    responses.ecommerce = function () {
      return respond('fashion', entities, lang);
    };

    responses.wedding = function () {
      var cat = KB.categories.wedding;
      return lang === 'romanurdu'
        ? '💍 **Wedding Websites**\n\n' +
          'Beautiful wedding invitation websites:\n\n' +
          cat.demos.map(function (d) { return '📦 **' + d.name + '** — ' + d.pages + ' pages, ' + d.photos + ' photos — ' + d.price + '\n   Features: ' + d.features.join(', '); }).join('\n\n') + '\n\n' +
          'Konsa package dekhna hai?'
        : lang === 'urdu'
        ? '💍 **شادی ویب سائٹیں**\n\n' +
          'خوبصورت شادی انوائٹیشن ویب سائٹیں:\n\n' +
          cat.demos.map(function (d) { return '📦 **' + d.name + '** — ' + d.pages + ' صفحے، ' + d.photos + ' تصاویر — ' + d.price + '\n   خصوصیات: ' + d.features.join(', '); }).join('\n\n') + '\n\n' +
          'کونسا پیکج دیکھنا ہے؟'
        : "**Wedding Websites** 💍\n\n" +
          "Beautiful wedding invitation websites:\n\n" +
          cat.demos.map(function (d) { return "**" + d.name + "** — " + d.pages + " pages, " + d.photos + " photos — " + d.price + "\nFeatures: " + d.features.join(', '); }).join('\n\n') + "\n\n" +
          "Which package interests you?";
    };

    responses.birthday = function () {
      var cat = KB.categories.birthday;
      return lang === 'romanurdu'
        ? '🎂 **Birthday Websites**\n\n' +
          'Personalized birthday surprise websites:\n\n' +
          cat.demos.map(function (d) { return '📦 **' + d.name + '** — ' + d.pages + ' pages, ' + d.photos + ' photos — ' + d.price + '\n   Features: ' + d.features.join(', '); }).join('\n\n') + '\n\n' +
          'Konsa package dekhna hai?'
        : lang === 'urdu'
        ? '🎂 **بIRTHDAY ویب سائٹیں**\n\n' +
          'ذاتی بIRTHDAY سپرائز ویب سائٹیں:\n\n' +
          cat.demos.map(function (d) { return '📦 **' + d.name + '** — ' + d.pages + ' صفحے، ' + d.photos + ' تصاویر — ' + d.price + '\n   خصوصیات: ' + d.features.join(', '); }).join('\n\n') + '\n\n' +
          'کونسا پیکج دیکھنا ہے؟'
        : "**Birthday Websites** 🎂\n\n" +
          "Personalized birthday surprise websites:\n\n" +
          cat.demos.map(function (d) { return "**" + d.name + "** — " + d.pages + " pages, " + d.photos + " photos — " + d.price + "\nFeatures: " + d.features.join(', '); }).join('\n\n') + "\n\n" +
          "Which package interests you?";
    };

    responses.couple = function () {
      var cat = KB.categories.couple;
      return lang === 'romanurdu'
        ? '❤️ **Couple & Love Websites**\n\n' +
          'Romantic digital experiences for couples:\n\n' +
          cat.demos.map(function (d) { return '📦 **' + d.name + '** — ' + d.pages + ' pages, ' + d.photos + ' photos — ' + d.price + '\n   Features: ' + d.features.join(', '); }).join('\n\n') + '\n\n' +
          'Konsa package dekhna hai?'
        : lang === 'urdu'
        ? '❤️ **کپل اینڈ لاو ویب سائٹیں**\n\n' +
          'کپلز کے لیے رومانٹک ڈیجیٹل تجربے:\n\n' +
          cat.demos.map(function (d) { return '📦 **' + d.name + '** — ' + d.pages + ' صفحے، ' + d.photos + ' تصاویر — ' + d.price + '\n   خصوصیات: ' + d.features.join(', '); }).join('\n\n') + '\n\n' +
          'کونسا پیکج دیکھنا ہے؟'
        : "**Couple & Love Websites** ❤️\n\n" +
          "Romantic digital experiences for couples:\n\n" +
          cat.demos.map(function (d) { return "**" + d.name + "** — " + d.pages + " pages, " + d.photos + " photos — " + d.price + "\nFeatures: " + d.features.join(', '); }).join('\n\n') + "\n\n" +
          "Which package interests you?";
    };

    responses.gift = function () {
      var cat = KB.categories.digitalgifts;
      return lang === 'romanurdu'
        ? '🎁 **Digital Gift Websites**\n\n' +
          'Unique interactive gift websites:\n\n' +
          cat.demos.map(function (d) { return '📦 **' + d.name + '** — ' + d.pages + ' pages, ' + d.photos + ' photos — ' + d.price + '\n   Features: ' + d.features.join(', '); }).join('\n\n') + '\n\n' +
          'Konsa package dekhna hai?'
        : lang === 'urdu'
        ? '🎁 **ڈیجیٹل گفٹ ویب سائٹیں**\n\n' +
          'انوکھی انٹراکٹو گفٹ ویب سائٹیں:\n\n' +
          cat.demos.map(function (d) { return '📦 **' + d.name + '** — ' + d.pages + ' صفحے، ' + d.photos + ' تصاویر — ' + d.price + '\n   خصوصیات: ' + d.features.join(', '); }).join('\n\n') + '\n\n' +
          'کونسا پیکج دیکھنا ہے؟'
        : "**Digital Gift Websites** 🎁\n\n" +
          "Unique interactive gift websites:\n\n" +
          cat.demos.map(function (d) { return "**" + d.name + "** — " + d.pages + " pages, " + d.photos + " photos — " + d.price + "\nFeatures: " + d.features.join(', '); }).join('\n\n') + "\n\n" +
          "Which package interests you?";
    };

    responses.memories = function () {
      var cat = KB.categories.memories;
      return lang === 'romanurdu'
        ? '📸 **Memory Websites**\n\n' +
          'Turn your memories into beautiful digital stories:\n\n' +
          cat.demos.map(function (d) { return '📦 **' + d.name + '** — ' + d.pages + ' pages, ' + d.photos + ' photos — ' + d.price + '\n   Features: ' + d.features.join(', '); }).join('\n\n') + '\n\n' +
          'Konsa package dekhna hai?'
        : lang === 'urdu'
        ? '📸 **میموری ویب سائٹیں**\n\n' +
          'اپنی یادیں خوبصورت ڈیجیٹل کہانیوں میں بدلیں:\n\n' +
          cat.demos.map(function (d) { return '📦 **' + d.name + '** — ' + d.pages + ' صفحے، ' + d.photos + ' تصاویر — ' + d.price + '\n   خصوصیات: ' + d.features.join(', '); }).join('\n\n') + '\n\n' +
          'کونسا پیکج دیکھنا ہے؟'
        : "**Memory Websites** 📸\n\n" +
          "Turn your memories into beautiful digital stories:\n\n" +
          cat.demos.map(function (d) { return "**" + d.name + "** — " + d.pages + " pages, " + d.photos + " photos — " + d.price + "\nFeatures: " + d.features.join(', '); }).join('\n\n') + "\n\n" +
          "Which package interests you?";
    };

    responses.digitalgift = function () {
      return respond('gift', entities, lang);
    };

    responses.interest = function () {
      return lang === 'romanurdu'
        ? 'Bahut accha! 🚀 Aapko exactly kis type ki website chahiye?\n\n' +
          'Mujhe bataiye:\n' +
          '• Kya type? (Restaurant, Salon, Couple, Birthday...)\n' +
          '• Budget kitna hai?\n' +
          '• Koi specific requirements?\n\n' +
          'Main aapko best package suggest karunga!'
        : lang === 'urdu'
        ? 'بہت اچھا! 🚀 آپ کو بالکل کس طرح کی ویب سائٹ چاہیے؟\n\n' +
          'مجھے بتائیں:\n' +
          '• کیا قسم؟ (ریستوراں، سیلون، کپل، بIRTHDAY...)\n' +
          '• بجٹ کتنا ہے؟\n' +
          '• کوئی مخصوص ضروریات؟\n\n' +
          'میں آپ کو بہترین پیکج تجویز کروں گا!'
        : "Great! 🚀 What type of website do you need?\n\n" +
          "Tell me:\n" +
          "• What type? (Restaurant, Salon, Couple, Birthday...)\n" +
          "• What's your budget?\n" +
          "• Any specific requirements?\n\n" +
          "I'll suggest the best package for you!";
    };

    // Lead collection
    responses.lead = function () {
      return lang === 'romanurdu'
        ? '📝 **Apna Details Share Karein**\n\n' +
          'Taake WebNest team aap se contact kar sake:\n\n' +
          '• Aapka Naam\n' +
          '• Website Type (Restaurant, Salon, Gift...)\n' +
          '• Contact (WhatsApp/Email)\n\n' +
          'Ya seedha WhatsApp par baat karein!'
        : lang === 'urdu'
        ? '📝 **اپنا تفصیل شیئر کریں**\n\n' +
          'تاکہ ویب نیسٹ ٹیم آپ سے رابطہ کر سکے:\n\n' +
          '• آپ کا نام\n' +
          '• ویب سائٹ کی قسم (ریستوراں، سیلون، گفٹ...)\n' +
          '• رابطہ (واٹس ایپ/ای میل)\n\n' +
          'یا براہ راست واٹس ایپ پر بات کریں!'
        : "📝 **Share Your Details**\n\n" +
          "So the WebNest team can reach you:\n\n" +
          "• Your Name\n" +
          "• Website Type (Restaurant, Salon, Gift...)\n" +
          "• Contact (WhatsApp/Email)\n\n" +
          "Or chat directly on WhatsApp!";
    };

    responses.unknown = function () {
      return lang === 'romanurdu'
        ? "Main WebNest AI Assistant hoon, toh main zyada tar WebNest websites, services, packages, demos aur orders mein help kar sakta hoon. 😊\n\n" +
          "Aapko kis type ki website chahiye?"
        : lang === 'urdu'
        ? "میں ویب نیسٹ اے آئی اسسٹنٹ ہوں، تو میں زیادہ تر ویب نیسٹ ویب سائٹیں، سروسز، پیکجز، ڈیمز اور آرڈرز میں مدد کر سکتا ہوں۔ 😊\n\n" +
          "آپ کو کس طرح کی ویب سائٹ چاہیے؟"
        : "I'm the WebNest AI Assistant, so I'm mainly here to help with WebNest websites, services, packages, demos and orders. 😊\n\n" +
          "What kind of website are you looking for?";
    };

    var handler = responses[intent] || responses.unknown;
    return handler();
  }

  // ========================================
  // CHATBOT UI
  // ========================================
  var state = {
    isOpen: false,
    messages: [],
    conversationState: 'idle', // idle, collecting_lead
    leadData: {},
    leadStep: 0
  };

  function createUI() {
    // FAB button
    var fab = document.createElement('button');
    fab.className = 'wn-chatbot-fab';
    fab.setAttribute('aria-label', 'Open WebNest AI Assistant');
    fab.innerHTML =
      '<svg class="wn-chatbot-fab-icon" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z"/><path d="M7 9h2v2H7zm4 0h2v2h-2zm4 0h2v2h-2z"/></svg>' +
      '<svg class="wn-chatbot-fab-icon-close" viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>' +
      '<span class="wn-chatbot-fab__badge"></span>';
    fab.addEventListener('click', toggleChat);
    document.body.appendChild(fab);

    // Chat window
    var win = document.createElement('div');
    win.className = 'wn-chatbot-window';
    win.innerHTML =
      '<div class="wn-chatbot-header">' +
        '<div class="wn-chatbot-header__avatar">W</div>' +
        '<div class="wn-chatbot-header__info">' +
          '<div class="wn-chatbot-header__name">WebNest AI Assistant</div>' +
          '<div class="wn-chatbot-header__status">Online</div>' +
        '</div>' +
        '<button class="wn-chatbot-header__close" aria-label="Close chat">' +
          '<svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>' +
        '</button>' +
      '</div>' +
      '<div class="wn-chatbot-messages" id="wn-chatbot-messages"></div>' +
      '<div class="wn-chatbot-input">' +
        '<textarea class="wn-chatbot-input__field" id="wn-chatbot-input" placeholder="Type your message..." rows="1" maxlength="500"></textarea>' +
        '<button class="wn-chatbot-input__send" id="wn-chatbot-send" aria-label="Send message">' +
          '<svg viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>' +
        '</button>' +
      '</div>' +
      '<div class="wn-chatbot-powered">Powered by WebNest</div>';
    document.body.appendChild(win);

    // Event listeners
    win.querySelector('.wn-chatbot-header__close').addEventListener('click', toggleChat);

    var input = document.getElementById('wn-chatbot-input');
    var sendBtn = document.getElementById('wn-chatbot-send');

    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });

    // Auto-resize textarea
    input.addEventListener('input', function () {
      this.style.height = 'auto';
      this.style.height = Math.min(this.scrollHeight, 100) + 'px';
    });

    // Show welcome after a short delay
    setTimeout(function () {
      showWelcome();
    }, 500);
  }

  function toggleChat() {
    state.isOpen = !state.isOpen;
    var win = document.querySelector('.wn-chatbot-window');
    var fab = document.querySelector('.wn-chatbot-fab');
    var badge = document.querySelector('.wn-chatbot-fab__badge');

    if (state.isOpen) {
      win.classList.add('open');
      fab.classList.add('active');
      badge.classList.remove('visible');
      document.getElementById('wn-chatbot-input').focus();
    } else {
      win.classList.remove('open');
      fab.classList.remove('active');
    }
  }

  function showWelcome() {
    var welcomeText = "Hi there! 👋 I'm the **WebNest AI Assistant**.\n\nI can help you with:\n• Website services & categories\n• Pricing & packages\n• Live demos\n• Ordering process\n\nWhat kind of website are you looking for?";

    addBotMessage(welcomeText);

    setTimeout(function () {
      addSuggestions([
        '💰 View Prices',
        '🌐 Explore Websites',
        '🏢 Business Websites',
        '🛍️ E-commerce',
        '❤️ Gift & Couple',
        '🚀 I Want a Website'
      ]);
    }, 400);
  }

  function addBotMessage(text, withActions) {
    var container = document.getElementById('wn-chatbot-messages');
    var msg = document.createElement('div');
    msg.className = 'wn-chat-msg wn-chat-msg--bot';
    msg.innerHTML =
      '<div class="wn-chat-msg__avatar">W</div>' +
      '<div class="wn-chat-msg__bubble">' + formatMessage(text) + '</div>';
    container.appendChild(msg);
    scrollToBottom();

    if (withActions) {
      setTimeout(function () {
        addActionButtons(withActions);
      }, 300);
    }
  }

  function addUserMessage(text) {
    var container = document.getElementById('wn-chatbot-messages');
    var msg = document.createElement('div');
    msg.className = 'wn-chat-msg wn-chat-msg--user';
    msg.innerHTML =
      '<div class="wn-chat-msg__avatar">U</div>' +
      '<div class="wn-chat-msg__bubble">' + escapeHtml(text) + '</div>';
    container.appendChild(msg);
    scrollToBottom();
  }

  function addSuggestions(labels) {
    var container = document.getElementById('wn-chatbot-messages');
    var wrap = document.createElement('div');
    wrap.className = 'wn-chat-suggestions';
    labels.forEach(function (label) {
      var btn = document.createElement('button');
      btn.className = 'wn-chat-suggestions__btn';
      btn.textContent = label;
      btn.addEventListener('click', function () {
        wrap.remove();
        handleUserInput(label);
      });
      wrap.appendChild(btn);
    });
    container.appendChild(wrap);
    scrollToBottom();
  }

  function addActionButtons(actions) {
    var container = document.getElementById('wn-chatbot-messages');
    var wrap = document.createElement('div');
    wrap.className = 'wn-chat-actions';
    actions.forEach(function (action) {
      var btn = document.createElement('button');
      btn.className = 'wn-chat-actions__btn';
      btn.innerHTML = action.label;
      btn.addEventListener('click', function () {
        wrap.remove();
        if (action.type === 'link') {
          window.open(action.url, '_blank');
        } else if (action.type === 'whatsapp') {
          window.open(KB.about.whatsapp, '_blank');
        } else {
          handleUserInput(action.label);
        }
      });
      wrap.appendChild(btn);
    });
    container.appendChild(wrap);
    scrollToBottom();
  }

  function showTyping() {
    var container = document.getElementById('wn-chatbot-messages');
    var typing = document.createElement('div');
    typing.className = 'wn-chat-msg wn-chat-msg--bot';
    typing.id = 'wn-chatbot-typing';
    typing.innerHTML =
      '<div class="wn-chat-msg__avatar">W</div>' +
      '<div class="wn-chat-msg__bubble"><div class="wn-chat-typing"><span class="wn-chat-typing__dot"></span><span class="wn-chat-typing__dot"></span><span class="wn-chat-typing__dot"></span></div></div>';
    container.appendChild(typing);
    scrollToBottom();
  }

  function hideTyping() {
    var typing = document.getElementById('wn-chatbot-typing');
    if (typing) typing.remove();
  }

  function formatMessage(text) {
    // Bold: **text**
    text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Links: [text](url)
    text = text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener" class="wn-chat-link">$1</a>');
    // Line breaks
    text = text.replace(/\n/g, '<br>');
    return text;
  }

  function escapeHtml(text) {
    var div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function scrollToBottom() {
    var container = document.getElementById('wn-chatbot-messages');
    setTimeout(function () {
      container.scrollTop = container.scrollHeight;
    }, 50);
  }

  // ========================================
  // INPUT HANDLING
  // ========================================

  function sendMessage() {
    var input = document.getElementById('wn-chatbot-input');
    var text = input.value.trim();
    if (!text) return;

    input.value = '';
    input.style.height = 'auto';
    handleUserInput(text);
  }

  function handleUserInput(text) {
    addUserMessage(text);

    // Check if we're in lead collection mode
    if (state.conversationState === 'collecting_lead') {
      handleLeadCollection(text);
      return;
    }

    showTyping();

    // Process with NLP
    var lang = detectLanguage(text);
    var intent = detectIntent(text);
    var entities = extractEntities(text);

    // Special suggested button handling
    var mappedIntent = mapSuggestedButton(text, intent);
    if (mappedIntent) intent = mappedIntent;

    // Simulate thinking delay
    var delay = 600 + Math.random() * 800;
    setTimeout(function () {
      hideTyping();
      var response = respond(intent, entities, lang, state);
      addBotMessage(response);

      // Add contextual follow-up actions
      setTimeout(function () {
        addContextualActions(intent, entities, lang);
      }, 300);
    }, delay);
  }

  function mapSuggestedButton(text, defaultIntent) {
    var lower = text.toLowerCase();
    if (/view\s*prices?|price|rate|pricing|💰/.test(lower)) return 'pricing';
    if (/explore\s*websites?|browse|showroom|🌐/.test(lower)) return 'explore';
    if (/business\s*websites?|business|🏢/.test(lower)) return 'business_overview';
    if (/e-?commerce|fashion|shop|store|🛍️/.test(lower)) return 'fashion';
    if (/gift|couple|love|❤️/.test(lower)) return 'couple_gift';
    if (/want\s*a\s*website|order|start|rocket|🚀|i\s*want/.test(lower)) return 'want_website';
    if (/i\s*want\s*a\s*website|start\s*my\s*website|mujhe\s*website\s*chahiye|mujhe\s*website\s*banwani\s*hai/i.test(lower)) return 'want_website';
    return defaultIntent;
  }

  function addContextualActions(intent, entities, lang) {
    var actions = [];

    switch (intent) {
      case 'greeting':
      case 'about':
        actions = [
          { label: '💰 View Prices', type: 'text' },
          { label: '🌐 Explore Demos', type: 'text' },
          { label: '🚀 I Want a Website', type: 'text' }
        ];
        break;
      case 'pricing':
        actions = [
          { label: '🛍️ Fashion Stores', type: 'text' },
          { label: '🍽️ Restaurants', type: 'text' },
          { label: '✂️ Salons', type: 'text' },
          { label: '💬 Contact on WhatsApp', type: 'whatsapp' }
        ];
        break;
      case 'services':
      case 'explore':
        actions = [
          { label: '🛍️ E-commerce', type: 'text' },
          { label: '🏢 Business', type: 'text' },
          { label: '❤️ Couple & Love', type: 'text' },
          { label: '🎂 Birthday', type: 'text' },
          { label: '💍 Wedding', type: 'text' },
          { label: '🎁 Digital Gifts', type: 'text' }
        ];
        break;
      case 'business_overview':
        actions = [
          { label: '🍽️ Restaurant', type: 'text' },
          { label: '✂️ Salon', type: 'text' },
          { label: '🏠 Real Estate', type: 'text' },
          { label: '🏢 Agency', type: 'text' }
        ];
        break;
      case 'couple_gift':
        actions = [
          { label: '❤️ Couple & Love', type: 'text' },
          { label: '🎂 Birthday', type: 'text' },
          { label: '💍 Wedding', type: 'text' },
          { label: '🎁 Digital Gifts', type: 'text' }
        ];
        break;
      case 'restaurant':
      case 'salon':
      case 'realestate':
      case 'agency':
      case 'fashion':
      case 'ecommerce':
      case 'wedding':
      case 'birthday':
      case 'couple':
      case 'gift':
      case 'memories':
      case 'digitalgift':
        actions = [
          { label: '💰 View Prices', type: 'text' },
          { label: '💬 Contact on WhatsApp', type: 'whatsapp' },
          { label: '🚀 I Want a Website', type: 'text' }
        ];
        break;
      case 'want_website':
      case 'interest':
        actions = [
          { label: '💬 Contact on WhatsApp', type: 'whatsapp' },
          { label: '📝 Share My Details', type: 'text' }
        ];
        break;
    }

    if (actions.length > 0) {
      addActionButtons(actions);
    }
  }

  // ========================================
  // LEAD COLLECTION
  // ========================================

  function handleLeadCollection(text) {
    state.leadStep++;

    switch (state.leadStep) {
      case 1:
        state.leadData.name = text;
        addBotMessage("Thanks, " + escapeHtml(text) + "! 😊\n\nWhat type of website do you need?\n(Restaurant, Salon, Couple, Birthday, Wedding, Fashion, Gift, Business...)");
        break;
      case 2:
        state.leadData.type = text;
        addBotMessage("Great choice! 🎯\n\nAny specific requirements or budget? Or just say 'no' to skip.");
        break;
      case 3:
        state.leadData.requirements = text;
        state.conversationState = 'idle';
        state.leadStep = 0;

        var leadSummary = "✅ **Your Details:**\n\n" +
          "👤 Name: " + state.leadData.name + "\n" +
          "🌐 Website Type: " + state.leadData.type + "\n" +
          "📝 Requirements: " + state.leadData.requirements + "\n\n" +
          "The WebNest team will contact you soon! 🚀";

        addBotMessage(leadSummary);
        addActionButtons([
          { label: '💬 Contact on WhatsApp Now', type: 'whatsapp' },
          { label: '🏠 Back to Home', type: 'link', url: '#' }
        ]);

        // Reset lead data
        state.leadData = {};
        break;
    }
  }

  // ========================================
  // INITIALIZE
  // ========================================

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createUI);
  } else {
    createUI();
  }

})();
