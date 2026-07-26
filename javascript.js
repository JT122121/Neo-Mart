const codeReader = new ZXing.BrowserMultiFormatReader();

const result = document.getElementById("result");

codeReader.decodeFromConstraints(
{
    video: {
        facingMode: "environment",
        width: { ideal: 1280 },
        height: { ideal: 720 }
    }
},

"video",

(resultData, error) => {

    if (resultData) {

        result.innerHTML =
        "FOUND: " + resultData.text;

        console.log(resultData.text);

        codeReader.reset();
    }

}

).catch(err => {

    result.innerHTML = "Camera Error: " + err;

});
