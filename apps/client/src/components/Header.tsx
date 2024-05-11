import { useSelector, useDispatch } from "react-redux";
import { userLoggingOut } from "../redux/actions/userAction";
import { State } from "../utils/sharedTypes";
function Header() {
  const { user } = useSelector((state: State) => state.user);
  const dispatch = useDispatch();
  const url = import.meta.env.VITE_APP_API_URL || "http://localhost:3000/";
  const logoutHandler = async () => {
    try {
      await fetch("/api/auth/logout");
      dispatch(userLoggingOut());
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <header className="flex min-h-3  items-center justify-between p-3">
        <a href="/" className="text-4xl font-bold text-sky-500">
          Doto
        </a>
        <nav className="flex gap-9 ">
          <ul className="flex gap-9 items-center">
            <li>
              <a href="/">Home</a>
            </li>
            {!user?.data && (
              <>
                <li>
                  <a href="/signup">register</a>
                </li>
                <li>
                  <a href="/login">login</a>
                </li>
              </>
            )}
            {user.data && (
              <li>
                <button onClick={() => logoutHandler()}>logout</button>
              </li>
            )}
            {user?.data?.image && (
              <li>
                <img
                  src={user.data.image}
                  className="w-10 h-10 object-cover rounded-lg"
                  alt="there is an error"
                />
              </li>
            )}
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;
