import { NavLink } from "react-router-dom";

export default function NotFoundPage(){
    return (
        <div>
            <h1>Not Found Page</h1>
            <NavLink to={"/"}>
                <button>Go Back Home</button>
            </NavLink>
        </div>
    )
}