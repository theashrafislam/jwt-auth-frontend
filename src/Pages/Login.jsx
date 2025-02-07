import { Link, useNavigate } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const Login = () => {

    const {signInEmailPassword} = useAuth();
    const navigate= useNavigate();

    const handleForm = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const userInfo = {
            email,
            password
        }
        console.log(userInfo);
        signInEmailPassword(email, password)
            .then(() => {
                alert('Login successfully');
                navigate('/')
            })
            .catch(error => {
                console.log(error);
            })
    }
    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-center mb-4">Login</h2>

                <form onSubmit={handleForm} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 font-medium">Email</label>
                        <input
                            type="email"
                            name="email"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">Password</label>
                        <input
                            type="password"
                            name="password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
                        Login
                    </button>

                    <p className="text-center text-gray-600 mt-2">
                        Don't have an account?{" "}
                        <Link to="/sign-up" className="text-blue-500 hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;