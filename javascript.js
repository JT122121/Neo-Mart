let video = document.getElementById("camera");

let stream = null;

let barcodeDetector;

let scanning = false;



// Ask camera permission

async function requestCamera(){


try{


stream = await navigator.mediaDevices.getUserMedia({

video:{
facingMode:{
ideal:"environment"
}
}

});


video.srcObject = stream;


document.getElementById("permissionBox")
.style.display="none";


document.getElementById("status")
.innerHTML="Camera Ready";


}


catch(error){


alert(
"Camera permission denied. Please allow camera in browser settings."
);


}


}





// Start scanning

document.getElementById("startBtn")
.onclick = async function(){



if(!stream){

await requestCamera();

}



if("BarcodeDetector" in window){


barcodeDetector = new BarcodeDetector({

formats:[

"ean_13",
"ean_8",
"code_128",
"qr_code"

]

});


scanning=true;


document.getElementById("status")
.innerHTML="Scanning...";


scanBarcode();


}

else{


alert(
"Barcode scanner is not supported. Please use Chrome Android."
);


}


};







// Barcode detection loop

async function scanBarcode(){


if(!scanning)
return;



try{


let barcodes =
await barcodeDetector.detect(video);



if(barcodes.length > 0){


let code =
barcodes[0].rawValue;



scanning=false;


stopCamera();



findProduct(code);



return;


}



}

catch(error){}



requestAnimationFrame(scanBarcode);


}







// Connect to Google Sheet API

function findProduct(code){



document.getElementById("status")
.innerHTML="Searching...";



// PUT YOUR APPS SCRIPT WEB APP URL HERE

let url =
"https://script.google.com/macros/s/YOUR_WEB_APP_ID/exec?barcode="
+code;



fetch(url)


.then(response=>response.json())


.then(data=>{


if(data.success){



document.getElementById("barcode")
.innerHTML=data.barcode;


document.getElementById("item")
.innerHTML=data.item;


document.getElementById("price")
.innerHTML=data.price;



document.getElementById("itemInfo")
.classList.remove("hidden");



}

else{


document.getElementById("status")
.innerHTML="Product Not Found";


}



document.getElementById("scanAgain")
.classList.remove("hidden");



});



}







// Stop camera

function stopCamera(){


if(stream){


stream.getTracks()
.forEach(track=>track.stop());


}


}







// Scan again

document.getElementById("scanAgain")
.onclick=function(){


document.getElementById("itemInfo")
.classList.add("hidden");



document.getElementById("scanAgain")
.classList.add("hidden");



document.getElementById("status")
.innerHTML="Ready";



document.getElementById("startBtn")
.click();



};