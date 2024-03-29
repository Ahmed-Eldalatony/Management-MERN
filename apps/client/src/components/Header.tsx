function Header() {
  return (
    <>
      <header className="flex min-h-3 justify-between py-5">
        <a href="/" className="text-4xl font-bold text-sky-500">Doto</a>
        <nav>
          <ul className="flex gap-9">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/register">register</a>
            </li>
            <li>
              <a href="/login">login</a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Header;
