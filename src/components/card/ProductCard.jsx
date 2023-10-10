import Card from "react-bootstrap/Card";

import PropTypes from "prop-types";

const ProductCard = ({ id, name, image, description, price }) => {
  console.log(id);
  return (
    <Card>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>{description}</Card.Text>
        <Card.Text>${price}</Card.Text>
      </Card.Body>
    </Card>
  );
};

ProductCard.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  image: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.string,
};

export default ProductCard;
