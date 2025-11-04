import React from "react";
import { motion } from "framer-motion";
import { Menu, X, ShoppingBag } from "lucide-react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl font-bold text-pink-600 cursor-pointer"
        >
          ParfumShop
        </motion.div>

        <div className="hidden md:flex space-x-8 text-gray-700 font-medium">
          {["Accueil", "Catégories", "Promotions", "Contact"].map((item, i) => (
            <motion.a
              key={i}
              href="#"
              className="relative group"
              whileHover={{ scale: 1.1 }}
            >
              {item}
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-pink-600 group-hover:w-full transition-all"></span>
            </motion.a>
          ))}
        </div>

        <motion.div
          whileHover={{ rotate: 15, scale: 1.2 }}
          className="cursor-pointer"
        >
          <ShoppingBag className="w-6 h-6 text-gray-700" />
        </motion.div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

    
      {isOpen && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="md:hidden bg-white shadow-md"
        >
          <div className="flex flex-col space-y-4 px-6 py-4 text-gray-700">
            {["Accueil", "Catégories", "Promotions", "Contact"].map((item, i) => (
              <a key={i} href="#" className="hover:text-pink-600">
                {item}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
