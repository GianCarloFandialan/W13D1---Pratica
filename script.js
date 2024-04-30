/* Creo le variabili */
const booksRowContainer = document.getElementById("booksRowContainer");
const BooksSection = document.getElementById("BooksSection");
const booksH3 = document.getElementById("booksH3");
const cartRowContainer = document.getElementById("cartRowContainer");
const CartSection = document.getElementById("CartSection");
const cartSectionLink = document.getElementById("cartSectionLink");
const counterTotaleCarrello = document.getElementById("counterTotaleCarrello");
const counterTotaleCarrelloSpan = document.getElementById("counterTotaleCarrelloSpan");
const carrelloVuoto = document.getElementById("carrelloVuoto");
const barraRicerca = document.getElementById("barraRicerca");
const bottoneRicerca = document.getElementById("bottoneRicerca");
const cartCountIcon = document.getElementById("cartCountIcon");
const siteButton = document.getElementById("siteButton");
const homeButton = document.getElementById("homeButton");
const svuotaCarrello = document.getElementById("svuotaCarrello");
const nessunRisultato = document.getElementById("nessunRisultato");
const risultati = document.getElementById("risultati");
const risultatiSpan = document.getElementById("risultatiSpan");

/* Carico tutti i libri nella pagina */
fetch(`https://striveschool-api.herokuapp.com/books`)

  .then(response => { return response.json()})

  .then(books => { 

    /* Dato che il risultato del json è un array, con un foreach creeo una card per ogni libro */
    books.forEach(book => {

      /* Creo il conenitore col in cui andrò ad insrire la card */
      col = document.createElement("div");
      col.classList.add("col");
      col.classList.add("my-5");

      /* Inserisco col dentro il contentitore row */
      booksRowContainer.appendChild(col)

      /* CREO LA CARD E AGGIUNGO LE VARIE CLASSI*/
      card = document.createElement("div");
      card.classList.add("card");
      // card.setAttribute("id",`${book.asin}`)

      /* VADO AD INSERIRE IL CONTENUTO DELLA CARD*/
      card.innerHTML = 
      `
 
      <img src="${book.img}" class="card-img-top" alt="...">
      <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success d-none" id="${book.asin}">
        0
      </span>
      <div class="card-body">
        <h5 class="card-title">${book.title}</h5>
        <p class="card-text">Price: ${book.price} €</p>
        <a href="#" class="btn btn-success mt-3" onClick="addToCart(event)">+<i class="bi bi-cart2 me-3 "></i></a>
        <a href="#" class="btn btn-danger mt-3" onClick="salta(event)">Cancella</a>
        <a href="./dettagli.html?id=${book.asin}" class="btn btn-outline-dark mt-3" target="_blank">Dettagli</a>
      </div>
      `

      /* INSERISCO LA CARD DENTRO IL CONTENITORE COL*/
      col.appendChild(card)
      })
      CartSection.classList.add("d-none")
      counterTotaleCarrello.classList.add("d-none")
      
    })

  .catch(e => {console.error("Errore in jsonplaceholder:", e)})


//Creo un array in cui andrò ad inserire i titoli dei vari film nel carrello
let cartTitles = [];

/*Creo la funzione dell'aggiungere nel carrello*/
function addToCart(event) {

  /* CREO LA VARIABILE IN CUI SELEZIONO IL CONTATORE DI OGNI CARD*/
  let a = event.target.parentElement.previousSibling.previousSibling

  /*CREO UNA CONDIZIONE NEL CASO PREMESSI IL PULSANTE VERDE O ROSSO*/
  // SE SI PREME QUELLO VERDE:
  if (event.target.classList.contains("btn-success")) {
    
    carrelloVuoto.classList.add("d-none");

    cartCountIcon.innerText = `${Number(cartCountIcon.innerText) + 1}`
    counterTotaleCarrelloSpan.innerText = `${Number(counterTotaleCarrelloSpan.innerText) + 1}`
    counterTotaleCarrello.classList.remove("d-none")
    svuotaCarrello.classList.remove("d-none")

    // AUMENTO IL CONTATORE DEL LIBRO SPECIFICO NEL CARRELLO QUESTO DELLE CARD NELLA SEZIONE NORMALE
    a.innerText = `${Number(a.innerText) + 1 }`;

    // FACCIO SI CHE QUANDO IL CONTATORE STA A 0 NON LO RENDO VISIBILE
    if ((Number(a.innerText)) > 0 && (Number(a.innerText)) == 1) {
      a.classList.remove("d-none")
    }

    fetch(`https://striveschool-api.herokuapp.com/books`)

    .then(response => { return response.json()})

    .then(books => { 

      //TROVO L'INDICE DEL LIBRO CHE MI INTERESSA DALL'ARRAY DELL'API
      //(event.target.parentNode.parentNode.firstChild.nextElementSibling.nextElementSibling.id) PUNTO ALLO SPAN IN CUI HO MESSO COME ID L'ASIN PRECEDENTEMENTE
      let index = books.findIndex(elemento => elemento.asin == event.target.parentNode.parentNode.firstChild.nextElementSibling.nextElementSibling.id);

      // SE IL LIBRO è GIà STATO AGGIUNTO NEL CARRELLO FACCIO SI CHE CHE AUMENTI SOLO IL CONTATORE E NON SI CREI UNA NUOVA CARD
      if (cartTitles.includes(`${books[index].title}`)) {

        //(card.firstChild.nextElementSibling.nextElementSibling.innerText) è IL CONTATORE DELLE CARD NEL CARRELLO
        card.firstChild.nextElementSibling.nextElementSibling.innerText = `${Number(card.firstChild.nextElementSibling.nextElementSibling.innerText) + 1 }`;
      } else {

        //SE IL LIBRO NON è STATO ANCORA AGGIUNTO AL CARRRELLO FACCIO SI CHE SI CREI UNA CARD E LA AGGIUNGO ALLA SEZIONE DEL CARRELLO
        cartTitles.push(books[index].title);
        col = document.createElement("div");
        col.classList.add("col");
        cartRowContainer.appendChild(col)
        card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = 
        `
        <img src="${books[index].img}" class="card-img-top" alt="...">
        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
        1
        </span>
        <div class="card-body">
          <h5 class="card-title">${books[index].title}</h5>
          <p class="card-text">Price: ${books[index].price} €</p>
          <a href="#" class="btn btn-danger" onClick="addToCart(event)">Rimuovi</a>
        </div>
        `
        col.appendChild(card)
      }      
      })

    .catch(e => {console.error("Errore in jsonplaceholder:", e)})

    return cartTitles
  } 
  // NEL CASO PREMESSI IL TASTO ROSSO PER RIMUOVERE DAL CARRELLO
  else if (event.target.classList.contains("btn-danger")) {

    if (Number(counterTotaleCarrelloSpan.innerText) > 0) {
      counterTotaleCarrelloSpan.innerText = `${Number(counterTotaleCarrelloSpan.innerText) - 1}`;
      cartCountIcon.innerText = `${Number(cartCountIcon.innerText) - 1}`;
      counterTotaleCarrello.classList.remove("d-none")
    }
    
    
    fetch(`https://striveschool-api.herokuapp.com/books`)

    .then(response => { return response.json()})

    .then(books => { 

      //TROVO L'INDICE NELL'API DELL'ELEMENTO A CUI PREMO IL BOTTONE 
      let index = (books.findIndex(element => element.title == event.target.previousSibling.previousSibling.previousSibling.previousSibling.innerText));

      //ADESSO IN BASE ALL'INDICE PRECEDENTEMENTE CERCATO GRAZIE AL CODICE ASIN VADO A CREARE UNA VARIABILE CHE MI TRACCI IL CONTATORE NELLA SEZIONE NORMALE CUI AVEVO MESSO UN ID
      let contatoreNormale = document.getElementById(`${books[index].asin}`);

      //PONGO DELLE CONDIZIONI CIOè CHE SE NON è 0 PRATICAMENTE POSSO SOTTRARRE ANCORA DI 1 AL CONTATORE
      if (Number(contatoreNormale.innerText) > 0) {
        contatoreNormale.innerText = `${Number(contatoreNormale.innerText) - 1 }`;

        //SE IL CONTATORE DIVENTA 0 LO FACCIO SPARIRE COSI LA CARD TORNA COM'ERA DI DEFAULT
        if (Number(contatoreNormale.innerText) == 0) {
          contatoreNormale.classList.add("d-none")
        }
      }
    })

    .catch(e => {console.error("Errore in jsonplaceholder:", e)})

    //ADESSO VADO AD AGIRE SUL CONTATORE NELLA CARD DELLA SEZIONE CARRRELLO E PONGO PRATICAMENTE LE STESSE CONDIZIONI
    if ((Number(a.innerText)) > 0) {
      a.innerText = `${Number(a.innerText) - 1 }`;
      if ((Number(a.innerText)) == 0) {

        //L'UNICA DIFFERENZA STA NEL FATTO CHE SE IL CONTATORE ARRIVA A 0 RIMUOVO TOTALMENTE LA CARD E RIMUOVO IL TITOLO FRA I TITOLI NELL'ARRAY
        event.target.parentElement.parentElement.parentElement.remove()  
        cartTitles.splice(cartTitles.findIndex(elemento => elemento == event.target.parentElement.firstChild.nextElementSibling.innerText), 1)

        if (cartRowContainer.childElementCount == 0) {
          carrelloVuoto.classList.remove("d-none")
          counterTotaleCarrello.classList.add("d-none")
          svuotaCarrello.classList.add("d-none")
        }
        
        return cartTitles

      }
    }


  }
}

// CREO LA FUNZIONE PER LA BARRA DI RICERCA
bottoneRicerca.addEventListener('click', function() {

  CartSection.classList.add("d-none")

  let counter = 0;

  //FACCIO PARTIRE UN CICLO CHE VERIFICHI TUTTI I LIBRI
  for (let i = 0; i < booksRowContainer.childElementCount; i++) {
    let primoArray = Array.from(booksRowContainer.children[i].children);
    booksRowContainer.children[i].classList.remove("d-none")

    //SE LA LUNGHEZZA DELLA STRINGA è ALMNO DI 3 CARATTERI FACCIO PARTIRE LA RICERCA
    if (barraRicerca.value.length > 3) {

      //SE LA CARD CONTIENE NEL TITOLO IL VALORE INSERITO NON SCOMPARE ALTRIMENTI SI
      if (primoArray[0].children[2].children[0].innerText.toLowerCase().includes(`${barraRicerca.value.toLowerCase()}`)) {
        counter += 1
        continue
      } else{
        booksRowContainer.children[i].classList.add("d-none")
      }

      if (counter == 0) {
        nessunRisultato.classList.remove("d-none")
        risultati.classList.add("d-none")
        risultatiSpan.innerText = `${counter}`;
      } else {
        nessunRisultato.classList.add("d-none")
        risultati.classList.remove("d-none")
        risultatiSpan.innerText = `${counter}`;
      }

    }
  }

  barraRicerca.value = '';
})

//QUANDO PREMO IL CARRELO, LA SEZIONE NORMALE SCOMPARE MENTRE COMPARE QUELLA DEL CARRELLO AGGIORANTA IN TEMP REALE
cartSectionLink.addEventListener('click', function () {
  CartSection.classList.remove("d-none")
  booksH3.classList.add("d-none")
  for (let i = 0; i < booksRowContainer.childElementCount; i++) {
    booksRowContainer.children[i].classList.add("d-none")
  }
  nessunRisultato.classList.add("d-none")
  risultati.classList.add("d-none")
})

//QUANDO PREMO IL SITO RIFACCIO COMPARIRE TUTTI I LIBRI ED ESCO DALLA SEZIONE CARRELLO
siteButton.addEventListener('click', function() {
  for (let i = 0; i < booksRowContainer.childElementCount; i++) {
    booksRowContainer.children[i].classList.remove("d-none")
  }
  CartSection.classList.add("d-none")
  booksH3.classList.remove("d-none")
  nessunRisultato.classList.add("d-none")
  risultati.classList.add("d-none")
})

//QUANDO PREMO IL PULSANTE HOME RIFACCIO COMPARIRE TUTTI I LIBRI ED ESCO DALLA SEZIONE CARRELLO
homeButton.addEventListener('click', function() {
  for (let i = 0; i < booksRowContainer.childElementCount; i++) {
    booksRowContainer.children[i].classList.remove("d-none")
  }
  CartSection.classList.add("d-none")
  booksH3.classList.remove("d-none")
  nessunRisultato.classList.add("d-none")
  risultati.classList.add("d-none")
})

//CON QUESTO BOTTONE SVUOTO IL CARRELLO E RESETTO TUTTI I CONTATORI A 0
svuotaCarrello.addEventListener('click', function() {
  cartRowContainer.innerHTML = '';
  counterTotaleCarrelloSpan.innerText = '0';
  cartCountIcon.innerText = '0';
  counterTotaleCarrello.classList.add("d-none");
  carrelloVuoto.classList.remove('d-none');
  svuotaCarrello.classList.add('d-none');
  console.log(booksRowContainer.children[0].children[0].children[1].innerText);
  for (let i = 0; i < booksRowContainer.childElementCount; i++) {
    booksRowContainer.children[i].children[0].children[1].innerText = '0';
    booksRowContainer.children[i].children[0].children[1].classList.add('d-none');
  };
  cartTitles = [];
})

//FUNZIONE CHE RIMUOVE LA CARD
function salta(event) {
  let card = event.target.closest(".col");
  card.remove();
}

//FUNZIONE DI BARRA DI RICERA
barraRicerca.addEventListener("input", function(event) {
  let contenuto = event.target.value;
  let allTitles = document.querySelectorAll(".card-title");
  if (contenuto.length > 3) {
    allTitles.forEach((titolo) => {
      const col = titolo.parentElement.parentElement.parentElement;
      if (!titolo.innerText.toLowerCase().includes(contenuto.toLowerCase())) {
        col.style.display = "none"
      } else {
        col.style.display = "block"
      }
    })
  } else {
    allTitles.forEach((titolo) => {
      const col = titolo.parentElement.parentElement.parentElement;
      col.style.display = "block"
    })
  }


})