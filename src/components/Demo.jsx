import React, { useState } from 'react';
import '../utils/formStyle.css';
import { useNavigate } from 'react-router-dom';



const Demo = () => {

  // form details are converted to vcard url format and stored in contact
  const [contact, setContact] = useState("");
  const [isRes, setIsRes] = useState(0);
  const [submit, setSubmit] = useState(0);
  const navigate = useNavigate();

  const [businessFormData, setBusinessFormData] = useState({
    FirstName: '',
    LastName: '',
    Email: '',
    PhoneNumber: '',
    Designation: '',
    Company: ''
  });

  // asynchronous function to handle firebase response                                                          
  const handleSubmit = async (event) => {
    // to prevent default refresh of form element
    event.preventDefault();
    setSubmit(1);

    setBusinessFormData({
      FirstName: event.target.firstName.value,
      LastName: event.target.lastName.value,
      Email: event.target.email.value,
      PhoneNumber: event.target.phoneNumber.value,
      Designation: event.target.designation.value,
      Company: event.target.company.value
    });

    // Properties can be defined in any order (except BEGIN, END, VERSION).
    // creating vcard url as per documentation 
    // https://www.evenx.com/vcard-3-0-format-specification
    // setContact("BEGIN:VCARD\n" +
    //   "VERSION:3.0\n" +
    //   "N:" + event.target.firstName.value + ";" + event.target.lastName.value + "\n" +
    //   "TEL:" + event.target.phoneNumber.value + "\n" +
    //   "EMAIL:" + event.target.email.value + "\n" +
    //   "ORG:" + event.target.company.value + "\n" +
    //   "TITLE:" + event.target.designation.value + "\n" +
    //   "END:VCARD");

    // // upload form details into firebase
    // const res = await fetch("https://contactvcard-default-rtdb.firebaseio.com/contactvcard.json", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     "FirstName": event.target.firstName.value,
    //     "LastName": event.target.lastName.value,
    //     "Email": event.target.email.value,
    //     "PhoneNumber": event.target.phoneNumber.value,
    //     "Designation": event.target.designation.value,
    //     "Company": event.target.company.value
    //   })
    // })
    // if(res){
    //   setIsRes(1);
    // }

    // regular expressions that validates user input
    const first_name_regx = /^[a-z ,.'-]+$/i;
    const ph_regx = /^([+]\d{2})?\d{10}/;
    const email_regx = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,63}$/

    if (first_name_regx.test(event.target.firstName.value) && event.target.lastName.value &&
      ph_regx.test(event.target.phoneNumber.value) &&
      event.target.designation.value &&
      email_regx.test(event.target.email.value) &&
      event.target.company.value) {

        setContact("BEGIN:VCARD\n" +
      "VERSION:3.0\n" +
      "N:" + event.target.firstName.value + ";" + event.target.lastName.value + "\n" +
      "TEL:" + event.target.phoneNumber.value + "\n" +
      "EMAIL:" + event.target.email.value + "\n" +
      "ORG:" + event.target.company.value + "\n" +
      "TITLE:" + event.target.designation.value + "\n" +
      "END:VCARD");

    // upload form details into firebase
    const res = await fetch("https://contactvcard-default-rtdb.firebaseio.com/contactvcard.json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "FirstName": event.target.firstName.value,
        "LastName": event.target.lastName.value,
        "Email": event.target.email.value,
        "PhoneNumber": event.target.phoneNumber.value,
        "Designation": event.target.designation.value,
        "Company": event.target.company.value
      })
    })
    if(res){
      setIsRes(1);
    }

            // if all entries in the form are valid then redirect to another component
            navigate('/yourqr', {
              state: {
                data: "BEGIN:VCARD\n" +
                  "VERSION:3.0\n" +
                  "N:" + event.target.lastName.value + ";" + event.target.firstName.value + "\n" +
                  "TEL:" + event.target.phoneNumber.value + "\n" +
                  "EMAIL:" + event.target.email.value + "\n" +
                  "ORG:" + event.target.company.value + "\n" +
                  "TITLE:" + event.target.designation.value + "\n" +
                  "END:VCARD"
                }
              }
            );
    }
    else {
      alert("Some values are not provided correctly!!! Please try again.")
      setIsRes(0);
      setSubmit(0);
    }

  };

  return (
    <div>
      <div className="container">
        {/* logo and slogan */}
        <div className="heading">
          <div className="img">
            <div className='logo-img'></div>
          </div>
          <div className="lbl">
            <div id="reg">Make your own QR code.<br />Generate ones.<br />Use any time any where.</div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* input tags */}
          <div className="card-details">
            <div className="card-box">
              <span className="details" >First Name</span>
              <input type="text" id="firstName" placeholder="eg: Ram" />
            </div>
            <div className="card-box">
              <span className="details">Last Name</span>
              <input type="text" id="lastName" placeholder="eg: Singh" pattern="[a-zA-Z]*" />
            </div>

            <div className="card-box">
              <span className="details" >Email</span>
              <input type="email" id="email" placeholder="eg: abc@gmail.com" />
            </div>

            <div className="card-box">
              <span className="details" >Phone no:</span>
              <input type="tel" id="phoneNumber" placeholder="905182XXXX" />
            </div>

            <div className="card-box">
              <span className="details" >Company</span>
              <input type="text" id="company" placeholder="eg: Meta" />
            </div>

            <div className="card-box">
              <span className="details" >Designation</span>
              <input type="text" id="designation" placeholder="eg: SDE" pattern="[a-zA-Z]*" />
            </div>
          </div>

          {/* form submit */}
          <div className="submit-button" >
            <input type="submit" id='button' value="Let's Go!" />
          </div>

        </form>
      </div>
      
      {(submit && !isRes)? <p>Loading...</p> : <p></p>}
      {/* <Link to="/yourqr">Get QR</Link> */}
    </div>
  );
};

export default Demo;



