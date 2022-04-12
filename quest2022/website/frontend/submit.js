import { Link } from "react-router-dom";

export default function Submit() {
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
            <article className='content'>
                <p>Submit Game Results Here:</p>
                <form action='http://localhost:4000/newgame' method="get">
                    <label htmlFor="p1name">Player 1 name:</label><br/>
                    <input  type="text" id="p1name" name="p1name"/><br/>
                    <label htmlFor="p2name">Player 2 name:</label><br/>
                    <input  type="text" id="p2name" name="p2name"/><br/>
                    <label htmlFor="p1points">Player 1 points:</label><br/>
                    <input  type="text" id="p1points" name="p1points"/><br/>
                    <label htmlFor="p2points">Player 2 points:</label><br/>
                    <input  type="text" id="p2points" name="p2points"/>
                    <input type='submit' value="Submit"/>
                </form> 
            </article>

        </div>
    
    );
}