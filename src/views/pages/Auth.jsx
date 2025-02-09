import React, { useState } from "react";
import userServices from "../../server/services/userServices";
import { useNavigate } from "react-router-dom";

function Auth() {
  const [form, setForm] = useState({});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const emailAuthSignUp = async () => {
    await userServices.signUpWithEmailPassword(form);
    navigate("/home");
  };
  const emailAuthSignIn = async () => {
    await userServices.signInWithEmailPassword(form);
    navigate("/home");
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <input
        type="email"
        placeholder="Email"
        onChange={handleChange}
        name="Email"
      />
      <input
        type="password"
        placeholder="Password"
        onChange={handleChange}
        name="Password"
      />
      <input type="submit" value="Submit" onClick={emailAuthSignUp} />

      <h1>Sign In</h1>
      <input
        type="email"
        placeholder="Email"
        onChange={handleChange}
        name="Email"
      />
      <input
        type="password"
        placeholder="Password"
        onChange={handleChange}
        name="Password"
      />
      <input type="submit" value="Submit" onClick={emailAuthSignIn} />
    </div>
  );
}

export default Auth;
