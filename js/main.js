//Funciones generales
// Esta funcion va a generar un id al azar en todos los objetos
const generarID = () => 
{
    let random = Math.random().toString(36).substring(2);
    let fecha = Date.now().toString(36);
    return random + fecha;
}
const marcarOpcionVacia = (opciones)=>
{
    opciones.forEach((opcion)=>
    {
        opcion.style.setProperty("border-color", "red");
    })
}
//Funciones Para administrador
const menuAdmin = () =>
{
    // si bien en este caso la contraseña no tiene mucho sentido, es un requisito para cualquier admin.
    // creo un subtitulo, un input para ingresar la contraseña y un boton para realizar el ingreso
    inicio.innerHTML="";
    let titulo = document.getElementById("titulo");
    titulo.innerText="TIENDA"
    let ingreso = document.createElement("h3");
    ingreso.innerText="Ingreso Administrador";
    let contrasenia = document.createElement("input");
    contrasenia.type = "text";
    contrasenia.placeholder="Ingrese su contraseña"
    let btnAceptar = document.createElement("button");
    btnAceptar.innerText="Aceptar";
    btnAceptar.classList="btn btn-outline-success"
    btnAceptar.addEventListener("click",()=>
    {
        desplegarMenuAdmin(contrasenia);
    });
    inicio.appendChild(ingreso);
    inicio.appendChild(contrasenia);
    inicio.appendChild(btnAceptar);
}
const desplegarMenuAdmin = (contrasenia)=>
{
    let opciones = document.createElement("h3");
        opciones.innerText="Menu";
        const cuerpo = document.getElementById("Cuerpo")
        let inicioAdmin = contrasenia.value;
        esta = buscarAdmin(inicioAdmin)
        if(inicioAdmin!="")
        {
            if(esta != undefined)
            {
                inicio.innerHTML="";
                // creo el menu para el administrador
                let menu = ["Agregar Admin","Listado clientes", "Agregar producto",
                "Eliminar producto", "Stock de productos" ,"Cerrar sesion"] // creo un array para generar los botones
                let tituloStockyClientes = document.createElement("h3");
                inicio.appendChild(opciones);
                menu.forEach((opcion)=>
                {
                    let btn = document.createElement("button");
                    btn.innerText = opcion
                    btn.classList="btn btn-outline-success"
                    switch(opcion)
                    {
                        case "Agregar Admin":
                        {
                            btn.addEventListener("click",()=>
                            {
                                caseAgregarAdmin(cuerpo);
                            });
                            break;
                        }
                        case "Listado clientes":
                        {
                            btn.addEventListener("click",()=>
                            {
                                caseListadoClientes(tituloStockyClientes, cuerpo) 
                            });
                            break;
                        }
                        case "Agregar producto":
                        {
                            btn.addEventListener("click",()=>
                            {
                                caseAgregarProductos(cuerpo)
                        
                            });
                            break;
                        }
                        case "Eliminar producto":
                        {
                            btn.addEventListener("click",()=>
                            {
                                caseEliminarProducto(cuerpo);
                            });
                            break;
                        }
                        case "Stock de productos":
                        {
                            btn.addEventListener("click",()=>
                            {
                                caseStockDeProductos(tituloStockyClientes, cuerpo)
                            });
                            break;
                        }
                        case "Cerrar sesion":
                        {
                            btn.classList="";
                            btn.classList="btn btn-outline-secondary"
                            btn.addEventListener("click",()=>
                            {
                                location.reload();
                            });
                            break;
                        }
                    }
                    inicio.appendChild(btn)
                });
            }
            else
            {
                let alerta = document.createElement("p");
                inicio.appendChild(alerta);
                alerta.innerText="Administrador no encontrado, ingrese una contraseña valida";
            }
        }
        else
        {
            let lista =[contrasenia]
            marcarOpcionVacia(lista)
            let alerta = document.createElement("p");
            alerta.innerText="Faltan campos por completar";
            inicio.appendChild(alerta);
        }
}
const buscarAdmin = (contrasenia) => // funcion para determinar si un admin existe o no
{
    const listaAdmin = JSON.parse(localStorage.getItem("Administradores")) 
    return listaAdmin.find((administrador) => administrador.contrasenia === contrasenia);
}
const caseAgregarAdmin = (cuerpo)=>
{
    cuerpo.innerHTML="";
    let tituloAdminNuevo = document.createElement("h3");
    tituloAdminNuevo.innerText="Administrador Nuevo";
    cuerpo.appendChild(tituloAdminNuevo);
    agregarAdmin();
}
const agregarAdmin=() => // funcion para agregar un administrador nuevo
{   
    const cuerpo = document.getElementById("Cuerpo")
    let nuevoNombre = document.createElement("input");
    nuevoNombre.type="text";
    nuevoNombre.placeholder="Ingresa el nombre del admin"
    let nuevoApellido = document.createElement("input");
    nuevoApellido.type="text";
    nuevoApellido.placeholder="Ingresa el apellido del admin"
    let nuevaContrasenia = document.createElement("input");
    nuevaContrasenia.type="text";
    nuevaContrasenia.placeholder = "Ingresa la contraseña";
    let btnAceptar = document.createElement("button");
    btnAceptar.innerText="Aceptar";
    btnAceptar.classList="btn btn-outline-success"
    btnAceptar.addEventListener("click",()=>
    {
      pushearAdmin(nuevoNombre, nuevoApellido, nuevaContrasenia, cuerpo);
    });
    cuerpo.appendChild(nuevoNombre);
    cuerpo.appendChild(nuevoApellido);
    cuerpo.appendChild(nuevaContrasenia);
    cuerpo.appendChild(btnAceptar);
}
const pushearAdmin= (nuevoNombre, nuevoApellido,nuevaContrasenia, cuerpo) =>
{
    let nombre = nuevoNombre.value;
    let apellido = nuevoApellido.value;
    let contrasenia = nuevaContrasenia.value;
    if(nombre != "" && apellido != "" && contrasenia != "")
    {
        let nuevoAdmin = new Admin(generarID(),nombre, apellido, contrasenia);
        administradores.push(nuevoAdmin);
        nuevoNombre.value = "";
        nuevoApellido.value = "";
        nuevaContrasenia.value = "";
        localStorage.setItem("Administradores", JSON.stringify(administradores));
        cuerpo.innerHTML="";
    }
    else
    {
        let lista = []
        if(nombre=="")
        {
            lista.push(nuevoNombre)
            marcarOpcionVacia(lista)
        }
        if(apellido=="")
        {
            lista.push(nuevoApellido)
            marcarOpcionVacia(lista)
        }
        if(contrasenia=="")
        {
            lista.push(nuevaContrasenia)
            marcarOpcionVacia(lista)
        }
        let alerta = document.createElement("p");
        cuerpo.appendChild(alerta);
        alerta.innerText="Faltan datos";
    }
}
const caseListadoClientes = (h3, cuerpo)=>
{
    cuerpo.innerHTML="";
    h3.innerText="Clientes";
    cuerpo.appendChild(h3);
    listarClientes();
};
const listarClientes=() => // funcion para ver los clientes
{
    const cuerpo = document.getElementById("Cuerpo")
    let miLista = document.querySelector("#listaUsuarios");
    if (!miLista) 
    {
        miLista = document.createElement("table");
        miLista.setAttribute("id", "listaUsuarios");
    }
    miLista.innerHTML = "";

    const encabezado = document.createElement("tr");

    const tdID = document.createElement("th");
    tdID.innerHTML = "ID:";
    encabezado.appendChild(tdID);

    const tdNombre = document.createElement("th");
    tdNombre.innerHTML = "Nombre:";
    encabezado.appendChild(tdNombre);

    const tdApellido = document.createElement("th");
    tdApellido.innerHTML = "Apellido:";
    encabezado.appendChild(tdApellido);

    const tdDireccion = document.createElement("th");
    tdDireccion.innerHTML = "Dirección:";
    encabezado.appendChild(tdDireccion);

    const tdUsuario = document.createElement("th");
    tdUsuario.innerHTML = "Usuario:";
    encabezado.appendChild(tdUsuario);

    miLista.appendChild(encabezado)

    clientes.forEach((cliente) => 
    {
        const nodotr = document.createElement("tr");
        let nodotd = document.createElement("td");
        nodotd.innerHTML = `${cliente.id}`;
        nodotr.appendChild(nodotd);

        nodotd = document.createElement("td");
        nodotd.innerHTML = `${cliente.nombre}`;
        nodotr.appendChild(nodotd)

        nodotd = document.createElement("td");
        nodotd.innerHTML = `${cliente.apellido}`;
        nodotr.appendChild(nodotd);

        nodotd = document.createElement("td");
        nodotd.innerHTML = `${cliente.direccion}`;
        nodotr.appendChild(nodotd);

        nodotd = document.createElement("td");
        nodotd.innerHTML = `${cliente.usuario}`;
        nodotr.appendChild(nodotd);

        miLista.appendChild(nodotr);
    });

    cuerpo.appendChild(miLista);
}
const caseAgregarProductos = (cuerpo)=>
{
    cuerpo.innerHTML="";
    let titulo = document.createElement("h3");
    titulo.innerText="Nuevo Producto";
    cuerpo.appendChild(titulo);
    crearProducto();
};
const crearProducto=() => // funcion para agregar un produtco
{
    const cuerpo = document.getElementById("Cuerpo")
    let id = generarID() 
    let nuevoNombre = document.createElement("input");
    nuevoNombre.type = "text"
    nuevoNombre.placeholder = "Nombre Producto"
    let nuevaDescripcion = document.createElement("textarea");
    nuevaDescripcion.cols = 50;
    nuevaDescripcion.rows = 10;
    nuevaDescripcion.placeholder="Descripcion del producto";
    let nuevoPrecio = document.createElement("input");
    nuevoPrecio.type = "number"
    nuevoPrecio.placeholder="Precio del Producto";
    let nuevoStock = document.createElement("input");
    nuevoStock.type = "number"
    nuevoStock.placeholder = "Stock del Producto";
    let nuevaImagen = document.createElement("input");
    nuevaImagen.type="file";
    nuevaImagen.accept="img/jpg"
    // Creo un comboBox para poner las categorias a seleccionar
    let nuevoCategoria = document.createElement("select");
    nuevoCategoria.setAttribute("id","categoria")
    let categoriaBoxeo = document.createElement("option");
    categoriaBoxeo.setAttribute("value","Boxeo")
    let categoriaBoxeoTexto = document.createTextNode("Boxeo")
    categoriaBoxeo.appendChild(categoriaBoxeoTexto);
    let categoriaMMA = document.createElement("option");
    categoriaMMA.setAttribute("value","MMA")
    let categoriaMMATexto = document.createTextNode("MMA")
    categoriaMMA.appendChild(categoriaMMATexto);
    let categoriaCrossfit = document.createElement("option");
    categoriaCrossfit.setAttribute("value","CrossFit")
    let categoriaCrossfitTexto = document.createTextNode("CrossFit");
    categoriaCrossfit.appendChild(categoriaCrossfitTexto);
    let categoriaRunning = document.createElement("option");
    categoriaRunning.setAttribute("value","Running")
    let categoriaRunningTexto = document.createTextNode("Running");
    categoriaRunning.appendChild(categoriaRunningTexto);
    nuevoCategoria.appendChild(categoriaBoxeo);
    nuevoCategoria.appendChild(categoriaCrossfit);
    nuevoCategoria.appendChild(categoriaMMA);
    nuevoCategoria.appendChild(categoriaRunning);
    // Finalizo la creacion del comboBox Categorias
    // Creo un comboBox para poner las Subcategorias a seleccionar
    let nuevoSubSeccion = document.createElement("select");
    let subSeccionHombre = document.createElement("option");
    subSeccionHombre.setAttribute("value","Hombre")
    let subSeccionHombreTexto = document.createTextNode("Hombre");
    subSeccionHombre.appendChild(subSeccionHombreTexto);
    let subSeccionMujer = document.createElement("option");
    subSeccionMujer.setAttribute("value","Mujer")
    let subSeccionMujerTexto = document.createTextNode("Mujer");
    subSeccionMujer.appendChild(subSeccionMujerTexto);
    let subSeccionNiño = document.createElement("option");
    subSeccionNiño.setAttribute("value","Niño")
    let subSeccionNiñoTexto = document.createTextNode("Niño");
    subSeccionNiño.appendChild(subSeccionNiñoTexto);
    nuevoSubSeccion.appendChild(subSeccionMujer);
    nuevoSubSeccion.appendChild(subSeccionHombre);
    nuevoSubSeccion.appendChild(subSeccionNiño);
    // Finalizo la creacion del comboBox Subcategorias
    let btnAceptar = document.createElement("button");
    btnAceptar.innerText="Aceptar";
    btnAceptar.classList="btn btn-outline-success"
    btnAceptar.addEventListener("click",()=>
    {
        pushearProducto(id, nuevoNombre, nuevaDescripcion, nuevoPrecio, nuevoStock, nuevoCategoria, nuevoSubSeccion, nuevaImagen, cuerpo);
    });
    cuerpo.appendChild(nuevoNombre);
    cuerpo.appendChild(nuevaDescripcion);
    cuerpo.appendChild(nuevoPrecio);
    cuerpo.appendChild(nuevoStock);
    cuerpo.appendChild(nuevoCategoria);
    cuerpo.appendChild(nuevoSubSeccion);
    cuerpo.appendChild(nuevaImagen)
    cuerpo.appendChild(btnAceptar);
}
const pushearProducto = (id,nuevoNombre, nuevaDescripcion, nuevoPrecio, nuevoStock, nuevoCategoria, nuevoSubSeccion, nuevaImagen, cuerpo)=>
{
    let nombre = nuevoNombre.value;
    let descripcion = nuevaDescripcion.value;
    let precio = Number(nuevoPrecio.value);
    let stock = Number(nuevoStock.value);
    let seleccionCategoria = nuevoCategoria.options[nuevoCategoria.selectedIndex].value;
    let listaCategoriaAux = secciones.map((seccion)=>seccion.nombre)
    let indiceCategorias = listaCategoriaAux.indexOf(seleccionCategoria);
    let categoria = secciones[indiceCategorias];
    let seleccionSubSeccion = nuevoSubSeccion.options[nuevoSubSeccion.selectedIndex].value;
    let listaSubSeccionAux = subSecciones.map((seccion)=>seccion.nombre)
    let indiceSubSeccion = listaSubSeccionAux.indexOf(seleccionSubSeccion);
    let subSeccion = subSecciones[indiceSubSeccion];
    let imagen = nuevaImagen.files[0];
    console.log(nuevaImagen)
    console.log(imagen);
    if(nombre != "" && descripcion != "" && precio != "" && stock != "") 
    {
        categoria.subSeccion = subSeccion;
        let producto = new Producto(id, nombre, descripcion, precio, stock, categoria, subSeccion, imagen);
        productos.push(producto);
        nuevoNombre.value="";
        nuevaDescripcion.value="";
        nuevoPrecio.value="";
        nuevoStock.value="";
        localStorage.setItem("Productos",JSON.stringify(productos))
        console.log(producto);
        cuerpo.innerHTML=""
    }
    else
    {  
        let alerta = document.createElement("p");
        cuerpo.appendChild(alerta);
        alerta.innerText="Faltan datos";
        let lista = [];
        if(nombre=="")
        {
            lista.push(nuevoNombre);
            marcarOpcionVacia(lista);
        }
        if(descripcion=="")
        {
            lista.push(nuevaDescripcion);
            marcarOpcionVacia(lista);
        }
        if(precio=="")
        {
            lista.push(nuevoPrecio);
            marcarOpcionVacia(lista);
        }
        if(stock=="")
        {
            lista.push(nuevoStock);
            marcarOpcionVacia(lista);
        }
    }
}
const caseEliminarProducto = (cuerpo)=>
{
    cuerpo.innerHTML="";
    let titulo = document.createElement("h3");
    titulo.innerText="Eliminar Productos";
    cuerpo.appendChild(titulo);
    eliminarProducto();
}
const eliminarProducto=() => // funcion para eliminar un producto
{
    const cuerpo = document.getElementById("Cuerpo")
    let id = document.createElement("input");
    id.type = "text";
    id.placeholder="Ingrese el id del producto a eliminar";
    let btnAceptar= document.createElement("button");
    btnAceptar.innerText="Aceptar";
    btnAceptar.classList="btn btn-outline-success"
    btnAceptar.addEventListener("click",()=>
    {
        let obtenerID = id.value;
        let hay = productos.some((producto)=>producto.id===obtenerID);
        let alerta = document.createElement("p");

        if(hay)
        {   
            const soloIds = productos.map((producto)=>producto.id)
            let indice = soloIds.indexOf(id);

            productos.splice(indice,1);
            alerta.innerText="Producto eliminado";
            id.value="";
            localStorage.setItem("Productos",JSON.stringify(productos))
        }
        else
        {
            alerta.innerText="Producto no encontrado";
            id.value="";
        }
        cuerpo.appendChild(alerta);

    });
    cuerpo.appendChild(id);
    cuerpo.appendChild(btnAceptar);
}
const caseStockDeProductos = (h3, cuerpo)=>
{
    cuerpo.innerHTML="";
    h3.innerText="Stock de productos";
    cuerpo.appendChild(h3);
    fetch("../data/products.data.json")
    .then((res)=>res.json(res))
    .then((json)=>
    {
        stockDeProductos(json);
        console.log(json);
    })
}
const stockDeProductos = (lista) => // funcion para ver todos los productos
{
    const cuerpo = document.getElementById("Cuerpo")
    let miLista = document.querySelector("#listaUsuarios");
    if (!miLista) 
    {
        miLista = document.createElement("table");
        // usamos el mismo id que en usuarios para que la tabla se cambie dependiendo lo que se elija
        miLista.setAttribute("id", "listaUsuarios"); 
    }
    miLista.innerHTML = "";

    const encabezado = document.createElement("tr");

    const tdID = document.createElement("th");
    tdID.innerHTML = "ID:";
    encabezado.appendChild(tdID);

    const tdNombre = document.createElement("th");
    tdNombre.innerHTML = "Nombre:";
    encabezado.appendChild(tdNombre);

    const tdCategoria = document.createElement("th");
    tdCategoria.innerHTML = "Categoria:";
    encabezado.appendChild(tdCategoria);

    const tdSubCategoria = document.createElement("th");
    tdSubCategoria.innerHTML = "Dirección:";
    encabezado.appendChild(tdSubCategoria);

    const tdPrecio = document.createElement("th");
    tdPrecio.innerHTML = "Precio:";
    encabezado.appendChild(tdPrecio);

    const tdStock = document.createElement("th");
    tdStock.innerHTML = "Stock:";
    encabezado.appendChild(tdStock);

    miLista.appendChild(encabezado)

    lista.forEach((producto) => 
    {
        const nodotr = document.createElement("tr");
        let nodotd = document.createElement("td");
        nodotd.innerHTML = `${producto.id}`;
        nodotr.appendChild(nodotd);

        nodotd = document.createElement("td");
        nodotd.innerHTML = `${producto.nombre}`;
        nodotr.appendChild(nodotd)

        nodotd = document.createElement("td");
        nodotd.innerHTML = `${producto.categoria}`;
        nodotr.appendChild(nodotd);

        nodotd = document.createElement("td");
        nodotd.innerHTML = `${producto.subCategoria}`;
        nodotr.appendChild(nodotd);

        nodotd = document.createElement("td");
        nodotd.innerHTML = `$${producto.precio}`;
        nodotr.appendChild(nodotd);

        nodotd = document.createElement("td");
        nodotd.innerHTML = `${producto.stock}`;
        nodotr.appendChild(nodotd);

        miLista.appendChild(nodotr);
    });

    cuerpo.appendChild(miLista);
}

//Funciones Para Usuario
const menuUsuario = () =>
{
// En caso de no ser admin se le pide que inicie sesion o se registre
    inicio.innerHTML="";
    let titulo = document.getElementById("titulo");
    titulo.innerText="TIENDA"
    let pregunta = document.createElement("h3");
    pregunta.innerText="Tiene cuenta?";
    let btnSi = document.createElement("button");
    btnSi.innerText="Si";
    btnSi.classList="btn btn-outline-success"
    let btnNo = document.createElement("button");
    btnNo.innerText="No";
    btnNo.classList="btn btn-outline-success"
    btnSi.addEventListener("click",()=>
    {
        inicioSesionUsuario();
    });
    btnNo.addEventListener("click",()=>
    {
        crearCliente()
    });
    inicio.appendChild(pregunta);
    inicio.appendChild(btnSi);
    inicio.appendChild(btnNo);
}
const inicioSesionUsuario = () =>
{
    inicio.innerHTML="";
    let espacio = document.createElement("h3");
    espacio.innerText = "Inicio de sesión";
    let inputUsuario = document.createElement("input");
    inputUsuario.type = "text";
    inputUsuario.placeholder = "Ingrese su usuario";
    let inputContrasenia = document.createElement("input");
    inputContrasenia.type = "text";
    inputContrasenia.placeholder = "Ingrese su contraseña";
    let btnAceptar = document.createElement("button");
    btnAceptar.innerText = "Aceptar";
    btnAceptar.classList="btn btn-outline-success"
    btnAceptar.addEventListener("click", ()=>
    {
        desplegarMenuUsuario( inputUsuario, inputContrasenia);
    });


    inicio.appendChild(espacio);
    inicio.appendChild(inputUsuario);
    inicio.appendChild(inputContrasenia);
    inicio.appendChild(btnAceptar);
}
const desplegarMenuUsuario = (inputUsuario, inputContrasenia) =>
{ 
    const cuerpo = document.getElementById("Cuerpo")
    let opciones = document.createElement("h3");
    opciones.innerText="Menu";
    let inicioSesionUsuario = inputUsuario.value;
    let inicioSesionContrasenia = inputContrasenia.value;
    esta = buscarCliente(inicioSesionUsuario, inicioSesionContrasenia);
        if(inicioSesionUsuario != "" && inicioSesionContrasenia != "")
        {
            if(esta != undefined)
            {
                inicio.innerHTML="";
                
                let tituloCarritoyFavorito = document.createElement("h3");
                // creo el menu para el cliente
                let menu =  ["Secciones","Ver Carrito","Cerrar sesion"]
                inicio.appendChild(opciones);
                menu.forEach((opcion)=>
                {
                    let btn = document.createElement("button");
                    btn.classList="btn btn-outline-success"
                    btn.innerText = opcion;
                    switch(opcion)
                    {
                        case "Secciones":
                        {
                            btn.addEventListener("click",()=>
                            {
                                fetch("../data/products.data.json")
                                .then((res)=>res.json(res))
                                .then((json)=>
                                {
                                    categorias(json);
                                    console.log(json);
                                })
                            });
                            break;
                        }
                        case "Ver Carrito":
                        { 
                            btn.addEventListener("click",()=>
                            {
                                caseVerCarrito(cuerpo, tituloCarritoyFavorito);
                            }); 
                            break;
                        }
                        case "Cerrar sesion":
                        {
                            btn.classList="";
                            btn.classList="btn btn-outline-secondary"
                            btn.addEventListener("click",()=>
                            {
                                location.reload();
                            });
                            break;
                        }    
                    }
                    inicio.appendChild(btn);     
                });          
            }
            else
            {
                let alerta = document.createElement("p");
                alerta.innerText="Usuario no encontrado, ingrese una contraseña valida o cree su usuario";
                let btnVolver = document.createElement("button");
                btnVolver.innerText="Volver";
                btnVolver.classList="btn btn-outline-success"
                btnVolver.addEventListener("click",() =>
                {
                    menuUsuario();
                })
                inicio.appendChild(alerta);
                inicio.appendChild(btnVolver)
            }
        }
        else
        {  
            let lista = [];
            if (inicioSesionUsuario=="")
            {
                lista.push(inputUsuario)
                marcarOpcionVacia(lista)
            }
            if (inicioSesionContrasenia=="")
            {
                lista.push(inputContrasenia)
                marcarOpcionVacia(lista)
            }
            let alerta = document.createElement("p");
            alerta.innerText="Faltan campos por completar";
            inicio.appendChild(alerta);
        }
}
const buscarCliente = (usuario, contrasenia) => // funcion para determinar si un cliente existe o no entre  otras funcionaidades
{
    console.log(clientes)
    const listaClientes = JSON.parse(localStorage.getItem("Usuarios"));
    if(listaClientes != null)
    {
        return listaClientes.find((cliente)=> cliente.usuario === usuario && cliente.contrasenia === contrasenia);
    }
    else if( clientes.length != 0)
    {
        localStorage.setItem("Usuarios", JSON.stringify(clientes));
        return listaClientes.find((cliente)=> cliente.usuario === usuario && cliente.contrasenia === contrasenia);
    }
    
}
const categorias=(lista) => //Funcion para ver los productos por categoria
{
    let running = [];
    let crossFit = [];
    let mma = [];
    let boxeo = [];
    //const listaProductos = JSON.parse(localStorage.getItem("Productos"))
    if(lista!=null)
    {
        lista.forEach((producto)=>
        {
            if(producto.categoria === "Boxeo")
            {
                boxeo.push(producto);
            }
            else if(producto.categoria === "MMA")
            {
                mma.push(producto);
            }
            else if(producto.categoria === "Crossfit")
            {
                crossFit.push(producto);
            }
            else if(producto.categoria === "Running")
            {
                running.push(producto);
            }
        });
        console.table(running);
        console.table(crossFit);
        console.table(mma);
        console.table(boxeo);
        mostrarProductos(running, crossFit, mma, boxeo);
    }
    else
    {
        
    }
}
const mostrarProductos = (array, array2, array3, array4) =>
{
    const cuerpo = document.getElementById("Cuerpo");
    const desplegarCat = document.getElementById("DesplegarCat")
    cuerpo.innerHTML="";
    desplegarCat.innerHTML="";
    let titulo = document.createElement("h3");
    titulo.innerText="Categorias";
    cuerpo.appendChild(titulo);
    let subTitulo = document.createElement("h3")
    // Creo botones para que el usuario seleccione la categoria de los productos que quiere comprar
    let btnBoxeo = document.createElement("button");
    btnBoxeo.classList="btn btn-outline-success"
    btnBoxeo.innerText="Boxeo";
    // dento de cada evento vamos a crear una tabla con los productos correspondientes.
    btnBoxeo.addEventListener("click", ()=> 
    {   
        Boxeo(array4, subTitulo);
    });
    let btnMMA = document.createElement("button");
    btnMMA.classList="btn btn-outline-success"
    btnMMA.innerText = "MMA";
    btnMMA.addEventListener("click", ()=>
    {
        MMA(array3, subTitulo);
    });
    let btnCrossFit = document.createElement("button");
    btnCrossFit.classList="btn btn-outline-success"
    btnCrossFit.innerText = "CrossFit";
    btnCrossFit.addEventListener("click", ()=>
    {
        CrossFit(array2, subTitulo);
    });
    let btnRunning = document.createElement("button");
    btnRunning.classList="btn btn-outline-success"
    btnRunning.innerText = "Running";
    btnRunning.addEventListener("click", ()=>
    {
        Running(array, subTitulo);
    });
    cuerpo.appendChild(btnBoxeo);
    cuerpo.appendChild(btnMMA);
    cuerpo.appendChild(btnCrossFit);
    cuerpo.appendChild(btnRunning);
}
const Boxeo = (array4, h3)=>
{
    const DesplegarCat = document.getElementById("DesplegarCat");
    DesplegarCat.innerHTML="";
    h3.innerText="Boxeo";
    DesplegarCat.appendChild(h3);
    listarProductos(array4,DesplegarCat);
}
const MMA = (array3, h3) =>
{
    const DesplegarCat = document.getElementById("DesplegarCat");
    DesplegarCat.innerHTML=""
    h3.innerText="MMA";
    DesplegarCat.appendChild(h3);
    listarProductos(array3,DesplegarCat);
}
const CrossFit = (array2, h3) =>
{
    const DesplegarCat = document.getElementById("DesplegarCat");
    DesplegarCat.innerHTML="";
    h3.innerText="CrossFit";
    DesplegarCat.appendChild(h3);
    listarProductos(array2,DesplegarCat);
}
const Running = (array, h3) =>
{
    const DesplegarCat = document.getElementById("DesplegarCat");
    DesplegarCat.innerHTML="";
    h3.innerText="Running";
    DesplegarCat.appendChild(h3);
    listarProductos(array, DesplegarCat);

}
const listarProductos = (listaDeProductos, DesplegarCat) =>
{

    listaDeProductos.forEach((producto)=>
    {
        if(producto.Stock!=0)
        {
            let card = document.createElement("div");
            card.classList="card";
            let imagen = document.createElement("img");
            imagen.classList="tamanio"
            let encabezado = document.createElement("h5");
            let detalle = document.createElement("p");
            let precio = document.createElement("p");
            imagen.src = producto.imagen;
            imagen.alt = producto.nombre;
            encabezado = producto.nombre;
            detalle = producto.descripcion;
            precio = producto.precio;
            let enviarCarrito = document.createElement("button");
            enviarCarrito.classList="btn btn-outline-success"
            enviarCarrito.innerText="Enviar al carrito"
            enviarCarrito.addEventListener("click",()=>
            {
                esta.carritoDeCompras.push(producto);
                localStorage.setItem("Usuarios", JSON.stringify(clientes));
            });
            DesplegarCat.appendChild(card);
            card.append(imagen);
            card.append(encabezado);
            card.append(detalle);
            card.append(precio);
            card.append(enviarCarrito);
        }
    });
}
const caseVerCarrito = (cuerpo, h3) =>
{
    const DesplegarCat = document.getElementById("DesplegarCat");
    cuerpo.innerHTML="";
    h3.innerText= "Mi Carrito"
    cuerpo.appendChild(h3);
    carrito(DesplegarCat);
}
const carrito=(DesplegarCat) => // falta un boton para eliminar del carrito
{
    DesplegarCat.innerHTML="";
    let comprar = document.createElement("button");
    comprar.classList="btn btn-outline-success"
    comprar.innerText="Comprar"
    let total = document.createElement("h3")
    total.innerText = "$0";
    let monto = 0;
    if(esta.carritoDeCompras.length != 0)
    {
        esta.carritoDeCompras.forEach((producto) =>
        {
            let card = document.createElement("div");
            card.classList="card";
            let imagen = document.createElement("img");
            let encabezado = document.createElement("h5");
            let detalle = document.createElement("p");
            imagen.src = producto.imagen;
            imagen.alt = producto.nombre;
            encabezado = producto.nombre;
            detalle = producto.descripcion;
            DesplegarCat.appendChild(card);
            card.append(imagen);
            card.append(encabezado);
            card.append(detalle);
            monto += producto.precio;
        });
        total.innerHTML =`$${monto.toFixed(2)}`;
    }
    else
    {
        total.innerText="Carrito Vacio";
    }
    comprar.addEventListener("click",()=>
    {
        comprarProducto(monto, DesplegarCat);
    });
    DesplegarCat.appendChild(total);
    DesplegarCat.appendChild(comprar)
}
const comprarProducto=(monto,DesplegarCat) => //Falta terminar.
{
    DesplegarCat.innerHTML="";
    if(esta.tarjeta.length != 0)
    {
        let opciones = document.createElement("select");
        let numero;
        esta.tarjeta.forEach((tarjetas)=>
        {
            numero=tarjetas.numero;
            let opcion = document.createElement("option");
            opcion.value=numero;
            let opcionTexto = document.createTextNode(numero);
            opcion.appendChild(opcionTexto);
            opciones.appendChild(opcion);
        })
        DesplegarCat.appendChild(opciones);
        let btnSeleccion = document.createElement("button");
        btnSeleccion.innerText="Seleccionar";
        btnSeleccion.classList="btn btn-outline-success"
        let btnAgregarTarjeta = document.createElement("button");
        btnAgregarTarjeta.innerText="Agregar otra Tarjeta";
        btnAgregarTarjeta.classList="btn btn-outline-success"
        btnSeleccion.addEventListener(("click"),()=>
        {
            terminarCompra(DesplegarCat, monto, opciones);
        })
        btnAgregarTarjeta.addEventListener(("click"),()=>
        {
            agregarTarjeta(DesplegarCat); 
        })
        DesplegarCat.appendChild(btnSeleccion);
        DesplegarCat.appendChild(btnAgregarTarjeta);
    }
    else
    {
        agregarTarjeta(DesplegarCat);
    }
}
const terminarCompra = (DesplegarCat, monto, opciones) =>
{
    DesplegarCat.innerHTML="";
    let tarjeta = opciones.value;
    DesplegarCat.innerHTML=`<p id="texto">El total es de ${monto} Desea pagar con la tarjeta N°:${tarjeta.numero}</p>
                            <button id="btnSi" class="btn btn-outline-success">SI</button>
                            <button id="btnNo" class="btn btn-outline-success">NO</button>`
    let btnSi=document.getElementById("btnSi");
    let btnNo=document.getElementById("btnNo");
    btnSi.addEventListener(("click"),()=>
    {
        disminuirStockProductos()
        DesplegarCat.innerHTML="Compra Realizada con exito!";
    })
    btnNo.addEventListener(("click"),()=>
    {
        comprarProducto();
    })
}
const disminuirStockProductos = () =>
{
    esta.carritoDeCompras.forEach((aux) =>
    {
        productos.forEach((producto)=>
        {
            if(aux.id === producto.id)
            {
                producto.stock--;
            }
        })
    })
    esta.carritoDeCompras=[];
    localStorage.setItem("Productos",JSON.stringify(productos));
}
const crearCliente=() =>
{
    inicio.innerHTML="";
    let tituloUsuarioNuevo = document.createElement("h3");
    tituloUsuarioNuevo.innerText="Usuario Nuevo";
    inicio.appendChild(tituloUsuarioNuevo);
    let id = generarID();
    let nuevoNombre = document.createElement("input");
    nuevoNombre.type = "text";
    nuevoNombre.placeholder= "Acá va tu nombre";
    let nuevoApellido = document.createElement("input");
    nuevoApellido.type = "text";
    nuevoApellido.placeholder= "Acá va tu apellido";
    let nuevaDireccion = document.createElement("input");
    nuevaDireccion.type = "text";
    nuevaDireccion.placeholder= "Acá va tu dirección";
    let nuevoUsuario = document.createElement("input");
    nuevoUsuario.type = "text";
    nuevoUsuario.placeholder= "Elegí tu usuario";
    let nuevaContrasenia = document.createElement("input");
    nuevaContrasenia.type = "text";
    nuevaContrasenia.placeholder= "Elegí tu contraseña";
    let btnAceptar = document.createElement("button");
    btnAceptar.classList="btn btn-outline-success"
    btnAceptar.innerText="Aceptar";
    btnAceptar.addEventListener("click",()=>
    {
        pushearCliente(id, nuevoNombre, nuevoApellido, nuevaDireccion, nuevoUsuario, nuevaContrasenia);
    });
    inicio.appendChild(nuevoNombre);
    inicio.appendChild(nuevoApellido);
    inicio.appendChild(nuevaDireccion);
    inicio.appendChild(nuevoUsuario);
    inicio.appendChild(nuevaContrasenia);
    inicio.appendChild(btnAceptar);


}
const pushearCliente = (id, nuevoNombre, nuevoApellido, nuevaDireccion, nuevoUsuario, nuevaContrasenia) =>
{
        let nombre = nuevoNombre.value;
        let apellido = nuevoApellido.value;
        let direccion = nuevaDireccion.value;
        let usuario = nuevoUsuario.value;
        let contrasenia = nuevaContrasenia.value;
        let carritoDeCompras = [];
        let productoFavorito = [];
        let tarjetas = [];
        if(nombre != "" && apellido != "" && direccion != "" && usuario != "" && contrasenia != "")
        {
            let cliente = new Cliente(id,nombre,apellido,tarjetas,productoFavorito,carritoDeCompras,direccion,usuario,contrasenia);
            clientes.push(cliente);
            localStorage.setItem("Usuarios", JSON.stringify(clientes));
            listasAuxiliares();
            inicioSesionUsuario();
        }
        else
        {
            let lista=[]
            if(nombre=="")
            {
                lista.push(nuevoNombre)
                marcarOpcionVacia(lista)
            }
            if(apellido=="")
            {
                lista.push(nuevoApellido)
                marcarOpcionVacia(lista)
            }
            if(usuario=="")
            {
                lista.push(nuevoUsuario)
                marcarOpcionVacia(lista)
            }
            if(direccion=="")
            {
                lista.push(nuevaDireccion)
                marcarOpcionVacia(lista)
            }
            if(contrasenia=="")
            {
                lista.push(nuevaContrasenia)
                marcarOpcionVacia(lista)
            }
            let alerta = document.createElement("p");
            alerta.innerText="Faltan campos por completar";
            inicio.appendChild(alerta);
        }
}
const agregarTarjeta = (DesplegarCat) =>
{
    DesplegarCat.innerHTML="";
    let nuevoNumero = document.createElement("input")
    nuevoNumero.type="number";
    nuevoNumero.placeholder="Ingrese el numero de la tarjeta";
    let nuevoNombreEnTarjeta = document.createElement("input");
    nuevoNombreEnTarjeta.type="text"
    nuevoNombreEnTarjeta.placeholder = "Ingrese el nombre como figura en la tarjeta";
    let nuevoVencimiento = document.createElement("input");
    nuevoVencimiento.type = "month"
    let nuevoCodigoSeguridad = document.createElement("input");
    nuevoCodigoSeguridad.type="number"
    nuevoCodigoSeguridad.placeholder="Codigo de seguridad";
    let nuevoTipo = document.createElement("select");
    let tipoDebito = document.createElement("option");
    tipoDebito.setAttribute("value", "Debito");
    let tipoDebitoTexto = document.createTextNode("Debito");
    tipoDebito.appendChild(tipoDebitoTexto);
    let tipoCredito = document.createElement("option");
    tipoCredito.setAttribute("value", "Credito");
    let tipoCreditoTexto = document.createTextNode("Credito");
    tipoCredito.appendChild(tipoCreditoTexto);
    nuevoTipo.appendChild(tipoCredito);
    nuevoTipo.appendChild(tipoDebito);
    let nuevoBanco = document.createElement("select");
    let nuevoBancoMacro = document.createElement("option");
    nuevoBancoMacro.setAttribute("value", "Macro");
    let nuevoBancoMacroTexto = document.createTextNode("Macro");
    nuevoBancoMacro.appendChild(nuevoBancoMacroTexto);
    let nuevoBancoNacion = document.createElement("option");
    nuevoBancoNacion.setAttribute("value", "Nacion");
    let nuevoBancoNacionTexto = document.createTextNode("Nacion");
    nuevoBancoNacion.appendChild(nuevoBancoNacionTexto);
    nuevoBanco.appendChild(nuevoBancoMacro);
    nuevoBanco.appendChild(nuevoBancoNacion);
    let nuevoEmisora = document.createElement("select")
    let nuevoEmisoraVisa = document.createElement("option");
    nuevoEmisoraVisa.setAttribute("value", "Visa");
    let nuevoEmisoraVisaTexto = document.createTextNode("Visa");
    nuevoEmisoraVisa.appendChild(nuevoEmisoraVisaTexto);
    let nuevoEmisoraMaster = document.createElement("option");
    nuevoEmisoraMaster.setAttribute("value", "MasterCard");
    let nuevoEmisoraMasterTexto= document.createTextNode("MasterCard");
    nuevoEmisoraMaster.appendChild(nuevoEmisoraMasterTexto);
    nuevoEmisora.appendChild(nuevoEmisoraVisa);
    nuevoEmisora.appendChild(nuevoEmisoraMaster);
    let btnAceptar = document.createElement("button");
    btnAceptar.classList="btn btn-outline-success"
    btnAceptar.innerText="Aceptar";
    btnAceptar.addEventListener("click", ()=>
    {
        pushearTarjeta(nuevoNumero, nuevoNombreEnTarjeta, nuevoVencimiento, nuevoCodigoSeguridad, nuevoTipo, nuevoBanco, nuevoEmisora,DesplegarCat)
    });
    DesplegarCat.appendChild(nuevoNumero)
    DesplegarCat.appendChild(nuevoNombreEnTarjeta)
    DesplegarCat.appendChild(nuevoVencimiento)
    DesplegarCat.appendChild(nuevoCodigoSeguridad)
    DesplegarCat.appendChild(nuevoTipo)
    DesplegarCat.appendChild(nuevoBanco)
    DesplegarCat.appendChild(nuevoEmisora)
    DesplegarCat.appendChild(btnAceptar)
}
const pushearTarjeta = (nuevoNumero, nuevoNombreEnTarjeta, nuevoVencimiento, nuevoCodigoSeguridad, nuevoTipo, nuevoBanco, nuevoEmisora,DesplegarCat)=>
{

    let numero = nuevoNumero.value;
    let nombreEnTarjeta = nuevoNombreEnTarjeta.value;
    let vencimiento = nuevoVencimiento.value;
    let codigoSeguridad = nuevoCodigoSeguridad.value;
    let seleccionTipo = nuevoTipo.options[nuevoTipo.selectedIndex].value;
    let listaAuxTipo = tipo.map ((tipos)=>tipos.nombre);
    let indiceTipo = listaAuxTipo.indexOf(seleccionTipo);
    let tipoTarjeta = tipo[indiceTipo]; 
    let seleccionBanco = nuevoBanco.options[nuevoBanco.selectedIndex].value;
    let listaAuxBanco = banco.map ((bancos)=>bancos.nombre);
    let indiceBanco = listaAuxBanco.indexOf(seleccionBanco);
    let bancoTarjeta = banco[indiceBanco]
    let seleccionEmisora = nuevoEmisora.options[nuevoEmisora.selectedIndex].value;
    let listaAuxEmisora = emisora.map((emisaras)=>emisaras.nombre);
    let indiceEmisora = listaAuxEmisora.indexOf(seleccionEmisora);
    let emisoraTarjeta = emisora[indiceEmisora];
    if(numero != "" && nombreEnTarjeta != "" && vencimiento != "" && codigoSeguridad != "" && tipoTarjeta != "" && bancoTarjeta != "" && emisoraTarjeta != "")
    {
        let tarjeta = new Tarjeta(numero, nombreEnTarjeta, vencimiento, codigoSeguridad, tipoTarjeta, bancoTarjeta, emisoraTarjeta);
        esta.tarjeta.push(tarjeta);
        carrito(DesplegarCat);
    }
    else
    {
        let lista = []
        if(numero=="")
        {
            lista.push(nuevoNumero)
            marcarOpcionVacia(lista)
        }
        if(nombreEnTarjeta=="")
        {
            lista.push(nuevoNombreEnTarjeta)
            marcarOpcionVacia(lista)
        }
        if(vencimiento=="")
        {
            lista.push(nuevoVencimiento)
            marcarOpcionVacia(lista)
        }
        if(codigoSeguridad=="")
        {
            lista.push(nuevoCodigoSeguridad)
            marcarOpcionVacia(lista)
        }
        if(tipoTarjeta=="")
        {
            lista.push(nuevoTipo)
            marcarOpcionVacia(lista)
        }
        if(bancoTarjeta=="")
        {
            lista.push(nuevoBanco)
            marcarOpcionVacia(lista)
        }
        if(emisoraTarjeta=="")
        {
            lista.push(nuevoEmisora)
            marcarOpcionVacia(lista)
        }
        let alerta = document.createElement("p");
        alerta.innerText="Faltan campos por completar";
        DesplegarCat.appendChild(alerta);
    }
}
const listasAuxiliares = ()=> //Esta Funcion es para tomar del local storage las listas y asi  poder actualizarlas
{
    const listaClientesAuxiliar = JSON.parse(localStorage.getItem("Usuarios"));
    if(listaClientesAuxiliar != null)
    {
        listaClientesAuxiliar.forEach((cliente) =>
        {
            clientes.push(cliente);
        })
    }
    const listaProductosAuxiliar = JSON.parse(localStorage.getItem("Productos"))
    if(listaProductosAuxiliar != null)
    {
        listaProductosAuxiliar.forEach((producto)=>
        {
            productos.push(producto)
        })
    }
}
let esta; // auxiliar que nos va a servir para saber que cliente o usuario esta en uso del sistema.
// Creo los Arrays que van a tener infromacion variable.
const productos = [];
const clientes = [];
// Creo el administrador de la pagina y un array de admnistradores
let administrador = new Admin(generarID(),"Lucas","Kripper","12345A") // La contrsaeña puede ser alfanumerica.
const administradores = [];
administradores.push(administrador); // agrego el admin a mi array
// Creo las subsecciones que voy a utlizar y un array que las obtenga.
let subSeccionHombre = new SubSeccion(generarID(),"Hombre");
let subSeccionMujer = new SubSeccion(generarID(),"Mujer");
let subSeccionNiño = new SubSeccion(generarID(),"Niño");

const subSecciones = [subSeccionHombre,subSeccionMujer,subSeccionNiño];
// Creo las secciones que voy a utilizar y su array correspondiente
let seccionBoxeo = new Seccion(generarID(), "Boxeo", subSecciones);
let seccionMMA = new Seccion(generarID(), "MMA", subSecciones);
let seccionCrossFit = new Seccion(generarID(), "CrossFit", subSecciones);
let seccionRunning = new Seccion(generarID(), "Running", subSecciones);

const secciones = [seccionBoxeo,seccionMMA,seccionCrossFit,seccionRunning];
// Creo las opciones de las tarjetas de credito
let tipoTarjetaDebito = new ExtraTarjetas(generarID(), "Debito");
let tipoTarjetaCredito = new ExtraTarjetas(generarID(), "Credito");

const tipo = [tipoTarjetaCredito,tipoTarjetaDebito];

let macro = new ExtraTarjetas(generarID(),"Macro");
let nacion = new ExtraTarjetas(generarID(),"Nacion");

const banco = [macro,nacion];

let visa = new ExtraTarjetas(generarID(),"Visa");
let mastercard = new ExtraTarjetas(generarID(),"Master Card");

const emisora = [visa, mastercard];
localStorage.setItem("Administradores", JSON.stringify(administradores));

