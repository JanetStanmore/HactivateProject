import React, { useEffect, useState } from 'react';
import { getAllOrders } from '../../services/orderManagement';

const AdminDashboard: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const allOrders = await getAllOrders();
      setOrders(allOrders);
      // For users, you might need a separate service or use Supabase directly
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold">All Orders</h2>
          <ul>
            {orders.map((order) => (
              <li key={order.id} className="border p-2 mb-2">
                {order.orderId} - {order.userName} - {order.status}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xl font-semibold">Users</h2>
          <p>Users list coming soon...</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;