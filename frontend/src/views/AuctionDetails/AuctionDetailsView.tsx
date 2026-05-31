import { useParams, NavLink } from "react-router";
import "./AuctionDetailsView.css";
import { useEffect, useState } from "react";
import { getAuctionById } from "../../services/AuctionService";
import type { Auction } from "../../types/Types";
import BidForm from "../../components/BidForm/BidForm";
import { useAuth } from "../../contexts/AuthContext";
import { deleteLatestBid } from "../../services/BidService";
import { formatDateTime } from "../../utils/DateFormatter";

const AuctionDetailsView = () => {
  const { id } = useParams();
  const { isLoggedIn, userId } = useAuth();

  const [auction, setAuction] = useState<Auction | null>(null);
  const [message, setMessage] = useState("");

  const latestBid = auction && auction.bids.length > 0 ? auction.bids[0] : null;

  const isAuctionOwner = auction?.userId === userId;
  const isAuctionOpen = auction?.isOpen === true;
  const hasBids = auction ? auction.bids.length > 0 : false;

  const shouldShowClosedMessage = auction && !isAuctionOpen;
  const shouldShowSignInMessage = auction && isAuctionOpen && !isLoggedIn;
  const shouldShowOwnerMessage =
    auction && isAuctionOpen && isLoggedIn && isAuctionOwner;

  const shouldShowBidForm =
    auction && isAuctionOpen && isLoggedIn && !isAuctionOwner;

  const canEditAuction = isAuctionOpen && isLoggedIn && isAuctionOwner;

  const fetchAuction = async () => {
    if (!id) return;

    try {
      const data = await getAuctionById(id);
      setAuction(data);
      setMessage("");
    } catch {
      setMessage("Could not load auction.");
    }
  };

  useEffect(() => {
    fetchAuction();
  }, [id]);

  const handleDeleteLatestBid = async () => {
    if (!auction) return;

    const result = await deleteLatestBid(auction.id);

    setMessage(result.message);

    if (result.success) {
      fetchAuction();
    }
  };

  return (
    <div className="auction-details-container">
      {message && <p>{message}</p>}

      {!auction && <p>Loading auction...</p>}

      {auction && (
        <>
          <h2>{auction.title}</h2>
          <p>{auction.description}</p>
          <p>Created by: {auction.userName}</p>
          <p>Starting price: {auction.startingPrice} kr</p>
          <p>Ends at: {formatDateTime(auction.endsAt)}</p>

          {canEditAuction && (
            <NavLink to={`/auction/${auction.id}/edit`}>Edit auction</NavLink>
          )}

          {shouldShowClosedMessage && <p>This auction is closed.</p>}

          <h3>{isAuctionOpen ? "Bids" : "Winning bid"}</h3>

          {!hasBids && (
            <p>{isAuctionOpen ? "No bids yet" : "No winning bid"}</p>
          )}

          {auction.bids.map((bid) => {
            const canDeleteLatestBid =
              isAuctionOpen &&
              latestBid?.id === bid.id &&
              bid.userId === userId;

            return (
              <div key={bid.id}>
                <p>
                  {bid.amount} kr by {bid.userName}
                </p>
                <p>{formatDateTime(bid.createdAt)}</p>

                {canDeleteLatestBid && (
                  <button onClick={handleDeleteLatestBid}>
                    Delete latest bid
                  </button>
                )}
              </div>
            );
          })}
        </>
      )}
      {shouldShowSignInMessage && <p>Sign in to place a bid.</p>}

      {shouldShowOwnerMessage && <p>You cannot bid on your own auction.</p>}

      {shouldShowBidForm && (
        <BidForm auctionId={auction.id} onBidCreated={fetchAuction} />
      )}
    </div>
  );
};

export default AuctionDetailsView;
