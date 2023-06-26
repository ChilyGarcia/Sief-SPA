import swal from "sweetalert";
import views from "../views/home.html";

import axios from "axios";

const cors = require("cors");

export default () => {
  const divElement = document.createElement("div");
  divElement.innerHTML = views;
  divElement.classList = "text-white";

  /*    Esto es para obtener el click de un boton y darle evento
  const btnClick = divElement.querySelector("#btnClick");
  btnClick.addEventListener("click", () => {
    alert("a");
    alert("a");
  });

  */
  // INICIO DE SESIÓN
  const data = {
    usernameOrEmail: "",
    password: "",
  };

  const usernameOrEmail = divElement.querySelector("#correo");
  const password = divElement.querySelector("#password");
  const btnClick = divElement.querySelector("#btnIngresar");

  btnClick.addEventListener("click", () => {
    data.usernameOrEmail = usernameOrEmail.value;
    data.password = password.value;

    console.log(data.usernameOrEmail);
    console.log(data.password);

    localStorage.setItem("usuario", usernameOrEmail.value)

    const url = "http://localhost:8080/api/auth/iniciarSesion";

    
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Respuesta:", data);
        localStorage.setItem("token", data.tokenDeAcceso);
        localStorage.setItem("roles", data.roles);
        
        console.log(
          "Se ha almacenado en el localStorage el token:",
          data.tokenDeAcceso
        );

        //Esto me va a servir para poder dar inicio de sesion dentro de la app
        // window.location.href = "#/post";
      })
      .catch((error) => {
        console.error("Error:", error);
      });
      

     window.location.href = "#/inicio";

     
     
   });

  const registro = {
    nombre: "",
    username: "",
    email: "",
    password: "",
  };

  const nombreRegistro = divElement.querySelector("#nombreRegistro");
  const usernameRegistro = divElement.querySelector("#usernameRegistro");
  const emailRegistro = divElement.querySelector("#emailRegistro");
  const passwordRegistro = divElement.querySelector("#passwordRegistro");

  const btnRegistro = divElement.querySelector("#btnRegistro");

  btnRegistro.addEventListener("click", () => {
    const url = "http://localhost:8080/api/auth/registro";

    registro.nombre = nombreRegistro.value;
    registro.username = usernameRegistro.value;
    registro.email = emailRegistro.value;
    registro.password = passwordRegistro.value;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
      },
      body: JSON.stringify(registro),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Respuesta:", data);

        swal({
          title: "Registro con éxito",
          text: "El usuario ha sido registrado correctamente",
          icon: "info",
          textColor: "#ff0000",
        });

        //Esto me va a servir para poder dar inicio de sesion dentro de la app
        // window.location.href = "#/post";
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

  return divElement;
};
