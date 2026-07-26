const scanner = new Html5Qrcode("reader");

const config = {
    fps: 15,

    qrbox: function(viewfinderWidth, viewfinderHeight) {
        let minEdge = Math.min(viewfinderWidth, viewfinderHeight);
        let qrboxSize = Math.floor(minEdge * 0.75);
        return {
            width: qrboxSize,
            height: qrboxSize
        };
    },

    aspectRatio: 1.7777778,

    videoConstraints: {
        facingMode: {
            exact: "environment"
        },
        width: {
            ideal: 1920
        },
        height: {
            ideal: 1080
        }
    }
};


function startScanner() {

    Html5Qrcode.getCameras()
    .then(cameras => {

        if (cameras && cameras.length) {

            let cameraId = cameras[0].id;

            // Select rear camera
            cameras.forEach(camera => {

                if (
                    camera.label.toLowerCase().includes("back") ||
                    camera.label.toLowerCase().includes("rear") ||
                    camera.label.toLowerCase().includes("environment")
                ) {
                    cameraId = camera.id;
                }

            });


            scanner.start(

                cameraId,

                config,

                (decodedText, decodedResult) => {

                    console.log("Barcode detected:", decodedText);

                    document.getElementById("result").innerHTML =
                    `
                    <h3>Product Found</h3>
                    <p>${decodedText}</p>
                    `;


                    // Stop scanning after success
                    scanner.stop()
                    .then(() => {
                        console.log("Scanner stopped");
                    })
                    .catch(err => {
                        console.log(err);
                    });

                },


                (errorMessage) => {
                    // Ignore scanning errors
                }

            )
            .catch(err => {

                console.log("Scanner start error:", err);

                alert(
                    "Cannot start camera. Please allow camera permission."
                );

            });


        }

    })

    .catch(err => {

        console.log(err);

        alert(
            "No camera detected"
        );

    });

}



startScanner();
