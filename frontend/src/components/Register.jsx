import Room from "@mui/icons-material/Room";
import CloseIcon from '@mui/icons-material/Close';
import "./register.css";
import { useRef, useState } from "react";
import axios from "axios";

const Register = ({setShowRegister}) => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      username: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      await axios.post("api/users/register", newUser);
      setError(false);
      setSuccess(true);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="register-container">
      <div className="logo">
        <Room />
        TravelTracker
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="username" ref={nameRef} />
        <input type="email" placeholder="email" ref={emailRef} />
        <input type="password" placeholder="password" ref={passwordRef} />
        <button className="register-btn">Register</button>
      </form>
      {success && (
        <span className="success">Successfull! You can login now</span>
      )}
      {error && <span className="failure">Something went wrong!!</span>}
      <CloseIcon className="register-container-close" onClick={() => setShowRegister(false)}/>
    </div>
  );
};

export default Register;
