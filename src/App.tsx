import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { CardPage } from "./pages/CardPage";
import { DetailedCardPage } from "./pages/DetailedCardPage";
import { ErrorBoundary } from "./components/ErrorBoundary";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    index: true,
    errorElement: <ErrorBoundary />,
  },

  {
    path: "books/",
    element: <CardPage />,
    errorElement: <ErrorBoundary />,
  },

  {
    path: "books/:id",
    element: <DetailedCardPage />,
    errorElement: <ErrorBoundary />,
  },
]);

export const App = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};
