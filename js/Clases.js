class Cliente
{
    constructor(id, nombre, apellido, tarjeta, productoFavorito, carritoDeCompras, direccion, usuario, contrasenia)
    {
        this.id = id,
        this.nombre = nombre,
        this.apellido = apellido,
        this.tarjeta = tarjeta,
        this.productoFavorito = productoFavorito,
        this.carritoDeCompras = carritoDeCompras,
        this.direccion = direccion,
        this.usuario = usuario,
        this.contrasenia = contrasenia
    }
}
class Admin
{
    constructor(id, nombre, apellido, contrasenia)
    {
        this.id = id,
        this.nombre = nombre,
        this.apellido = apellido,
        this.contrasenia = contrasenia
    }
}
// producto, seccion y subseccion se van.
class Producto
{
    constructor(id, nombre, descripcion, precio, stock, seccion, subSeccion, imagen)
    {
        this.id = id,
        this.nombre = nombre,
        this.descripcion = descripcion,
        this.precio = precio,
        this.stock = stock,
        this.seccion = seccion,
        this.subSeccion = subSeccion,
        this.imagen = imagen
    }
}
class Seccion
{
    constructor(id, nombre, subSeccion)
    {
        this.id = id,
        this.nombre = nombre,
        this.subSeccion = subSeccion
    }
}
class SubSeccion
{
    constructor(id, nombre)
    {
        this.id = id,
        this.nombre = nombre
    }
}
class Tarjeta 
{
    constructor(numero, nombreEnTarjeta, vencimiento, codigoSeguridad, tipo, banco, emisora)
    {
        this.numero = numero,
        this.nombreEnTarjeta = nombreEnTarjeta,
        this.vencimiento = vencimiento,
        this.codigoSeguridad = codigoSeguridad,
        this.tipo = tipo,
        this.banco = banco,
        this.emisora = emisora
    }
}
class ExtraTarjetas
{
    constructor(id, nombre)
    {
        this.id = id,
        this.nombre = nombre
    }
}
