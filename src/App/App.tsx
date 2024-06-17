import { Provider } from "react-redux";
import Body from "../modules/body/Body";
import "./index.css";
import appStore from "../modules/redux/appStore";

function App() {
  return <Provider store={appStore}><Body /></Provider>;
}

export default App;
