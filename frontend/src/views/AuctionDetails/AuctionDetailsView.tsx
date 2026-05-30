import { useParams } from "react-router";
import "./AuctionDetailsView.css";
import { useEffect, useState } from "react";
import { getAuctionsById } from "../../services/AuctionService";
import type { Auction } from "../../types/Types";

const AuctionDetailsView = () => {
  const { id } = useParams();
  const [auction, setAuction] = useState<Auction | null>(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchAuction = async () => {
      if (!id) return;

      try {
        const data = await getAuctionsById(id);
        setAuction(data);
      } catch {
        setMessage("Could not load auction");
      }
    };

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
      <p>Starting price: {auction.startingPrice}</p>
      <p>Ends at: {auction.endsAt}</p>

      <h3>Bids</h3>

      {auction.bids.length === 0 ? (
        <p>No bids yet.</p>
      ) : (
        auction.bids.map((bid) => (
          <div key={bid.id}>
            <p>
              {bid.amount} by {bid.userName}
            </p>
          </div>
        ))
      )}
    </div>
  );
};

export default AuctionDetailsView;
