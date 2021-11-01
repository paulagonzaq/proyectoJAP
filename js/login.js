//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){

const input = document.getElementsByTagName("button")[0]

input.addEventListener("click", () => {
    let mail = document.getElementById("mail").value
    let password = document.getElementById("password").value
    let usuario = {};

    if (mail && password){

        usuario.nombre = mail;
        usuario.estado = "Conectado";
        localStorage.setItem('usuario',JSON.stringify(usuario));

        window.location.href = "./home.html"
        
    } else {
        document.getElementById("warning").style.display = "block" 
    }
})
});