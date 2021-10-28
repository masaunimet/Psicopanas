import React,{ useState, useEffect } from "react";
import emailjs from "emailjs-com";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Form} from "react-bootstrap";
import MainScreen from "../../components/mainscreen/MainScreen";

const PaySreen = ({ history }) => {

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const [nombre, setnombre] = useState("");
    const [email, setEmail] = useState("");
    const [telefono, settelefono] = useState("");
    const [foto, setFoto] = useState("");
    const [loading,setloading]=useState(false);

    useEffect(() => {
        if (!userInfo) {
          history.push("/");
        }
    });

    const sendEmail = (e) => {

        e.preventDefault();
    
        emailjs.send('service_tcenvkb', 'template_8lzky6r', {
            nombre: nombre,
            id_user:userInfo._id,
            email: email,
            telefono: telefono,
            comprobante: foto,}
        , 'user_5YxUS0Avd5jMNvVqxzLkf')
          .then((result) => {
              alert(result.text);
          }, (error) => {
            alert(error.text);
          });

          e.target.reset();
      };

    const uploadImage = async e => {

        const data = new FormData()
        data.append('file', e)
        data.append('upload_preset', 'Comprobantes fotos')
        setloading(true)
        const res = await fetch(
          '	https://api.cloudinary.com/v1_1/dufc61kxr/image/upload',
          {
            method: 'POST',
            body: data
          }
        )
        const file = await res.json()
    
        setFoto(file.secure_url)
        setloading(false)
      }

    return(
        <MainScreen title="Pago Premium">
            <Card
            style={{
              background: "white",
              border: "none",
            }}>
                <Card.Body>
                    <Form onSubmit={sendEmail}> 
                    <Form.Group controlId="title">
                        <Form.Label >Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Marco Polo"
                            value={nombre}
                            onChange={(e) => setnombre(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="title">
                        <Form.Label >Correo electronico</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="correo@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="title">
                        <Form.Label >telefono</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="04## 222 2222"
                            value={telefono}
                            onChange={(e) => settelefono(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group controlId="formFileMultiple" className="mb-3">
                        <Form.Label>Foto del pago</Form.Label>
                        <Form.Control type="file" name="file" onChange={(e) => uploadImage(e.target.files[0])}/>
                    </Form.Group>

                    {loading ? (

                        <p>loading</p>
                    ):
                        <Button variant="primary" type="submit">
                        Enviar comprobante
                        </Button>
                    }
                    </Form>  
                </Card.Body>
            </Card>
        </MainScreen>
    );
};

export default PaySreen;