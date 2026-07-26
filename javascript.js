let codeReader = new ZXing.BrowserMultiFormatReader();


function startScanner(){

document.getElementById("result").innerHTML =
"Opening camera...";


codeReader.listVideoInputDevices()
.then((devices)=>{


let cameraId = devices[0].deviceId;


// Find back camera

for(let i=0;i<devices.length;i++){

let label = devices[i].label.toLowerCase();


if(label.includes("back") || 
   label.includes("rear") ||
   label.includes("environment")){

cameraId = devices[i].deviceId;

break;

}

}



codeReader.decodeFromVideoDevice(

cameraId,

"video",

(result, error)=>{


if(result){


let barcode = result.text;


document.getElementById("result").innerHTML =
"✅ Barcode Found:<br>"+barcode;


console.log(barcode);


// stop after scan

codeReader.reset();


}


}


);


})


.catch(error=>{

document.getElementById("result").innerHTML =
"Camera Error: "+error;

});


}
