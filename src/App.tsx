import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import "./App.css";
import httpService from "./service/http.service";

// ---------------------- Orders Data ----------------------
const orders = [
  {
    orderId: 101,
    customer: { name: "Alice", city: "Delhi" },
    items: [
      { product: "Laptop", price: 70000 },
      { product: "Mouse", price: 1000 },
    ],
  },
  {
    orderId: 102,
    customer: { name: "Bob", city: "Mumbai" },
    items: [
      { product: "Keyboard", price: 1500 },
      { product: "Monitor", price: 12000 },
    ],
  },
  {
    orderId: 103,
    customer: { name: "Charlie", city: "Delhi" },
    items: [{ product: "Phone", price: 40000 }],
  },
];

// ---------------------- DelhiOrders Component ----------------------
const DelhiOrders = () => {
  const delhiOrders = orders.filter(
    (order) => order.customer.city.toLowerCase() === "delhi"
  );

  // const orderSummaries = delhiOrders.map((order) => {
  //   const total = order.items.reduce((sum, item) => sum + item.price, 0);
  //   return {
  //     orderId: order.orderId,
  //     customerName: order.customer.name,
  //     city: order.customer.city,
  //     totalAmount: total,
  //   };
  // });

  const orderSummary = delhiOrders.map((order) =>{
    const total = order.items.reduce((sum, item) => sum + item.price, 0);
    return{
      orderId: order.orderId,
      customerName: order.customer.name,
      city: order.customer.city,
      totalAmount: total,
    };
  })

  return (
    <div>
      <h2>📦 Delhi Orders Summary</h2>
      <ul>
        {
          orderSummary.map((summary)=>(
            <li key ={summary.orderId}>
              order{summary.orderId} by {summary.customerName} city {summary.city} costs ₹ {summary.totalAmount}


            </li>
          ))
        }
        
      </ul>
    </div>
  );
};





// ---------------------- TrafficLight Component ----------------------
const TrafficLight = () => {
  const [currentLight, setCurrentLight] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentLight((prev) => {
        if (prev === "red") return "green";
        if (prev === "green") return "yellow";
        return "red";
      });
    }, currentLight === "red" ? 4000 : currentLight === "yellow" ? 500 : 3000);

    return () => clearInterval(interval);
  }, [currentLight]);

  return (
    <div className="traffic-light-container">
      <div className="traffic-light">
        <div className={`light red ${currentLight === "red" ? "on" : ""}`} />
        <div className={`light yellow ${currentLight === "yellow" ? "on" : ""}`} />
        <div className={`light green ${currentLight === "green" ? "on" : ""}`} />
      </div>
    </div>
  );
};

// ---------------------- ProductList Component ----------------------
type Product = {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
};

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    httpService
      .get("/products")
      .then((res) => {
        console.log("product fetch", res);
        setProducts(res.products);
      })
      .catch(() => {
        toast.error("Failed to load product. Please try again later.");
      });
  }, []);

  return (
    <div>
      <h2>🛒 Product List</h2>
      <ul>
        {products.map((p) => (
          <li key={p.id}>{p.description}</li>
        ))}
      </ul>
    </div>
  );
};



// ---------------------- App Component ----------------------
function App() {
  return (
    <div className="App">
      <DelhiOrders />
      <ProductList />
      <h2>🚦 Traffic Light Simulation</h2>
      <TrafficLight />
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;
