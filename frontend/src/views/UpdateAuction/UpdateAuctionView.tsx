import { useNavigate, useParams } from "react-router";
import "../CreateAuction/CreateAuctionView.css";
import { useEffect, useState } from "react";
import { getAuctionById, updateAuction } from "../../services/AuctionService";
import toast from "react-hot-toast";

const UpdateAuctionView = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startingPrice, setStartingPrice] = useState("");
  const [startsAt, setStartsAt] = useState("");
  const [endsAt, setEndsAt] = useState("");
  const [hasBids, setHasBids] = useState(false);

  useEffect(() => {
    const fetchAuction = async () => {
      if (!id) return;

      try {
        const auction = await getAuctionById(id);

        setTitle(auction.title);
        setDescription(auction.description);
        setStartingPrice(String(auction.startingPrice));
        setStartsAt(auction.startsAt.slice(0, 16));
        setEndsAt(auction.endsAt.slice(0, 16));
        setHasBids(auction.bids.length > 0);
      } catch {
        toast.error("Could not load auction.");
      }
    };

    fetchAuction();
  }, [id]);

  const handleUpdateAuction = async () => {
    if (!id) return;

    const selectedStartingPrice = Number(startingPrice);
    const selectedStartDate = new Date(startsAt);
    const selectedEndDate = new Date(endsAt);

    if (selectedStartingPrice < 1) {
      toast.error("Startingprice must be at least 1 kr");
    }

    if (selectedEndDate <= selectedStartDate) {
      toast.error("End date must be after start date");
    }

    const success = await updateAuction(id, {
      title,
      description,
      startingPrice: selectedStartingPrice,
      startsAt,
      endsAt,
    });

    if (success) {
      toast.success("Auction updated");

      navigate(`/auction/${id}`);
      return;
    }

    toast.error("Could not update auction");
  };

  return (
    <div className="create-auction-container">
      <h1>Update Auction</h1>

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
        disabled={hasBids}
        onChange={(event) => setStartingPrice(event.target.value)}
      />

      {hasBids && <p>Starting price cannot be changed because bids exist.</p>}

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

      <button onClick={handleUpdateAuction}>Update auction</button>
    </div>
  );
};

export default UpdateAuctionView;
