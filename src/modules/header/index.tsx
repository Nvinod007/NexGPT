import { onAuthStateChanged, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../auth/firebase";
import { addUser, removeUser, userState } from "../redux/userSlice";
import { BROWSE_PATH, LOGIN_PATH } from "../routes/paths";
import { useEffect } from "react";
import { LOGO_URL, GITHUB_PROFILE_PHOTO_URL } from "../shared/utils/constants";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((state: userState) => state.user);
  const handleSignOut = () => {
    signOut(auth);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(
          addUser({
            uid,
            email,
            displayName,
            photoURL: GITHUB_PROFILE_PHOTO_URL,
          })
        );
        navigate(BROWSE_PATH);
      } else {
        dispatch(removeUser({}));
        navigate(LOGIN_PATH);
      }
    });
    // unsubscribe when component unmounts;
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="absolute px-8 py-2 bg-gradient-to-b from-black z-10 w-full flex justify-between">
      <img className="w-44  bg-greed-400" src={LOGO_URL} alt="logo" />
      {user.uid && (
        <div className="flex p-2 items-center gap-2">
          <img
            className="w-10 h-10 rounded-3xl"
            alt="user-icon"
            src={user?.photoURL ?? ""}
          />
          <button onClick={handleSignOut} className="font-bold text-white ">
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
