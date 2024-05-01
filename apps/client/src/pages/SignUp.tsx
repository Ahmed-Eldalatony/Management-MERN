import { useState, ChangeEvent } from "react";
import useDebounce from "../hooks/useDebounce";
import { twMerge } from "tailwind-merge";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Input from "../components/Input";

type InputChange = ChangeEvent<HTMLInputElement>;
const serverUrl = import.meta.env.VITE_APP_API_URL || "";
function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordMatched, setPasswordMatched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [image, setImage] = useState<File | string>();
  const [clientImage, setClientImage] = useState<File | null>(null);

  useDebounce(() => handleForm(authUrl), 500, [
    name,
    email,
    password,
    passwordConfirm,
    image,
  ]);
  const authUrl = `${serverUrl}/api/auth/signup`;
  const userUrl = `${serverUrl}/api/user/signup`;
  const handleForm = (url: string) => {
    setIsLoading(true);
    setError(null);

    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("image", image as string);

    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (!response.ok) {
          response.json().then((data) => {
            setError(data.message);
          });
        }
        !passwordMatched ? setError("Passwords do not match") : setError("");
        return response.json();
      })
      .then((data) => {
        if (data.data) navigate("/login");
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.message || "An error occurred");
        setIsLoading(false);
      });
    setError("");
  };
  const handlePasswordConfirm = (e: InputChange) => {
    setPasswordConfirm(e.target.value);
    if (e.target.value !== password) {
      setPasswordMatched(false);
    } else {
      setPasswordMatched(true);
    }
  };

  const onImageChange = (e: InputChange) => {
    const currentImage = e.target.files?.[0] as File;
    if (currentImage.name.length > 30) {
      // alert("Image name should be shorter than 30 characters");
      return;
    }
    // @ts-ignore
    setClientImage(URL.createObjectURL(currentImage));
    setImage(currentImage);
  };

  return (
    <div className="absolute min-w- top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-sky-500 bg-slate-900 text-white w-[420px] p-8 mx-auto rounded-xl">
      <h1 className="text-4xl text-gray-200 font-semibold mb-6">
        Create an account
      </h1>
      <form action="" className="flex flex-col gap-4 text-gray-900">
        <Input
          onChange={(e: InputChange) => setName(e.target.value)}
          value={name}
          type="text"
          placeholder="Enter Your Name"
        />
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
        <Input
          onChange={(e: InputChange) => handlePasswordConfirm(e)}
          value={passwordConfirm}
          type="password"
          placeholder="Rewrite Password"
        />

        <input
          id="image"
          type="file"
          accept="image/*"
          onChange={onImageChange}
          className="w-full  text-slate-300 rounded-md p-3  outline-none focus:outline-offset-0 bg-slate-800 focus:bg-slate-700 transition-[outline] focus:outline-2 focus:border-none focus:outline-sky-500"
        />
        {clientImage && (
          <img
            className="w-20 h-20 object-cover"
            //@ts-ignore
            src={clientImage}
            height={250}
            width={250}
          />
        )}

        <span className="text-red-500 w-80"> {error}</span>
        <button
          onClick={(e) => {
            e.preventDefault();
            handleForm(userUrl);
          }}
          className={twMerge(
            " font-semibold px-3 py-3 rounded-md w-1/3",
            isLoading ? "bg-sky-800" : "bg-sky-500"
          )}
        >
          {isLoading ? "Loading..." : "Sign Up"}
        </button>

        <span className="text-sm text-slate-300">
          Do you have an account?{" "}
          <Link className="text-sky-500" to="/login">
            Login
          </Link>
        </span>
      </form>
    </div>
  );
}

export default SignUp;
