/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { X } from "lucide-react";

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
        {/* Close Button */}
        <button className="self-end mb-5" onClick={() => setNavIsOpen(false)}>
          <X size={28} />
        </button>

        {/* Navigation Links */}
        <nav className="space-y-4">
          <a href="#" className="block text-lg font-medium hover:text-blue-600">Home</a>
          <a href="#" className="block text-lg font-medium hover:text-blue-600">About</a>
          <a href="#" className="block text-lg font-medium hover:text-blue-600">Services</a>
          <a href="#" className="block text-lg font-medium hover:text-blue-600">Contact</a>
        </nav>
      </motion.div>
    </div>
  );
};

export default NavigationMenu;
