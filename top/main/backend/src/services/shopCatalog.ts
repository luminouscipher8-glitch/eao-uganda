export interface ShopProduct {
  id: number;
  name: string;
  price: number;
  currency: 'UGX';
  image: string;
  description: string;
  category: string;
  active: boolean;
}

export interface ShopCartItemInput {
  id: unknown;
  quantity: unknown;
}

export interface CalculatedShopCartItem {
  id: number;
  name: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
}

export interface CalculatedShopCart {
  currency: 'UGX';
  items: CalculatedShopCartItem[];
  totalAmount: number;
}

const shopProducts: readonly ShopProduct[] = [
  {
    id: 1,
    name: 'EAO Branded T-Shirt',
    price: 25000,
    currency: 'UGX',
    image: '/images/tshirt.jpg',
    description: 'High-quality cotton t-shirt with EAO logo',
    category: 'Apparel',
    active: true,
  },
  {
    id: 2,
    name: 'EAO Water Bottle',
    price: 15000,
    currency: 'UGX',
    image: '/images/bottle.jpg',
    description: 'Reusable stainless steel water bottle',
    category: 'Accessories',
    active: true,
  },
  {
    id: 3,
    name: 'EAO Notebook Set',
    price: 20000,
    currency: 'UGX',
    image: '/images/notebook.jpg',
    description: 'Set of 3 notebooks for students',
    category: 'Stationery',
    active: true,
  },
  {
    id: 4,
    name: 'EAO Tote Bag',
    price: 18000,
    currency: 'UGX',
    image: '/images/tote.jpg',
    description: 'Canvas tote bag with educational message',
    category: 'Accessories',
    active: true,
  },
  {
    id: 5,
    name: 'EAO Cap',
    price: 22000,
    currency: 'UGX',
    image: '/images/cap.jpg',
    description: 'Adjustable baseball cap with EAO embroidery',
    category: 'Apparel',
    active: true,
  },
  {
    id: 6,
    name: 'EAO Pen Set',
    price: 12000,
    currency: 'UGX',
    image: '/images/pens.jpg',
    description: 'Set of 5 ballpoint pens',
    category: 'Stationery',
    active: true,
  },
];

const productsById = new Map(shopProducts.map(product => [product.id, product]));
const MAX_CART_LINES = 50;
const MAX_QUANTITY_PER_ITEM = 100;

export function calculateShopCart(
  cartItems: ShopCartItemInput[],
  currency: string = 'UGX'
): CalculatedShopCart {
  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    throw new Error('Cart items are required');
  }

  if (cartItems.length > MAX_CART_LINES) {
    throw new Error(`Cart cannot contain more than ${MAX_CART_LINES} product lines`);
  }

  if (currency !== 'UGX') {
    throw new Error('Shop payments currently support UGX only');
  }

  const seenProductIds = new Set<number>();
  const items = cartItems.map(item => {
    if (typeof item.id !== 'number' || !Number.isInteger(item.id)) {
      throw new Error('Each cart item must have a valid product ID');
    }

    if (typeof item.quantity !== 'number' || !Number.isInteger(item.quantity)) {
      throw new Error('Each cart item quantity must be a positive integer');
    }

    if (item.quantity < 1 || item.quantity > MAX_QUANTITY_PER_ITEM) {
      throw new Error(
        `Each cart item quantity must be between 1 and ${MAX_QUANTITY_PER_ITEM}`
      );
    }

    if (seenProductIds.has(item.id)) {
      throw new Error('Cart cannot contain duplicate product IDs');
    }
    seenProductIds.add(item.id);

    const product = productsById.get(item.id);
    if (!product || !product.active) {
      throw new Error(`Product ${item.id} is not available`);
    }

    return {
      id: product.id,
      name: product.name,
      unitPrice: product.price,
      quantity: item.quantity,
      lineTotal: product.price * item.quantity,
    };
  });

  return {
    currency: 'UGX',
    items,
    totalAmount: items.reduce((total, item) => total + item.lineTotal, 0),
  };
}

export function listShopProducts(): readonly ShopProduct[] {
  return shopProducts.filter(product => product.active);
}
