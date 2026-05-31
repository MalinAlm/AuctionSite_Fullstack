import { useState } from "react";
import "./AuctionCard.css";
import { NavLink } from "react-router";
import { formatDateTime } from "../../utils/DateFormatter";
import { getAuctionImage } from "../../utils/AuctionImageHelper";

const AuctionCard = ({ auction }: any) => {
  const [showBidHistory, setShowBidHistory] = useState(false);

  const highestBid = auction.bids?.length > 0 ? auction.bids[0] : null;
  const isClosed = new Date(auction.endsAt) <= new Date();

  return (
    <div className="auction-card-container">
      <div>
        <img
          src={getAuctionImage(auction.id)}
          alt="default image"
          className="auction-card-image"
        />
      </div>
      <div className="text-container">
        <NavLink to={`/auction/${auction.id}`}>
          <h4>{auction.title}</h4>
        </NavLink>
        <p className="auction-card-description">{auction.description}</p>

        <p>Starting price: {auction.startingPrice} kr</p>
        <p>
          Highest bid: {highestBid ? highestBid.amount + " kr" : "No bids yet"}
        </p>
        <p>Ends at: {formatDateTime(auction.endsAt)}</p>

        {!isClosed && auction.bids?.length > 0 && (
          <button onClick={() => setShowBidHistory(!showBidHistory)}>
            {showBidHistory ? "Hide bid history" : "Show bid history"}
          </button>
        )}

        {showBidHistory && (
          <div className="bid-history">
            {auction.bids.map((bid: any) => (
              <div key={bid.id}>
                <p>
                  {bid.amount} kr by {bid.userName}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuctionCard;
