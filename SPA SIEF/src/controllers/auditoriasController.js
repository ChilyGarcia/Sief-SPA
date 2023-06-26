import views from "../views/auditorias.html";

const cors = require("cors");

export default () => {
  const divElement = document.createElement("div");
  divElement.innerHTML = views;
  divElement.classList = "text-white";

  const token = localStorage.getItem("token");

  const url = "http://localhost:8080/programas/listaAuditorias";
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
      console.log(data);
      var table = document.getElementById("miTabla");
      table.innerHTML = ""; // Limpiar el contenido de la tabla antes de agregar los nuevos datos

      // Agregar fila de encabezado
      var headerRow = table.insertRow();

      var headerCell2 = headerRow.insertCell();
      headerCell2.innerHTML = "Nombre del programa";
      var headerCell3 = headerRow.insertCell();
      headerCell3.innerHTML = "Periodo";
      var headerCell4 = headerRow.insertCell();
      headerCell4.innerHTML = "Inscritos";
      var headerCell5 = headerRow.insertCell();
      headerCell5.innerHTML = "Admitidos";



      // Iterar sobre los datos y generar las filas
      data.forEach((item) => {
        var row = table.insertRow();


        var cell2 = row.insertCell();
        cell2.innerHTML = item.tipoModificacion; // Asigna el valor de la segunda columna
        var cell3 = row.insertCell();
        cell3.innerHTML = item.nombrePrograma;
        var cell4 = row.insertCell();
        cell4.innerHTML = item.fecha;
        var cell5 = row.insertCell();
        cell5.innerHTML = item.usuario;


        // Repite el proceso para las columnas restantes, si las hay
      });
    })
    .catch((error) => {
      // Manejo de errores en caso de que la petición falle
      console.error("Error:", error);
    });
  return divElement;
};
