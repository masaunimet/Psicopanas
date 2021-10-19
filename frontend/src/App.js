import "./styles/App.css";
import Header from "./components/header/Header";
import { BrowserRouter, Route } from "react-router-dom";
import LandingPage from "./screens/landingPage/LandingPage";
import Diario from "./screens/diaryPage/Diario";
import LoginPage from "./screens/loginPage/LoginPage";
import RegisterPage from "./screens/registerPage/RegisterPage";
import CreateEntryPage from "./screens/createEntryPage/CreateEntryPage";
import UpdateEntryPage from "./screens/updateEntryPage/UpdateEntryPage";
import DiaryConfigPage from "./screens/diaryConfigPage/DiaryConfigPage";
import AuthDiaryPage from "./screens/authDiaryPage.js/AuthDiaryPage";
import CreateEntryPage from "./screens/createEntryPage.js/CreateEntryPage";
import UpdateEntryPage from "./screens/updateEntryPage.js/UpdateEntryPage";
import Estadisticas from "./screens/Estadisticas/Estadisticas";

const App = () => (
  <>
    <BrowserRouter>
      <Header />
      <main>
        <Route path="/" component={LandingPage} exact />
        <Route path="/login" component={LoginPage} exact />
        <Route path="/registro" component={RegisterPage} exact />
        <Route path="/diario" component={Diario} exact />
        <Route path="/crearEntrada" component={CreateEntryPage} exact />
        <Route path="/diario/:id" component={UpdateEntryPage} exact />
        <Route path="/ajustes-diario" component={DiaryConfigPage} exact />
        <Route path="/authDiario" component={AuthDiaryPage} exact />
        <Route path="/estadisticas" component={Estadisticas} exact />
      </main>
    </BrowserRouter>
  </>
);

export default App;
