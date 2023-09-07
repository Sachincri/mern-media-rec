import { SlCamrecorder } from "react-icons/sl";
import { BiSolidWebcam } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";

const SideNav = () => {
  return (
    <header>
      <div>
        <p>Recorder</p>
      </div>
      <div>
        <Link to="/screen">
          <SlCamrecorder />
        </Link>
        <Link to="/">
          <BiSolidWebcam />
        </Link>
        <Link to="profile">
          <CgProfile />
        </Link>
      </div>
    </header>
  );
};

export default SideNav;
