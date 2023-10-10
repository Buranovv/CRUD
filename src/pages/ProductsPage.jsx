import { Fragment, useState } from "react";
import { Col, Form, InputGroup, Row } from "react-bootstrap";
import ProductCard from "../components/card/ProductCard";
import Loader from "../shares/loading/Loader";
import { useParams } from "react-router-dom";
// import useFetch from "../hook/useFetch";
import useFetchPaginition from "../hook/useFetchPaginition";

const ProductsPage = () => {
  const { categoryId } = useParams();
  const [search, setSearch] = useState("");

  const params = JSON.stringify({ search });

  const { data: products, loading } = useFetchPaginition(
    `categories/${categoryId}/products`,
    params
  );

  return (
    <Fragment>
      <div className="container">
        <InputGroup className="my-3">
          <Form.Control
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Product search..."
          />
          <InputGroup.Text>
            <Form.Select aria-label="Default select example">
              <option>Sort by price</option>
              <option value="low">Low to high</option>
              <option value="high">High to low</option>
            </Form.Select>
          </InputGroup.Text>
        </InputGroup>
        <Row xs={1} sm={2} md={3} lg={4}>
          {loading ? (
            <Loader />
          ) : (
            products.map((pr) => (
              <Col className="mb-4" key={pr.id}>
                <ProductCard {...pr} />
              </Col>
            ))
          )}
        </Row>
      </div>
    </Fragment>
  );
};

export default ProductsPage;
