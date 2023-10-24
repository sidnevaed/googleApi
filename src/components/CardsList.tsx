import React from "react";
import { Link } from "react-router-dom";
import "./CardsList.scss";
import { Row, Col, Card } from "react-bootstrap";
import { Items } from "../interfaces/interfaces";

export const CardsList = ({ books }: { books: Items[] }) => {
  return (
    <Row xs={1} md={2} lg={3} xl={4} className="g-4 mt-3">
      {books?.length > 0 ? (
        books.map((book) => {
          const authors = book.volumeInfo.authors?.join(", ");
          const img = book.volumeInfo.imageLinks?.thumbnail;
          const title = book.volumeInfo.title;
          const firstCategory = book.volumeInfo.categories?.[0];

          return (
            <Col key={book.id}>
              <Card bg="light">
                <div className="card-img-container d-flex justify-content-center p-5">
                  <Link
                    to={`/books/${book.id}`}
                    className="text-decoration-none"
                  >
                    <Card.Img className="shadow" src={img} alt={title} />
                  </Link>
                </div>
                <Card.Body>
                  <Card.Subtitle className="fw-light text-decoration-underline my-2">
                    {firstCategory}
                  </Card.Subtitle>
                  <Card.Title>{title}</Card.Title>
                </Card.Body>
                <div className="footer">
                  <Card.Text className="fw-light">{authors}</Card.Text>
                </div>
              </Card>
            </Col>
          );
        })
      ) : (
        <div>Нет книг по заданному запросу.</div>
      )}
    </Row>
  );
};
