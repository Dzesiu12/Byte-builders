import { getAppServerAuthSession } from "@/server/auth";
import Link from "next/link";
import {
  RiListIndefinite,
  RiMenu3Line,
  RiMessage2Line,
  RiUser3Line,
  RiVipCrownLine,
} from "react-icons/ri";

export const Navbar = async () => {
  const session = await getAppServerAuthSession();

  return (
    <div className="border-b py-2">
      <div className="container mx-auto flex flex-1 items-center justify-between pr-4">
        <Link href="/" className="btn btn-ghost text-xl normal-case">
          Byte Builders
        </Link>

        {session ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn m-1">
              <RiMenu3Line className="sm:hidden" />
              <span className="hidden sm:block">{session.user.email}</span>
            </label>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-[1] w-52 rounded-box bg-base-100 p-2 shadow"
            >
              <li>
                <Link className="flex justify-between gap-2" href="/dashboard">
                  Dashboard
                  <RiVipCrownLine className="h-4 w-4" />
                </Link>
              </li>
              <li>
                <Link className="flex justify-between gap-2" href="/profile">
                  Moje konto
                  <RiUser3Line className="h-4 w-4" />
                </Link>
              </li>
              <li>
                <Link className="flex justify-between gap-2" href="/chat">
                  Wiadomości
                  <RiMessage2Line className="h-4 w-4" />
                </Link>
              </li>
              <li>
                <Link
                  className="flex justify-between gap-2"
                  href="/profile/my-ads"
                >
                  Moje ogłoszenia
                  <RiListIndefinite />
                </Link>
              </li>
            </ul>
          </div>
        ) : (
          <Link href="/auth/login" className="btn">
            Zaloguj się
          </Link>
        )}
      </div>
    </div>
  );
};
