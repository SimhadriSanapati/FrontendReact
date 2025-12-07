import React from "react";
import "./ContactUs.css";
function ContactUs(){
    let phoneNumber = "+1-234-567-8901";
    let email = "simhadri996@gmail.com";
    return(
        <div>
        <h1>Contact us</h1>
        <h2>phone:{phoneNumber}</h2>
        <p>Email:{email}</p>
        </div>
    )
}
export default ContactUs;