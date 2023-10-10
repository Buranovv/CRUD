import Card from "react-bootstrap/Card";

import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

const CategoryCard = ({ id, name, image, editCategory, deleteCategory }) => {
  return (
    <Card>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Button
          onClick={() => editCategory(id)}
          className="btns me-1"
          variant="primary"
        >
          Edit
        </Button>
        <Button
          onClick={() => deleteCategory(id)}
          className="btns"
          variant="danger"
        >
          Delete
        </Button>
        <Link className="btn btn-warning mt-2 w-100" to={`/${id}`}>
          See products
        </Link>
      </Card.Body>
    </Card>
  );
};

CategoryCard.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  image: PropTypes.string,
  editCategory: PropTypes.func,
  deleteCategory: PropTypes.func,
};

export default CategoryCard;
