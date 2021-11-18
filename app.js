//Obteniendo el access token

/*var url = 'https://graph.mapillary.com/token';
var data = {grant_type: 'authorization_code',
code:  'AQBEidrh4lHsHtQnlFRxWgLIejcuXl7nB13i_ZSf9_TjN-3-GnvJNK1A3Who9lxcYQxBogXLvBUrnlDtcXa1H7L9vckI5wRzjLpTm5BRJKElTyxSl8EvvDkeH9k0IqbL8F_b_8FiANvMByalG0JNp4Eu_YDw3AoVwoUOkTmxslZ05bAugBvSA3zw-SAtXv5gtwEQHm28g6C2eyvKYuzlDeeW2oqcR44rBuOW63E5uhMj4XXbYppFY9nC4uQTC2292PSBYsx5RukNJVcT9_MAJoLY80Lp-hec539TTwzUpebdmA',
client_id: 4250888405034558 };

fetch(url, {
  method: 'POST', // or 'PUT'
  body: JSON.stringify(data), // data can be `string` or {object}!
  headers:{
    'Content-Type': 'application/json',
    'Authorization': 'OAuth MLY|4250888405034558|3d62966583f86eea13723290008b196b'
  }
}).then(res => res.json())
.catch(error => console.error('Error:', error))
.then(response => console.log('Success:', response));*/
//--------------------------------------------------------------------------------------------

//Refresh access-token

var url = "https://graph.mapillary.com/token";
var data = {
  grant_type: "refresh_token",
  refresh_token:
    /*El codigo que nos provee el enlace de autorización*/ "MLYARD3iOkpCW9ZA8t00rbW8Em86wghRZCMJFZBR8DCfrAULon4imq9s2Wr8easHXY0vaxbKJlUnSbHA1ZCZCzEAw8EmDsuz3SrZAZAWj2gCZAlch5AyN4ZAlwIunkcP9ICZC0QZDZD",
  client_id: 4250888405034558,
};

fetch(url, {
  method: "POST", // or 'PUT'
  body: JSON.stringify(data), // data can be `string` or {object}!
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "OAuth MLY|4250888405034558|3d62966583f86eea13723290008b196b",
  },
})
  .then((res) => res.json())
  .catch((error) => console.error("Error:", error));
//---------------------------------------------------------------------------------------------

//Funcion para obtener metadata de la API

async function getImageData(image_id) {
  const token =
    "MLYARCZAS8v5tv3JwLMq8fFRFtUAXmgJhHhEr4zZA0ZAW5ZAYcAlDZB3poqXRLgWdh9pPtcsFsEN0zJIK1AYhBHZBZCz3DcEc0Qp4GlkbVo3PlbCs810OtEjNeWBhZC3xioqQZDZD";

  const api_url =
    "https://graph.mapillary.com/" +
    image_id +
    "?fields=id,geometry,altitude,width&access_token=" +
    token;
  // or instead of adding it to the url, add the token in headers (strongly recommended for user tokens)
  return fetch(api_url, {
    headers: { Authorization: "OAuth " + token },
  })
    .then((response) => response.json())
    .then((responseData) => {
      //console.log(responseData);
      return responseData;
    });
} 

//---------------------------------------------------------------------------------------------

//Objeto con los id de las imagenes para utilizarlos luego como parametro
let idImagenes = {

paraiso: 470268374197823,
cartago: 768122994072910,
volcan: 318947443137800

}

//Declaracion de los objetos Li del HTML
let coordenadasLi = document.getElementById("coordenadas");
let idLi = document.getElementById("id");
let anchoLi = document.getElementById("width");
let alturaLi = document.getElementById("altura");

//Se llenan los Li con los datos iniciales al abrir la APP (Paraiso)
getImageData(idImagenes.paraiso).then((response) => {
  coordenadasLi.innerHTML = response.geometry.coordinates;
  idLi.innerHTML = response.id;
  alturaLi.innerHTML = Math.trunc(response.altitude) + " KM"; //Math.trunc() es para quitar decimales
  anchoLi.innerHTML = response.width + " p";
});

//Funcion de la app al cambiar entre zonas que se muestran y su información (mapas)
document.getElementById("locations").addEventListener("change", function () {
  var location = this.value;

  if (location == "paraiso") {
    document.getElementById("paraiso").style.display = "block";

    getImageData(idImagenes.paraiso).then((response) => {
      coordenadasLi.innerHTML = response.geometry.coordinates;
      idLi.innerHTML = response.id;
      alturaLi.innerHTML = Math.trunc(response.altitude) + " KM";
      anchoLi.innerHTML = response.width + " p";
    });

  } else {
    document.getElementById("paraiso").style.display = "none";
  }

  if (location == "cartago") {
    document.getElementById("cartago").style.display = "block";

    getImageData(idImagenes.cartago).then((response) => {
      coordenadasLi.innerHTML = response.geometry.coordinates;
      idLi.innerHTML = response.id;
      alturaLi.innerHTML = Math.trunc(response.altitude) + " KM";
      anchoLi.innerHTML = response.width + " p";
    });

  } else {
    document.getElementById("cartago").style.display = "none";
  }

  if (location == "volcan") {
    document.getElementById("volcan").style.display = "block";

    getImageData(idImagenes.volcan).then((response) => {
      coordenadasLi.innerHTML = response.geometry.coordinates;
      idLi.innerHTML = response.id;
      alturaLi.innerHTML = response.altitude + " KM";
      anchoLi.innerHTML = response.width + " p";
    });

  } else {
    document.getElementById("volcan").style.display = "none";
  }
});
