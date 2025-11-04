import { useCart } from '../context/CartContext';
import { FaRegTrashAlt } from 'react-icons/fa';

function Cart() {
  const { productItems, deleteProduct, IncDec, payment } = useCart();

  console.log("payment", payment);

  const handlePayment = async () => {
    try {
      // Update this URL to match your Render backend's /cart endpoint
      const orderResponse = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/cart`, { // Replace with your actual Render backend URL
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: payment }),
      });

      const order = await orderResponse.json();

      const options = {
        key: "rzp_test_RbazyuxUIauDAV", // Use your Razorpay test/live key
        amount: order.amount,
        currency: "INR",
        name: "Zaptro Store",
        description: "Test Payment",
        order_id: order.id,
        handler: function (response) {
          alert(`✅ Payment Successful! ID: ${response.razorpay_payment_id}`);
        },
        theme: { color: "#f44336" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Payment failed:", error);
    }
  };

  return (
    <div className="mt-10 max-w-6xl mx-auto mb-5">
      {productItems.length > 0 ? (
        <div>
          <h1 className="font-bold text-2xl">My Cart {productItems.length}</h1>
          <div>
            <div className="mt-10">
              {productItems.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="bg-gray-100 p-5 rounded-md flex item-center justify-between mt-4 w-full"
                  >
                    <div className="flex item-center gap-4">
                      <img
                        src={item.images}
                        className="w-20 h-20 rounded-md"
                        alt={item.title}
                      />
                      <div>
                        <h1 className="md:w-[300px] line-clamp-2 ">{item.title}</h1>
                        <p className="text-red-500 font-semibold text-lg">
                          {item.price * item.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="bg-red-500 h-10 text-white flex gap-4 p-2 mt-5 rounded-md font-bold text-xl">
                      <button onClick={() => IncDec(item.id, item.quantity, "decrement")} className="cursor-pointer">-</button>
                      <span>{item.quantity}</span>
                      <button
                        id={item.id}
                        onClick={() => IncDec(item.id, item.quantity, "increment")}
                        className="cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                    <span className=" transition-all flex rounded-full p-3 ">
                      <FaRegTrashAlt onClick={() => deleteProduct(item.id)} className="text-red-500 hover:bg-white/60 hover:shadow-2xl text-2xl cursor-pointer mt-5" />
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
          <button
            onClick={handlePayment}
            className="bg-red-500 ml-[45%] m-10 text-white px-5 py-2 rounded-md"
          >
            Buy Now ₹{Number(payment)}
          </button>
        </div>
      ) : (
        <div>Cart is empty</div>
      )}
    </div>
  );
}

export default Cart;
