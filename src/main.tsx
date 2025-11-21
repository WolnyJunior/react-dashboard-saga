import ReactDOM from 'react-dom/client'
import AppRoutes from "./routes/AppRoutes";
import { Provider } from "react-redux";
import { store } from './store/store'

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <AppRoutes />
  </Provider>
)
