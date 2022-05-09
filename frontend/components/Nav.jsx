import { useState, useEffect } from "react";
import { userService } from "services";
import { Disclosure } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { NavLink } from "./NavLink"

export { Nav };

const navigation = [
  { name: "Home", href: "/", protected: false },
  { name: "Users", href: "/users", protected: true },
];

function Nav() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscription = userService.user.subscribe((x) => {
      setUser(x);
    });
    return () => subscription.unsubscribe();
  }, []);

  const logout = () => userService.logout();

  if (!user) return null;

  // only show nav when logged in
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <div className="relative flex items-center justify-between h-16">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                <div className="invert flex-shrink-0 flex items-center">
                  <a key="HomeImage" href="/">
                    <img
                      className="hidden lg:block h-8 w-auto"
                      src="https://design.willowtreeapps.com/static/media/WT_Logo_Black.d90341a2.svg"
                      alt="Willow"
                    />
                  </a>
                </div>
                <NavLink exact navElement={navigation[0]} />
                <NavLink navElement={navigation[1]} />
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">Log out</span>
                  <a
                    key="Log out"
                    href="#"
                    className={
                      "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                    }
                    onClick={logout}
                  >
                    Log out
                  </a>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  );
}
