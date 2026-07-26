const codeReader = new ZXing.BrowserMultiFormatReader();


const button = document.getElementById("startCamera");
const result = document.getElementById("result");



button.onclick = async function () {


    result.innerHTML = "Opening camera...";


    try {


        const devices = await codeReader.listVideoInputDevices();


        let cameraId = devices[0].deviceId;


        // Select rear camera

        devices.forEach(device => {

            if (
                device.label.toLowerCase().includes("back") ||
                device.label.toLowerCase().includes("rear") ||
                device.label.toLowerCase().includes("environment")
            ) {

                cameraId = device.deviceId;

            }

        });



        codeReader.decodeFromVideoDevice(

            cameraId,

            "video",


            (barcode, error) => {


                if (barcode) {


                    result.innerHTML =
                    "✅ Barcode Found:<br>" +
                    barcode.text;


                    console.log(barcode.text);



                    // stop after scan

                    codeReader.reset();


                }


            }


        );



    }

    catch(error) {


        result.innerHTML =
        "Camera Error: " + error;


        console.log(error);


    }


};
