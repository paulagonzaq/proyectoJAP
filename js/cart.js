let productCount = 0;
let porcentaje = 0.15;

function calcularSubtotal() {
  let cartProductUnitCostHTML = document.getElementById("cartProductUnitCost").innerHTML
  let cartProductCountHTML = document.getElementById("cartProductCount").value

  productCount = cartProductCountHTML
  
  let subtotal = cartProductUnitCostHTML * productCount
  
  return subtotal;
}

function calcularEnvio() {
  let subtotal = document.getElementById("subtotal").innerHTML;
  let envio = document.getElementById("envio").innerHTML;

  envio = Math.round((subtotal * porcentaje), 2)
console.log(porcentaje)
  return envio;
}

function calcularTotal () {
  let subtotal = document.getElementById("subtotal").innerHTML;
  let envio = document.getElementById("envio").innerHTML;
  let total = document.getElementById("total").innerHTML;

  total = parseInt(subtotal) + parseInt(envio)
  
  return total;
}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_INFO_URL).then(function (result) {
        if (result.status === "ok") {
          cartProduct = result.data;
            
          let cartProductNameHTML = document.getElementById("cartProductName");
          cartProductCountHTML = document.getElementById("cartProductCount");
          cartProductUnitCostHTML = document.getElementById("cartProductUnitCost");
          let cartProductCurrencyHTML = document.getElementById("cartProductCurrency");
          let cartProductSrcHTML = document.getElementById("cartProductSrc");
          


          cartProductNameHTML.innerHTML = cartProduct.articles[0].name
          cartProductCountHTML.value = cartProduct.articles[0].count
          cartProductUnitCostHTML.innerHTML = cartProduct.articles[0].unitCost
          cartProductCurrencyHTML.innerHTML = cartProduct.articles[0].currency
          cartProductSrcHTML.innerHTML = "<img src="+ cartProduct.articles[0].src +" width='100px'></img>"

          document.getElementById("subtotal").innerHTML = calcularSubtotal() 
          document.getElementById("subtotal1").innerHTML = calcularSubtotal();
          document.getElementById("envio").innerHTML = calcularEnvio();
          document.getElementById("total").innerHTML = calcularTotal();
         }
         
});
document.getElementById("cartProductCount").addEventListener("change", function(){
  productCount = this.value;
  document.getElementById("subtotal").innerHTML = calcularSubtotal();
  document.getElementById("subtotal1").innerHTML = calcularSubtotal();
  document.getElementById("envio").innerHTML = calcularEnvio();
  document.getElementById("total").innerHTML = calcularTotal();
});

document.getElementById("enviopremium").addEventListener("change", function(){
  porcentaje = 0.15;
  document.getElementById("envio").innerHTML = calcularEnvio();
  document.getElementById("total").innerHTML = calcularTotal();
 })

 document.getElementById("envioexpress").addEventListener("change", function(){
  porcentaje = 0.07;
  document.getElementById("envio").innerHTML = calcularEnvio();
  document.getElementById("total").innerHTML = calcularTotal();
 })

 document.getElementById("enviostandard").addEventListener("change", function(){
  porcentaje = 0.05;
  document.getElementById("envio").innerHTML = calcularEnvio();
  document.getElementById("total").innerHTML = calcularTotal();
 })

})

var formaDePago = 0

function mostrarTarjeta(){
  div1 = document.getElementById('form-transferencia');
  div1.style.display = 'none';
  div = document.getElementById('form-tarjeta');
  div.style.display = '';
  formaDePago = 1
}

function mostrarTransferencia(){
  div = document.getElementById('form-tarjeta');
  div.style.display = 'none';
  div1 = document.getElementById('form-transferencia');
  div1.style.display = '';
  formaDePago = 2
}

document.getElementById("comprar").addEventListener("click", function(){
  let calle = document.getElementById("calle").value
  let numero = document.getElementById("numerocalle").value
  let esquina = document.getElementById("esquina").value
  let pais = document.getElementById("pais").value
  let contador = 0
  // let tarjeta = document.getElementById("credit-card").value
  // let transferencia = document.getElementById("transfer").value

  
  if (calle.length == "") {
    alert("Introduce una calle")
    contador+=1;
  }
  if (numero.length == "") {
    alert("Introduce un número")
    contador+=1;
  }
  if (esquina.length == "") {
    alert("Introduce una esquina")
    contador+=1;
  }
  if (pais.length == "") {
    alert("Introduce un país")
    contador+=1;
  }
  if (formaDePago == 0) {
    alert("Introduce una forma de pago")
    contador+=1;
  }
  
  if (contador===0){
    Swal.fire({
      position: 'middle',
      html: '<lottie-player src="https://assets2.lottiefiles.com/packages/lf20_4eth4jy9.json"  background="transparent"  speed="1"  style="width: 450px; height: 450px;"    autoplay></lottie-player>',
      title: '¡Compra realizada con éxito!',
      showConfirmButton: false,
      timer: 3000
    })
   }

})

