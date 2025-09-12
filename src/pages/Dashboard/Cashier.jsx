import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { motion } from "framer-motion";
import { ShoppingCart, Trash2, CheckCircle2 } from "lucide-react";

// Predefined damaged goods reasons
const DAMAGE_REASONS = [
  "Damaged",
  "Expired",
  "Broken",
  "Blemished",
  "Torn",
  "Opened",
  "Dented",
  "Leaking",
  "Swollen",
  "Moldy",
  "Spoiled",
  "Short-dated",
  "Retired",
];

export default function CashierDashboard() {
  const [cart, setCart] = useState([]);
  const [barcode, setBarcode] = useState("");
  const [damagedModal, setDamagedModal] = useState(null); // product to mark as damaged
  const [message, setMessage] = useState("");

  // Fetch product by barcode
  async function fetchProduct(barcode) {
    const { data, error } = await supabase
      .from("products")
      .select("id, name, price, stock_quantity")
      .eq("barcode", barcode)
      .maybeSingle();
    if (error) {
      console.error("Error fetching product:", error);
      return null;
    }
    return data;
  }

  // Add product to cart
  async function handleAddProduct(e) {
    e.preventDefault();
    if (!barcode) return;

    const product = await fetchProduct(barcode);
    if (product) {
      setCart([...cart, { ...product, qty: 1 }]);
      setMessage(`Added ${product.name} to cart`);
    } else {
      setMessage("Product not found");
    }
    setBarcode("");
  }

  // Remove product from cart
  function handleRemoveProduct(index) {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
  }

  // Process sale
  async function handleCheckout() {
    if (!cart.length) {
      setMessage("Cart is empty");
      return;
    }
    try {
      const { data, error } = await supabase.rpc("process_sale", {
        items: cart.map((c) => ({
          product_id: c.id,
          qty: c.qty,
          price: c.price,
        })),
      });
      if (error) throw error;
      setMessage("Sale processed successfully");
      setCart([]);
    } catch (err) {
      console.error(err);
      setMessage("Error processing sale");
    }
  }

  // Return item to stock
  async function handleReturnItem(product) {
    try {
      const { error } = await supabase.rpc("return_item_to_stock", {
        product_id: product.id,
        qty: product.qty || 1,
      });
      if (error) throw error;
      setMessage(`${product.name} returned to stock`);
    } catch (err) {
      console.error(err);
      setMessage("Error returning item");
    }
  }

  // Flag damaged goods
  async function handleMarkDamaged(product, reason) {
    try {
      const { error } = await supabase.from("damaged_goods").insert([
        {
          product_id: product.id,
          quantity: 1,
          reason,
          reported_by: "cashier", // replace with auth user later
        },
      ]);
      if (error) throw error;
      setMessage(`${product.name} marked as damaged (${reason})`);
    } catch (err) {
      console.error(err);
      setMessage("Error marking damaged item");
    } finally {
      setDamagedModal(null);
    }
  }

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="p-6 max-w-full">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 to-red-700 text-white rounded-2xl p-6 mb-6 shadow-lg">
        <h1 className="text-2xl font-extrabold">Cashier POS</h1>
        <p className="text-sm opacity-80">Process sales, returns & damaged goods</p>
      </header>

      {/* Barcode entry */}
      <form onSubmit={handleAddProduct} className="flex gap-2 mb-6">
        <input
          type="text"
          value={barcode}
          onChange={(e) => setBarcode(e.target.value)}
          placeholder="Scan or enter barcode"
          className="flex-1 px-4 py-2 rounded-lg border border-slate-300"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-green-600 text-white font-semibold"
        >
          Add
        </button>
      </form>

      {/* Cart */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="bg-white rounded-2xl shadow p-6 mb-6"
      >
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <ShoppingCart size={20} /> Current Cart
        </h2>
        {cart.length ? (
          <table className="min-w-full text-left">
            <thead>
              <tr className="text-xs text-slate-500 uppercase">
                <th className="py-2 pr-4">Product</th>
                <th className="py-2 pr-4">Price</th>
                <th className="py-2 pr-4">Qty</th>
                <th className="py-2 pr-4">Total</th>
                <th className="py-2 pr-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, i) => (
                <tr key={i} className="border-t">
                  <td className="py-3 pr-4">{item.name}</td>
                  <td className="py-3 pr-4">N${item.price}</td>
                  <td className="py-3 pr-4">{item.qty}</td>
                  <td className="py-3 pr-4 font-semibold">N${item.price * item.qty}</td>
                  <td className="py-3 pr-4 flex gap-2">
                    <button
                      onClick={() => handleReturnItem(item)}
                      className="px-2 py-1 text-xs rounded bg-slate-100"
                    >
                      Return
                    </button>
                    <button
                      onClick={() => setDamagedModal(item)}
                      className="px-2 py-1 text-xs rounded bg-red-100 text-red-600"
                    >
                      Mark Damaged
                    </button>
                    <button
                      onClick={() => handleRemoveProduct(i)}
                      className="px-2 py-1 text-xs rounded bg-slate-200"
                    >
                      <Trash2 size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-slate-400">No items in cart</p>
        )}
        {cart.length > 0 && (
          <div className="mt-4 text-right font-bold text-lg">
            Total: N${total.toLocaleString()}
          </div>
        )}
      </motion.div>

      {/* Checkout */}
      <button
        onClick={handleCheckout}
        className="w-full py-3 rounded-lg bg-green-600 text-white font-semibold flex items-center justify-center gap-2"
      >
        <CheckCircle2 size={18} /> Checkout
      </button>

      {/* Damaged Goods Modal */}
      {damagedModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-96">
            <h3 className="text-lg font-bold mb-4">Mark as Damaged</h3>
            <p className="mb-2">Select reason for <strong>{damagedModal.name}</strong></p>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {DAMAGE_REASONS.map((reason, idx) => (
                <button
                  key={idx}
                  onClick={() => handleMarkDamaged(damagedModal, reason)}
                  className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100"
                >
                  {reason}
                </button>
              ))}
            </div>
            <button
              onClick={() => setDamagedModal(null)}
              className="mt-4 w-full py-2 rounded-lg bg-slate-200"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Message */}
      {message && (
        <div className="mt-4 p-3 bg-slate-50 rounded-lg text-sm text-slate-700">
          {message}
        </div>
      )}
    </div>
  );
}

