import { useState, ChangeEvent } from "react";
import Input from "../components/Input";
import { twMerge } from "tailwind-merge";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser, userLoading } from "../redux/actions/userAction";
import { State } from "../utils/sharedTypes";
type InputChange = ChangeEvent<HTMLInputElement>;

function LogIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { user, loading } = useSelector((state: State) => state.user);

  const handleForm = async () => {
    dispatch(await userLoading(true));
    dispatch(await fetchUser(email, password));
    dispatch(await userLoading(false));
  };

  user?.loggedIn && navigate("/");
  console.log("this is from redux", user.loggedIn, loading);
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-sky-500 bg-slate-900 text-white min-w-[420px] p-8 mx-auto rounded-xl">
      <h1 className="text-4xl text-gray-200 font-semibold mb-6">Log in</h1>
      <form action="" className="flex flex-col gap-4 text-gray-900">
        <Input
          onChange={(e: InputChange) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="Enter Your Email"
        />
        <Input
          onChange={(e: InputChange) => setPassword(e.target.value)}
          value={password}
          type="password"
          placeholder="Enter Your Password"
        />

        {user?.error && (
          <span className="text-red-500 w-80"> {user.error}</span>
        )}

        <button
          onClick={(e) => {
            e.preventDefault();
            handleForm();
          }}
          className={twMerge(
            " font-semibold text-base px-3 py-3 rounded-md w-1/3 ",
            loading ? "bg-sky-800" : "bg-sky-500"
          )}
        >
          {loading ? "Loading..." : "Log in"}
        </button>
        <span className="text-sm text-slate-300">
          Don't have an account?{" "}
          <Link className="text-sky-500" to="/signup">
            Sign up
          </Link>
        </span>
      </form>
    </div>
  );
}

export default LogIn;
