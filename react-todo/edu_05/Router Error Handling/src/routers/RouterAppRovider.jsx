import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "../Components/main/Main";
import TaskMain from "../Components/tasks/TaskMain";
import MainLayout from "../Components/layout/MainLayout";
import NotFound from "../Components/layout/NotFound";
/**
 * import
 * - 중괄호가 있는것 : export default ~~ <<<<--- 대표가 되는 컴포넌트, 상수, 함수등을 공개시키는 것
 * - 중괄호 없는 것 : export <<<<--- default 없음!
 */

const RouterAppProvider = () => {
  const routers = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      errorElement: <NotFound />,
      children: [
        { path: "", element: <Main /> },
        { path: "todo", element: <TaskMain /> },
      ],
    },
  ]); // -- router를 사용하기 위해 호출한 것

  return <RouterProvider router={routers} />; // -- Router는 react-router-dom에 있는 것 사용
};

export default RouterAppProvider;
