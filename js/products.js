fetch(PRODUCTS_URL)
.then(res => res.json())
.then(data => {

    let htmlContentToAppend = "";
    for(let i = 0; i < data.length; i++){
        let product = data[i];

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ product.name +`</h4>
                        <small class="text-muted">` + product.soldCount + ` artículos</small>
                    </div>
                    <h5 class="mb-1"> US$ `+  product.cost +`</h5><br>
                    <p class="text-muted">` + product.description + `</p>

                </div>
            </div>
        </div>
        `
    }
    document.getElementById("product-list-container").innerHTML = htmlContentToAppend;
 })

 





