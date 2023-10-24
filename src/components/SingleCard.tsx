import { useNavigate, useParams } from "react-router-dom";
import { Container, Col, Button, Row, Image } from "react-bootstrap";
import { Items } from "../interfaces/interfaces";

export const SingleCard = ({ books }: { books: Items[] }) => {
  const navigate = useNavigate();

  const { id } = useParams();

  const oneBook = books.find((book) => book.id === id);
  if (oneBook === undefined) {
    throw new Error(`No book was found with ${id}`);
  }

  const authors = oneBook.volumeInfo.authors?.join(", ");
  const img = oneBook.volumeInfo.imageLinks?.thumbnail;
  const title = oneBook.volumeInfo.title;
  const categories = oneBook.volumeInfo.categories;
  const description = oneBook.volumeInfo.description;

  const handleOnClick = () => {
    navigate("/");
  };

  return (
    <Container>
      <Row xs={1} md={2} className="mt-5">
        <Col className="p-3 d-flex justify-content-center img-container">
          <Image className="shadow" src={img} alt={title}></Image>
        </Col>
        <Col className="pt-2 px-5">
          <div className="fw-light mb-3">{categories}</div>
          <h3 className="mb-2">{title}</h3>
          <div className="fw-lighter text-decoration-underline mb-2">
            {authors}
          </div>
          <p className={`fw-light ${description && "border"} rounded p-2`}>
            {description}
          </p>
        </Col>
      </Row>
      <div className="text-center">
        <Button
          onClick={handleOnClick}
          className="px-3 mt-5 mb-5"
          variant="warning"
        >
          Вернуться на главную
        </Button>
      </div>
    </Container>
  );
};
