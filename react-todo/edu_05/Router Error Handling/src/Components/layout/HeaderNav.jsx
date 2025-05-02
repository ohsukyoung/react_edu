import { NavLink } from "react-router-dom";

const HeaderNav = () => {
  return (
    <header>
      <nav className="menu-navigation">
        <ul>
          <li>
            <NavLink to="/">Main</NavLink>
          </li>
          <li>
            <NavLink to="/todo">Task</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default HeaderNav;
