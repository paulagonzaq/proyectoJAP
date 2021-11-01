let usuario = JSON.parse(localStorage.getItem("usuario"));

let productos = [];
var product = {};

function showImagesGallery(array) {
  let htmlContentToAppend = "";

  for (let i = 1; i < array.length; i++) {
    let imageSrc = array[i];

    htmlContentToAppend +=
      `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` +
      imageSrc +
      `" alt="">
            </div>
        </div>
        `;

    document.getElementById("productImagesGallery").innerHTML =
      htmlContentToAppend;
  }
}

function relatedProducts(array) {
    productosR = "";
    product.relatedProducts.forEach((relacionado)=>{
      productosR += 
      `<div class="col-md-4">
      <a href="products.html" class="card mb-4 shadow-sm custom-card">
        <img class="bd-placeholder-img card-img-top"  src="` + array[relacionado].imgSrc + `">
        <h3 class="m-3">` + array[relacionado].name + `</h3>
        <div class="card-body">
          <p class="card-text">` + array[relacionado].description + `</p>
        </div>
      </a>
    </div>`
})
document.getElementById("productosRelacionados").innerHTML = productosR
 }



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCT_INFO_URL).then(function (result) {
    if (result.status === "ok") {
      product = result.data;

      let productNameHTML = document.getElementById("productName");
      let productDescriptionHTML = document.getElementById("productDescription");
      let productCostHTML = document.getElementById("productCost");
      let productCurrencyHTML = document.getElementById("productCurrency");
      let productSoldCountHTML = document.getElementById("productSoldCount");
      let productCategoryHTML = document.getElementById("productCategory");

      productNameHTML.innerHTML = product.name;
      productDescriptionHTML.innerHTML = product.description;
      productCostHTML.innerHTML = product.cost;
      productCurrencyHTML.innerHTML = product.currency;
      productSoldCountHTML.innerHTML = product.soldCount;
      productCategoryHTML.innerHTML = product.category;

      showImagesGallery(product.images);
    }

  });

  getJSONData(PRODUCTS_URL).then(function (result) {
    if (result.status === "ok") {
      productos = result.data;

      relatedProducts(productos)
 }

})


  let user = "";
  let score = "";
  let description = "";
  let dateTime = "";
  let agrega = "";

  let htmlContentToAppend = "";
  fetch(PRODUCT_INFO_COMMENTS_URL)
    .then((res) => res.json())
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        let comentario = data[i];
        user = comentario.user;
        score = comentario.score;
        description = comentario.description;
        dateTime = comentario.dateTime;
        agrega = agregarEstrella(score);

        htmlContentToAppend +=
          `
            <div>
                <div class="row">
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">` +
          user +
          `</h4>
                            <medium>Puntuación: ` +
          agrega +
          ` </medium>
                        </div>
                        <h6 class="mb-1"> ` +
          description +
          `</h5>
                        <p class="text-muted">` +
          dateTime +
          `</p>
                        <br>
            
                    </div>
                </div>
            </div>
            `;
        document.getElementById("comment-list-container").innerHTML =
          htmlContentToAppend;
      }
    });

  function agregarEstrella(score) {
    let estrellaN = 5 - score;
    let estrellas = "";
    for (let i = 0; i < score; i++) {
      estrellas += `
        <span class="fa fa-star checked"></span> 
        `;
    }

    for (let i = 0; i < estrellaN; i++) {
      estrellas += `
        <span class="fa fa-star"></span> 
        `;
    }
    return estrellas;
  }

  document
    .getElementById("commentbutton")
    .addEventListener("click", function () {
      let ingreso = parseInt(document.getElementById("ingresoUser").value);
      let estrellaN = 5 - ingreso;
      let estrellas = "";
      for (let i = 0; i < ingreso; i++) {
        estrellas += `
        <span class="fa fa-star checked"></span> 
        `;
      }

      for (let i = 0; i < estrellaN; i++) {
        estrellas += `
        <span class="fa fa-star"></span> 
        `;
      }

      let comentario = document.getElementById("newcomment").value;

      let date = new Date();
      let fecha =
        date.getFullYear() +
        "-" +
        (date.getMonth() + 1) +
        "-" +
        date.getDate() +
        " " +
        date.getHours() +
        ":" +
        date.getMinutes() +
        ":" +
        date.getSeconds();

      if (comentario == "") {
        document.getElementById("warning2").style.display = "block";
      } else {
        document.getElementById("puntuar").innerHTML = estrellas;
        document.getElementById("warning1").style.display = "block";

        htmlContentToAppend +=
          `
            <div>
                <div class="row">
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">` +
          usuario.nombre +
          `</h4>
                            <medium>Puntuación: ` +
          estrellas +
          ` </medium>
                        </div>
                        <h6 class="mb-1"> ` +
          comentario +
          `</h5>
                        <p class="text-muted">` +
          fecha +
          `</p>
                        <br>
            
                    </div>
                </div>
            </div>
            `;
        document.getElementById("comment-list-container").innerHTML =
          htmlContentToAppend;

        document.getElementById("newcomment").value = "";
      }
    });
});
