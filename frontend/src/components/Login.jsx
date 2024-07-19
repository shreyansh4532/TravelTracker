import './login.css';
import Room from "@mui/icons-material/Room";
import CloseIcon from '@mui/icons-material/Close';
import { useRef, useState } from "react";
import axios from "axios";

const Login = ({setShowLogin, myStorage, setCurrUser}) => {
  const [error, setError] = useState(false);

  const nameRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      username: nameRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const res = await axios.post("api/users/login", user);
      myStorage.setItem("user", res.data.username);
      setCurrUser(res.data.username);
      setShowLogin(false);
      setError(false);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="login-container">
      <div className="logo">
        <Room />
        TravelTracker
      </div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="username" ref={nameRef} />
        <input type="password" placeholder="password" ref={passwordRef} />
        <button className="login-btn">Login</button>
      </form>
      {error && <span className="failure">Something went wrong!!</span>}
      <CloseIcon className="login-container-close" onClick={() => setShowLogin(false)}/>
    </div>
  );
};

export default Login;
