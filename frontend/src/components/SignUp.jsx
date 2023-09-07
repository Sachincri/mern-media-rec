import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../Redux/userAction";
import { RiEyeCloseLine } from "react-icons/ri";
import { VscEye } from "react-icons/vsc";
import "../Style/login.scss";

const SignUp = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [view, setView] = useState(false);

  const submitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.append("name", name);
    myForm.append("email", email);
    myForm.append("password", password);

    dispatch(register(myForm));
  };

  return (
    <section className="user">
      <>
        <form onSubmit={submitHandler}>
          <h1>SignUp</h1>
          <input
            placeholder="Enter Your Name"
            type="text"
            name="name"
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          {view ? (
            <VscEye onClick={() => setView(false)} />
          ) : (
            <RiEyeCloseLine onClick={() => setView(true)} />
          )}

          <input className="btn" type="submit" value="SignUP" />
        </form>

        <Link to="/login">Already a user? login</Link>
      </>
    </section>
  );
};

export default SignUp;
