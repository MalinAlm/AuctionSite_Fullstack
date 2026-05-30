import "./CreateAuctionView.css";
import { useState } from "react";
import { createAuction } from "../../services/AuctionService";
import { useNavigate } from "react-router";

const CreateAuctionView = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startingPrice, setStartingPrice] = useState("");
  const [startsAt, setStartsAt] = useState("");
  const [endsAt, setEndsAt] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleCreateAuction = async () => {
    const now = new Date();
    const selectedStartDate = new Date(startsAt);
    const selectedEndDate = new Date(endsAt);
    const selectedStartingPrice = Number(startingPrice);

    if (selectedStartingPrice < 1) {
      setMessage("Starting price must be at least 1 kr.");
      return;
    }

    if (selectedStartDate < now) {
      setMessage("Start date cannot be in the past.");
      return;
    }

    if (selectedEndDate <= selectedStartDate) {
      setMessage("End date must be after start date.");
      return;
    }

    const success = await createAuction({
      title,
      description,
      startingPrice: selectedStartingPrice,
      startsAt,
      endsAt,
    });

    if (success) {
      navigate("/");
      return;
    }

    setMessage("Could not create auction.");
  };

  return (
    <div className="create-auction-container">
      <h1>Create Auction</h1>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
      />

      <input
        type="number"
        min="1"
        placeholder="Starting price"
        value={startingPrice}
        onChange={(event) => setStartingPrice(event.target.value)}
      />

      <input
        type="datetime-local"
        value={startsAt}
        onChange={(event) => setStartsAt(event.target.value)}
      />

      <input
        type="datetime-local"
        value={endsAt}
        onChange={(event) => setEndsAt(event.target.value)}
      />

      <button onClick={handleCreateAuction}>Create auction</button>

      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateAuctionView;
