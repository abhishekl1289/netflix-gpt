import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";


const Header = () => {
  const dispatch=useDispatch()
  const user = useSelector((store) => store.user);
  const showGptSearch=useSelector(store=>store.gpt.showGptSearch)
  const navigate = useNavigate();
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        
        // Sign-out successful.
      })
      .catch((error) => {
        navigate("/error");
        // An error happened.
      });
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName,photoURL } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName,photoURL:photoURL }));
        navigate("/browse")
        // ...
      } else {
        dispatch(removeUser());
        navigate("/")
        // User is signed out
        // ...
      }
    });
    return ()=>unsubscribe()
  }, []);
  const handleGptSearchClick=()=>{
    dispatch(toggleGptSearchView())
  }
  const handleLanguageChange=(e)=>{
    dispatch(changeLanguage(e.target.value))
  }
  return (
    <div className="absolute w-full px-8 py-2 z-10 flex justify-between ">
      <img
        className="w-44"
        src={LOGO}
        alt="logo"
      />
      {user && (
        <div className="flex gap-2 h-4 items-center mt-4">
          {showGptSearch && (<select className="p-2 bg-gray-900 text-white" onChange={handleLanguageChange}>
            {SUPPORTED_LANGUAGES.map(lang=><option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
          </select>)}
          <button className="bg-purple-800 text-white px-4 py-2 rounded-md" onClick={handleGptSearchClick}>{showGptSearch?"Homepage":"GPT Search"}</button>
          <img
            className="w-10 h-10 object-cover"
            alt="user-icon"
            src={user?.photoURL}
          />
          <button onClick={handleSignOut} className="font-bold text-purple-800">
            (Sign out)
          </button>
        </div>
      )}
    </div>
  );
};
// bg-gradient-to-b from-black
export default Header;
