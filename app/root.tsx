import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import "./tailwind.css";
import './terminal.css';
import ModeToggle from "./components/ModeToggle";

export function Layout({ children }: { children: React.ReactNode }) {
  const currentYear = new Date().getFullYear();
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="terminal">
        <div className="container">
          <div className="terminal-nav">
            <header className="terminal-logo">
              <div className="logo terminal-prompt"><a href="/" className="no-style">JelleKralt.com</a></div>
            </header>
            <nav className="terminal-menu">
              <ul>
                {/* <li><a href="/" className="menu-item"><span>Light</span></a></li> */}
                <li><ModeToggle /></li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="container">
          {children}
        </div>
        <footer className="container">
          <div className="mt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm">Copyright © {currentYear} Jelle Kralt</p>
            <nav className="mt-4 md:mt-0 space-x-4">
              <a href="/">home</a>
            </nav>
          </div>
        </footer>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
