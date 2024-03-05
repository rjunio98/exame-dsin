import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

function Header() {
  return (
    <header className="flex justify-between items-center mt-2">
      <img
        src={logo}
        alt="cabeleleira"
        width={50}
      />

      <h1 className="text-2xl font-bold">Cabeleleira Leila</h1>

      <ul className="flex space-x-4">
        <Link to="/">
          <li className="text-xl hover:bg-rose-200 p-2 rounded-xl">Home</li>
        </Link>

        <Link to="/">
          <li className="text-xl hover:bg-rose-200 p-2 rounded-xl">About</li>
        </Link>

        <Link to="/">
          <li className="text-xl hover:bg-rose-200 p-2 rounded-xl">Contato</li>
        </Link>
      </ul>
    </header>
  );
}

export default Header;
