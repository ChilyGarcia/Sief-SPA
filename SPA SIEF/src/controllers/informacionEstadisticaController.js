import views from "../views/informacionEstadistica.html";

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

  const btnExcel = divElement.querySelector("#exportarExcel");

  btnExcel.addEventListener("click", () => {
    var tabla = document.getElementById("miTabla");

    // Crear una nueva hoja de cálculo de Excel
    var libro = XLSX.utils.table_to_book(tabla);

    // Guardar el archivo de Excel
    XLSX.writeFile(libro, "tabla_excel.xlsx");
  });

  const btnForm = divElement.querySelector("#btnForm");

  btnForm.addEventListener("click", () => {
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
        var table = document.getElementById("miTabla");
        table.innerHTML = ""; // Limpiar el contenido de la tabla antes de agregar los nuevos datos

        // Agregar fila de encabezado
        var headerRow = table.insertRow();
        var headerCell1 = headerRow.insertCell();
        headerCell1.innerHTML = "Codigo del programa";
        var headerCell2 = headerRow.insertCell();
        headerCell2.innerHTML = "Nombre del programa";
        var headerCell3 = headerRow.insertCell();
        headerCell3.innerHTML = "Periodo";
        var headerCell4 = headerRow.insertCell();
        headerCell4.innerHTML = "Inscritos";
        var headerCell5 = headerRow.insertCell();
        headerCell5.innerHTML = "Admitidos";
        var headerCell6 = headerRow.insertCell();
        headerCell6.innerHTML = "Matriculados";
        var headerCell7 = headerRow.insertCell();
        headerCell7.innerHTML = "Graduados";

        // Iterar sobre los datos y generar las filas
        data.forEach((item) => {
          var row = table.insertRow();

          // Crear las celdas y asignar los valores
          var cell1 = row.insertCell();
          cell1.innerHTML = item.codigoPrograma; // Asigna el valor de la primera columna
          var cell2 = row.insertCell();
          cell2.innerHTML = item.nombreDelPrograma; // Asigna el valor de la segunda columna
          var cell3 = row.insertCell();
          cell3.innerHTML = item.periodo;
          var cell4 = row.insertCell();
          cell4.innerHTML = item.inscritos;
          var cell5 = row.insertCell();
          cell5.innerHTML = item.admitidos;
          var cell6 = row.insertCell();
          cell6.innerHTML = item.matriculados;
          var cell7 = row.insertCell();
          cell7.innerHTML = item.graduados;
          // Repite el proceso para las columnas restantes, si las hay
        });
      })
      .catch((error) => {
        // Manejo de errores en caso de que la petición falle
        console.error("Error:", error);
      });
  });

  var codigoPrograma = "220102";

  return divElement;
};
