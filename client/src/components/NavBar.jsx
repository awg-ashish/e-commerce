import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
const NavBar = () => {
    const [toggleMenu, setToggleMenu] = useState(false);
    return (
        <nav className="bg-amz-gray-light p-[10px]">
            <div className="max-w-7xl flex justify-between items-center mx-auto">
                <div className="flex sm:flex-1 w-full">
                    <div className="sm:hidden block text-gray-300">
                        <button
                            onClick={() =>
                                setToggleMenu((prevState) => !prevState)
                            }
                        >
                            {toggleMenu ? <CloseIcon /> : <MenuIcon />}
                        </button>
                    </div>
                    <div className="sm:block hidden">
                        <a
                            href="#"
                            className="transition duration-300 p-2 ml-6 hover:bg-gray-700 text-gray-300 hover:text-white rounded"
                        >
                            <MenuIcon />
                            <span className="px-1">All</span>
                        </a>
                        <a
                            href="#"
                            className="transition duration-300 p-2 ml-6 hover:bg-gray-700 text-gray-300 hover:text-white rounded"
                        >
                            Best Selling
                        </a>
                        <a
                            href="#"
                            className="transition duration-300 p-2 hover:bg-gray-700 text-gray-300 hover:text-white rounded"
                        >
                            Deal of the Day
                        </a>
                        <a
                            href="#"
                            className="transition duration-300 p-2 hover:bg-gray-700 text-gray-300 hover:text-white rounded"
                        >
                            Electronics
                        </a>
                        <a
                            href="#"
                            className="transition duration-300 p-2 hover:bg-gray-700 text-gray-300 hover:text-white rounded"
                        >
                            Home & Kitchen
                        </a>
                        <a
                            href="#"
                            className="transition duration-300 p-2 hover:bg-gray-700 text-gray-300 hover:text-white rounded"
                        >
                            Pets
                        </a>
                        <a
                            href="#"
                            className="transition duration-300 p-2 hover:bg-gray-700 text-gray-300 hover:text-white rounded"
                        >
                            Books
                        </a>
                        <a
                            href="#"
                            className="transition duration-300 p-2 hover:bg-gray-700 text-gray-300 hover:text-white rounded"
                        >
                            Health & Fashion
                        </a>
                        <a
                            href="#"
                            className="transition duration-300 p-2 hover:bg-gray-700 text-gray-300 hover:text-white rounded"
                        >
                            Sports & Fitness
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

export default NavBar;
