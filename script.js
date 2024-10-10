let url = "https://ddragon.leagueoflegends.com/cdn/13.1.1/data/en_US/champion.json";
let championsData = [];
let filteredRole = ""; // Variable para almacenar el filtro de rol actual

// Fetch inicial de los datos
fetch(url)
  .then((results) => results.json())
  .then((data) => {
    championsData = Object.values(data.data); // Guardamos los datos en una variable global
    crearCard(championsData); // Muestra todas las cards inicialmente
  })
  .catch((error) => console.error("Error al obtener los datos:", error));

// Función para crear y mostrar las cards de campeones
function crearCard(data) {
  let container = document.getElementById("filtered-champions");
  let cardsHTML = "";

  if (data.length === 0) {
    cardsHTML = "<p>No se encontraron campeones</p>";
  } else {
    data.forEach(champion => {
      // Construye la URL completa de la imagen
      let imageUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champion.id}_0.jpg`;

      cardsHTML += `
      <div class="card">
        <h3>${champion.id}</h3>
        <p style="text-transform: capitalize;">${champion.title}</p>
        <img class="image" src="${imageUrl}" alt="${champion.id}">
        <br>
        <p>${champion.blurb}</p>
        <p>${champion.tags.join(', ')}</p>
      </div>
      `;
    });
  }

  container.innerHTML = cardsHTML;
}

// Función para buscar campeones por nombre y aplicar el filtro de rol
function buscarCampeon() {
  let input = document.getElementById('search-bar').value.toLowerCase();
  let campeonesFiltrados = championsData.filter(champion => {
    let matchesName = champion.id.toLowerCase().includes(input) || champion.title.toLowerCase().includes(input);
    let matchesRole = filteredRole === "" || champion.tags.includes(filteredRole);
    return matchesName && matchesRole; // Coincidencia tanto por nombre como por rol
  });
  crearCard(campeonesFiltrados); // Actualiza la vista con los campeones filtrados
}

// Función para filtrar campeones por rol
function filtrarPorRol(rol) {
  filteredRole = rol; // Actualiza el rol que queremos filtrar
  buscarCampeon(); // Llama a la función de búsqueda para aplicar tanto el filtro de rol como el de nombre
}

// Función para mostrar todos los campeones (quitar el filtro)
function mostrarTodos() {
  filteredRole = ""; // Resetea el filtro de rol
  buscarCampeon(); // Actualiza la vista para mostrar todos los campeones
}
