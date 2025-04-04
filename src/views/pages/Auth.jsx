import React, { useState } from "react";
import userServices from "../../server/services/userServices";
import "../../assets/css/pages/Auth.css";
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
    navigate("/success");
  };
  const emailAuthSignIn = async () => {
    await userServices.signInWithEmailPassword(form);
    navigate("/success");
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
      <input
        class="button"
        type="submit"
        value="Submit"
        onClick={emailAuthSignUp}
      />

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
      <input
        class="button"
        type="submit"
        value="Submit"
        onClick={emailAuthSignIn}
      />
      <br />
      <br />
      <br />
      <input
        class="button"
        type="button"
        value="Go To Home Page"
        onClick={() => navigate("/")}
      />
    </div>
  );
}

export default Auth;
