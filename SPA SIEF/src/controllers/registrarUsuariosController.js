import views from "../views/registrarUsuarios.html";

export default () => {
  const divElement = document.createElement("div");
  divElement.innerHTML = views;
  divElement.classList = "text-white";

  const btnCerrarSesion = divElement.querySelector("#cerrarSesion");
  btnCerrarSesion.addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("roles");
    localStorage.removeItem("usuario");
  });

  const data = {
    nombre: "",
    username: "",
    email: "",
    password: "",
    roleUser: "",
  };

  const nombre = divElement.querySelector("#nombre");
  const username = divElement.querySelector("#username");
  const email = divElement.querySelector("#email");
  const password = divElement.querySelector("#password");

  const btnRegistrar = divElement.querySelector("#btnRegistrar");

  btnRegistrar.addEventListener("click", () => {
    var selectElement = document.getElementById("mySelect");
    var selectedValue = selectElement.value;

    const token = localStorage.getItem("token");
    const url = "http://localhost:8080/api/guardar";

    data.nombre = nombre.value;
    data.username = username.value;
    data.email = email.value;
    data.password = password.value;
    data.roleUser = selectElement.value;

    console.log(data.nombre);
    console.log(data.username);
    console.log(data.email);
    console.log(data.password);
    console.log(data.roleUser);

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Respuesta:", data);

        swal({
          title: "Registro con éxito",
          text: "Se registro con exito un usuario",
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
