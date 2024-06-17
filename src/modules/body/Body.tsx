import { useEffect } from "react";
import { appRouter } from "../routes";
import { RouterProvider } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../auth/firebase";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../redux/userSlice";
import { gitHubProfilePhotoURL } from "../shared/utils/links";

const Body = () => {

  const dispatch = useDispatch();
  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      if(user){
        const {uid, email, displayName} = user;
        dispatch(
          addUser({
            uid,
            email,
            displayName,
            photoURL: gitHubProfilePhotoURL,
          })
        );
      }else{
        dispatch(removeUser({}));
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return <RouterProvider router={appRouter} />;
};

export default Body;
