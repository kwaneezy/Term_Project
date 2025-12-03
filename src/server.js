const express = require('express');
const path = require('path');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// In-memory database (replace with MongoDB/PostgreSQL in production)
const users = [];
const orders = [];

// Products data (from src/data/products.ts)
const products = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    brand: 'Apple',
    price: 1199,
    image: 'https://images.unsplash.com/photo-1696446702183-cbd50b06d6ba?w=400&h=400&fit=crop',
    description: 'The ultimate iPhone with titanium design, A17 Pro chip, and advanced camera system.',
    specs: {
      display: '6.7" Super Retina XDR',
      processor: 'A17 Pro',
      camera: '48MP Main + 12MP Ultra Wide + 12MP Telephoto',
      battery: '4422 mAh',
      os: 'iOS 17'
    },
    colors: ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium'],
    storage: ['256GB', '512GB', '1TB'],
    rating: 4.8,
    reviews: 1243,
    inStock: true
  },
  {
    id: '2',
    name: 'iPhone 15 Pro',
    brand: 'Apple',
    price: 999,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop',
    description: 'Pro performance with titanium design and action button.',
    specs: {
      display: '6.1" Super Retina XDR',
      processor: 'A17 Pro',
      camera: '48MP Main + 12MP Ultra Wide + 12MP Telephoto',
      battery: '3274 mAh',
      os: 'iOS 17'
    },
    colors: ['Natural Titanium', 'Blue Titanium', 'White Titanium', 'Black Titanium'],
    storage: ['128GB', '256GB', '512GB', '1TB'],
    rating: 4.7,
    reviews: 892,
    inStock: true
  },
  {
    id: '3',
    name: 'iPhone 15',
    brand: 'Apple',
    price: 799,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop',
    description: 'Dynamic Island and 48MP camera in a stunning design.',
    specs: {
      display: '6.1" Super Retina XDR',
      processor: 'A16 Bionic',
      camera: '48MP Main + 12MP Ultra Wide',
      battery: '3349 mAh',
      os: 'iOS 17'
    },
    colors: ['Pink', 'Yellow', 'Green', 'Blue', 'Black'],
    storage: ['128GB', '256GB', '512GB'],
    rating: 4.6,
    reviews: 1567,
    inStock: true
  },
  {
    id: '4',
    name: 'iPhone 15 Plus',
    brand: 'Apple',
    price: 899,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop',
    description: 'Big screen iPhone with all-day battery life.',
    specs: {
      display: '6.7" Super Retina XDR',
      processor: 'A16 Bionic',
      camera: '48MP Main + 12MP Ultra Wide',
      battery: '4383 mAh',
      os: 'iOS 17'
    },
    colors: ['Pink', 'Yellow', 'Green', 'Blue', 'Black'],
    storage: ['128GB', '256GB', '512GB'],
    rating: 4.5,
    reviews: 743,
    inStock: true
  },
  {
    id: '5',
    name: 'Samsung Galaxy S24 Ultra',
    brand: 'Samsung',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop',
    description: 'Ultimate Galaxy with S Pen, AI features, and 200MP camera.',
    specs: {
      display: '6.8" Dynamic AMOLED 2X',
      processor: 'Snapdragon 8 Gen 3',
      camera: '200MP Main + 50MP Telephoto + 12MP Ultra Wide',
      battery: '5000 mAh',
      os: 'Android 14'
    },
    colors: ['Titanium Gray', 'Titanium Black', 'Titanium Violet', 'Titanium Yellow'],
    storage: ['256GB', '512GB', '1TB'],
    rating: 4.7,
    reviews: 987,
    inStock: true
  },
  {
    id: '6',
    name: 'Samsung Galaxy S24+',
    brand: 'Samsung',
    price: 999,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop',
    description: 'Premium Galaxy experience with large display and powerful AI.',
    specs: {
      display: '6.7" Dynamic AMOLED 2X',
      processor: 'Snapdragon 8 Gen 3',
      camera: '50MP Main + 10MP Telephoto + 12MP Ultra Wide',
      battery: '4900 mAh',
      os: 'Android 14'
    },
    colors: ['Onyx Black', 'Marble Gray', 'Cobalt Violet', 'Amber Yellow'],
    storage: ['256GB', '512GB'],
    rating: 4.6,
    reviews: 654,
    inStock: true
  },
  {
    id: '7',
    name: 'Samsung Galaxy S24',
    brand: 'Samsung',
    price: 799,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop',
    description: 'Compact flagship with AI-powered features.',
    specs: {
      display: '6.2" Dynamic AMOLED 2X',
      processor: 'Snapdragon 8 Gen 3',
      camera: '50MP Main + 10MP Telephoto + 12MP Ultra Wide',
      battery: '4000 mAh',
      os: 'Android 14'
    },
    colors: ['Onyx Black', 'Marble Gray', 'Cobalt Violet', 'Amber Yellow'],
    storage: ['128GB', '256GB'],
    rating: 4.5,
    reviews: 821,
    inStock: true
  },
  {
    id: '8',
    name: 'Google Pixel 8 Pro',
    brand: 'Google',
    price: 999,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop',
    description: 'Best of Google AI with pro-level camera and beautiful design.',
    specs: {
      display: '6.7" LTPO OLED',
      processor: 'Google Tensor G3',
      camera: '50MP Main + 48MP Telephoto + 48MP Ultra Wide',
      battery: '5050 mAh',
      os: 'Android 14'
    },
    colors: ['Obsidian', 'Porcelain', 'Bay'],
    storage: ['128GB', '256GB', '512GB'],
    rating: 4.6,
    reviews: 543,
    inStock: true
  },
  {
    id: '9',
    name: 'Google Pixel 8',
    brand: 'Google',
    price: 699,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop',
    description: 'Pure Google experience with amazing camera and AI features.',
    specs: {
      display: '6.2" OLED',
      processor: 'Google Tensor G3',
      camera: '50MP Main + 12MP Ultra Wide',
      battery: '4575 mAh',
      os: 'Android 14'
    },
    colors: ['Obsidian', 'Hazel', 'Rose'],
    storage: ['128GB', '256GB'],
    rating: 4.5,
    reviews: 712,
    inStock: true
  },
  {
    id: '10',
    name: 'OnePlus 12',
    brand: 'OnePlus',
    price: 799,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
    description: 'Fast charging flagship with Hasselblad camera.',
    specs: {
      display: '6.82" LTPO AMOLED',
      processor: 'Snapdragon 8 Gen 3',
      camera: '50MP Main + 64MP Telephoto + 48MP Ultra Wide',
      battery: '5400 mAh',
      os: 'Android 14'
    },
    colors: ['Flowy Emerald', 'Silky Black'],
    storage: ['256GB', '512GB'],
    rating: 4.5,
    reviews: 432,
    inStock: true
  },
  {
    id: '11',
    name: 'OnePlus 12R',
    brand: 'OnePlus',
    price: 599,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
    description: 'Premium features at an accessible price.',
    specs: {
      display: '6.78" LTPO AMOLED',
      processor: 'Snapdragon 8 Gen 2',
      camera: '50MP Main + 8MP Ultra Wide + 2MP Macro',
      battery: '5500 mAh',
      os: 'Android 14'
    },
    colors: ['Cool Blue', 'Iron Gray'],
    storage: ['128GB', '256GB'],
    rating: 4.4,
    reviews: 298,
    inStock: true
  },
  {
    id: '12',
    name: 'Xiaomi 14 Ultra',
    brand: 'Xiaomi',
    price: 1099,
    image: 'https://images.unsplash.com/photo-1567581935884-3349723552ca?w=400&h=400&fit=crop',
    description: 'Photography powerhouse with Leica optics.',
    specs: {
      display: '6.73" LTPO AMOLED',
      processor: 'Snapdragon 8 Gen 3',
      camera: '50MP Main + 50MP Telephoto + 50MP Ultra Wide + 50MP Periscope',
      battery: '5300 mAh',
      os: 'Android 14'
    },
    colors: ['Black', 'White'],
    storage: ['512GB', '1TB'],
    rating: 4.6,
    reviews: 367,
    inStock: true
  },
  {
    id: '13',
    name: 'Xiaomi 14',
    brand: 'Xiaomi',
    price: 799,
    image: 'https://images.unsplash.com/photo-1567581935884-3349723552ca?w=400&h=400&fit=crop',
    description: 'Flagship performance with Leica camera system.',
    specs: {
      display: '6.36" LTPO AMOLED',
      processor: 'Snapdragon 8 Gen 3',
      camera: '50MP Main + 50MP Telephoto + 50MP Ultra Wide',
      battery: '4610 mAh',
      os: 'Android 14'
    },
    colors: ['Black', 'White', 'Green'],
    storage: ['256GB', '512GB'],
    rating: 4.5,
    reviews: 489,
    inStock: true
  },
  {
    id: '14',
    name: 'Motorola Edge 50 Pro',
    brand: 'Motorola',
    price: 699,
    image: 'https://images.unsplash.com/photo-1605236453806-6ff36851218e?w=400&h=400&fit=crop',
    description: 'Premium edge-to-edge display with stellar performance.',
    specs: {
      display: '6.7" pOLED',
      processor: 'Snapdragon 8 Gen 2',
      camera: '50MP Main + 13MP Ultra Wide + 10MP Telephoto',
      battery: '4500 mAh',
      os: 'Android 14'
    },
    colors: ['Luxe Lavender', 'Black Beauty', 'Moonlight Pearl'],
    storage: ['256GB', '512GB'],
    rating: 4.3,
    reviews: 234,
    inStock: true
  },
  {
    id: '15',
    name: 'ASUS ROG Phone 8 Pro',
    brand: 'ASUS',
    price: 1199,
    image: 'https://images.unsplash.com/photo-1592286927505-b0501739e111?w=400&h=400&fit=crop',
    description: 'Ultimate gaming phone with advanced cooling.',
    specs: {
      display: '6.78" AMOLED 165Hz',
      processor: 'Snapdragon 8 Gen 3',
      camera: '50MP Main + 13MP Ultra Wide + 5MP Macro',
      battery: '5500 mAh',
      os: 'Android 14'
    },
    colors: ['Phantom Black', 'Storm White'],
    storage: ['512GB', '1TB'],
    rating: 4.7,
    reviews: 412,
    inStock: true
  },
  {
    id: '16',
    name: 'Sony Xperia 1 VI',
    brand: 'Sony',
    price: 1099,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop',
    description: 'Professional camera and display technology in your pocket.',
    specs: {
      display: '6.5" 4K HDR OLED',
      processor: 'Snapdragon 8 Gen 3',
      camera: '48MP Main + 12MP Telephoto + 12MP Ultra Wide',
      battery: '5000 mAh',
      os: 'Android 14'
    },
    colors: ['Black', 'Platinum Silver', 'Khaki Green'],
    storage: ['256GB', '512GB'],
    rating: 4.4,
    reviews: 189,
    inStock: true
  },
  {
    id: '17',
    name: 'Nothing Phone (2)',
    brand: 'Nothing',
    price: 599,
    image: 'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=400&h=400&fit=crop',
    description: 'Unique transparent design with Glyph interface.',
    specs: {
      display: '6.7" LTPO OLED',
      processor: 'Snapdragon 8+ Gen 1',
      camera: '50MP Main + 50MP Ultra Wide',
      battery: '4700 mAh',
      os: 'Android 14'
    },
    colors: ['White', 'Dark Gray'],
    storage: ['256GB', '512GB'],
    rating: 4.3,
    reviews: 567,
    inStock: true
  },
  {
    id: '18',
    name: 'Oppo Find X7 Ultra',
    brand: 'Oppo',
    price: 999,
    image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=400&fit=crop',
    description: 'Photography flagship with dual periscope cameras.',
    specs: {
      display: '6.82" LTPO AMOLED',
      processor: 'Snapdragon 8 Gen 3',
      camera: '50MP Main + 50MP Ultra Wide + 50MP Periscope',
      battery: '5000 mAh',
      os: 'Android 14'
    },
    colors: ['Ocean Blue', 'Sepia Brown', 'Tailored Black'],
    storage: ['256GB', '512GB'],
    rating: 4.5,
    reviews: 278,
    inStock: true
  },
  {
    id: '19',
    name: 'Vivo X100 Pro',
    brand: 'Vivo',
    price: 899,
    image: 'https://images.unsplash.com/photo-1585060544812-6b45742d762f?w=400&h=400&fit=crop',
    description: 'ZEISS optics and powerful performance combined.',
    specs: {
      display: '6.78" LTPO AMOLED',
      processor: 'MediaTek Dimensity 9300',
      camera: '50MP Main + 50MP Telephoto + 50MP Ultra Wide',
      battery: '5400 mAh',
      os: 'Android 14'
    },
    colors: ['Asteroid Black', 'Startrail Blue'],
    storage: ['256GB', '512GB'],
    rating: 4.4,
    reviews: 312,
    inStock: true
  },
  {
    id: '20',
    name: 'Realme GT 5 Pro',
    brand: 'Realme',
    price: 649,
    image: 'https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&h=400&fit=crop',
    description: 'Flagship killer with incredible value.',
    specs: {
      display: '6.78" LTPO AMOLED',
      processor: 'Snapdragon 8 Gen 3',
      camera: '50MP Main + 50MP Telephoto + 8MP Ultra Wide',
      battery: '5400 mAh',
      os: 'Android 14'
    },
    colors: ['Emerald Green', 'Crimson Red', 'Titanium White'],
    storage: ['256GB', '512GB'],
    rating: 4.4,
    reviews: 445,
    inStock: true
  },
  {
    id: '21',
    name: 'Honor Magic6 Pro',
    brand: 'Honor',
    price: 899,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
    description: 'AI-powered flagship with stunning display.',
    specs: {
      display: '6.8" LTPO OLED',
      processor: 'Snapdragon 8 Gen 3',
      camera: '50MP Main + 180MP Telephoto + 50MP Ultra Wide',
      battery: '5600 mAh',
      os: 'Android 14'
    },
    colors: ['Black', 'Green', 'Purple'],
    storage: ['512GB', '1TB'],
    rating: 4.5,
    reviews: 267,
    inStock: true
  },
  {
    id: '22',
    name: 'iPhone 14 Pro',
    brand: 'Apple',
    price: 899,
    image: 'https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?w=400&h=400&fit=crop',
    description: 'Previous generation Pro with Dynamic Island.',
    specs: {
      display: '6.1" Super Retina XDR',
      processor: 'A16 Bionic',
      camera: '48MP Main + 12MP Ultra Wide + 12MP Telephoto',
      battery: '3200 mAh',
      os: 'iOS 17'
    },
    colors: ['Deep Purple', 'Gold', 'Silver', 'Space Black'],
    storage: ['128GB', '256GB', '512GB'],
    rating: 4.6,
    reviews: 2134,
    inStock: true
  },
  {
    id: '23',
    name: 'Samsung Galaxy Z Fold 5',
    brand: 'Samsung',
    price: 1799,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop',
    description: 'Foldable flagship that transforms into a tablet.',
    specs: {
      display: '7.6" Main + 6.2" Cover AMOLED',
      processor: 'Snapdragon 8 Gen 2',
      camera: '50MP Main + 12MP Ultra Wide + 10MP Telephoto',
      battery: '4400 mAh',
      os: 'Android 14'
    },
    colors: ['Phantom Black', 'Cream', 'Icy Blue'],
    storage: ['256GB', '512GB', '1TB'],
    rating: 4.5,
    reviews: 523,
    inStock: true
  },
  {
    id: '24',
    name: 'Samsung Galaxy Z Flip 5',
    brand: 'Samsung',
    price: 999,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=400&fit=crop',
    description: 'Compact foldable with large cover screen.',
    specs: {
      display: '6.7" Main + 3.4" Cover AMOLED',
      processor: 'Snapdragon 8 Gen 2',
      camera: '12MP Main + 12MP Ultra Wide',
      battery: '3700 mAh',
      os: 'Android 14'
    },
    colors: ['Mint', 'Graphite', 'Cream', 'Lavender'],
    storage: ['256GB', '512GB'],
    rating: 4.4,
    reviews: 678,
    inStock: true
  }
];

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// ============= AUTH ROUTES =============

// Register
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      id: Date.now().toString(),
      email,
      password: hashedPassword,
      name,
      phone: '',
      address: '',
      createdAt: new Date()
    };

    users.push(user);

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        address: user.address
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
        address: user.address
      }
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get current user
app.get('/api/auth/me', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json({
    id: user.id,
    email: user.email,
    name: user.name,
    phone: user.phone,
    address: user.address
  });
});

// Update profile
app.put('/api/auth/profile', authenticateToken, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  const { name, phone, address } = req.body;
  
  if (name) user.name = name;
  if (phone !== undefined) user.phone = phone;
  if (address !== undefined) user.address = address;

  res.json({
    id: user.id,
    email: user.email,
    name: user.name,
    phone: user.phone,
    address: user.address
  });
});

// ============= PRODUCT ROUTES =============

// Get all products
app.get('/api/products', (req, res) => {
  const { brand, sortBy, search } = req.query;
  
  let filtered = [...products];

  // Filter by brand
  if (brand && brand !== 'all') {
    filtered = filtered.filter(p => p.brand === brand);
  }

  // Search
  if (search) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(searchLower) ||
      p.brand.toLowerCase().includes(searchLower) ||
      p.description.toLowerCase().includes(searchLower)
    );
  }

  // Sort
  switch (sortBy) {
    case 'price-low':
      filtered.sort((a, b) => a.price - b.price);
      break;
    case 'price-high':
      filtered.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      filtered.sort((a, b) => b.rating - a.rating);
      break;
    case 'name':
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
  }

  res.json(filtered);
});

// Get single product
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

// Get unique brands
app.get('/api/brands', (req, res) => {
  const brands = [...new Set(products.map(p => p.brand))].sort();
  res.json(brands);
});

// ============= ORDER ROUTES =============

// Create order
app.post('/api/orders', authenticateToken, (req, res) => {
  try {
    const { items, shippingInfo, total } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    const order = {
      id: Date.now().toString(),
      userId: req.user.id,
      items,
      shippingInfo,
      total,
      status: 'pending',
      createdAt: new Date()
    };

    orders.push(order);

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user orders
app.get('/api/orders', authenticateToken, (req, res) => {
  const userOrders = orders.filter(o => o.userId === req.user.id);
  res.json(userOrders);
});

// Get single order
app.get('/api/orders/:id', authenticateToken, (req, res) => {
  const order = orders.find(o => o.id === req.params.id && o.userId === req.user.id);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  res.json(order);
});

// ============= HEALTH CHECK =============

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date(),
    products: products.length,
    users: users.length,
    orders: orders.length
  });
});

// ============= START SERVER =============

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  