// App.js

import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import store from "./store";
import router from "./router";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <Provider store={store}>
        <ToastContainer position="top-center" />

        <RouterProvider router={router} />
      </Provider>
    </>
  );
};

export default App;
