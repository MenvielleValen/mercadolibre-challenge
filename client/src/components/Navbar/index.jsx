
import Logo from '../Logo';
import Searchbar from '../Searchbar';
import style from './styles.module.scss';

const Navbar = () => {
  return (
    <nav className={style.navbar}>
        <div className={style.container}>
          <Logo/>
          <Searchbar/>
        </div>
    </nav>
  )
}

export default Navbar;

