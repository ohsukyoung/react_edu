import { Link } from "react-router-dom";

const HeaderNav = () => {
  return (
    <header>
      <nav className="menu-navigation">
        <ul>
          <li>
            <Link to="/">Main</Link>
          </li>
          <li>
            <Link to="/todo">Task</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default HeaderNav;
