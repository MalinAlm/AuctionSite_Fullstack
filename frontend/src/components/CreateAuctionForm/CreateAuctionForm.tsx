import { useState } from "react";
import "./CreateAuctionForm.css";
import { useNavigate } from "react-router";
import { createAuction } from "../../services/AuctionService";
import toast from "react-hot-toast";

const CreateAuctionForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startingPrice, setStartingPrice] = useState("");
  const [startsAt, setStartsAt] = useState("");
  const [endsAt, setEndsAt] = useState("");

  const navigate = useNavigate();

  const handleCreateAuction = async () => {
    const now = new Date();
    const selectedStartDate = new Date(startsAt);
    const selectedEndDate = new Date(endsAt);
    const selectedStartingPrice = Number(startingPrice);

    if (selectedStartingPrice < 1) {
      toast.error("Starting price must be at least 1 kr.");
      return;
    }

    if (selectedStartDate < now) {
      toast.error("Start date cannot be in the past.");
      return;
    }

    if (selectedEndDate <= selectedStartDate) {
      toast.error("End date must be after start date.");
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
      toast.success("Auction created");

      navigate("/");
      return;
    }

    toast.error("Could not create auction.");
  };
  return (
    <div className="create-auction-container">
      <p>Fill in the form to create an auction</p>

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
    </div>
  );
};

export default CreateAuctionForm;
