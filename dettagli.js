const params = new URLSearchParams(location.search);
const id = params.get('id');
const detailContainer = document.getElementById("detailContainer");

fetch (`https://striveschool-api.herokuapp.com/books/${id}`)
  
.then(response => { return response.json()})

.then(details => { 
  detailContainer.innerHTML = 
  `
  <div class="col-3">
    <img src="${details.img}" alt="">
  </div>
  <div class="col-9">
    <h1>
      ${details.title}
    </h1>
    <div class='my-5'>
      Price : ${details.price}
    </div>
    <div class='my-5'>
      Category : ${details.category}
    </div>
    <div class='fs-4 my-5'>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse, tempore vero alias ea, distinctio consectetur sint, ducimus non minus pariatur ratione libero et! Praesentium quis alias veniam veritatis maxime facere a rem vel suscipit quidem totam, eveniet nesciunt assumenda repellendus dignissimos aliquid sunt sed nam asperiores aliquam. Eum, explicabo blanditiis!
    </div>
    <a href="index.html" class="btn btn-outline-dark" target="_blank">Torna alla home</a>
  </div>
  `
  })

.catch(e => {console.error("Errore in jsonplaceholder:", e)})