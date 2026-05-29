import { useState } from "react";
import "./AuctionCard.css";

const AuctionCard = ({ auction }: any) => {
  const [showBidHistory, setShowBidHistory] = useState(false);

  const highestBid = auction.bids?.length > 0 ? auction.bids[0] : null;

  return (
    <div className="auction-card-container">
      <div>
        <h3>Här ligger en bild på varan</h3>
        <img src="" alt="" />
      </div>
      <div>
        <h4>{auction.title}</h4>
        <p>{auction.description}</p>

        <p>Starting price: {auction.startingPrice}</p>
        <p>
          Current highest bid:
          {highestBid ? highestBid.amount : "No bids yet"}
        </p>
        <p>Ends at: {auction.endsAt}</p>

        {auction.bids?.length > 0 && (
          <button onClick={() => setShowBidHistory(!showBidHistory)}>
            {showBidHistory ? "Hide bid history" : "Show bid history"}
          </button>
        )}

        {showBidHistory && (
          <div className="bid-history">
            {auction.bids.map((bid: any) => (
              <div key={bid.id}>
                <p>
                  {bid.amount} by {bid.userName}
                </p>
              </div>
            ))}
          </div>
        )}
        <input type="text" placeholder="Type in your bid" />
        <button>Place bid</button>
      </div>
    </div>
  );
};

export default AuctionCard;
