import { useState, useEffect } from "react";

function ModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    }
  }, []);

  const handleToggle = () => {
    const newTheme = isDarkMode ? "light" : "dark";
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
    localStorage.setItem("theme", newTheme);

    // Optionally, send a request to the server to persist the theme choice
    // fetcher.submit({ theme: newTheme }, { method: "post", action: "/api/theme" });
  };

  return (
    <div className="flex items-center justify-center">
      <input
        type="checkbox"
        id="toggle"
        className="hidden"
        checked={isDarkMode}
        onChange={handleToggle}
      />
      <label htmlFor="toggle" className="relative cursor-pointer">
        <div className="flex items-center justify-between w-14 h-8 bg-gray-300 dark:bg-gray-700 rounded-full p-1">
          {/* Sun Icon */}
          <svg
            className="w-6 h-6 text-yellow-500 dark:text-gray-400 transition-all duration-300"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M 11.999 16.891 C 9.303 16.891 7.109 14.697 7.109 12.001 C 7.109 9.304 9.303 7.11 11.999 7.11 C 14.696 7.11 16.89 9.304 16.89 12.001 C 16.89 14.697 14.696 16.891 11.999 16.891 Z M 11.999 6.096 C 11.62 6.096 11.312 5.788 11.312 5.409 L 11.312 3.174 C 11.312 2.795 11.62 2.486 11.999 2.486 C 12.38 2.486 12.687 2.795 12.687 3.174 L 12.687 5.409 C 12.687 5.788 12.38 6.096 11.999 6.096 Z M 11.999 21.514 C 11.62 21.514 11.312 21.206 11.312 20.827 L 11.312 18.592 C 11.312 18.213 11.62 17.905 11.999 17.905 C 12.38 17.905 12.687 18.213 12.687 18.592 L 12.687 20.827 C 12.687 21.206 12.38 21.514 11.999 21.514 Z M 20.826 12.688 L 18.591 12.688 C 18.212 12.688 17.904 12.38 17.904 12.001 C 17.904 11.62 18.212 11.313 18.591 11.313 L 20.826 11.313 C 21.205 11.313 21.514 11.62 21.514 12.001 C 21.514 12.38 21.206 12.688 20.826 12.688 Z M 5.408 12.688 L 3.173 12.688 C 2.794 12.688 2.486 12.38 2.486 12.001 C 2.486 11.62 2.794 11.313 3.173 11.313 L 5.408 11.313 C 5.787 11.313 6.095 11.62 6.095 12.001 C 6.095 12.38 5.787 12.688 5.408 12.688 Z M 16.661 8.027 C 16.485 8.027 16.309 7.96 16.175 7.825 C 15.907 7.557 15.907 7.121 16.175 6.853 L 17.755 5.273 C 18.023 5.005 18.459 5.005 18.727 5.273 C 18.995 5.541 18.995 5.977 18.727 6.245 L 17.147 7.825 C 17.012 7.96 16.836 8.027 16.661 8.027 Z M 5.759 18.929 C 5.583 18.929 5.406 18.862 5.273 18.727 C 5.004 18.459 5.004 18.024 5.273 17.755 L 6.853 16.175 C 7.121 15.907 7.556 15.907 7.825 16.175 C 8.093 16.444 8.093 16.879 7.825 17.147 L 6.245 18.727 C 6.11 18.862 5.934 18.929 5.759 18.929 Z M 18.241 18.929 C 18.065 18.929 17.889 18.862 17.755 18.727 L 16.175 17.147 C 15.907 16.879 15.907 16.444 16.175 16.175 C 16.443 15.907 16.879 15.907 17.147 16.175 L 18.727 17.755 C 18.995 18.024 18.995 18.459 18.727 18.727 C 18.593 18.862 18.417 18.929 18.241 18.929 Z M 7.339 8.027 C 7.163 8.027 6.987 7.96 6.853 7.825 L 5.273 6.245 C 5.004 5.977 5.004 5.541 5.273 5.273 C 5.541 5.005 5.976 5.005 6.245 5.273 L 7.825 6.853 C 8.093 7.121 8.093 7.557 7.825 7.825 C 7.69 7.96 7.514 8.027 7.339 8.027 Z"></path>
          </svg>

          {/* Moon Icon */}
          <svg
            className="w-6 h-6 text-gray-600 dark:text-yellow-500 transition-all duration-300"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M 19.137 14.328 C 17.049 19.659 10.013 20.836 6.473 16.446 C 3.348 12.572 4.969 6.707 9.674 4.864 C 7.77 10.379 12.514 15.779 18.213 14.583 C 18.526 14.517 18.834 14.432 19.137 14.328 Z"></path>
          </svg>
        </div>
        {/* Toggle Circle */}
        <div
          className={`absolute top-1 left-1 w-6 h-6 bg-white rounded-full shadow-md transition-all duration-300 transform ${
            isDarkMode ? 'translate-x-full' : ''
          }`}
        ></div>
      </label>
    </div>
  );
}

export default ModeToggle;