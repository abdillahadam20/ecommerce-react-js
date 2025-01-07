const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-screen-xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white text-lg font-medium mb-4">About Us</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white">
                  Our Story
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Press
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white text-lg font-medium mb-4">
              Customer Service
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Shipping
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Returns
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white text-lg font-medium mb-4">Policies</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-white text-lg font-medium mb-4">Connect</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white">
                  Facebook
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Twitter
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p>&copy; 2024 Mini Shop. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
