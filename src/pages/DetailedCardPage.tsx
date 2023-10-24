import { useAppSelector } from "../store/hooks";
import Loader from "../components/Loader";
import { SingleCard } from "../components/SingleCard";

export const DetailedCardPage = () => {
  const { items, status } = useAppSelector((state) => state.volumeList);

  return (
    <>
      {status === "loading" && <Loader />}
      {status === "succeeded" && <SingleCard books={items} />}
      {status === "failed" && (
        <h1 className="text-center text-white fw-bold mt-3">
          Ошибка! Не получилось получить книгу
        </h1>
      )}
    </>
  );
};
