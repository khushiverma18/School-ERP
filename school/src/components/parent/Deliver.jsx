import React, { useState, useEffect } from 'react';
import { FiShoppingCart, FiChevronDown, FiPackage, FiTruck, FiBox } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

// --- Mock Data (No changes needed here) ---
const MOCK_CATALOG = {
    uniform: [
        { id: 'u1', name: 'School Shirt', price: 550, sizes: ['S', 'M', 'L', 'XL'] },
        { id: 'u2', name: 'School Pants', price: 700, sizes: ['28', '30', '32', '34'] },
        { id: 'u3', name: 'School Skirt', price: 650, sizes: ['26', '28', '30', '32'] },
        { id: 'u4', name: 'Blazer', price: 1500, sizes: ['S', 'M', 'L'] },
        { id: 'u5', name: 'School Tie', price: 150 },
        { id: 'u6', name: 'School Shoes', price: 800, sizes: ['6', '7', '8', '9', '10'] },
    ],
    accessories: [
        { id: 'a1', name: 'ID Card + Lanyard', price: 250 },
        { id: 'a2', name: 'School Belt', price: 200, sizes: ['M', 'L'] },
        { id: 'a3', name: 'Socks (3-Pack)', price: 180 },
    ],
    books: [
        { id: 'b1', name: 'English Textbook', price: 300, grade: 5 },
        { id: 'b2', name: 'Math Textbook', price: 350, grade: 5 },
        { id: 'b3', name: 'Science Textbook', price: 320, grade: 5 },
        { id: 'b4', name: 'English Textbook', price: 350, grade: 6 },
        { id: 'b5', name: 'Math Textbook', price: 400, grade: 6 },
        { id: 'b6', name: 'Social Studies Textbook', price: 380, grade: 6 },
    ],
    stationery: [
        { id: 's1', name: 'Standard Stationery Kit', price: 450, desc: 'Pens, Pencils, Eraser, Sharpener, Ruler' },
        { id: 's2', name: 'Art & Craft Kit', price: 600, desc: 'Crayons, Sketch Pens, Drawing Book' },
    ],
};

const MOCK_CHILDREN = [
    { id: 1, name: 'Khushi Verma', class: 5 },
    { id: 2, name: 'Arjun Verma', class: 6 },
];


const ItemCard = ({ item, onAddToCart }) => {
  // अब useState इस कंपोनेंट के टॉप-लेवल पर है, जो बिल्कुल सही है।
  const [size, setSize] = useState(item.sizes ? item.sizes[0] : null);

  const handleAddToCartClick = () => {
    onAddToCart(item, size);
  };

  return (
     <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col justify-between rounded-3xl bg-white p-6 shadow-lg shadow-slate-200/80 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 text-center"
    >
    <div className="border border-gray-200 rounded-xl p-4 text-center flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-white">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mt-2 mb-1">{item.name}</h3>
        {item.desc && <p className="text-xs text-gray-500 mb-2">{item.desc}</p>}
        <p className="font-bold text-green-600 mb-3 text-xl">₹{item.price.toFixed(2)}</p>
      </div>
      <div className="mt-auto">
        {item.sizes ? (
          <div className="relative">
            <select 
              value={size} 
              onChange={e => setSize(e.target.value)} 
              className="w-full cursor-pointer appearance-none rounded-xl border border-slate-200 bg-white p-3 text-center font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              {item.sizes.map(s => <option key={s} value={s}>Size: {s}</option>)}
            </select>
            <FiChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
        ) : (
          // यदि साइज़ नहीं है तो जगह भरने के लिए एक खाली div
          <div className="h-[50px]"></div>
        )}
         <motion.button
          onClick={handleAddToCartClick}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 p-3 font-semibold text-white shadow-lg shadow-blue-500/30 transition-all duration-300 hover:from-blue-600 hover:to-blue-700 hover:shadow-xl hover:shadow-blue-500/50"
          whileTap={{ scale: 0.97 }}
        >
          <FiShoppingCart /> Add to Cart
        </motion.button>
      </div>
    </div>
    </motion.div>
  );
};


// --- मुख्य कंपोनेंट ---
const UniformDeliveryModule = () => {
    // --- State Management (कोई बदलाव नहीं) ---
    const [currentView, setCurrentView] = useState('catalog');
    const [selectedChildId, setSelectedChildId] = useState(MOCK_CHILDREN[0].id);
    const [cart, setCart] = useState([]);
    const [orders, setOrders] = useState([]);
    const [activeOrder, setActiveOrder] = useState(null);
    const [deliveryOption, setDeliveryOption] = useState('home');
    const [deliveryAddress, setDeliveryAddress] = useState('123, Maple Street, New Delhi - 110001');
    const [pickupSlot, setPickupSlot] = useState('2023-10-28_10:00-12:00');
    const [paymentMethod, setPaymentMethod] = useState('cod');
    const selectedChild = MOCK_CHILDREN.find(c => c.id === selectedChildId);


    useEffect(() => {
        if (orders.length === 0) return;
        const interval = setInterval(() => {
            setOrders(prevOrders => {
                const newOrders = [...prevOrders];
                const orderToUpdateIndex = newOrders.findIndex(o => o.status !== 'Delivered');

                if (orderToUpdateIndex !== -1) {
                    const orderToUpdate = { ...newOrders[orderToUpdateIndex] };
                    switch (orderToUpdate.status) {
                        case 'Requested': orderToUpdate.status = 'Approved'; break;
                        case 'Approved': orderToUpdate.status = 'Dispatched'; break;
                        case 'Dispatched': orderToUpdate.status = 'Delivered'; break;
                        default: break;
                    }
                    newOrders[orderToUpdateIndex] = orderToUpdate;

                    if (activeOrder && activeOrder.id === orderToUpdate.id) {
                        setActiveOrder({ ...orderToUpdate });
                    }
                }
                return newOrders;
            });
        }, 8000); 

        return () => clearInterval(interval);
    }, [orders, activeOrder]);


    // --- Helper Functions (No changes needed here) ---
   const addToCart = (item, selectedSize = null) => {
        setCart(prevCart => {
            const cartItemId = item.id + (selectedSize ? `_${selectedSize}` : '');
            const existingItem = prevCart.find(i => i.cartItemId === cartItemId);
            if (existingItem) {
                return prevCart.map(i => i.cartItemId === cartItemId ? { ...i, quantity: i.quantity + 1 } : i);
            } else {
                return [...prevCart, { ...item, size: selectedSize, quantity: 1, cartItemId }];
            }
        });
    };
    
    const updateCartQuantity = (cartItemId, amount) => {
        setCart(prevCart => prevCart.map(item =>
                item.cartItemId === cartItemId ? { ...item, quantity: Math.max(0, item.quantity + amount) } : item
            ).filter(item => item.quantity > 0)
        );
    };

    const removeFromCart = (cartItemId) => {
        setCart(prevCart => prevCart.filter(item => item.cartItemId !== cartItemId));
    };

    const getCartTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
    };

    const placeOrder = () => {
        const newOrder = {
            id: `ORD-${Date.now()}`,
            childName: selectedChild.name,
            items: [...cart],
            total: getCartTotal(),
            status: 'Requested',
            delivery: deliveryOption === 'home' ? { type: 'Home Delivery', address: deliveryAddress } : { type: 'School Pickup', slot: pickupSlot.replace('_', ' at ') },
            payment: { method: paymentMethod.toUpperCase(), status: paymentMethod === 'cod' ? 'Unpaid' : 'Paid' },
            date: new Date().toLocaleDateString()
        };
        setOrders(prev => [newOrder, ...prev]);
        setActiveOrder(newOrder);
        setCart([]);
        setCurrentView('orderSuccess');
    };



    const renderCatalog = () => (
        <div>
            <div className="bg-blue-50 p-4 rounded-lg mb-8 flex flex-wrap gap-x-5 gap-y-2 items-center text-gray-800 border border-blue-200">
                <label className="font-semibold">👤 Child:</label>
                <select 
                    value={selectedChildId} 
                    onChange={e => setSelectedChildId(Number(e.target.value))}
                    className="p-2 rounded-md border border-gray-300 bg-white focus:ring-2 focus:ring-blue-400"
                >
                    {MOCK_CHILDREN.map(child => <option key={child.id} value={child.id}>{child.name}</option>)}
                </select>
                <span className="hidden sm:inline">|</span>
                <span>🏫 Class: <strong className="font-bold text-blue-700">{selectedChild.class}</strong></span>
            </div>
            {Object.entries(MOCK_CATALOG).map(([category, items]) => (
                <div key={category} className="mb-10">
                    <h2 className="text-2xl font-bold text-gray-800 border-b-2 border-blue-600 pb-2 mb-6 capitalize">{category}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {items
                         .filter(item => !item.grade || item.grade === selectedChild.class)
                         .map(item => (
                            // यहाँ हम नए कंपोनेंट का उपयोग कर रहे हैं
                            <ItemCard key={item.id} item={item} onAddToCart={addToCart} />
                         ))}
                    </div>
                </div>
            ))}
        </div>
    );

    const renderCart = () => (
        <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">🛒 Your Cart ({cart.reduce((acc, item) => acc + item.quantity, 0)} items)</h2>
            {cart.length === 0 ? (
                <div className="text-center py-10 px-6 bg-gray-50 rounded-lg">
                    <p className="text-gray-600">Your cart is empty. Add some items from the catalog!</p>
                </div>
            ) : (
                <div>
                    <div className="space-y-4">
                        {cart.map(item => (
                            <div key={item.cartItemId} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                                <div className="flex-grow">
                                    <h4 className="text-lg font-semibold text-gray-800">{item.name}</h4>
                                    <span className="text-gray-600 text-sm">{item.size ? `Size: ${item.size}` : `Standard`} | ₹{item.price.toFixed(2)}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <button className="bg-gray-200 w-8 h-8 rounded-full font-bold text-lg flex items-center justify-center hover:bg-gray-300" onClick={() => updateCartQuantity(item.cartItemId, -1)}>-</button>
                                    <span className="font-bold text-lg w-8 text-center">{item.quantity}</span>
                                    <button className="bg-gray-200 w-8 h-8 rounded-full font-bold text-lg flex items-center justify-center hover:bg-gray-300" onClick={() => updateCartQuantity(item.cartItemId, 1)}>+</button>
                                </div>
                                <button className="text-red-500 text-2xl ml-6 hover:text-red-700 transition-colors" onClick={() => removeFromCart(item.cartItemId)}>✖</button>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 pt-4 border-t-2 border-dashed">
                        <div className="text-right text-3xl font-bold text-gray-800">Total: ₹{getCartTotal()}</div>
                        <button className="w-full py-3.5 mt-6 text-lg font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-300" onClick={() => setCurrentView('checkout')}>
                            Proceed to Checkout →
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
    
    const renderCheckout = () => (
        <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">📦 Delivery & Payment</h2>
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                <div className="space-y-6">
                    <div className="form-group">
                        <label className="block mb-2 font-semibold text-gray-700">🚚 Delivery Options</label>
                        <div className="flex items-center gap-6">
                            <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="delivery" value="home" checked={deliveryOption === 'home'} onChange={e => setDeliveryOption(e.target.value)} className="w-4 h-4 text-blue-600"/> Home Delivery</label>
                            <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="delivery" value="school" checked={deliveryOption === 'school'} onChange={e => setDeliveryOption(e.target.value)} className="w-4 h-4 text-blue-600"/> School Pickup</label>
                        </div>
                    </div>
                    {deliveryOption === 'home' && (
                        <div className="form-group">
                            <label htmlFor="address" className="block mb-2 font-semibold text-gray-700">📍 Delivery Address</label>
                            <input type="text" id="address" value={deliveryAddress} onChange={e => setDeliveryAddress(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"/>
                            <small className="text-gray-500 mt-1 block">Estimated Delivery: 2-3 working days</small>
                        </div>
                    )}
                    {deliveryOption === 'school' && (
                        <div className="form-group">
                            <label htmlFor="pickup" className="block mb-2 font-semibold text-gray-700">🗓️ Pickup Slot</label>
                            <select id="pickup" value={pickupSlot} onChange={e => setPickupSlot(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition bg-white">
                                <option value="2023-10-28_10:00-12:00">Oct 28, 2023 @ 10:00 AM - 12:00 PM</option>
                                <option value="2023-10-29_14:00-16:00">Oct 29, 2023 @ 2:00 PM - 4:00 PM</option>
                            </select>
                        </div>
                    )}
                    <div className="form-group">
                        <label className="block mb-2 font-semibold text-gray-700">💳 Payment Method</label>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-x-6 gap-y-2">
                            <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="payment" value="cod" checked={paymentMethod === 'cod'} onChange={e => setPaymentMethod(e.target.value)} className="w-4 h-4 text-blue-600"/> Cash on Delivery</label>
                            <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="payment" value="upi" checked={paymentMethod === 'upi'} onChange={e => setPaymentMethod(e.target.value)} className="w-4 h-4 text-blue-600"/> UPI</label>
                            <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={e => setPaymentMethod(e.target.value)} className="w-4 h-4 text-blue-600"/> Card</label>
                        </div>
                    </div>
                    <div className="pt-4 border-t">
                        <div className="text-xl font-bold mb-4">Final Amount: ₹{getCartTotal()}</div>
                        <button type="button" className="w-full py-3.5 text-lg font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-blue-300" onClick={placeOrder}>✔ Place Order</button>
                    </div>
                </div>
            </div>
        </div>
    );
    
    const renderOrderTracking = () => {
        const getStatusClasses = (status) => {
            const baseClass = "py-1 px-4 rounded-full text-white text-sm font-semibold";
            if (status === 'Delivered') return `${baseClass} bg-green-500`;
            if (status === 'Dispatched') return `${baseClass} bg-yellow-500`;
            if (status === 'Approved') return `${baseClass} bg-blue-500`;
            return `${baseClass} bg-gray-500`;
        };

        const OrderStatusVisualizer = ({ status }) => {
            const statuses = ['Requested', 'Approved', 'Dispatched', 'Delivered'];
            const currentIndex = statuses.indexOf(status);
            const progressWidth = currentIndex > 0 ? `${(currentIndex / (statuses.length - 1)) * 100}%` : '0%';
            
            return (
                <div className="pt-4 mt-4 border-t border-gray-200">
                    <div className="relative flex justify-between items-center">
                        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-300 -translate-y-1/2"></div>
                        <div className="absolute top-1/2 left-0 h-1 bg-green-500 -translate-y-1/2 transition-all duration-700 ease-out" style={{ width: progressWidth }}></div>
                        {statuses.map((s, index) => (
                            <div key={s} className="relative text-center">
                                <div className={`w-6 h-6 rounded-full mx-auto border-4 border-gray-50 flex items-center justify-center transition-colors duration-300 ${index <= currentIndex ? 'bg-green-500' : 'bg-gray-300'}`}>
                                    {index <= currentIndex && <span className="text-white text-xs">✓</span>}
                                </div>
                                <p className={`text-xs mt-1 font-medium ${index <= currentIndex ? 'text-gray-800' : 'text-gray-500'}`}>{s}</p>
                            </div>
                        ))}
                    </div>
                </div>
            );
        };
        
        return (
            <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">📊 My Orders</h2>
                {orders.length === 0 ? (
                     <div className="text-center py-10 px-6 bg-gray-50 rounded-lg">
                        <p className="text-gray-600">You haven't placed any orders yet.</p>
                     </div>
                ) : (
                    <div className="space-y-5">
                        {orders.map(order => (
                            <div key={order.id} className="bg-white border border-gray-200 p-5 rounded-xl transition-shadow hover:shadow-lg" onClick={() => alert(`Invoice for ${order.id}:\n\nTotal: ₹${order.total}\nPayment Status: ${order.payment.status}\n\n(This would be a PDF download)`)}>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <strong className="text-gray-800">Order ID: {order.id}</strong><br/>
                                        <small className="text-gray-500">For: {order.childName} | Date: {order.date}</small>
                                    </div>
                                    <span className={getStatusClasses(order.status)}>{order.status}</span>
                                </div>
                                <OrderStatusVisualizer status={order.status} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    const renderOrderSuccess = () => (
        <div className="text-center p-10 bg-green-50 border-2 border-dashed border-green-500 rounded-xl">
            <span className="text-6xl">🎉</span>
            <h2 className="text-3xl font-bold text-green-700 mt-4 mb-2">Order Placed Successfully!</h2>
            <p className="text-gray-600">Your Order ID is <strong className="text-gray-800">{activeOrder?.id}</strong>.</p>
            <p className="text-gray-600 mb-6">You can check the status in the "My Orders" section.</p>
            <button className="bg-green-600 text-white font-semibold py-2 px-6 rounded-full hover:bg-green-700 transition-colors" onClick={() => setCurrentView('tracking')}>
                Track My Order
            </button>
        </div>
    );


    // --- Main Render (कोई बदलाव नहीं) ---
    return (
        <div className="bg-gray-100 min-h-screen p-4 sm:p-8 font-sans">
            <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
               <div className="relative bg-gradient-to-r from-blue-700 via-indigo-800 to-purple-700 p-8 shadow-xl rounded-lg overflow-hidden text-white">
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none animate-pulse" />
  
  <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide text-center relative z-10">
    <span className="inline-block bg-gradient-to-r from-yellow-300 via-white to-blue-300 bg-clip-text text-transparent animate-text-glow">
      👨‍👩‍👧‍👦 Uniform & Essentials
    </span>
  </h1>

  <p className="mt-4 text-center text-lg text-white/80 font-medium">
    Shop school uniforms, accessories, books & more — all in one place!
  </p>
</div>

                <nav className="flex justify-center flex-wrap gap-4 p-4 bg-gray-100 border-b border-gray-200">
                    <button className={`py-2 px-5 rounded-full font-semibold transition-all ${currentView === 'catalog' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-200'}`} onClick={() => setCurrentView('catalog')}>🛍️ Item Catalog</button>
                    <button className={`relative py-2 px-5 rounded-full font-semibold transition-all ${currentView === 'cart' || currentView === 'checkout' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-200'}`} onClick={() => setCurrentView('cart')}>
                        🛒 Cart
                        {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">{cart.reduce((acc, item) => acc + item.quantity, 0)}</span>}
                    </button>
                    <button className={`relative py-2 px-5 rounded-full font-semibold transition-all ${currentView === 'tracking' || currentView === 'orderSuccess' ? 'bg-blue-600 text-white shadow-md' : 'bg-white text-gray-700 hover:bg-gray-200'}`} onClick={() => setCurrentView('tracking')}>
                        📊 My Orders
                        {orders.length > 0 && <span className="absolute -top-1 -right-1 bg-yellow-500 text-black text-xs w-5 h-5 rounded-full flex items-center justify-center">{orders.length}</span>}
                    </button>
                </nav>
                <main className="p-4 sm:p-8">
                    {currentView === 'catalog' && renderCatalog()}
                    {currentView === 'cart' && renderCart()}
                    {currentView === 'checkout' && renderCheckout()}
                    {currentView === 'tracking' && renderOrderTracking()}
                    {currentView === 'orderSuccess' && renderOrderSuccess()}
                </main>
            </div>
        </div>
    );
};

export default UniformDeliveryModule;