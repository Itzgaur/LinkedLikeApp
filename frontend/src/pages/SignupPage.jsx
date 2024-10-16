import SignupForm from "../features/auth/SignupForm";
import { Link } from "react-router-dom";

function SignupPage() {
  return (
    <div className="flex flex-col justify-center lg:px-8 sm:px-6">
      {/* todo: fix the media query */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img className="h-36 w-auto mx-auto" src="/logo.svg" alt="LinkedIn" />
        {/* <h1 className="sm:text-3xl text-2xl font-extrabold text-center px-auto">
          Make the most of your professional life
        </h1> */}
      </div>

      {/* signup form and signin container */}
      <div className=" sm:mx-auto sm:w-full sm:max-w-md shadow-md ">
        <div className="bg-white  shadow px-8 py-6 rounded-lg">
          <SignupForm />

          {/* after the submit button */}
          <div className="mt-6">
            {/* already on LinkedIn  */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="border-t w-full border-gray-300"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white text-gray-500 px-2">Already on LinkedIn?</span>
              </div>
            </div>

            {/* sign in button */}
            <div className="mt-6">
              <Link
                to="/login"
                className="w-full flex justify-center border py-2 
                rounded-md shadow-sm text-sm font-medium text-blue-600 border-transparent hover:bg-gray-50"
              >
                Sign In{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
