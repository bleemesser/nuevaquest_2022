import React from "react";
import { Link } from "react-router-dom";
import Leaderboard from './Leaderboard'

export default function Rankings() {
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
                    <Leaderboard/>
            </article>

        </div>
    );  
}