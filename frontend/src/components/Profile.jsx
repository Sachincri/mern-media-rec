import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/userAction";
import { useNavigate } from "react-router-dom";
const Profile = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = () => {
    dispatch(logout());
    navigate("/login");
  };
  return (
    <div className="profile">
      <p>Name - {user && user.name}</p>
      <p>Gmail - {user && user.email}</p>
      <button onClick={logoutHandler}>logout</button>
    </div>
  );
};

export default Profile;
