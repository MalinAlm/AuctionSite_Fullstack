import { useEffect, useState } from "react";
import {
  getAdminAuctions,
  getAdminUsers,
  setAuctionActiveStatus,
  setUserActiveStatus,
} from "../../services/AdminService";
import type { AdminAuction, AdminUser } from "../../types/Types";
import { formatDateTime } from "../../utils/DateFormatter";
import "./AdminView.css";

const AdminView = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [auctions, setAuctions] = useState<AdminAuction[]>([]);
  const [message, setMessage] = useState("");

  const loadAdminData = async () => {
    try {
      const [userData, auctionData] = await Promise.all([
        getAdminUsers(),
        getAdminAuctions(),
      ]);

      setUsers(userData);
      setAuctions(auctionData);
      setMessage("");
    } catch {
      setMessage("Could not load admin data.");
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  const handleUserStatusChange = async (
    userId: string,
    shouldBeActive: boolean,
  ) => {
    const success = await setUserActiveStatus(userId, shouldBeActive);

    if (!success) {
      setMessage("Could not update user status.");
      return;
    }

    await loadAdminData();
  };

  const handleAuctionStatusChange = async (
    auctionId: string,
    shouldBeActive: boolean,
  ) => {
    const success = await setAuctionActiveStatus(auctionId, shouldBeActive);

    if (!success) {
      setMessage("Could not update auction status.");
      return;
    }

    await loadAdminData();
  };

  return (
    <div className="admin-view-container">
      <h1>Admin</h1>

      {message && <p>{message}</p>}

      <div className="admin-flex-container">
        <section className="admin-section">
          <h2>Users</h2>

          <div className="admin-list">
            {users.map((user) => (
              <div className="admin-card" key={user.id}>
                <h3>{user.userName}</h3>
                <p>Email: {user.email}</p>
                <p>Role: {user.role}</p>
                <p>Status: {user.isActive ? "Active" : "Inactive"}</p>

                <button
                  onClick={() =>
                    handleUserStatusChange(user.id, !user.isActive)
                  }
                >
                  {user.isActive ? "Deactivate user" : "Activate user"}
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="admin-section">
          <h2>Auctions</h2>

          <div className="admin-list">
            {auctions.map((auction) => (
              <div className="admin-card" key={auction.id}>
                <h3>{auction.title}</h3>
                <p>Created by: {auction.userName}</p>
                <p>Status: {auction.isActive ? "Active" : "Inactive"}</p>
                <p>{auction.isOpen ? "Open" : "Closed"}</p>
                <p>Starting price: {auction.startingPrice} kr</p>
                <p>
                  Highest bid:{" "}
                  {auction.highestBid !== null
                    ? `${auction.highestBid} kr`
                    : "No bids"}
                </p>
                <p>Bid count: {auction.bidCount}</p>
                <p>Ends at: {formatDateTime(auction.endsAt)}</p>

                <button
                  onClick={() =>
                    handleAuctionStatusChange(auction.id, !auction.isActive)
                  }
                >
                  {auction.isActive ? "Deactivate auction" : "Activate auction"}
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminView;
