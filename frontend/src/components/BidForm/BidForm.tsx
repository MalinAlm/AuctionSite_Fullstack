import "./BidForm.css";
import { useState } from "react";
import { createBid } from "../../services/BidService";

type BidFormProps = {
  auctionId: string;
  onBidCreated: () => void;
};

const BidForm = ({ auctionId, onBidCreated }: BidFormProps) => {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");

  const handleCreateBid = async () => {
    const result = await createBid(auctionId, {
      amount: Number(amount),
    });

    setMessage(result.message);

    if (result.success) {
      setAmount("");
      onBidCreated();
    }
  };

  return (
    <div>
      <input
        type="number"
        placeholder="Enter bid amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <button onClick={handleCreateBid}>Place bid</button>

      {message && <p>{message}</p>}
    </div>
  );
};

export default BidForm;
