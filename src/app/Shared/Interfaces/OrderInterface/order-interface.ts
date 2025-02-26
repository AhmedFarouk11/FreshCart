export interface OrderInterface {
    shippingAddress: {
        details: string;
        phone: string;
        city: string;
    };
    taxPrice: number;
    shippingPrice: number;
    totalOrderPrice: number;
    paymentMethodType: string;
    isPaid: boolean;
    isDelivered: boolean;
    _id: string;
    user: {
        _id: string;
        name: string;
        email: string;
        phone: string;
    };
    cartItems: CartItem[];
}

export interface CartItem {
    count: number;
    _id: string;
    product: Product;
    price: number;
}

export interface Product {
    subcategory: Subcategory[];
    ratingsQuantity: number;
    _id: string;
    title: string;
    imageCover: string;
    category: Category;
    brand: Brand;
    ratingsAverage: number;
    id: string;
}

export interface Subcategory {
    _id: string;
    name: string;
    slug: string;
    category: string;
}

export interface Category {
    _id: string;
    name: string;
    slug: string;
    image: string;
}

export interface Brand {
    _id: string;
    name: string;
    slug: string;
    image: string;
}

