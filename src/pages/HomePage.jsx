import { Fragment, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Col, Form, InputGroup, Modal, Row } from "react-bootstrap";
import { yupResolver } from "@hookform/resolvers/yup";

import CategoryCard from "../components/card/CategoryCard";
import Loader from "../shares/loading/Loader";
import categorySchema from "../schemas/categorySchema";
import request from "../server";
import { toast } from "react-toastify";
// import useFetchPaginition from "../hook/useFetchPaginition";
import useFetch from "../hook/useFetch";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(null);

  const params = JSON.stringify({ search });

  const { data: categories, loading, reFetch } = useFetch("categories", params);

  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(categorySchema),
  });

  const modalClose = () => setShow(false);
  const modalShow = () => {
    setShow(true);
    setSelected(null);
    reset({ name: "", image: "" });
  };

  const onSubmit = async (data) => {
    try {
      if (selected === null) {
        await request.post("categories", data);
        toast.success("Added succesfully!");
      } else {
        await request.put(`categories/${selected}`, data);
        toast.info("Edited succesfully!");
      }
      modalClose();
      reFetch();
    } catch (err) {
      toast.error(err.response.statusText);
    }
  };

  const editCategory = async (id) => {
    try {
      setSelected(id);
      setShow(true);
      let { data } = await request.get(`categories/${id}`);
      reset(data);
      console.log(data);
    } catch (err) {
      toast.error("Deleted succesfully!");
    }
  };

  const deleteCategory = async (id) => {
    let deleteConfirm = confirm("You want to delete this category?");
    if (deleteConfirm) {
      await request.delete(`categories/${id}`);
      reFetch();
      toast.info("Deleted succesfully!");
    }
  };

  return (
    <Fragment>
      <div className="container">
        <InputGroup className="my-3">
          <Form.Control
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Category search..."
          />
          <Button variant="outline-primary" onClick={modalShow}>
            Add category
          </Button>
        </InputGroup>
        <Row xs={1} sm={2} md={3} lg={4}>
          {loading ? (
            <Loader />
          ) : (
            categories.map((category) => (
              <Col className="mb-4" key={category.id}>
                <CategoryCard
                  {...category}
                  editCategory={editCategory}
                  deleteCategory={deleteCategory}
                />
              </Col>
            ))
          )}
        </Row>
        <Modal show={show} onHide={modalClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3" controlId="validationCustom01">
                <Form.Label>Category name</Form.Label>
                <Form.Control
                  {...register("name")}
                  type="text"
                  placeholder="Category name"
                />
                {errors.name ? (
                  <p className="text-danger">{errors.name?.message}</p>
                ) : null}
              </Form.Group>
              <Form.Group className="mb-3" controlId="validationCustom01">
                <Form.Label>Image url</Form.Label>
                <Form.Control
                  {...register("image")}
                  type="text"
                  placeholder="Url"
                />
                {errors.image ? (
                  <p className="text-danger">{errors.image?.message}</p>
                ) : null}
              </Form.Group>
              <Button type="submit" variant="primary">
                {selected === null ? "Add" : "Save"} category
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>
    </Fragment>
  );
};

export default HomePage;
