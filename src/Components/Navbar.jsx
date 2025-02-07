import { Link } from "react-router-dom";
import useAuth from "../Hooks/useAuth";

const Navbar = () => {
    const { user, userSignOut } = useAuth();
    const handleLogout = () => {
        userSignOut()
            .then(res => {
                alert('Logout Successfully.')
            })
            .catch(error => {
                console.log(error);
            })
    }
    console.log(user);
    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">My App</h1>
                <div className="space-x-4">
                    <Link to="/" className="hover:text-gray-400">Home</Link>
                    {user ? <button onClick={handleLogout}>Logout</button> : <Link to="/login" className="hover:text-gray-400">Login</Link>}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;