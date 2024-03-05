import { Link } from "react-router-dom";

import imagemCabeleleira from "../assets/cabeleleira.png";

function Hero() {
  return (
    <div className="flex items-center justify-center h-[50rem] flex-col">
      <img
        src={imagemCabeleleira}
        alt="cabeleleira"
        width={260}
        height={260}
      />

      <div className="flex">
        {" "}
        <h1 className="text-xl mt-5">
          Agendamento{" "}
          <Link to="/agendamento">
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-10 h-10 inline-block cursor-pointer"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
                />
              </svg>
            </span>
          </Link>
        </h1>
      </div>
    </div>
  );
}

export default Hero;
