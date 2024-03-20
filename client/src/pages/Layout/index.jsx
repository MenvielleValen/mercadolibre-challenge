import { Outlet } from "react-router-dom";
import style from "./styles.module.scss";

export const Layout = () => {
  return (
    <main className={style.layout}>
      <Outlet />
    </main>
  );
};
