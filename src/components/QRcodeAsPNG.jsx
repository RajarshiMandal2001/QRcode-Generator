import React ,{ useRef }from 'react';
import { useLocation } from 'react-router-dom';
import QRCode from 'qrcode.react';
import '../utils/qrStyle.css';
import html2canvas from 'html2canvas';



// import logo from "../assets/logo2.png";

const QRcodeAsPNG = ()=>{
    console.log("into a new component")
    // get data from component which called this component
    const location = useLocation();
    const data = location.state.data;
    
    const divRef = useRef(null);

    // take screenshot of the specified div 
    const downloadQRCode = () => {
        //   const qrCodeDataURL = document.querySelector('canvas').toDataURL();
        //   console.log("link:",qrCodeDataURL);
        //   const link = document.createElement('a');
        //   link.download = 'qrcode.png';
        //   link.href = qrCodeDataURL;
        //   console.log("link:",qrCodeDataURL);
        //   link.click();
        html2canvas(divRef.current).then((canvas) => {
        const screenshot = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'YourQR.png';
        link.href = screenshot;
        link.click();
        });
    }


    return (
        <div className='screenshot-container' ref={divRef}>

            {/* its content will be filled in css */}
            <div className='label'></div>

            <div className='qr-container' >
                <QRCode value={data} className="qrimg" size={200}/>

                <div className="logoimg">
                    <div className='logo'></div>
                </div>
            </div>
            <div className='best-wishes'></div>

            <button className="download-button" onClick={downloadQRCode}>Download QR Code</button>

        </div>
    )
}
export default QRcodeAsPNG;