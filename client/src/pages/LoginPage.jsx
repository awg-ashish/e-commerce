import { Link, useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from "/public/Logo.svg";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/userApiSlice.js";
import { setCredentials } from "../slices/authSlice.js";
import { ToastContainer, toast } from "react-toastify";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const { search } = useLocation();
    const sp = new URLSearchParams(search);
    const redirect = sp.get("redirect") || "/";

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const [login, { isLoading }] = useLoginMutation();
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [userInfo, redirect, navigate]);

    const loginHandler = async () => {
        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials({ ...res }));
            toast.success("Logged In Successfully!");
            navigate(redirect);
        } catch (err) {
            toast.error(err?.data?.message || err?.message);
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
                    <h2 className="text-3xl">Sign In</h2>
                    <p className="text-sm font-bold mt-6">Your Email</p>
                    <input
                        type="email"
                        className="width-[80%] border border-gray-600 rounded p-1 mt-1 focus:border-gray-800 focus:outline-0 focus:shadow-[0_0_2px_2px] focus:shadow-sky-300 opacity-50"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <p className="text-sm font-bold mt-6">Your Password</p>
                    <input
                        type="password"
                        className="width-[80%] border border-gray-600 rounded p-1 mt-1 focus:border-gray-800 focus:outline-0 focus:shadow-[0_0_2px_2px] focus:shadow-sky-300 opacity-50"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        className="bg-amz-yellow hover:bg-amz-yellow-dark py-1 my-4 w-full rounded-2xl enabled:shadow-lg enabled:hover:shadow-xl transition duration-100 disabled:bg-gray-400"
                        disabled={isLoading}
                        onClick={loginHandler}
                    >
                        {isLoading ? `Signing you in...` : `Continue`}
                    </button>

                    <p className="text-xs">
                        By continuing, you agree to Amazon&apos;s{" "}
                        <span className="text-blue-800 hover:cursor-pointer hover:underline hover:text-red-800">
                            Conditions of Use
                        </span>{" "}
                        and{" "}
                        <span className="text-blue-800 hover:cursor-pointer hover:underline hover:text-red-800">
                            Privacy Notice
                        </span>
                        .
                    </p>
                    <p className="text-sm font-medium mt-4 flex items-center">
                        <span className="text-blue-800 hover:cursor-pointer hover:underline hover:text-red-800">
                            Forgot Password?
                        </span>
                    </p>
                </div>
                <div className="flex w-full justify-center items-center mt-6 mb-2">
                    <hr className="flex-1" />
                    <p className="mx-2 text-xs">New to Amazon?</p>
                    <hr className="flex-1" />
                </div>
                <div className="w-full">
                    <Link to="/register">
                        <button className="border border-gray-300 w-full py-0.5 rounded shadow hover:shadow-md transition duration-100 hover:bg-gray-100">
                            Create your Amazon Account.
                        </button>
                    </Link>
                </div>
            </div>
            <div className="w-full h-full bg-gray-100 mt-8 pb-16 border-t border-gray-300 shadow-inner flex flex-col items-center">
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

export default LoginPage;
