import { Link } from "react-router-dom";

export default function Login() {
    return(
        <div>
            <div className="nav">
                <p className='navp'>Nueva Foosball Leaderboard</p>
                <div className="box_1">
                    <Link className="link" to="/">Home</Link>
                    <Link className="link" to="/rankings">Leaderboard</Link>
                    <Link className="link" to="/submit">Enter Game Results</Link>
                    <Link className="link" to="/login">Sign Up</Link>
                </div>
            </div>
            <article>
                <p>Sign-up:</p>
                <form action='http://localhost:4000/newuser' method="get">
                    <label htmlFor="username">Username (use your first name, first letter capitalized):</label><br/>
                    <input type="text" id="username" name="username"/><br/>
                    <label htmlFor="email">Email:</label><br/>
                    <input  type="text" id="email" name="email"/><br/>
                    <input type='submit' value="Submit"/>
                </form> 
            </article>

        </div>
    
    );
}