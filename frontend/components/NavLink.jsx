import { useRouter } from "next/router";
import PropTypes from "prop-types";

import { Link } from ".";

export { NavLink };

// NavLink.propTypes = {
//   href: PropTypes.string.isRequired,
//   exact: PropTypes.bool,
// };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

NavLink.defaultProps = {
  exact: false,
};

function NavLink({ children, exact, navElement, ...props }) {
  const { pathname } = useRouter();
  const isSelected = exact
    ? pathname === navElement.href
    : pathname?.startsWith(navElement.href);

  return (
    <div className="hidden sm:block sm:ml-6">
      <div className="flex space-x-4">
        <Link
          key={navElement.name}
          href={navElement.href}
          className={classNames(
            isSelected
              ? "bg-gray-900 text-white"
              : "text-gray-300 hover:bg-gray-700 hover:text-white",
            "px-3 py-2 rounded-md text-sm font-medium"
          )}
          aria-current={isSelected ? "page" : undefined}
        >
          {navElement.name}
        </Link>
      </div>
    </div>
  );
}
