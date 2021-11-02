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
import MessagePositive from "./screens/messagePage.js/MessagePositive";
import MessageSad from "./screens/messagePage.js/MessageSad";
import MessageHappy from "./screens/messagePage.js/MessageHappy";
import MessageVeryHappy from "./screens/messagePage.js/MessageVeryHappy";


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
        
        <Route path="/mensaje-racha" component={MessageBadStreak} exact />
        <Route path="/mensaje-positivo" component={MessagePositive} />
        <Route path="/mensaje-triste" component={MessageSad} />
        <Route path="/mensaje-feliz" component={MessageHappy} />
        <Route path="/mensaje-muy-feliz" component={MessageVeryHappy} />

        <Route path="*" component={Message404} />
        
      </Switch>
    </Router>
  </>
);

export default App;
