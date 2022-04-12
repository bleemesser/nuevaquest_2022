import React from "react";
const axios = require('axios');

class Leaderboard extends React.Component {
        constructor(props) {
            super(props);
            this.timer = Number;
            this.state = {
                isFetching: false,
                data: []
            }

        }

        getData() {
            this.setState({
                ...this.state,
                isFetching: true
            });

            axios.get('http://localhost:4000/getplayers')
                .then((res) => {
                    //console.log(res.data)
                    // //return res.data;
                    let values = [];
                    let tempvalues = [];

                    // this.sortedValues = ;
                    for (let i = 0; i < res.data.length; i++) {
                        // tempvalues.push([res.data[i].name, Math.round(res.data[i].rating_points)]) // rounds to int, next line rounds to 2 decimal places
                        tempvalues.push([res.data[i].name, Math.round((res.data[i].rating_points + Number.EPSILON) * 100) / 100])
                        tempvalues.sort((a, b) => parseInt(b[1]) - parseInt(a[1]))

                    }
                    for (let i = 0; i < res.data.length; i++) {
                        values.push([(i + 1) + '. ' + tempvalues[i][0] + ' : ' + tempvalues[i][1]])
                    }

                    this.setState({
                        data: values,
                        isFetching: false
                    })
                })
                .catch(err => {
                    console.error(err);
                    this.setState({
                        ...this.state,
                        isFetching: false
                    });
                });

        };
        componentDidMount() {
            this.getData();
            // this.timer = setInterval(() => this.getData(),5000);
        }
        componentWillUnmount() {
            clearInterval(this.timer);
            this.timer = null;
        }
        render() {
        return(
            <div>
                <h1>Top 20 players by rating:</h1>
                <ol>
                    <li>{this.state.data[0]}</li>
                    <li>{this.state.data[1]}</li>
                    <li>{this.state.data[2]}</li>
                    <li>{this.state.data[3]}</li>
                    <li>{this.state.data[4]}</li>
                    <li>{this.state.data[5]}</li>
                    <li>{this.state.data[6]}</li>
                    <li>{this.state.data[7]}</li>
                    <li>{this.state.data[8]}</li>
                    <li>{this.state.data[9]}</li>
                    <li>{this.state.data[10]}</li>
                    <li>{this.state.data[11]}</li>
                    <li>{this.state.data[12]}</li>
                    <li>{this.state.data[13]}</li>
                    <li>{this.state.data[14]}</li>
                    <li>{this.state.data[15]}</li>
                    <li>{this.state.data[16]}</li>
                    <li>{this.state.data[17]}</li>
                    <li>{this.state.data[18]}</li>
                    <li>{this.state.data[19]}</li>
                </ol>
                
            </div>
        )
    }
}
export default Leaderboard;
