import "./AuctionCard.css";

const AuctionCard = () => {
  return (
    <div className="auction-card-container">
      <div>
        <h3>Här ligger en bild på varan</h3>
        <img src="" alt="" />
      </div>
      <div>
        <h4>Auktionsrubrik</h4>
        <p>Beskrivande text om föremål som säljs</p>
        <p>Slutar datum/tid</p>
        <p>Utropspris</p>
        <p>Nuvarande bud</p>
        <input type="text" placeholder="Type in your bid" />
        <button>Place bid</button>
      </div>
    </div>
  );
};

export default AuctionCard;
