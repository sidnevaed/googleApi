import {
  Col,
  Row,
  Form,
  FormControl,
  FormSelect,
  FormGroup,
  FormLabel,
  InputGroup,
  Button,
} from "react-bootstrap";
import { useState } from "react";
import { useAppDispatch } from "../store/hooks";
import { getBooksItems } from "../store/booksSlice";
import {
  CATEGORY_SELECT_OPTIONS,
  SORT_SELECT_OPTIONS,
} from "../constants/forms";
import { FormValuesProps } from "../interfaces/interfaces";
import { useNavigate } from "react-router-dom";

export const SearchForm = () => {
  const initialState: FormValuesProps = {
    searchTerm: "",
    category: "",
    sort: "relevance",
    page: 0,
  };

  const [values, setValues] = useState(initialState);
  const [isInvalid, setIsInvalid] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;

    setValues({ ...values, [name]: value });
    setIsInvalid(false);

    console.log(values);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    if (values.searchTerm === "") {
      setIsInvalid(true);
      return;
    }

    try {
      await dispatch(getBooksItems(values)).unwrap();
      navigate("books");
    } catch (rejectedValueOrSerializedError: unknown) {
      if (rejectedValueOrSerializedError instanceof Error)
        alert(rejectedValueOrSerializedError.message);
      throw rejectedValueOrSerializedError;
    }
  };

  return (
    <>
      <Form onSubmit={submitHandler}>
        <FormGroup className="mt-2">
          <Row className="justify-content-center ">
            <Col md={4}>
              <InputGroup>
                <FormControl
                  isInvalid={isInvalid}
                  name="searchTerm"
                  value={values.searchTerm}
                  onChange={handleChange}
                  placeholder="Поиск..."
                />

                {isInvalid ? (
                  <FormControl.Feedback tooltip type="invalid">
                    Поле обязательно для заполнения
                  </FormControl.Feedback>
                ) : null}
                <Button
                  id="submit-button"
                  size="sm"
                  variant="warning"
                  type="submit"
                >
                  Искать
                </Button>
              </InputGroup>
            </Col>
          </Row>
        </FormGroup>
        <FormGroup className="mt-2 ">
          <Row className="justify-content-center">
            <Col className="me-2" xs md={2}>
              <FormLabel className="text-white">Категории:</FormLabel>
              <FormSelect
                onChange={handleChange}
                value={values.category}
                name="category"
                size="sm"
              >
                {CATEGORY_SELECT_OPTIONS.map(({ name, value }, index) => (
                  <option key={index} value={value}>
                    {name}
                  </option>
                ))}
              </FormSelect>
            </Col>
            <Col className="ms-2" xs md={2}>
              <FormLabel className="text-white">Сортировать по:</FormLabel>
              <FormSelect
                onChange={handleChange}
                value={values.sort}
                name="sort"
                size="sm"
              >
                {SORT_SELECT_OPTIONS.map(({ name, value }, index) => (
                  <option key={index} value={value}>
                    {name}
                  </option>
                ))}
              </FormSelect>
            </Col>
          </Row>
        </FormGroup>
      </Form>
    </>
  );
};
