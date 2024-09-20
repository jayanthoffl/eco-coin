import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Loginsign.css";
import { login, register as signUpRequest } from "../../connecting";
import { login as stateLogin } from "../../store/userData";
import { useDispatch } from "react-redux";

const Loginsign = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    password: '',
    gender: ''
  });
  const navigate = useNavigate();
  const Dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Function to toggle between Login and Sign Up forms
  const toggleForm = () => {
    setIsLogin(!isLogin);
    setErrorMessage("");
  };

  const onLoginSubmit = async (data) => {
    try {
      const res = await login(data); // Await the login function and capture the response
      console.log(res.message);

      toast.success("Login successful!", {
        style: { backgroundColor: "green", color: "white" }, // Set background color to green and text color to white
      });
      Dispatch(stateLogin(res.message.user));
      reset();
      navigate("/Home"); // Navigate after displaying the toast message
    } catch (err) {
      console.error("Login failed:", err);
      setErrorMessage("Incorrect username or password.");
      toast.error("Incorrect username or password.", {
        style: { backgroundColor: "#9c0e03", color: "white" }, // Set background color to red and text color to white
      });
    }
  };

  const onSignUpSubmit = async (data) => {
    try {
      const res = await signUpRequest(data);
      console.log("Sign-up successful:", res);
      reset();
      toast.success("Sign-up successful!", {
        style: { backgroundColor: "green", color: "white" }, // Set background color to green and text color to white
      });
      navigate("/Home");
    } catch (err) {
      console.error("Sign-up failed:", err);
      setErrorMessage("Failed to create account. Please try again.");
      toast.error("Failed to create account. Please try again.", {
        style: { backgroundColor: "#9c0e03", color: "white" }, // Set background color to red and text color to white
      });
    }
  };

  // Function to handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <div className={`form-container ${isLogin ? 'login' : 'signup'}`}>
      <p className="title">{isLogin ? 'Login' : 'Sign Up'}</p>
      <form className="form" onSubmit={isLogin ? handleSubmit(onLoginSubmit) : handleSubmit(onSignUpSubmit)}>
        {!isLogin && (
          <>
            <div className="input-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange} // Update state on name change
              />
              {errors.name && <span className="error">Name is required</span>}
            </div>
            <div className="input-group">
              <label htmlFor="gender">Gender</label>
              <div className="gender-group">
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={formData.gender === 'male'}
                    onChange={handleChange} // Update state on gender change
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={formData.gender === 'female'}
                    onChange={handleChange} // Update state on gender change
                  />
                  Female
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="other"
                    checked={formData.gender === 'other'}
                    onChange={handleChange} // Update state on gender change
                  />
                  Other
                </label>
              </div>
              {errors.gender && <span className="error">Gender is required</span>}
            </div>
          </>
        )}
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange} // Update state on username change
          />
          {errors.username && <span className="error">Username is required</span>}
        </div>
        <div className="input-group">
          <label htmlFor="password">{isLogin ? 'Password' : 'Create Password'}</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder={isLogin ? 'Enter your password' : 'Create a password'}
            value={formData.password}
            onChange={handleChange} // Update state on password change
          />
          {errors.password && <span className="error">Password is required</span>}
        </div>
        {isLogin && (
          <div className="login-options">
            <div className="forgot">
              <a rel="noopener noreferrer" href="#">Forgot Password?</a>
            </div>
            <div className="remember-me">
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe">Remember Me</label>
            </div>
          </div>
        )}
        <button type="submit" className="sign">
          {isLogin ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
      <p className="signup">
        {isLogin ? "Don't have an account?" : 'Already have an account?'}
        <a onClick={toggleForm} rel="noopener noreferrer" href="#" className="singuplogin">
          {isLogin ? 'Sign up' : 'Sign in'}
        </a>
      </p>
      <ToastContainer />
    </div>
  );
};

export default Loginsign;
