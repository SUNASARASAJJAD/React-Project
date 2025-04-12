import React, { useState, useEffect } from "react";
import Hoc from "../../../components/dashboardCompo/Hoc";
import "../../../assets/css/dashboardCSS/main.css";
import axios from "axios";
import { jsPDF } from "jspdf";

const GET_API = process.env.REACT_APP_GET_API;
// Mock API endpoint for orders (replace with your actual API if available)
const GET_ORDERS_API = "http://your-api-endpoint/orders"; // Example, replace with real endpoint

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [activeCount, setActiveCount] = useState(0);
  const [inactiveCount, setInactiveCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [orders, setOrders] = useState([]);
  const [todos, setTodos] = useState([
    { id: 1, text: "Review product inventory", completed: true },
    { id: 2, text: "Update pricing", completed: false },
    { id: 3, text: "Update pricing", completed: true },
    { id: 4, text: "Update pricing", completed: false },
  ]);
  const [newTodo, setNewTodo] = useState("");

  // Fetch products on component mount
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(GET_API);
        setProducts(res.data);
        const total = res.data.length;
        const active = res.data.filter((item) => item.status === "active").length;
        const inactive = res.data.filter((item) => item.status === "inactive").length;

        setTotalCount(total);
        setActiveCount(active);
        setInactiveCount(inactive);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProduct();
  }, []);

  // Fetch recent orders on component mount
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Replace with actual API call if available
        const res = await axios.get(GET_ORDERS_API);
        // Sort orders by date (assuming date is a field like 'orderDate')
        const sortedOrders = res.data
          .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate))
          .slice(0, 5); // Show top 5 recent orders
        setOrders(sortedOrders);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        // Mock data fallback if API fails or not available
        setOrders([
          { id: 1, user: "John Doe", orderDate: "2023-10-01", status: "completed" },
          { id: 2, user: "Jane Smith", orderDate: "2023-09-30", status: "pending" },
          { id: 3, user: "Mike Johnson", orderDate: "2023-09-29", status: "process" },
          { id: 4, user: "Sara Lee", orderDate: "2023-09-28", status: "pending" },
          { id: 5, user: "Tom Brown", orderDate: "2023-09-27", status: "completed" },
        ]);
      }
    };

    fetchOrders();
  }, []);

  // Download PDF function (unchanged)
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text("Product List", 10, 10);
    doc.text(`Total Products: ${totalCount}`, 10, 20);
    doc.text(`Active Products: ${activeCount}`, 10, 30);
    doc.text(`Inactive Products: ${inactiveCount}`, 10, 40);

    let yPosition = 50;
    const xOffset = 10;
    const nameColumnWidth = 100;
    const priceColumnWidth = 60;

    doc.text("Name", xOffset, yPosition);
    doc.text("MRP", xOffset + nameColumnWidth, yPosition);
    yPosition += 10;

    let totalAmount = 0;
    products.forEach((product) => {
      const price = product.price !== undefined && product.price !== null ? product.price : 0;
      doc.text(product.name, xOffset, yPosition);
      doc.text(price.toString(), xOffset + nameColumnWidth, yPosition);
      totalAmount += price;
      yPosition += 10;
    });

    yPosition += 10;
    doc.text(`Total Amount: ${totalAmount}`, xOffset + nameColumnWidth, yPosition);
    doc.save("product-list.pdf");
  };

  // To-Do List Functions
  const addTodo = (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    const newTask = {
      id: todos.length + 1,
      text: newTodo,
      completed: false,
    };
    setTodos([...todos, newTask]);
    setNewTodo("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <>
      <Hoc />
      <section id="content">
        <main>
          <div className="head-title">
            <div className="left">
              <h1>Dashboard</h1>
              <ul className="breadcrumb">
                <li>
                  <a href="#">Product Management Dashboard</a>
                </li>
                <li>
                  <i className="bx bx-chevron-right"></i>
                </li>
                <li>
                  <a className="active" href="#">
                    Home
                  </a>
                </li>
              </ul>
            </div>
            <button onClick={downloadPDF} className="btn-download">
              <i className="bx bxs-cloud-download"></i>
              <span className="text">Download PDF</span>
            </button>
          </div>

          <ul className="box-info">
            <li>
              <i className="bx bx-cart-alt"></i>
              <span className="text">
                <h3>{totalCount}</h3>
                <p>Total Products</p>
              </span>
            </li>
            <li>
              <i className="bx bxs-check-circle"></i>
              <span className="text">
                <h3>{activeCount}</h3>
                <p>Active Products</p>
              </span>
            </li>
            <li>
              <i className="bx bx-x-circle"></i>
              <span className="text">
                <h3>{inactiveCount}</h3>
                <p>Inactive Products</p>
              </span>
            </li>
          </ul>

          <div className="table-data">
            {/* Recent Orders Section */}
            <div className="order">
              <div className="head">
                <h3>Recent Orders</h3>
                <i className="bx bx-search"></i>
                <i className="bx bx-filter"></i>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>User</th>
                    <th>Date Order</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length > 0 ? (
                    orders.map((order) => (
                      <tr key={order.id}>
                        <td>
                          <img
                            src={require("../../../assets/images/shopping.png")}
                            alt="user"
                          />
                          <p>{order.user}</p>
                        </td>
                        <td>{order.orderDate}</td>
                        <td>
                          <span className={`status ${order.status}`}>
                            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="text-center">
                        No recent orders available
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* To-Do List Section */}
            <div className="todo">
              <div className="head">
                <h3>Todos</h3>
                <i className="bx bx-plus" onClick={() => document.getElementById("todo-input").focus()}></i>
                <i className="bx bx-filter"></i>
              </div>
              <form onSubmit={addTodo} className="mb-4">
                <input
                  id="todo-input"
                  type="text"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  placeholder="Add a new task..."
                  className="w-full p-2 border rounded"
                />
              </form>
              <ul className="todo-list">
                {todos.length > 0 ? (
                  todos.map((todo) => (
                    <li
                      key={todo.id}
                      className={todo.completed ? "completed" : "not-completed"}
                      style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                    >
                      <div
                        onClick={() => toggleTodo(todo.id)}
                        style={{ cursor: "pointer", flexGrow: 1 }}
                      >
                        <p>{todo.text}</p>
                      </div>
                      <i
                        className="bx bx-trash"
                        onClick={() => deleteTodo(todo.id)}
                        style={{ cursor: "pointer", color: "red" }}
                      ></i>
                    </li>
                  ))
                ) : (
                  <li>No tasks available</li>
                )}
              </ul>
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default Dashboard;