import { Link } from "@tanstack/react-router";


const Footer = () => {
  const additionalInfo = [
    { name: "About", link: "/about" },
    { name: "Request Masjid", link: "/new-masjid" },
    { name: "Already Implemented", link: "/implemented-features" },
    // { name: "Donation", link: "/donation" },
  ];
  const links = [
    { name: "Home", link: "/" },
    { name: "Feedback", link: "/feedback" },
    { name: "Upcoming Features", link: "/upcoming" },
  ];

  return (
    <footer className="bg-white dark:bg-gray-900 border-t scroll-smooth">
      <div className="mx-auto w-full max-w-screen-xl px-4 py-8 sm:py-10">
        {/* Top Section */}
        <div className="md:flex md:justify-between md:items-start">
          {/* Brand Section */}
          <div className="mb-8 md:mb-0">
            <Link to="/" className="flex items-center space-x-2">
              <span className="self-center text-2xl font-bold tracking-wide text-gray-900 dark:text-white">
                Salah Times
              </span>
            </Link>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 max-w-sm">
              Your trusted source for accurate and up-to-date prayer times.
            </p>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-2 gap-8 sm:gap-12 md:gap-16">
            <div>
              <h2 className="mb-4 text-sm font-semibold uppercase text-gray-800 dark:text-gray-200">
                Quick Links
              </h2>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.link as "/" | "/feedback" | "/upcoming"}
                      className="text-gray-600 dark:text-gray-400 hover:underline"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-4 text-sm font-semibold uppercase text-gray-800 dark:text-gray-200">
                Additional Info
              </h2>
              <ul className="space-y-3">
                {additionalInfo.map((info, index) => (
                  <li key={index}>
                    <Link
                      to={info.link as "/about" | "/new-masjid" | "/implemented-features"}
                      className="text-gray-600 dark:text-gray-400 hover:underline"
                    >
                      {info.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="my-8 border-gray-200 dark:border-gray-700" />

        {/* Bottom Section */}
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()}{" "}
            <Link to="/" className="font-medium hover:underline">
              Salah Times
            </Link>
            . Made with ❤️ for the Muslim Ummah.
          </span>
          <div className="mt-4 sm:mt-0">
            <a
              href="https://salahtime.in/privacy"
              className="text-sm text-gray-500 hover:underline dark:text-gray-400"
            >
              Privacy Policy
            </a>
            <span className="mx-2 text-gray-500">|</span>
            <a
              href="https://salahtime.in/terms"
              className="text-sm text-gray-500 hover:underline dark:text-gray-400"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
