import views from "../views/inicio.html";

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

  const valorCaracterizacion = divElement.querySelector("#nuevaInfoEst");
  valorCaracterizacion.style.display = "none";

  const valorRegistroUsuarios = divElement.querySelector("#registroUsuarios");
  valorRegistroUsuarios.style.display = "none";

  const valorAuditorias = divElement.querySelector("#auditorias");
  valorAuditorias.style.display = "none";

  const autoridades = localStorage.getItem("roles");

  console.log(autoridades);

  if (autoridades == "ROLE_ADMIN") {
    valorCaracterizacion.style.display = "initial";
    valorRegistroUsuarios.style.display = "initial";
    valorAuditorias.style.display = "initial";
  }

  var listaAdmitidos = [];
  var listaGraduados = [];
  var listaInscritos = [];
  var listaMatriculados = [];

  const btnFormGrafico = divElement.querySelector("#btnFormGrafico");

  btnFormGrafico.addEventListener("click", () => {
    console.log("Boton");

    var selectElement = document.getElementById("mySelect");
    var selectedValue = selectElement.value;

    const token = localStorage.getItem("token");

    const url =
      "http://localhost:8080/programas/listaProgramaPorCodigo/" + selectedValue;

    fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        data.forEach((item) => {
          var parseroAdmitidos = Number(item.admitidos);
          var parseoGraduados = Number(item.graduados);
          var parseoInscritos = Number(item.inscritos);
          var parseoMatriculados = Number(item.matriculados);

          listaAdmitidos.push(parseroAdmitidos);
          listaGraduados.push(parseoGraduados);
          listaInscritos.push(parseoInscritos);
          listaMatriculados.push(parseoMatriculados);
        });

        console.log(listaAdmitidos);
        console.log(listaGraduados);

        // Obtén una referencia al elemento canvas en tu página
        var ctx = divElement.querySelector("#myChart").getContext("2d");

        ctx.canvas.height = 380;
        ctx.canvas.width = 250;

        // Define los datos que quieres graficar
        var data = {
          labels: ["2019-1", "2019-2", "2020-1", "2020-2", "2021-1"],
          datasets: [
            {
              label: "Admitidos",
              data: listaAdmitidos,
              backgroundColor: "rgba(0, 123, 255, 0.5)", // Color de fondo de las barras
            },
          ],
        };

        // Crea una instancia del gráfico de barras
        var myChart = new Chart(ctx, {
          type: "bar",
          data: data,
        });

        var ctx2 = divElement.querySelector("#myChart2").getContext("2d");

        ctx2.canvas.height = 380;
        ctx2.canvas.width = 250;
        var data2 = {
          labels: ["2019-1", "2019-2", "2020-1", "2020-2", "2021-1"],
          datasets: [
            {
              label: "Graduados",
              data: listaGraduados,
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
          ],
        };
        var myChart2 = new Chart(ctx2, {
          type: "bar",
          data: data2,
        });

        var ctx3 = divElement.querySelector("#myChart3").getContext("2d");
        ctx3.canvas.height = 380;
        ctx3.canvas.width = 250;
        var data3 = {
          labels: ["2019-1", "2019-2", "2020-1", "2020-2", "2021-1"],
          datasets: [
            {
              label: "Inscritos",
              data: listaInscritos,
              backgroundColor: "rgba(255, 0, 0, 0.5)",
            },
          ],
        };
        var myChart3 = new Chart(ctx3, {
          type: "bar",
          data: data3,
        });

        var ctx4 = divElement.querySelector("#myChart4").getContext("2d");
        ctx4.canvas.height = 380;
        ctx4.canvas.width = 250;
        var data3 = {
          labels: ["2019-1", "2019-2", "2020-1", "2020-2", "2021-1"],
          datasets: [
            {
              label: "Matriculados",
              data: listaMatriculados,
              backgroundColor: "rgba(255, 0, 0, 0.5)",
            },
          ],
        };
        var myChart4 = new Chart(ctx4, {
          type: "bar",
          data: data3,
        });
      })
      .catch((error) => {
        // Manejo de errores en caso de que la petición falle
        console.error("Error:", error);
      });
  });

  return divElement;
};
