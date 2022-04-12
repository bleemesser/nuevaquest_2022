import { Link } from "react-router-dom";

export default function App() {
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
            <h1>Welcome to my Quest project!</h1>
            <p>This website is the culmination of my project creating an Elo rating system for Foosball players
                at Nueva.
            </p>
            <p>For those of you who don't know, <a href='https://en.wikipedia.org/wiki/Table_football' target='_blank' rel='noreferrer'>Foosball</a> is a tabletop game similar 
                to soccer. The game is played where the winner is the first person or team 
                who scores 10 points. 
            </p>
            <p>
                The Elo rating system was designed initially to calculate relative skill levels
                in chess. Based on the difference in the ratings of two players, a probable
                winner of the game is chosen. For players with equal ratings who play <i>n</i> games,
                each player is predicted to win half of the games. 
            </p>
            <h1>The Math:</h1>
            <p>
                Elo is calculated based on several variables: the current Elo of each player,
                how much each player scored in the game (read: how <i>much</i> did one player win by?), 
                and a variable written as <i>K</i>. The process starts by calculating the expected win percentage for each player. 
                In chess, a difference of 200 rating points generally represents an expected score of 0.75 for the stronger player. Since it is 
                possible to draw in chess, this value represents their probability of winning + 1/2 their probability of drawing. An expected value of 
                0.75 could then denote a 75% win rate and 25% loss rate, a 50% win rate and 50% draw rate, or something in between. 
                <br></br>
                <br></br>
                Equation-wise, the expected score for a player is described using a <a href='https://en.wikipedia.org/wiki/Logistic_function' target='_blank' rel='noreferrer'>logistic curve</a>. 
                <br />Expected1 = 1/(1+10<sup>(rating2 - rating1)/400</sup>) <br/>
                Where did this 400 come from? It is standard that for each 400 rating points one player has over the opponent, the expected score is 10x that of the weaker opponent.
                Depending on how much I want the system to reward playing with others of significantly higher Elo, I could modify this value.
                To calculate the new rating of a player, the formula is <br/>
                R1new = R1 + K(actual1 - expected1)
                <br/>
                What is the K value? As the equation demonstrates, K is the maximum change in rating possible from any given game. In chess, it is generally set to 
                16 (masters) or 32 (most players). In my system, I chose 32. The next challenge is finding the actual score. In chess, this is easy. A win is counted as 1, 
                a draw 0.5, and a loss 0. In Foosball, points are more flexible. Most often at Nueva, games are played to 10, however sometimes we play games to 5 or 7. Thus 
                the solution I came up with was to represent each player's actual score as their number of points divided by the total number of points scored in the game.
                <br/>
                Actual1 = points1/(points1 + points2)
            </p>
            <h1>-Beckett</h1>
        </article>
    </div>
    );
}