import logoDemo from '@/assets/logo-demo.png';
import LogoutButton from '@/components/Auth/LogoutButton';

function Header() {
  return (
    <header>
      <img src={logoDemo} />
      <LogoutButton />
    </header>
  );
}

export default Header;
