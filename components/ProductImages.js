import { useState } from "react";
import styled from "styled-components";
import css from "styled-jsx/css";

const Box = styled.div`
  height: 150px;
  max-height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Image = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const ImageButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
`;

const ImageButton = styled.div`
  justify-content: center;
  align-items: center;
  /* background-color: #ccc; */
  border: 1px solid transparent;
  border-radius: 5px;
  height: 60px;
  padding: 3px;
  cursor: pointer;
  opacity: 0.6;
  ${(props) =>
    props.active &&
    css`
      border: 1px solid blue;
      opacity: 1;
    `};
`;

export default function ProductImages({ images, title }) {
  const [showedImage, setShowedImage] = useState(images?.[0]);

  return (
    <>
      <Box>
        <Image src={showedImage} style={{ maxWidth: "100%" }} />
      </Box>
      <ImageButtons>
        {images?.map((image, i) => (
          <ImageButton
            key={image}
            onClick={() => {
              setShowedImage(image);
            }}
            active={showedImage === image}
          >
            <Image src={image} alt={`${title}[${i}]`} />
          </ImageButton>
        ))}
      </ImageButtons>
    </>
  );
}
