// API ENDPOINT : `https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${searchInput}`

const form = document.querySelector('form');
const input = document.querySelector('input');
const errorMsg = document.querySelector('.error-msg');
const loader = document.querySelector('.loader');
const resultsDisplay = document.querySelector('.result-search');


form.addEventListener('submit', handleSubmit)

function handleSubmit(event) {
  // Comportement par défault
  event.preventDefault()

  if (input.value === '') {
    errorMsg.textContent = "Veuillez remplir l'input";
    return;
  } else {
    errorMsg.textContent = "";
    loader.style.display = "flex";
    resultsDisplay. textContent = "";
    wikiApiCall(input.value);
  }
}

async function wikiApiCall(searchInput) {

  try {
  const response = await fetch(`https://en.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=10&srsearch=${searchInput}`);

  if (!response.ok) {
    throw new Error(`${response.status}`)
  }

  const dataApi = await response.json()

  createCards(dataApi.query.search);
  }
  catch(error){
    errorMsg.textContent = `${error}`;
    loader.display.style = "none";
  }
}

function createCards(data) {
  if(!data.length){
    errorMsg.textContent = "Oops, aucun résultat !";
    loader.style.display = "none";
    return;
  }


  data.forEach(el => {
    console.log(el);

    const urlWiki = `https://en.wikipedia.org/?curid=${el.pageid}`
    const card = document.createElement('div');
    card.className = "result-item";
    card.innerHTML = `
    <h3 class="result-title"
      <a href=${urlWiki} target="_blank">${el.title}</a>
    </h3>
    <a href=${urlWiki} class="result-link" target="_blank ">${urlWiki}</a>
    <span class="result-snippet">${el.snippet}</span>
    <br>
    `
    resultsDisplay.appendChild(card);
    loader.style.display = "none";
  })
}
