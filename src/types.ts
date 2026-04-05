export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: "Basic" | "Masala" | "Non-Veg";
}

export interface CartItem extends Product {
  quantity: number;
}
