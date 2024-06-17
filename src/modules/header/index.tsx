import { signOut } from "firebase/auth";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../auth/firebase";
import { userState } from "../redux/userSlice";
import { LOGIN_PATH } from "../routes/paths";


const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((state:userState) => state.user);
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate(LOGIN_PATH);
      })
      .catch((error) => {
        navigate("/error");
      });
  };

  return (
    <div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-full flex justify-between">
      <img
        className="sm:w-44 w-full bg-greed-400"
        src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="logo"
      />
      {user.uid && (
        <div className="flex p-2 items-center gap-2">
          <img className="w-10 h-10 rounded-3xl" alt="user-icon" src={user?.photoURL ?? ""} />
          <button onClick={handleSignOut} className="font-bold text-white ">
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
