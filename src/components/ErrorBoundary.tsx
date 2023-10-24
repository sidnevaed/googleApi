import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

export const ErrorBoundary = () => {
  const error = useRouteError();
  const { title, message } = getErrorContents(error);

  return (
    <Alert variant="danger">
      <Alert.Heading>
        <h1 className="text-center text-white fw-bold mt-3">{title}</h1>
      </Alert.Heading>
      <p className="text-center">{message}</p>
    </Alert>
  );

  function getErrorContents(error: unknown) {
    const defaultTitle = "Произошла ошибка!";
    const defaultMessage = "Что-то пошло не так!";
    if (isRouteErrorResponse(error)) {
      switch (error.status) {
        case 500:
          return {
            title: defaultTitle,
            message: "Проблема с сервером. Попробуйте перезагрузиться",
          };
        case 404:
          return {
            title: "Не найдено!",
            message: "Невозможно найти страницу или ресурс.",
          };
        default:
          return {
            title: defaultTitle,
            message: defaultMessage,
          };
      }
    } else throw error;
  }
};
