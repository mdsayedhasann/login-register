import React, { useState } from "react";
import { Link } from "react-router-dom";
import auth from "../../firebase/firebase.init";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [successRegister, setSuccessRegister] = useState("");
  const [errorRegister, setErrorRegister] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();

    // Remove message for next
    setSuccessRegister("");
    setErrorRegister("");

    const email = e.target.email.value;
    const password = e.target.password.value;
    const checkbox = e.target.terms.checked;

  
    if (password.length < 6) {
      setErrorRegister("Password should be 6 charecter or longer");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setErrorRegister("Please use at least one Capital letter");
      return;
    } else if (!/[1-9]/.test(password)) {
      setErrorRegister("Please use at least one number");
      return;
    } else if (!/[!,@,#,$,%,&,*,(,), -, +]/.test(password)) {
      setErrorRegister("Please Use at least one special charecter");
      return;
    } else if(!checkbox){
        setErrorRegister('Please select the Terms of Service')
        return
    }
    else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          sendEmailVerification(userCredential.user)
          .then(() =>{
            // Toast 
            toast.success("Email verification mail has been sent", {
              position: "bottom-right",
              autoClose: 2500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            // Toast 
          })
          .catch((error) => {
            // Error Toast
            toast.error(error.message, {
              position: "bottom-right",
              autoClose: 2500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }); 
            // Error Toast 
            
          })
          setSuccessRegister("Registration Success");
          console.log(user);
        })
        .catch((error) => {
          // alert(error.message)
          console.log(error);
          setErrorRegister(error.message);
        });
    }
    console.log("Form submitted", email), password;
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div>
      <div className="">
        <div className="flex justify-center mt-10">
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleRegister}>
              <div className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    className="input input-bordered"
                    name="email"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter Your Password"
                      className="input input-bordered  w-full"
                      name="password"
                    />
                    <p
                      onClick={handleShowPassword}
                      className="absolute top-4 right-4 cursor-pointer"
                    >
                      {showPassword ? (
                        <AiFillEyeInvisible />
                      ) : (
                        <AiFillEye></AiFillEye>
                      )}
                    </p>
                  </div>

                  <div className="flex gap-2 mt-1">
                      <input type="checkbox" name="terms" id="" />
                    <label className="label">
                      <p>
                        Accept our <a href="#">Terms of Service</a>{" "}
                      </p>
                    </label>
                  </div>
                </div>
                <div className="form-control mt-0">
                  <button className="btn btn-primary">Register</button>
                </div>
                <div>
                  {
                    <p className="text-green-400 text-center">
                      {" "}
                      {successRegister}{" "}
                    </p>
                  }
                  {<p className="text-red-600 text-center">{errorRegister}</p>}
                </div>
                <div className="mt-4">
                  <p>Already have an account?</p>
                  <Link to="/login">
                    <button className="px-5 py-2 rounded-md bg-green-400 my-3 hover:bg-green-700 text-white transition font-bold">
                      Login
                    </button>
                  </Link>
                </div>
              </div>
            </form>
            <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
