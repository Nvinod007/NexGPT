import { useState, useRef } from "react";
import Header from "../header";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { checkValidData } from "../shared/utils/validate";
import { auth } from "./firebase";
import { gitHubProfilePhotoURL } from "../shared/utils/links";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const dispatch = useDispatch();

  const name = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonClick = () => {
    if (!email?.current?.value?.trim() || !password?.current?.value?.trim()) {
      setErrorMessage("Enter email and password");
      return;
    }
    const message = checkValidData(
      email?.current?.value || "",
      password.current?.value || ""
    );
    setErrorMessage(message);
    if (message) return;

    if (!isSignInForm) {
      // Sign Up Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current?.value,
            photoURL: gitHubProfilePhotoURL,
          })
            .then((user) => {
              const email = auth.currentUser?.email ?? "";
              const uid = auth.currentUser?.uid ?? "";
              const displayName = auth.currentUser?.displayName ?? "";
              dispatch(
                addUser({
                  uid,
                  email,
                  displayName,
                  photoURL: gitHubProfilePhotoURL,
                })
              );
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      // Sign In Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          className="w-screen h-screen  overflow-hidden"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/fc164b4b-f085-44ee-bb7f-ec7df8539eff/d23a1608-7d90-4da1-93d6-bae2fe60a69b/IN-en-20230814-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="logo"
        />
        <form
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col h-full sm:h-fit w-full sm:w-4/6 lg:w-5/12 top-0 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
        >
          <h1 className="font-bold text-3xl py-4">
            {isSignInForm ? "Sign In" : "Sign Up"}
          </h1>

          {!isSignInForm && (
            <input
              ref={name}
              type="text"
              placeholder="Full Name"
              className="p-4 my-4 w-full bg-gray-700"
            />
          )}
          <input
            ref={email}
            type="text"
            placeholder="Email Address"
            className="p-4 my-4 w-full bg-gray-700"
          />
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="p-4 my-4 w-full bg-gray-700"
          />
          <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
          <button
            className="p-4 my-6 bg-red-700 w-full rounded-lg"
            onClick={handleButtonClick}
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
          <div className="flex flex-row py-4 items-end ">
            <p className="">
              {isSignInForm ? "New to Netflix?" : "Already registered?"}
            </p>
            <p
              className="text-blue-400 cursor-pointer pl-2 text-xl font-bold"
              onClick={toggleSignInForm}
            >
              {isSignInForm ? "Sign Up" : "Sign In"}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
