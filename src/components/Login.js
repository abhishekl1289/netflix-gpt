import { useState } from "react";
import Header from "./Header";
const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div className="">
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/f85718e8-fc6d-4954-bca0-f5eaf78e0842/ea44b42b-ba19-4f35-ad27-45090e34a897/IN-en-20230918-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          alt="background-img"
        />
      </div>
      <form className="p-12 bg-black absolute my-36 mx-auto right-0 left-0 w-4/12 text-white rounded-md bg-opacity-80">
        <h1 className="py-3 mb-6 text-3xl font-semibold">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        {!isSignInForm && (
          <input
            type="text"
            placeholder="Full name"
            className="py-3 px-4 mb-4 bg-[#333] w-full outline-none rounded-md"
          ></input>
        )}
        <input
          type="text"
          placeholder="Email or phone number"
          className="py-3 px-4 mb-4 bg-[#333] w-full outline-none rounded-md"
        ></input>
        <input
          type="password"
          placeholder="Password"
          className="py-3 px-4 mb-4 bg-[#333] outline-none w-full rounded-md"
        ></input>
        <button className="py-3 mt-4 bg-[#e50914] w-full rounded-md">
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
