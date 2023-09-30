import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div>
      <div className="">
        <div className="flex justify-center mt-10">
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form>
              <div className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="text"
                    placeholder="email"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="text"
                    placeholder="password"
                    className="input input-bordered"
                  />
                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover">
                      Forgot password?
                    </a>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Login</button>
                </div>
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
        </div>
      </div>
    </div>
  );
};

export default Login;
