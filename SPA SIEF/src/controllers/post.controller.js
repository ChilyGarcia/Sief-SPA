import { S } from "memfs/lib/constants";
import view from "../views/posts.html";

const getPost = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  return await response.json();
};

export default async () => {
  const divElement = document.createElement("div");
  divElement.innerHTML = view;

  const postElement = divElement.querySelector("#posts");

  const posts = await getPost();

  posts.forEach(post => {
    postElement.innerHTML += `
    <li class="list-group border-primary bg-dark">
        <h5 class="text-white">${post.title}}</h5>

        <p class="text-white">${post.body}</p>
        
    </li>`;
  });

  console.log(posts);

  return divElement;
};
