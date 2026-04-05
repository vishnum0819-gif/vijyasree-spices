import React, { useState, useEffect, useMemo } from "react";
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  X, 
  ChevronRight, 
  Star, 
  ShieldCheck, 
  Truck, 
  Leaf,
  CreditCard,
  CheckCircle2,
  Menu
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PRODUCTS } from "./constants";
import { CartItem, Product } from "./types";
import { cn } from "./lib/utils";

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProducts = useMemo(() => {
    if (activeCategory === "All") return PRODUCTS;
    return PRODUCTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  // Cart Logic
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const cartTotal = useMemo(() => 
    cart.reduce((sum, item) => sum + item.price * item.quantity, 0), 
    [cart]
  );

  const cartCount = useMemo(() => 
    cart.reduce((sum, item) => sum + item.quantity, 0), 
    [cart]
  );

  // Payment Simulation
  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPaymentProcessing(true);
    setTimeout(() => {
      setIsPaymentProcessing(false);
      setIsPaymentSuccess(true);
      setCart([]);
      setTimeout(() => {
        setIsPaymentSuccess(false);
        setIsCheckoutOpen(false);
      }, 3000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-orange-50 font-sans text-stone-900 selection:bg-red-200 selection:text-red-900">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 w-full border-b border-orange-200/50 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-600 text-white shadow-lg shadow-red-200">
              <span className="text-xl font-bold">VS</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-red-800">
              Vijyasree <span className="text-amber-600">Spices</span>
            </h1>
          </div>

          <div className="hidden items-center gap-8 md:flex">
            <a href="#home" className="text-sm font-medium hover:text-red-700">Home</a>
            <a href="#products" className="text-sm font-medium hover:text-red-700">Our Masalas</a>
            <a href="#features" className="text-sm font-medium hover:text-red-700">Why Us</a>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-stone-100 transition-colors hover:bg-stone-200"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          <div className="flex items-center gap-4 md:hidden">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-stone-100"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-0 top-20 z-30 border-b border-orange-100 bg-white p-4 shadow-xl md:hidden"
          >
            <div className="flex flex-col gap-4">
              <a href="#home" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">Home</a>
              <a href="#products" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">Our Masalas</a>
              <a href="#features" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">Why Us</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden pt-12 pb-20 lg:pt-24 lg:pb-32">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-red-100/50 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-amber-100/50 blur-3xl" />
        </div>
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-red-50 px-3 py-1 text-sm font-semibold text-red-700 ring-1 ring-inset ring-red-600/20">
                🌶️ Authentic Andhra Masalas
              </div>
              <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-stone-900 sm:text-6xl">
                Experience the True Taste of <span className="text-red-700">Andhra</span>
              </h2>
              <p className="mt-6 text-lg leading-8 text-stone-600">
                Vijyasree Spices are crafted to bring rich aroma, bold flavors, and traditional authenticity straight to your kitchen. Our premium-quality masalas are made using carefully selected spices, sourced from the finest farms and blended with perfection.
              </p>
              <div className="mt-10 flex items-center gap-x-6">
                <a
                  href="#products"
                  className="rounded-full bg-red-700 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-red-200 transition-all hover:bg-red-800 hover:shadow-xl active:scale-95"
                >
                  Shop Now
                </a>
                <a href="#features" className="text-sm font-bold leading-6 text-stone-900">
                  Learn more <span aria-hidden="true">→</span>
                </a>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square overflow-hidden rounded-3xl bg-stone-200 shadow-2xl">
                <img 
                  src="/input_file_1.png" 
                  alt="Spices spread" 
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = "https://picsum.photos/seed/andhra-spices/1000/1000";
                  }}
                />
              </div>
              <div className="absolute -bottom-6 -left-6 flex items-center gap-4 rounded-2xl bg-white p-6 shadow-xl ring-1 ring-stone-100">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                  <Star className="h-6 w-6 fill-current" />
                </div>
                <div>
                  <p className="text-sm font-bold">Premium Quality</p>
                  <p className="text-xs text-stone-500">100% Pure & Fresh</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-base font-semibold leading-7 text-red-600">Why Vijyasree?</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
              Each pack of Vijyasree Spices delivers:
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
              {[
                {
                  name: "Authentic Flavor",
                  description: "Spicy, aromatic, and full of traditional Andhra taste.",
                  icon: Leaf,
                  color: "bg-red-100 text-red-700"
                },
                {
                  name: "Premium Ingredients",
                  description: "No compromise on purity and freshness. Sourced from finest farms.",
                  icon: ShieldCheck,
                  color: "bg-amber-100 text-amber-700"
                },
                {
                  name: "Hygienically Processed",
                  description: "Clean, safe, and packed with care in modern facilities.",
                  icon: Truck,
                  color: "bg-stone-100 text-stone-700"
                },
                {
                  name: "No Artificial Colors",
                  description: "Zero preservatives or artificial colors. Pure nature in every pack.",
                  icon: CheckCircle2,
                  color: "bg-green-100 text-green-700"
                }
              ].map((feature) => (
                <div key={feature.name} className="flex flex-col">
                  <dt className="flex items-center gap-x-3 text-base font-bold leading-7 text-stone-900">
                    <div className={cn("flex h-10 w-10 items-center justify-center rounded-lg", feature.color)}>
                      <feature.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-stone-600">
                    <p className="flex-auto">{feature.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section id="products" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-stone-900">Our Premium Masalas</h2>
              <p className="mt-2 text-stone-600">Perfect for daily cooking, biryani, fry dishes, and more.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {["All", "Basic", "Masala", "Non-Veg"].map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-medium shadow-sm ring-1 ring-stone-200 transition-all",
                    activeCategory === cat 
                      ? "bg-red-700 text-white ring-red-700" 
                      : "bg-white text-stone-600 hover:bg-stone-50"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div 
                  key={product.id} 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2 }}
                  className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm transition-all hover:shadow-xl"
                >
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden bg-stone-200 lg:aspect-none group-hover:opacity-75 lg:h-64 flex items-center justify-center relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        const placeholder = document.createElement('div');
                        placeholder.className = "flex flex-col items-center justify-center h-full w-full bg-stone-100 text-stone-500 p-4 text-center";
                        placeholder.innerHTML = `<span class="font-bold text-lg">${product.name}</span><span class="text-xs mt-2">Authentic Andhra Spice</span>`;
                        parent.appendChild(placeholder);
                      }
                    }}
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold uppercase tracking-wider text-red-600">{product.category}</p>
                    <p className="text-lg font-bold text-stone-900">₹{product.price}</p>
                  </div>
                  <h3 className="mt-2 text-xl font-bold text-stone-900">
                    {product.name}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-stone-500">
                    {product.description}
                  </p>
                  <button
                    onClick={() => addToCart(product)}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-stone-900 px-4 py-3 text-sm font-bold text-white transition-all hover:bg-red-700 active:scale-95"
                  >
                    <Plus className="h-4 w-4" />
                    Add to Cart
                  </button>
                </div>
              </motion.div>
            ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-red-700 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold text-white">Bring home the essence of Andhra</h2>
              <p className="mt-2 text-red-100">Make every bite unforgettable with Vijyasree Spices.</p>
            </div>
            <button className="rounded-full bg-white px-8 py-4 text-lg font-bold text-red-700 shadow-xl transition-all hover:bg-red-50 active:scale-95">
              Order Your Pack Today
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-900 py-12 text-stone-400">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 md:grid-cols-4">
            <div className="col-span-2">
              <div className="flex items-center gap-2 text-white">
                <div className="flex h-8 w-8 items-center justify-center rounded bg-red-600 font-bold">VS</div>
                <span className="text-xl font-bold">Vijyasree Spices</span>
              </div>
              <p className="mt-4 max-w-xs">
                Authentic Andhra masalas crafted for bold flavors and traditional taste. Sourced from the finest farms.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white">Quick Links</h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li><a href="#home" className="hover:text-white">Home</a></li>
                <li><a href="#products" className="hover:text-white">Our Masalas</a></li>
                <li><a href="#features" className="hover:text-white">Why Us</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white">Contact Us</h4>
              <ul className="mt-4 space-y-2 text-sm">
                <li>Andhra Pradesh, India</li>
                <li>support@vijyasree.com</li>
                <li>+91 98765 43210</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-stone-800 pt-8 text-center text-xs">
            <p>© 2026 Vijyasree Spices. All rights reserved. 🔥 Bring home the essence of Andhra!</p>
          </div>
        </div>
      </footer>

      {/* Cart Drawer Overlay */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b p-6">
                <h2 className="text-xl font-bold">Your Shopping Cart</h2>
                <button onClick={() => setIsCartOpen(false)} className="rounded-full p-2 hover:bg-stone-100">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6">
                {cart.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-stone-100 text-stone-400">
                      <ShoppingCart className="h-10 w-10" />
                    </div>
                    <p className="text-lg font-medium text-stone-900">Your cart is empty</p>
                    <p className="mt-2 text-stone-500">Add some authentic Andhra spices to get started!</p>
                    <button 
                      onClick={() => setIsCartOpen(false)}
                      className="mt-8 rounded-full bg-red-700 px-8 py-3 font-bold text-white"
                    >
                      Browse Products
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {cart.map((item) => (
                      <div key={item.id} className="flex gap-4">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-stone-100">
                          <img src={item.image} alt={item.name} className="h-full w-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div className="flex flex-1 flex-col">
                          <div className="flex justify-between">
                            <h3 className="font-bold text-stone-900">{item.name}</h3>
                            <p className="font-bold">₹{item.price * item.quantity}</p>
                          </div>
                          <p className="mt-1 text-xs text-stone-500">{item.category}</p>
                          <div className="mt-auto flex items-center justify-between">
                            <div className="flex items-center gap-3 rounded-lg bg-stone-100 px-2 py-1">
                              <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:text-red-600">
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="text-sm font-bold">{item.quantity}</span>
                              <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:text-red-600">
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                            <button onClick={() => removeFromCart(item.id)} className="text-xs font-medium text-red-600 hover:underline">
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t p-6">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total Amount</span>
                    <span>₹{cartTotal}</span>
                  </div>
                  <p className="mt-1 text-xs text-stone-500">Taxes and shipping calculated at checkout</p>
                  <button 
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsCheckoutOpen(true);
                    }}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-red-700 py-4 text-lg font-bold text-white shadow-lg shadow-red-200 transition-all hover:bg-red-800"
                  >
                    Proceed to Checkout
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Checkout Modal */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isPaymentProcessing && setIsCheckoutOpen(false)}
              className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-white p-8 shadow-2xl"
            >
              {isPaymentSuccess ? (
                <div className="flex flex-col items-center py-12 text-center">
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <CheckCircle2 className="h-12 w-12" />
                  </div>
                  <h2 className="text-3xl font-bold text-stone-900">Payment Successful!</h2>
                  <p className="mt-4 text-stone-600">
                    Thank you for choosing Vijyasree Spices. Your authentic Andhra masalas are being prepared for delivery.
                  </p>
                  <p className="mt-2 text-sm font-medium text-red-600">Order ID: #VS-{Math.floor(Math.random() * 100000)}</p>
                </div>
              ) : (
                <>
                  <div className="mb-8 flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Secure Checkout</h2>
                    <button onClick={() => setIsCheckoutOpen(false)} className="rounded-full p-2 hover:bg-stone-100">
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <form onSubmit={handleCheckout} className="space-y-6">
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold uppercase text-stone-500">First Name</label>
                          <input required type="text" className="w-full rounded-xl border-stone-200 bg-stone-50 p-3 outline-none focus:ring-2 focus:ring-red-500" placeholder="John" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold uppercase text-stone-500">Last Name</label>
                          <input required type="text" className="w-full rounded-xl border-stone-200 bg-stone-50 p-3 outline-none focus:ring-2 focus:ring-red-500" placeholder="Doe" />
                        </div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold uppercase text-stone-500">Delivery Address</label>
                        <textarea required className="w-full rounded-xl border-stone-200 bg-stone-50 p-3 outline-none focus:ring-2 focus:ring-red-500" rows={2} placeholder="Full address with pincode" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold uppercase text-stone-500">Card Information</label>
                        <div className="relative">
                          <input required type="text" className="w-full rounded-xl border-stone-200 bg-stone-50 p-3 pl-10 outline-none focus:ring-2 focus:ring-red-500" placeholder="0000 0000 0000 0000" />
                          <CreditCard className="absolute left-3 top-3.5 h-5 w-5 text-stone-400" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label className="text-xs font-bold uppercase text-stone-500">Expiry</label>
                          <input required type="text" className="w-full rounded-xl border-stone-200 bg-stone-50 p-3 outline-none focus:ring-2 focus:ring-red-500" placeholder="MM/YY" />
                        </div>
                        <div className="space-y-1">
                          <label className="text-xs font-bold uppercase text-stone-500">CVV</label>
                          <input required type="password" maxLength={3} className="w-full rounded-xl border-stone-200 bg-stone-50 p-3 outline-none focus:ring-2 focus:ring-red-500" placeholder="***" />
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl bg-red-50 p-4">
                      <div className="flex justify-between font-bold text-red-800">
                        <span>Total to Pay</span>
                        <span>₹{cartTotal}</span>
                      </div>
                    </div>

                    <button 
                      disabled={isPaymentProcessing}
                      type="submit"
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-700 py-4 text-lg font-bold text-white shadow-lg shadow-red-200 transition-all hover:bg-red-800 disabled:opacity-50"
                    >
                      {isPaymentProcessing ? (
                        <>
                          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          Processing...
                        </>
                      ) : (
                        <>
                          Pay Now
                          <ShieldCheck className="h-5 w-5" />
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
