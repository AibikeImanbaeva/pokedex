const API = "https://pokeapi.co/api/v2/pokemon";
let pokeCard = document.querySelector('.pokeCard');
let prevPageBtn =  document.getElementById('prev-page');
let nextPageBtn = document.getElementById('next-page');
let count = 0;

async function getBaseUrl() {
  const res = await fetch(`${API}?limit=20&offset=${count}`);
  const data = await res.json();
  return data;
}

async function get20(data) {
  const urls = data.results.map((pokemon) => pokemon.url);

  const pokeData = [];
  for (const url of urls) {
    const pokeResponse = await fetch(url);
    const pokeInfo = await pokeResponse.json();
    pokeData.push(pokeInfo);
  }

  console.log(pokeData);

  for (let i = 0; i < pokeData.length; i++) {
    pokeCard.innerHTML += `
      <div id="${pokeData[i].id}" class="pokemon">
        <h2 class="pokemon_name">${pokeData[i].name}</h2>
        <img class="pokemon_image" src="${pokeData[i].sprites["front_default"]}" />
      </div>
    `;
  }
}

prevPageBtn.addEventListener('click', async () => {
  if (count >= 20) {
    count -= 20;
    pokeCard.innerHTML = '';
    const data = await getBaseUrl();
    get20(data);
  }
});

nextPageBtn.addEventListener('click', async () => {
  count += 20;
  pokeCard.innerHTML = '';
  const data = await getBaseUrl();
  get20(data);
});

// Изначальный вызов
getBaseUrl().then((data) => get20(data));