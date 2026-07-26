const codeReader = new ZXing.BrowserMultiFormatReader();

const button = document.getElementById("startCamera");
const result = document.getElementById("result");


button.onclick = async function () {

    result.innerHTML = "Scanning...";

    try {

        const devices = await codeReader.listVideoInputDevices();

        let cameraId = devices[0].deviceId;


        // choose back camera
        for (let device of devices) {

            if (
                device.label.toLowerCase().includes("back") ||
                device.label.toLowerCase().includes("rear")
            ) {
                cameraId = device.deviceId;
            }

        }


        codeReader.decodeFromVideoDevice(
            cameraId,
            "video",
            (barcode, error) => {

                if (barcode) {

                    result.innerHTML =
                    "✅ Barcode:<br>" + barcode.text;

                    console.log(barcode.text);

                    codeReader.reset();

                }

            }
        );


    } catch (error) {

        result.innerHTML = "Camera Error: " + error;

    }

};
