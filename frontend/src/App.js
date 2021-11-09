import "./styles/App.css";
import Header from "./components/header/Header";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "./screens/landingPage/LandingPage";
import Diario from "./screens/diaryPage/Diario";
import LoginPage from "./screens/loginPage/LoginPage";
import RegisterPage from "./screens/registerPage/RegisterPage";
import CreateEntryPage from "./screens/createEntryPage/CreateEntryPage";
import UpdateEntryPage from "./screens/updateEntryPage/UpdateEntryPage";
import DiaryConfigPage from "./screens/diaryConfigPage/DiaryConfigPage";
import AuthDiaryPage from "./screens/authDiaryPage.js/AuthDiaryPage";
import Estadisticas from "./screens/Estadisticas/Estadisticas";
import MessageConfigDiaryPage from "./screens/messagePage.js/MessageConfigDiaryPage";
import MessageBadStreak from "./screens/messagePage.js/MessageBadStreak";
import Message404 from "./screens/messagePage.js/Message404";
import PaySreen from "./screens/PayScreen/paidScreen";
import ProfilePage from "./screens/profilePage/ProfilePage";
import UpdateProfilePage from "./screens/updateProfilePage/UpdateProfilePage";
import AdminPage from "./screens/adminPage.js/AdminPage";
import UserUpdateFromAdmin from "./screens/userUpdateFromAdmin/UserUpdateFromAdmin";
import PagoExitoso from "./screens/messagePage.js/PagoExitoso";

import MessagePositive from "./screens/messagePage.js/MessagePositive";
import MessagePositive2 from "./screens/messagePage.js/MessagePositive2";
import MessagePositive3 from "./screens/messagePage.js/MessagePositive3";

import MessageSad from "./screens/messagePage.js/MessageSad";
import MessageSad2 from "./screens/messagePage.js/MessageSad2";
import MessageSad3 from "./screens/messagePage.js/MessageSad3";

import MessageHappy from "./screens/messagePage.js/MessageHappy";
import MessageHappy2 from "./screens/messagePage.js/MessageHappy2";
import MessageHappy3 from "./screens/messagePage.js/MessageHappy3";

import MessageVeryHappy from "./screens/messagePage.js/MessageVeryHappy";
import MessageVeryHappy2 from "./screens/messagePage.js/MessageVeryHappy2";
import MessageVeryHappy3 from "./screens/messagePage.js/MessageVeryHappy3";

import MessageBadStreak2 from "./screens/messagePage.js/MessageBadStreak2";
import MessageBadStreak3 from "./screens/messagePage.js/MessageBadStreak3";
import GoalsPage from "./screens/goalsPage/GoalsPage";

const App = () => (
  <>
    <Router>
      <Header />
      <Switch>
        <Route path="/" component={LandingPage} exact />
        <Route path="/login" component={LoginPage} exact />
        <Route path="/registro" component={RegisterPage} exact />
        <Route path="/diario" component={Diario} exact />
        <Route path="/crearEntrada" component={CreateEntryPage} exact />
        <Route path="/diario/:id" component={UpdateEntryPage} exact />
        <Route path="/ajustes-diario" component={DiaryConfigPage} exact />
        <Route path="/authDiario" component={AuthDiaryPage} exact />
        <Route path="/estadisticas" component={Estadisticas} exact />
        <Route path="/pagos" component={PaySreen} exact />
        <Route path="/perfil" component={ProfilePage} exact />
        <Route path="/modificarPerfil" component={UpdateProfilePage} exact />
        <Route path="/admin" component={AdminPage} exact />
        <Route path="/admin/:id" component={UserUpdateFromAdmin} exact />
        <Route
          path="/mensaje-configurar-diario"
          component={MessageConfigDiaryPage}
          exact
        />

        <Route path="/metas" component={GoalsPage} exact />

        <Route path="/mensaje_enviado" component={PagoExitoso} exact />
        <Route path="/mensaje-racha" component={MessageBadStreak} exact />
        <Route path="/mensaje-racha2" component={MessageBadStreak2} exact />
        <Route path="/mensaje-racha3" component={MessageBadStreak3} exact />

        <Route path="/mensaje-positivo" component={MessagePositive} />
        <Route path="/mensaje-positivo2" component={MessagePositive2} />
        <Route path="/mensaje-positivo3" component={MessagePositive3} />

        <Route path="/mensaje-triste" component={MessageSad} />
        <Route path="/mensaje-triste2" component={MessageSad2} />
        <Route path="/mensaje-triste3" component={MessageSad3} />

        <Route path="/mensaje-feliz" component={MessageHappy} />
        <Route path="/mensaje-feliz2" component={MessageHappy2} />
        <Route path="/mensaje-feliz3" component={MessageHappy3} />

        <Route path="/mensaje-muy-feliz" component={MessageVeryHappy} />
        <Route path="/mensaje-muy-feliz2" component={MessageVeryHappy2} />
        <Route path="/mensaje-muy-feliz3" component={MessageVeryHappy3} />

        <Route path="*" component={Message404} />
      </Switch>
    </Router>
  </>
);

export default App;
