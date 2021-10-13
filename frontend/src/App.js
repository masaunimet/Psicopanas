import "./styles/App.css";
import Header from "./components/header/Header";
import { BrowserRouter, Route } from "react-router-dom";
import LandingPage from "./screens/landingPage/LandingPage";
import Diario from "./screens/diaryPage/Diario";
import LoginPage from "./screens/loginPage/LoginPage";
import RegisterPage from "./screens/registerPage/RegisterPage";

const App = () => (
  <>
    <BrowserRouter>
      <Header />
      <main>
        <Route path="/" component={LandingPage} exact />
        <Route path="/login" component={LoginPage} exact />
        <Route path="/registro" component={RegisterPage} exact />
        <Route path="/diario" component={Diario} exact />
      </main>
    </BrowserRouter>
  </>
);

export default App;
