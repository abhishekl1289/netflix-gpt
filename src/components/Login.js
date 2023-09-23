import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";

import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BACKGROUND_IMAGE, USER_AVATAR } from "../utils/constants";
const Login = () => {
  const dispatch=useDispatch()
  
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const name=useRef(null)
  const email = useRef(null);
  const password = useRef(null);
  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) return;
    if (!isSignInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value, photoURL: USER_AVATAR
          }).then(() => {
            const { uid, email, displayName,photoURL } = auth.currentUser;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName,photoURL:photoURL }));
            
            // Profile updated!
            // ...
          }).catch((error) => {
            setErrorMessage(error.message)
            // An error occurred
            // ...
          });
          
        

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " " + errorMessage);
          // ..
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          
        
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " " + errorMessage);
        });
    }
  };
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div className="">
      <Header />
      <div className="absolute">
        <img
          className="brightness-50"
          src={BACKGROUND_IMAGE}
          alt="background-img"
        />
      </div>
      <form
        className="p-12 bg-black absolute my-36 mx-auto right-0 left-0 w-4/12 text-white rounded-md bg-opacity-80"
        onSubmit={(e) => e.preventDefault()}
      >
        <h1 className="py-3 mb-6 text-3xl font-semibold">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
          ref={name}
            type="text"
            placeholder="Full name"
            className="py-3 px-4 mb-4 bg-[#333] w-full outline-none rounded-md"
          ></input>
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="py-3 px-4 mb-4 bg-[#333] w-full outline-none rounded-md"
        ></input>
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="py-3 px-4 mb-4 bg-[#333] outline-none w-full rounded-md"
        ></input>
        <p className="text-red-500">{errorMessage}</p>
        <button
          className="py-3 mt-4 bg-[#e50914] w-full rounded-md"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <p className="mt-10 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Netflix? Sign up now"
            : "Already Registered? Sign In now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
