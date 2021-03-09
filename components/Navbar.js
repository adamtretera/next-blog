import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { UserContext } from '../lib/context';
import { auth } from '../lib/firebase';

// Top navbar
export default function Navbar() {
  const { user, username } = useContext(UserContext);

  const router = useRouter();

  const signOut =  () => {
    auth.signOut();
    router.reload();
  }

  return (
    <nav className="navbar">
      <ul>
        <li>
          <Link href="/">
            <button className="btn-logo">📚 Můj blog</button>
          </Link>
        </li>

        {/* user is signed-in and has username */}
        {username && (
          <>
            <li className="push-left">
              <button className={"btn-red"} onClick={signOut}>Odhlásit se 👋 </button>
            </li>
            <li>
              <Link href="/admin">
                <button className="btn-green">Napsat článek 🖊️</button>
              </Link>
            </li>
            <li>
              <Link href={`/${username}`}>
                <img src={user?.photoURL || '/hacker.png'} />
              </Link>
            </li>
          </>
        )}

        {/* user is not signed OR has not created username */}
        {!username && (
          <li>
            <Link href="/enter">
              <button className="btn-blue">Přihlásit se 🖊️</button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
