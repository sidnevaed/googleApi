import React from "react";
import { Container, Row } from "react-bootstrap";
import { SearchForm } from "./SearchForm";
import "./Header.scss";

const Header = () => {
  return (
    <Container fluid className="header shadow-lg">
      <Row>
        <div className="text-decoration-none text-reset">
          <h1 className="text-center text-white fw-bold mt-3">Поиск книг</h1>
        </div>
      </Row>
      <SearchForm />
    </Container>
  );
};

export default Header;
