import React, { useState } from "react";
import QRcode from 'qrcode.react';

const QrCodeGenerator = ({ qrCodeString }) => {
    const [qr, setQr] = useState('lintangwisesa');

    const downloadQR = () => {
        const canvas = document.getElementById("myqr");
        const pngUrl = canvas
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "myqr.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    };

    return <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            {
                qr ?
                    <QRcode
                        id="myqr"
                        value={qr}
                        size={320}
                        includeMargin={true}
                    /> :
                    <p>No QR code preview</p>
            }
        </div>
        {qr && <button onClick={downloadQR} type="button">Download QR</button>}
    </div>;
}

export default QrCodeGenerator;