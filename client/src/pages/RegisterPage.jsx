import { Link, useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "/public/Logo.svg";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import InfoIcon from "@mui/icons-material/Info";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../slices/userApiSlice.js";
import { setCredentials } from "../slices/authSlice.js";
import { ToastContainer, toast } from "react-toastify";

const RegisterPage = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get("redirect") || "/";

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [register, { isLoading }] = useRegisterMutation();
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [userInfo, redirect, navigate]);

    const registerHandler = async () => {
        if (password != confirmPassword) {
            toast.error(`Passwords do not match`);
            setPassword("");
            setConfirmPassword("");
        } else {
            try {
                const res = await register({ name, email, password }).unwrap();
                dispatch(setCredentials({ ...res }));
                toast.success("Registration successful!");
                navigate(redirect);
            } catch (err) {
                toast.error(err?.data?.message || err?.message);
                setPassword("");
                setConfirmPassword("");
            }
        }
    };
    return (
        <div className="flex items-center justify-center flex-col">
            <div className="flex flex-col items-center justify-center w-[30%]">
                <Link to="/">
                    <div className="flex items-center justify-center w-full p-2">
                        <Logo className="scale-[80%]" />
                        <span className="rounded-md px-1 py-2 text-sm font-medium">
                            Amazon
                        </span>
                    </div>
                </Link>
                <div className="flex flex-col  justify-center border rounded-md p-8">
                    <h2 className="text-3xl">Create Account</h2>
                    <p className="text-sm font-bold mt-6">Your name</p>
                    <input
                        type="text"
                        className="width-[80%] border border-gray-600 rounded p-1 mt-1 focus:border-gray-800 focus:outline-0 focus:shadow-[0_0_2px_2px] focus:shadow-sky-300 opacity-50"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                    <p className="text-sm font-bold mt-2">Email</p>
                    <input
                        type="email"
                        className="width-[80%] border border-gray-600 rounded p-1 mt-1 focus:border-gray-800 focus:outline-0 focus:shadow-[0_0_2px_2px] focus:shadow-sky-300 opacity-50"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                    <p className="text-sm font-bold mt-2">Password</p>
                    <input
                        type="password"
                        className="width-[80%] border border-gray-600 rounded p-1 mt-1 focus:border-gray-800 focus:outline-0 focus:shadow-[0_0_2px_2px] focus:shadow-sky-300 opacity-50"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <p className="text-xs">
                        <InfoIcon className="scale-[60%] text-sky-700" />
                        Passwords must be at least 6 characters
                    </p>
                    <p className="text-sm font-bold mt-2">Confirm Password</p>
                    <input
                        type="password"
                        className="width-[80%] border border-gray-600 rounded p-1 mt-1 focus:border-gray-800 focus:outline-0 focus:shadow-[0_0_2px_2px] focus:shadow-sky-300 opacity-50"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                    />
                    {confirmPassword &&
                        (password === confirmPassword ? (
                            <p className="text-green-700 text-xs">
                                Passwords Match
                            </p>
                        ) : (
                            <p className="text-red-700 text-xs">
                                Passwords do not match
                            </p>
                        ))}
                    <p className="text-sm my-4">
                        Since this is a demo website, we will not be sending any
                        verification codes. Register yourself and explore the
                        features.
                    </p>
                    <button
                        className="bg-amz-yellow hover:bg-amz-yellow-dark py-1 my-4 w-full rounded-md enabled:shadow-md enabled:hover:shadow-lg transition duration-100 disabled:bg-gray-400"
                        onClick={registerHandler}
                        disabled={isLoading}
                    >
                        {isLoading ? "Creating new Account..." : "Continue"}
                    </button>
                    <hr className="my-6 shadow" />
                    <p className="text-sm mb-4">
                        Already Have an Account?&nbsp;
                        <Link
                            to="/login"
                            className="text-blue-800 hover:cursor-pointer hover:underline hover:text-red-800"
                        >
                            <span>Sign In</span>
                            <span>
                                <ArrowRightIcon className="scale-[80%] -ml-1" />
                            </span>
                        </Link>
                    </p>
                    <p className="text-xs">
                        By creating an account or logging in, you agree to
                        Amazon&apos;s{" "}
                        <span className="text-blue-800 hover:cursor-pointer hover:underline hover:text-red-800">
                            Conditions of Use
                        </span>{" "}
                        and{" "}
                        <span className="text-blue-800 hover:cursor-pointer hover:underline hover:text-red-800">
                            Privacy Notice
                        </span>
                        .
                    </p>
                </div>
            </div>
            <div className="w-full h-full bg-gray-100 mt-8 pb-8 border-t border-gray-300 shadow-inner flex flex-col items-center">
                <p className="flex justify-center mt-4 text-blue-800">
                    <span className="mx-2 text-xs hover:cursor-pointer hover:underline hover:text-red-800">
                        Conditions of Use
                    </span>
                    <span className="mx-2 text-xs hover:cursor-pointer hover:underline hover:text-red-800">
                        Privacy Notice
                    </span>
                    <span className="mx-2 text-xs hover:cursor-pointer hover:underline hover:text-red-800">
                        Help
                    </span>
                </p>
                <p className="text-xs mt-4">
                    © 1996-2023, Amazon.com, Inc. or its affiliates
                </p>
            </div>
            <ToastContainer />
        </div>
    );
};

export default RegisterPage;
