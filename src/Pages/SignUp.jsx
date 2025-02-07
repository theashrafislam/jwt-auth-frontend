import { Link } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const SignUp = () => {

    const { createUserEmailPassword, userSignOut } = useAuth();

    const handleForm = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const userInfo = {
            email,
            password
        }
        createUserEmailPassword(email, password)
            .then(() => {
                userSignOut()
                    .then(() => {
                        alert('Register Successfully.');
                    })
                    .catch(error => {
                        console.log(error);
                    })
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-center mb-4">Sign Up</h2>

                <form onSubmit={handleForm} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">Password</label>
                        <input
                            type="password"
                            required
                            name="password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
                        Sign Up
                    </button>

                    <p className="text-center text-gray-600 mt-2">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-500 hover:underline">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignUp;