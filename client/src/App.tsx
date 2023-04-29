import { Provider } from "react-redux";
import { AppRoute } from "./AppRoute";
import { store } from "./redux/Store";

function App() {
  return (
    <div>
      <Provider store={store}>
        <AppRoute />
      </Provider>
    </div>
  );
}

export default App;
