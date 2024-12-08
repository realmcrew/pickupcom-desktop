import { Link } from '@tanstack/react-router';
import LogoIcon from '@/assets/logo/logo_500x500.png';

export default function Navbar() {
  return (
    <header className="flex items-center w-full justify-center">
      <Link to="/">
        <img src={LogoIcon} alt="logo" className="w-16 scale-150" />
      </Link>
    </header>
  );
}
