/*Creo un titulo de la pagina y luego dos botones que me lleven a mi funciones */ 
let titulo = document.getElementById("titulo")
titulo.innerHTML= "Bienvenidos a la tienda"; // Pongo lo que va a decir
let btnUsuario = document.createElement("button"); // creo un boton
btnUsuario.innerText="Ingreso Usuario"; // Pongo lo que va a decir
btnUsuario.classList="btn btn-outline-success"
let btnAdmin = document.createElement("button"); // creo otro boton
btnAdmin.innerText="Ingreso Admin"; // Pongo lo que va a decir
btnAdmin.classList="btn btn-outline-success"
btnUsuario.addEventListener("click", ()=> //Sirve para darle un evento al boton
{
    menuUsuario();  // llamo a mi funcion
    listasAuxiliares()
});
btnAdmin.addEventListener("click", ()=> //Sirve para darle un evento al boton
{
    menuAdmin(); // llamo a mi funcion
    listasAuxiliares();
});
const inicio = document.getElementById("Menu");
inicio.appendChild(btnAdmin); // appendChild para que aparezca en el html
inicio.appendChild(btnUsuario); // appendChild para que aparezca en el html
