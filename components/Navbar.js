import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light osahan-nav shadow-sm">
      <div className="container">
        <header
          className="d-flex flex-wrap justify-content-between"
          style={{ width: "100%" }}
        >
          <Link href="/" passHref>
            <a>
              <Image
                className="navbar-brand"
                alt="Menüzz.hu - Heti menü, napi menü a városodban!"
                title="Menüzz.hu - Heti menü, napi menü a városodban!"
                src={process.env.NEXT_PUBLIC_FRONTEND_URL + "logo.png"}
                width={128}
                height={31}
              />
            </a>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNavDropdown"
          >
            <ul className="navbar-nav ml-auto">
              <li className="nav-item active">
                <Link href="/" passHref>
                  <a className="nav-link">
                    <i className="fas fa-home"></i> Kezdőlap
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </header>
      </div>
    </nav>
  );
};

export default Navbar;
