import yoga from "../../assets/logo/yoga.svg";
import swim from "../../assets/logo/swim.svg";
import cycle from "../../assets/logo/cycle.svg";
import strong from "../../assets/logo/strong.svg";

export default function Sidebar() {
  return (
    <aside>
      <nav className="sidebar-nav">
        <button className="btn">
          <img src={yoga} alt="yoga icon" />
        </button>
        <button className="btn">
          <img src={swim} alt="swim icon" />
        </button>
        <button className="btn">
          <img src={cycle} alt="cycle icon" />
        </button>
        <button className="btn">
          <img src={strong} alt="strong icon" />
        </button>
      </nav>
      <p className="copyright">Copiryght, SportSee 2020</p>
    </aside>
  );
}
