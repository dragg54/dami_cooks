/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

const NavigationMenu = ({navIsOpen, setNavIsOpen}) => {
  return (
    <div className="relative">
      {navIsOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setNavIsOpen(false)}
        />
      )}

      {/* Sidebar Menu */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: navIsOpen ? "0%" : "100%" }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 p-5 flex flex-col"
      >

        {/* Navigation Links */}
        <nav className="space-y-4 mt-8">
          <a href="/" className="block  font-medium border-b ">HOME</a>
          <a href="/about-us" className="block  font-medium border-b ">ABOUT</a>
          <a href="#" className="block  font-medium border-b ">SERVICES</a>
          <a href="/customer/orders" className="block  font-medium border-b ">MY ORDERS</a>
          <a href="/contact-us" className="block  font-medium border-b ">CONTACT</a>
          <a href="#" className="block  font-medium border-b ">LOGOUT</a>
        </nav>
      </motion.div>
    </div>
  );
};

export default NavigationMenu;
