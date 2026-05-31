import { useEffect, useState } from "react";
import AuctionCard from "../../components/AuctionCard/AuctionCard";
import {
  getAuctions,
  getClosedAuctions,
  searchAuctions,
  searchClosedAuctions,
} from "../../services/AuctionService";
import type { Auction } from "../../types/Types";
import "./AuctionsView.css";

type AuctionFilter = "open" | "closed";

const AuctionsView = () => {
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<AuctionFilter>("open");
  const [searchTitle, setSearchTitle] = useState("");
  const [message, setMessage] = useState("");

  const loadAuctions = async (filter: AuctionFilter) => {
    try {
      const data =
        filter === "open" ? await getAuctions() : await getClosedAuctions();

      setAuctions(data);
      setMessage(data.length === 0 ? "No auctions found" : "");
    } catch {
      setAuctions([]);
      setMessage("Could not load auctions.");
    }
  };

  useEffect(() => {
    loadAuctions(selectedFilter);
  }, [selectedFilter]);

  const handleFilterChange = (filter: AuctionFilter) => {
    setSelectedFilter(filter);
    setSearchTitle("");
  };

  const handleSearch = async () => {
    try {
      const trimmedSearchTitle = searchTitle.trim();

      if (!trimmedSearchTitle) {
        await loadAuctions(selectedFilter);
        return;
      }

      const data =
        selectedFilter === "open"
          ? await searchAuctions(trimmedSearchTitle)
          : await searchClosedAuctions(trimmedSearchTitle);

      setAuctions(data);
      setMessage(data.length === 0 ? "No auctions found" : "");
    } catch {
      setAuctions([]);

      setMessage("Could not search auctions");
    }
  };

  return (
    <div className="auctions-view-container">
      <h1>Auctions</h1>

      <div className="auction-filter-container">
        <button
          className={selectedFilter === "open" ? "active-filter-button" : ""}
          onClick={() => handleFilterChange("open")}
        >
          Open auctions
        </button>

        <button
          className={selectedFilter === "closed" ? "active-filter-button" : ""}
          onClick={() => handleFilterChange("closed")}
        >
          Closed auctions
        </button>
      </div>

      <div className="auction-search-container">
        <input
          type="text"
          placeholder={
            selectedFilter === "open"
              ? "Search open auctions by title"
              : "Search closed auctions by title"
          }
          value={searchTitle}
          onChange={(event) => setSearchTitle(event.target.value)}
          className="auction-search-input"
        />

        <button onClick={handleSearch} className="auction-search-button">
          Search
        </button>
      </div>

      {message && <p>{message}</p>}
      {auctions.map((auction) => (
        <AuctionCard key={auction.id} auction={auction} />
      ))}
    </div>
  );
};

export default AuctionsView;
