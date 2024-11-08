import logo from "../../assets/logo.svg";

export default function Header() {
  return (
    <header>
      <nav>
        <img src={logo} alt="SportSee" />
        <ul className="items">
          <li className="item">Accueil</li>
          <li className="item">Profil</li>
          <li className="item">Réglage</li>
          <li className="item">Communauté</li>
        </ul>
      </nav>
    </header>
  );
}
