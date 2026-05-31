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
          <h2 className="auction-details-heading">{auction.title}</h2>
          <div className="auction-desctiption">
            <h4>Beskrivning</h4>
            <p>{auction.description}</p>
          </div>
          <div>
            <p>
              Created by: <b>{auction.userName} </b>
            </p>
            <p>
              Starting price: <b>{auction.startingPrice} kr</b>{" "}
            </p>

            <p>Starts at: {formatDateTime(auction.startsAt)}</p>
            <p>Ends at: {formatDateTime(auction.endsAt)}</p>
          </div>

          {canEditAuction && (
            <NavLink to={`/auction/${auction.id}/edit`}>Edit auction</NavLink>
          )}

          {shouldShowClosedMessage && <p>This auction is closed.</p>}

          <h2>{isAuctionOpen ? "Bids" : "Winning bid"}</h2>

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
                  <b>{bid.amount} kr </b> by {bid.userName}
                </p>
                <p>{formatDateTime(bid.createdAt)}</p>

                {canDeleteLatestBid && (
                  <button
                    className="delete-bid-button"
                    onClick={handleDeleteLatestBid}
                  >
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
