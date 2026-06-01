import image1 from "../assets/Image1.png";
import image2 from "../assets/Image2.png";
import image3 from "../assets/Image3.png";
import image4 from "../assets/Image4.png";

const auctionImages = [image1, image2, image3, image4];

export const getAuctionImage = (auctionId: string) => {
  const characterSum = auctionId
    .split("")
    .reduce((sum, character) => sum + character.charCodeAt(0), 0);

  const imageIndex = characterSum % auctionImages.length;

  return auctionImages[imageIndex];
};
