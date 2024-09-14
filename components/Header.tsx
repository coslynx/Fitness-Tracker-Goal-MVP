import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';

interface HeaderProps {
  session: Session | null;
}

const Header: React.FC<HeaderProps> = ({ session }) => {
  return (
    <header className="bg-white shadow-md py-4 px-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Fitness Tracker
        </Link>
        <nav>
          <ul className="flex space-x-4">
            {session?.user ? (
              <>
                <li>
                  <Link href="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <button
                    onClick={() => signOut()}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/login">Login</Link>
                </li>
                <li>
                  <Link href="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;