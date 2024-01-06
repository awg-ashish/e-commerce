import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
const NavBar2 = () => {
    const [toggleMenu, setToggleMenu] = useState(false);
    return (
        <nav className="bg-gray-800 border-t-2 border-gray-700 p-2">
            <div className="max-w-7xl p-2 flex justify-between items-center mx-auto">
                <div className="flex sm:flex-1 w-full">
                    <div className="sm:hidden block text-gray-300">
                        <button
                            onClick={() =>
                                setToggleMenu((prevState) => !prevState)
                            }
                        >
                            {toggleMenu ? <MenuIcon /> : <CloseIcon />}
                        </button>
                    </div>
                    <div className="sm:block hidden">
                        <a
                            href="#"
                            className="transition duration-300 p-2 ml-6 hover:bg-gray-700 text-gray-300 hover:text-white rounded"
                        >
                            Blog
                        </a>
                        <a
                            href="#"
                            className="transition duration-300 p-2 hover:bg-gray-700 text-gray-300 hover:text-white rounded"
                        >
                            Products
                        </a>
                        <a
                            href="#"
                            className="transition duration-300 p-2 hover:bg-gray-700 text-gray-300 hover:text-white rounded"
                        >
                            About
                        </a>
                    </div>
                </div>
            </div>
            {/* Mobile Menu */}
            {toggleMenu && (
                <div className="sm:hidden flex flex-col">
                    <a
                        href="#"
                        className="transition duration-300 p-2 sm:ml-6 hover:bg-gray-700 text-gray-300 hover:text-white rounded"
                    >
                        Blog
                    </a>
                    <a
                        href="#"
                        className="transition duration-300 p-2 hover:bg-gray-700 text-gray-300 hover:text-white rounded"
                    >
                        Courses
                    </a>
                    <a
                        href="#"
                        className="transition duration-300 p-2 hover:bg-gray-700 text-gray-300 hover:text-white rounded"
                    >
                        About
                    </a>
                </div>
            )}
        </nav>
    );
};

export default NavBar2;
