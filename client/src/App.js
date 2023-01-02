import React, { useState } from "react";
import axios from "axios";

function App() {
  const [token, setToken] = useState("");
  const [formData, setFormData] = useState({
    mail: "",
    otp: "",
  });
  const [otpVisibility, setVisibility] = useState(0);

  const { mail, otp } = formData;
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const onSendOtp = (e) =>{
    e.preventDefault();
    setVisibility(1);
       const config = {
         headers: {
           "Content-Type": "application/json",
         },
       };
       const body = JSON.stringify({ mail });
       axios.post("http://localhost:5000/generate-otp",body,config)
       .then((res)=>{
        setToken(res.data);
        console.log(token);
       })
    
  }
  const sigin = (e) => {
    e.preventDefault();
    const config2 = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const body2 = JSON.stringify({ mail, token, otp });
    axios.post("http://localhost:5000/verify-otp", body2, config2)
    .then((res)=>{
      console.log(res.data);
    })
  };

  return (
    <div>
      <form action=''>
        <input
          type='mail'
          name='mail'
          placeholder='mail'
          value={mail}
          onChange={(e) => onChange(e)}
        />
        <button
          onClick={(e) => {
            onSendOtp(e);
          }}
        >
          send OTP
        </button>
        {otpVisibility === 1 && (
          <div>
            <input
              type='otp'
              name='otp'
              placeholder='otp'
              value={otp}
              onChange={(e) => onChange(e)}
            />
            <button
              onClick={(e) => {
                sigin(e);
              }}
            >
              Login
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default App;
