import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import "./tailwind.css";
import './terminal.css';
import Navigation from "./components/Navigation";

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
            <Navigation themeToggle={true} />
          </div>
        </div>
        <div className="container">
          {children}
        </div>
        <footer className="container">
          <div className="mt-6 flex flex-col md:flex-row justify-between items-center place-items-center">
            <p className="text-sm">Copyright © {currentYear} Jelle Kralt</p>
            <div className="mt-4 md:mt-0 space-x-4">
              <Navigation themeToggle={false} />
            </div>
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
