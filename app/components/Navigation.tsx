import { Link } from "@remix-run/react";
import { navigationItems } from "~/config/navigation";
import ModeToggle from "./ModeToggle";

interface NavigationProps {
  themeToggle?: boolean;
}

export default function Navigation({ themeToggle }: NavigationProps) {
  return (
    <nav className="terminal-menu">
      <ul>
        {navigationItems
          .sort((a, b) => (a.order || 99) - (b.order || 99))
          .map((item) => (
            <li key={item.path}>
              <Link to={item.path} className="hover:underline">
                {item.label}
              </Link>
            </li>
          ))}
          { themeToggle && <li><ModeToggle /></li>}
      </ul>
    </nav>
  );
}