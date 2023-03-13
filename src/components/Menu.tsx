import { NavLink } from "react-router-dom";
import "./Menu.css";

export const Menu = () => (
  <div
    style={{
      width: "20%",
      height: "100vh",
      display: "flex",
      alignItems: "center",
    }}
  >
    <ul style={{ listStyleType: "upper-roman" }}>
      <li>
        <NavLink to="/" className="link">
          Intro
        </NavLink>
      </li>
      <li>
        <NavLink to="/simple" className="link">
          Simple fetch api
        </NavLink>
      </li>
      <li>
        <NavLink to="/simple-query" className="link">
          Simple react query
        </NavLink>
      </li>
      <li>
        <NavLink to="/prefetch" className="link">
          Prefetch
        </NavLink>
      </li>
      <li>
        <NavLink to="/inf" className="link">
          InfinityQuery
        </NavLink>
      </li>
      <li>
        <NavLink to="/mutate" className="link">
          Optimistic Update
        </NavLink>
      </li>
      <li>
        <NavLink to="/fail" className="link">
          Optimistic Rollback
        </NavLink>
      </li>
    </ul>
  </div>
);
