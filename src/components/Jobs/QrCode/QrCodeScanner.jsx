import React, { useState } from "react";
import { QrReader } from 'react-qr-reader';

const QrCodeScanner = ({ onClose }) => {
    const [qrScan, setQrscan] = useState('No result');

    const handleScan = data => {
        if (data) {
            setQrscan(data);
            alert(data);
            onClose();
        }
    }

    const handleError = err => {
        console.info(err)
    }

    return <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        
            <div style={{ margin: '0 30px'}}>
                <QrReader
                    onResult={(result, error) => {
                        if (!!result) handleScan(result?.text);

                        if (!!error) handleError(error);
                    }}
                    scanDelay={300}
                    ViewFinder={() => <div style={{
                        width: '60%',
                        height: '60%',
                        position: 'absolute',
                        top: '20%',
                        left: '20%',
                        margin: 'auto',
                        border: '3px solid #2a41e8',
                        zIndex: 100
                    }}></div>}
                    style={{ height: 320, width: 320 }}
               />
            </div>
         
         {/* <p style={{ fontSize: 18, textAlign: 'center', width: 320, height: 20}}>
            {qrScan}
        </p> */}
    </div>;
}

export default QrCodeScanner;
