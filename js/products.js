function showProducts(array) {
    let htmlContentToAppend = "";


          
    for(let i = 0; i < array.length; i++){
        let product = array[i];


        htmlContentToAppend += `
        
        <div class="col-md-4">
        <a href="product-info.html" class="card mb-4 shadow-sm custom-card">
                 <img class="bd-placeholder-img card-img-top" src="` + product.imgSrc + `" alt="` + product.description + `" >
                
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


    document.getElementById("product-container").innerHTML = htmlContentToAppend;
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
 
 function buscar(){
    let peticion = document.getElementById("buscar").value;
    let buscados = productos.filter( product => {
        return product.name.toLowerCase().indexOf(peticion.toLowerCase())>-1;
    })
        
    showProducts(buscados);
}

 document.getElementById("buscar").addEventListener('keyup', ()=>{
    buscar();
});
