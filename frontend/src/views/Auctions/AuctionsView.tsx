import { useEffect, useState } from "react";
import AuctionCard from "../../components/AuctionCard/AuctionCard";
import "./AuctionsView.css";
import { getAuctions } from "../../services/AuctionService";
import type { Auction } from "../../types/Types";

const AuctionsView = () => {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const data = await getAuctions();
        setAuctions(data);
      } catch {
        setMessage("Could not load auctions.");
      }
    };
    fetchAuctions();
  }, []);

  return (
    <div className="auctions-view-container">
      <h1>Auctions</h1>
      {message && <p>{message}</p>}
      {auctions.map((auction: any) => (
        <AuctionCard key={auction.id} auction={auction} />
      ))}
    </div>
  );
};

export default AuctionsView;
