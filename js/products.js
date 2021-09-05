function showProducts(array) {
    let htmlContentToAppend = "";
    for(let i = 0; i < array.length; i++){
        let product = array[i];


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
 }

let productos = [];
fetch(PRODUCTS_URL)
.then(res => res.json())
.then(data => {

    for(let i = 0; i < data.length; i++){
        let product = data[i];
        productos.push(product)
 }
 showProducts(productos)
})


document.getElementById("sortDesc").addEventListener("click", function(a, b) {
   let sortArrayDesc = productos.sort((a, b)=> parseInt(b.cost) - parseInt(a.cost))
   
   showProducts(sortArrayDesc)
} )

document.getElementById("sortAsc").addEventListener("click", function(a, b) {
    let sortArrayAsc = productos.sort((a, b)=> parseInt(a.cost) - parseInt(b.cost))
    
    showProducts(sortArrayAsc)
 } )

 document.getElementById("sortByCount").addEventListener("click", function(a, b) {
    let sortArraybyCount = productos.sort((a, b)=> parseInt(b.soldCount) - parseInt(a.soldCount))
    
    showProducts(sortArraybyCount)
 } )

 document.getElementById("rangeFilterCount").addEventListener("click", function() {
    let min = document.getElementById("rangeFilterCountMin").value
    let max = document.getElementById("rangeFilterCountMax").value
    
   let array = productos.filter(producto => (producto.cost >= min && producto.cost <= max) )
    showProducts(array)
      }
   
   )

 document.getElementById("clearRangeFilter").addEventListener("click", function(){
    document.getElementById("rangeFilterCountMin").value = undefined;
    document.getElementById("rangeFilterCountMax").value = undefined;

    showProducts(productos);
 }
 )
 
