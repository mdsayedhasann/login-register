import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import auth from "../../firebase/firebase.init";
import "react-toastify/dist/ReactToastify.css";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRef, useState } from "react";

const Login = () => {
  const [successLogin, setSuccessLogin] = useState("");
  const [errorLogin, setErrorLogin] = useState("");
  const [messageForget, setMessageForget] = useState("");
  const emailRef = useRef(null);

  // Login Function Start
  const handleLogin = (e) => {
    e.preventDefault();

    setSuccessLogin("");
    setErrorLogin("");
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log("Logged In", email, password);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCrediential) => {
        const user = userCrediential.user;
        console.log(user);
        toast.success("Login Success", {
          position: "bottom-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((error) => {
        console.log(error);
        setErrorLogin(error.message);
      });
  };

  const handleForgetPassword = () => {
    // Toast
    const email = emailRef.current.value;
    setMessageForget("");
    if (!email) {
      setMessageForget("Email field can not be blank");
    } else if (!/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      setMessageForget("This is not a valid email address");
    } else {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          // Toast
          toast.success("Password reset link has sent to your Email", {
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
          alert(error.message);
        });
    }
  };

  // Login Function End

  return (
    <div>
      <div className="">
        <div className="flex justify-center mt-10">
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleLogin}>
              <div className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    ref={emailRef}
                    placeholder="Enter Your Email"
                    className="input input-bordered"
                  />
                  {
                    <p className="text-red-600 text-left ml-2 opacity-90">
                      {" "}
                      {messageForget}{" "}
                    </p>
                  }
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter Your Password"
                    className="input input-bordered"
                  />
                  <label className="label">
                    <a
                      onClick={handleForgetPassword}
                      href="#"
                      className="label-text-alt link link-hover"
                    >
                      Forgot password?
                    </a>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Login</button>
                </div>
                {successLogin && (
                  <p className="text-green-500"> {successLogin} </p>
                )}

                {errorLogin && <p className="text-red-600"> {errorLogin} </p>}
                <div className="mt-4">
                  <p>New in the website?</p>
                  <Link to="/register">
                    <button className="px-5 py-2 rounded-md bg-green-400 my-3 hover:bg-green-700 text-white transition font-bold">
                      Register
                    </button>
                  </Link>
                </div>
              </div>
            </form>
          </div>
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
  );
};

export default Login;
