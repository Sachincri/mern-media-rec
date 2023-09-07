import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../Redux/userAction";
import { RiEyeCloseLine } from "react-icons/ri";
import { VscEye } from "react-icons/vsc";
import "../Style/login.scss";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [view, setView] = useState(false);
  const dispatch = useDispatch();

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <section className="user">
      <div className="myform">
        <form onSubmit={loginSubmit}>
          <h1>Login</h1>

          <input
            placeholder="Enter Your Email"
            type="email"
            name="email"
            id="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Enter Your Password"
            type={view ? "text" : "password"}
            name="password"
            required
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {view ? (
            <VscEye onClick={() => setView(false)} />
          ) : (
            <RiEyeCloseLine onClick={() => setView(true)} />
          )}
          <input className="btn" type="submit" value="Login" />
        </form>
        <Link to="/signup">
          <p>Dont have account? SignUp</p>
        </Link>
      </div>
    </section>
  );
};

export default Login;
