import AuctionCard from "../../components/AuctionCard/AuctionCard";
import "./AuctionsView.css";

const AuctionsView = () => {
  return (
    <div className="auctions-view-container">
      <h1>Auctions view</h1>
      {/* mappa för varje auction i db */}
      <AuctionCard />
    </div>
  );
};

export default AuctionsView;
