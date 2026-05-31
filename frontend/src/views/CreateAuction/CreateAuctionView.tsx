import CreateAuctionForm from "../../components/CreateAuctionForm/CreateAuctionForm";
import "./CreateAuctionView.css";

const CreateAuctionView = () => {
  return (
    <div className="create-auction-view-container">
      <h1>Create auction</h1>
      <CreateAuctionForm />
    </div>
  );
};

export default CreateAuctionView;
