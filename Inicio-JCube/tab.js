const coloresHover = [
  { r: 255, g: 80,  b: 80  },
  { r: 255, g: 255, b: 100 },
  { r: 100, g: 255, b: 100 },
  { r: 100, g: 255, b: 255 },
  { r: 100, g: 100, b: 255 },
  { r: 255, g: 100, b: 255 }
];

function crearOpcion(id, nombre, logo, link) {
  const contenedor = document.getElementById(id);
  contenedor.innerHTML = "";

  const casilla = document.createElement("div");
  casilla.className = "casilla " + (link ? "verde" : "roja");
  casilla.textContent = link ? "✔" : "❌";

  const fila = document.createElement(link ? "a" : "div");
  fila.className = "opcion";
  if (link) {
    fila.href = link;
    fila.target = "_blank";
    fila.rel = "noopener noreferrer";
  }

  const img = document.createElement("img");
  img.src = logo;
  const texto = document.createElement("span");
  texto.className = "nombre";
  texto.textContent = nombre;

  fila.appendChild(img);
  fila.appendChild(texto);
  fila.appendChild(casilla);
  contenedor.appendChild(fila);
}

function mostrarModal(pack) {
  document.getElementById("modal-titulo").textContent = pack.titulo;
  document.getElementById("modal-descripcion").textContent = pack.descripcion;

  crearOpcion("modrinth-opcion", "Modrinth", "../assets/gui/logo/modrinth.png", pack.links.modrinth);
  crearOpcion("curseforge-opcion", "CurseForge", "../assets/gui/logo/curseforge.png", pack.links.curseforge);
  crearOpcion("planetmc-opcion", "PlanetMinecraft", "../assets/gui/logo/planetmc.png", pack.links.planetmc);

  document.getElementById("modal").classList.remove("oculto");
}

document.getElementById("modal").addEventListener("click", e => {
  if (e.target.id === "modal") {
    document.getElementById("modal").classList.add("oculto");
  }
});

function crearPestana(pack, index) {
  const pestana = document.createElement("div");
  const esDerecha = index % 2 !== 0;
  pestana.className = "pestana " + (esDerecha ? "derecha" : "izquierda");
  pestana.style.top = `${80 + index * 140}px`;

  const img = document.createElement("img");
  img.src = pack.logo;

  const texto = document.createElement("div");
  texto.className = "contenido-texto";

  const h2 = document.createElement("h2");
  h2.textContent = pack.titulo;

  const p = document.createElement("p");
  p.textContent = pack.descripcion;

  const creditos = document.createElement("p");
  creditos.className = "creditos";
  creditos.innerHTML = `<strong>AUTOR:</strong> ${pack.autor}<br><strong>COLABORACION:</strong> ${pack.colaboracion}`;

  texto.appendChild(h2);
  texto.appendChild(p);
  texto.appendChild(creditos);

  // Orden corregido: si es derecha, primero texto, luego imagen
  if (esDerecha) {
    pestana.appendChild(texto);
    pestana.appendChild(img);
  } else {
    pestana.appendChild(img);
    pestana.appendChild(texto);
  }

  const elegido = coloresHover[Math.floor(Math.random() * coloresHover.length)];
  const hoverColor = `rgba(${elegido.r}, ${elegido.g}, ${elegido.b}, 0.35)`;
  const borderColor = `rgb(${elegido.r}, ${elegido.g}, ${elegido.b})`;

  pestana.addEventListener("mouseenter", () => {
    pestana.style.backgroundColor = hoverColor;
    pestana.style.borderTop = `2px solid ${borderColor}`;
    pestana.style.borderBottom = `2px solid ${borderColor}`;
    pestana.querySelector("img").style.borderRadius = "0";
  });

  pestana.addEventListener("mouseleave", () => {
    pestana.style.backgroundColor = "rgba(44, 62, 80, 0.35)";
    pestana.style.borderTop = "none";
    pestana.style.borderBottom = "none";
    pestana.querySelector("img").style.borderRadius = "12px";
  });

  pestana.addEventListener("click", () => mostrarModal(pack));

  document.getElementById("contenedor-pestanas").appendChild(pestana);
}

window.addEventListener("DOMContentLoaded", () => {
  if (typeof packs !== "undefined") {
    packs.forEach((pack, i) => crearPestana(pack, i));
  }
});
