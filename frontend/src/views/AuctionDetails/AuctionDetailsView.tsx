import { useParams } from "react-router";
import "./AuctionDetailsView.css";
import { useEffect, useState } from "react";
import { getAuctionById } from "../../services/AuctionService";
import type { Auction } from "../../types/Types";
import BidForm from "../../components/BidForm/BidForm";
import { useAuth } from "../../contexts/AuthContext";

const AuctionDetailsView = () => {
  const { id } = useParams();
  const { isLoggedIn } = useAuth();
  const [auction, setAuction] = useState<Auction | null>(null);
  const [message, setMessage] = useState("");

  const fetchAuction = async () => {
    if (!id) return;

    try {
      const data = await getAuctionById(id);
      setAuction(data);
    } catch {
      setMessage("Could not load auction.");
    }
  };

  useEffect(() => {
    fetchAuction();
  }, [id]);

  if (message) {
    return <p>{message}</p>;
  }

  if (!auction) {
    return <p>Loading aution...</p>;
  }
  return (
    <div className="auction-details-container">
      <h2>{auction.title}</h2>
      <p>{auction.description}</p>
      <p>Starting price: {auction.startingPrice} kr</p>
      <p>Ends at: {auction.endsAt}</p>

      {!auction.isOpen ? (
        <p>This auction is closed</p>
      ) : !isLoggedIn ? (
        <p>Sign in to place a bid</p>
      ) : auction.userId ===
        JSON.parse(atob(localStorage.getItem("token")!.split(".")[1]))[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ] ? (
        <p>You cannot bid on your own auction</p>
      ) : (
        <BidForm auctionId={auction.id} onBidCreated={fetchAuction} />
      )}

      <h3>Bids</h3>

      {auction.bids.length === 0 ? (
        <p>No bids yet.</p>
      ) : (
        auction.bids.map((bid) => (
          <div key={bid.id}>
            <p>
              {bid.amount} kr by {bid.userName}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default AuctionDetailsView;
