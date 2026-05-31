import { useEffect, useState } from "react";
import AuctionCard from "../../components/AuctionCard/AuctionCard";
import { getAuctions, searchAuctions } from "../../services/AuctionService";
import type { Auction } from "../../types/Types";
import "./AuctionsView.css";

const AuctionsView = () => {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [message, setMessage] = useState("");

  const loadAuctions = async () => {
    try {
      const data = await getAuctions();
      setAuctions(data);
    } catch {
      setMessage("Could not load auctions.");
    }
  };

  useEffect(() => {
    loadAuctions();
  }, []);

  const handleSearch = async () => {
    try {
      const trimmedSearchTitle = searchTitle.trim();

      if (!trimmedSearchTitle) {
        await loadAuctions();
        return;
      }

      const data = await searchAuctions(trimmedSearchTitle);
      setAuctions(data);
      setMessage(data.length === 0 ? "No auctions found" : "");
    } catch {
      setMessage("Could not search auctions");
    }
  };

  return (
    <div className="auctions-view-container">
      <h1>Auctions</h1>

      <div className="auction-search-container">
        <input
          type="text"
          placeholder="Search auctions by title"
          value={searchTitle}
          onChange={(event) => setSearchTitle(event.target.value)}
          className="auction-search-input"
        />

        <button onClick={handleSearch} className="auction-search-button">
          Search
        </button>
      </div>

      {message && <p>{message}</p>}
      {auctions.map((auction: any) => (
        <AuctionCard key={auction.id} auction={auction} />
      ))}
    </div>
  );
};

export default AuctionsView;
