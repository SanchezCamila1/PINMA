//Cargar mas productos
let loadMoreBtn= document.querySelector('#load-more');
let currentItem= 8;

loadMoreBtn.onclick=()=>{
    let boxes= [...document.querySelectorAll('.box-container .box')];
    for(var i= currentItem; i<currentItem + 4; i++){
        boxes[i].style.display='inline-block';
    }
    currentItem+= 4;
    if(currentItem>=boxes.length){
        loadMoreBtn.style.display = 'none'
    }
}


//CARRITO

const carrito = document.querySelector('#carrito');
const listaProducto = document.querySelector('#lista-producto');
const listaCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn= document.querySelector('#vaciar-carrito');
const realizarCompraBtn= document.querySelector('#realizar-compra');
let articuloCarrito = []

cargarEventListeners();
function cargarEventListeners(){
    listaProducto.addEventListener('click', agregar_producto);

    //eliminar producto
    carrito.addEventListener('click', eliminarProducto);

    //vaciar carrito

    vaciarCarritoBtn.addEventListener('click', ()=> {
        articuloCarrito= [];
        limpiarHTML()

    });

}

function agregar_producto(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')) {
        productoSeleccionado = e.target.parentElement.parentElement;
        leerDatosProducto(productoSeleccionado);
    }
}

function eliminarProducto(e){
    if(e.target.classList.contains("borrar")) {
        const productoId = e.target.getAttribute('data-id');
        const existe = articuloCarrito.some(producto => (producto.id === productoId && producto.cantidad > 1));
        
        if(existe){
            const productos = articuloCarrito.map(producto => {
                if(producto.id === productoId){
                    producto.cantidad--;
                }
                return producto;
            });
            articuloCarrito = [...productos];
        }else{
            articuloCarrito = articuloCarrito.filter(producto => producto.id !== productoId);
        }

        carritoHTML();

    }
}

function leerDatosProducto(producto) {
    infoProducto = {
        imagen: producto.querySelector('img').src,
        titulo: producto.querySelector('h3').textContent,
        precio: producto.querySelector('.precio').textContent,
        id: producto.querySelector('a').getAttribute('data-id'),
        color: producto.querySelector('#color-producto').value,
        cantidad: 1
    }
    
    const existe = articuloCarrito.some(producto => producto.id === infoProducto.id);
    
    if (existe) {
        const productos = articuloCarrito.map(producto => {
          if (producto.id === infoProducto.id) { 
            producto.cantidad++;
            return producto;
          } else {
            return producto;
          }
        });
        articuloCarrito = [...productos];
      } else {
        articuloCarrito = [...articuloCarrito, infoProducto];
      }

    console.log(articuloCarrito);

    carritoHTML();

}

function carritoHTML(){

    limpiarHTML();

    articuloCarrito.forEach(producto => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${producto.imagen}" width:"100"></img>
            </td>
            <td>
                ${producto.titulo}
            </td>
            <td>
                ${producto.precio}
            </td>
            <td>
                ${producto.cantidad}
            </td>
            <td>
            <span style="background-color: ${producto.color}; width: 20px; height: 20px; display: inline-block;"></span>
            </td>
            <td>
                <a href="#" class="borrar" data-id=${producto.id}>X</a>
            </td>
        
        `; 

        listaCarrito.appendChild(row);
    });
}

function limpiarHTML(){

    while(listaCarrito.firstChild){
        listaCarrito.removeChild(listaCarrito.firstChild);
    }
}

