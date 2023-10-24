import { CardsList } from "../components/CardsList";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import Loader from "../components/Loader";
import { Button, Container } from "react-bootstrap";
import { MAX_RESULTS } from "../constants/api";
import { getBooksItems } from "../store/booksSlice";

export const CardPage = () => {
  const dispatch = useAppDispatch();
  const { items, status, loadedItems, isButtonLoading, searchStructure } =
    useAppSelector((state) => state.volumeList);

  const currentPage = searchStructure.page;
  const nextPage = currentPage + 1;

  const possibleCount = nextPage * MAX_RESULTS;

  const clickHandler = async () => {
    try {
      await dispatch(getBooksItems({ ...searchStructure, page: nextPage }));
    } catch (rejectedValueOrSerializedError: unknown) {
      if (rejectedValueOrSerializedError instanceof Error)
        alert(rejectedValueOrSerializedError.message);
      throw rejectedValueOrSerializedError;
    }
  };

  return (
    <>
      <Container className="mb-5">
        {status === "loading" && <Loader />}
        {status === "succeeded" && (
          <div>
            <div className="mt-3 text-center fw-bold">
              Найдено всего: {loadedItems}
            </div>
            <CardsList books={items}></CardsList>
            {loadedItems > 0 && (
              <Button
                onClick={clickHandler}
                disabled={isButtonLoading || loadedItems <= possibleCount}
                className="px-5 mt-3 mb-5"
                variant="outline-warning"
              >
                {isButtonLoading ? "Загрузка..." : "Загрузить ещe..."}
              </Button>
            )}
          </div>
        )}

        {status === "failed" && (
          <h1 className="text-center text-white fw-bold mt-3">
            Ошибка! Не получилось получить список книг
          </h1>
        )}
      </Container>
    </>
  );
};
