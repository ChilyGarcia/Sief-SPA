import { pages } from "../controllers/index";

let content = document.getElementById("root");

const router = async (route) => {
  content.innerHTML = "";

  switch (route) {
    case "":
      return content.appendChild(pages.home());
    case "#/posts":
      return content.appendChild(await pages.post());
    case "#/products":
      return console.log("products");

    case "#/nuevaInfoEstadistica":
      return content.appendChild(pages.infoEstadistica());

    case "#/inicio":
      return content.appendChild(pages.inicio());

    case "#/informacionEstadistica":
      return content.appendChild(pages.informacionEstadisttcia());

    case "#/registroUsuarios":
      return content.appendChild(pages.registrarUsuarios());

    case "#/auditorias":
      return content.appendChild(pages.auditorias()); 
      
      
    default:
      return console.log("404");
  }
};

export { router };
