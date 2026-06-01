import "./BidForm.css";
import { useState } from "react";
import { createBid } from "../../services/BidService";
import toast from "react-hot-toast";

type BidFormProps = {
  auctionId: string;
  onBidCreated: () => void;
};

const BidForm = ({ auctionId, onBidCreated }: BidFormProps) => {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleCreateBid = async () => {
    const bidAmount = Number(amount);

    if (!Number.isInteger(bidAmount) || bidAmount < 1) {
      toast.error("Bid amount must be a whole number greater than 0.");
      return;
    }

    const result = await createBid(auctionId, {
      amount: bidAmount,
    });

    setMessage(result.message);

    if (result.success) {
      toast.success("Bid placed");

      setAmount("");
      onBidCreated();
    }
  };

  return (
    <div>
      <input
        type="number"
        min="1"
        step="1"
        placeholder="Enter bid amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button
        className="bid-form-button"
        disabled={!amount}
        onClick={handleCreateBid}
      >
        Place bid
      </button>

      {message && <p>{message}</p>}
    </div>
  );
};

export default BidForm;
