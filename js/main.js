let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".agregar").forEach((boton) => {
    boton.addEventListener("click", (e) => {
      const producto = e.target.closest(".producto");
      const nombre = producto.getAttribute("data-nombre");
      const precio = parseFloat(producto.getAttribute("data-precio"));
      agregarAlCarrito(nombre, precio);
    });
  });

  document.getElementById("vaciar").addEventListener("click", vaciarCarrito);
  document.getElementById("comprar").addEventListener("click", comprar);
  actualizarCarrito();
});

function agregarAlCarrito(nombre, precio) {
  let producto = carrito.find((p) => p.nombre === nombre);
  if (producto) {
    producto.cantidad++;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }
  guardarCarrito();
  actualizarCarrito();
}

function actualizarCarrito() {
  const carritoDiv = document.getElementById("carrito");
  const totalSpan = document.getElementById("total");
  carritoDiv.innerHTML = "";
  let total = 0;

  carrito.forEach((producto, index) => {
    total += producto.precio * producto.cantidad;
    const item = document.createElement("div");
    item.innerHTML = `
                    ${producto.nombre} - $${producto.precio} x ${producto.cantidad} 
                    <button class="modificar" data-index="${index}" data-cambio="1">+</button>
                    <button class="modificar" data-index="${index}" data-cambio="-1">-</button>
                `;
    carritoDiv.appendChild(item);
  });

  totalSpan.textContent = total;
  document.querySelectorAll(".modificar").forEach((boton) => {
    boton.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      const cambio = parseInt(e.target.getAttribute("data-cambio"));
      modificarCantidad(index, cambio);
    });
  });
}

function modificarCantidad(index, cambio) {
  carrito[index].cantidad += cambio;
  if (carrito[index].cantidad <= 0) {
    carrito.splice(index, 1);
  }
  guardarCarrito();
  actualizarCarrito();
}

function vaciarCarrito() {
  carrito = [];
  guardarCarrito();
  actualizarCarrito();
}

function comprar() {
  if (carrito.length === 0) {
    alert("El carrito está vacío. Agrega productos antes de comprar.");
    return;
  }
  alert("Compra realizada con éxito. Gracias por tu compra!");
  vaciarCarrito();
}

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}
