import React, { useState } from 'react';
import QRCode from 'qrcode.react';

const QRcodeGenerator = () => {

  const [contact, setContact] = useState("");
  const [QRavailavle, setQRcodeavailable] = useState(0);

  const [businessFormData, setBusinessFormData] = useState({
    FirstName: '',
    LastName: '',
    Email: '',
    PhoneNumber: '',
    Designation: '',
    Company: ''
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    setBusinessFormData({
      FirstName: event.target.firstName.value,
      LastName: event.target.lastName.value,
      Email: event.target.email.value,
      PhoneNumber: event.target.phoneNumber.value,
      Designation: event.target.designation.value,
      Company: event.target.company.value
    });

    // Properties can be defined in any order (except BEGIN, END, VERSION).
    setContact("BEGIN:VCARD\n" +
                "VERSION:3.0\n" +
                "N:" + event.target.firstName.value + ";" + event.target.lastName.value + "\n" + 
                "TEL:" + event.target.phoneNumber.value + "\n" +
                "EMAIL:" + event.target.email.value + "\n" +
                "ORG:" + event.target.company.value + "\n" +
                "TITLE:" + event.target.designation.value + "\n" +
                "END:VCARD");
                // "FN:" + event.target.firstName.value + "\n" +
    setQRcodeavailable(1);

    const {FirstName, LastName, Email, PhoneNumber, Designation, Company} = businessFormData;

    const res = await fetch("https://contactvcard-default-rtdb.firebaseio.com/contactvcard.json", {
      method: "POST",
      headers: {"Content-Type": "application/json"}, 
      body: JSON.stringify({"FirstName":event.target.firstName.value,
                             "LastName":event.target.lastName.value,
                             "Email":event.target.email.value,
                             "PhoneNumber":event.target.phoneNumber.value,
                             "Designation":event.target.designation.value,
                             "Company":event.target.company.value})
    })
  };

  const downloadQRCode = () => {
    if(QRavailavle){
      const qrCodeDataURL = document.querySelector('canvas').toDataURL();
      console.log("link:",qrCodeDataURL);
      const link = document.createElement('a');
      link.download = 'qrcode.png';
      link.href = qrCodeDataURL;
      console.log("link:",qrCodeDataURL);
      link.click();
    }
    else{
      alert("No QR available");
    }
    
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="firstName">First Name:</label>
        <input type="text" id="firstName" name="firstName" />

        <label htmlFor="lastName">Last Name:</label>
        <input type="text" id="lastName" name="lastName" />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" />

        <label htmlFor="phoneNumber">Phone Number:</label>
        <input type="tel" id="phoneNumber" name="phoneNumber" />

        <label htmlFor="designation">Designation:</label>
        <input type="text" id="designation" name="designation" />

        <label htmlFor="company">Company:</label>
        <input type="text" id="company" name="company" />

        <button type="submit">Generate QR Code</button>
      </form>
      <div id="qrcode">here qr code will be generated</div>

      <QRCode value={contact} />

      <button onClick={downloadQRCode}>Download QR Code</button>
    </div>
  );
};

export default QRcodeGenerator;




// import React, { useState } from 'react';
// import QRCode from 'qrcode.react';

// function QRcodeGenerator() {
//   const [formData, setFormData] = useState({});

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     // Get form data and update state
//     const data = new FormData(event.target);
//     setFormData(Object.fromEntries(data));
//   }

//   return (
//     <div>
//        <form onSubmit={handleSubmit}>
//          <label htmlFor="firstName">First Name:</label>
//          <input type="text" id="firstName" name="firstName" />

//          <label htmlFor="lastName">Last Name:</label>
//          <input type="text" id="lastName" name="lastName" />

//          <label htmlFor="email">Email:</label>
//          <input type="email" id="email" name="email" />

//          <label htmlFor="phoneNumber">Phone Number:</label>
//          <input type="tel" id="phoneNumber" name="phoneNumber" />

//          <button type="submit">Generate QR Code</button>
//        </form>

//        <QRCode value={formData} />
      

//     </div>
//   );
// }

// export default QRcodeGenerator;
