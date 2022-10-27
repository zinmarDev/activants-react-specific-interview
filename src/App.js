import React from "react";
import SushiContainer from "./containers/SushiContainer";
import Table from "./containers/Table";
import axios from 'axios';

// Endpoint!
const API = "http://localhost:3000/sushis";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sushis: [],
            setSushis: [],
            allSushis: [],
            startIndex: 0,
            endIndex: 4,
            bank: 100,
            eatenSushi: [],

            pageNumber: 1,
            pageSize: 4,

            extraMoney: 0,
        }
    }

    componentDidMount() {
        this.getSushiList()
    }

    getSushiList() {
        axios.get(API).then(
            res => {
                this.setState({
                    allSushis: res.data,
                })
            }
        )
    }

    //for next result
    moreSushis = () => {
        let startIndex = this.state.startIndex
        let endIndex = this.state.endIndex

        if(endIndex >= this.state.allSushis.length){
            endIndex = 4
            startIndex = 0
        }else{
            endIndex = endIndex + this.state.pageSize
            if(endIndex > this.state.allSushis.length){
                endIndex = this.state.allSushis.length
                startIndex = startIndex + this.state.pageSize
            }else{
                startIndex = endIndex - this.state.pageSize
            }
        }
        this.setState({
            startIndex,
            endIndex
        })
    };

    goBack = () => {
        let startIndex = this.state.startIndex
        let endIndex = this.state.endIndex
        console.log("index : ", startIndex, endIndex)
        if(startIndex < this.state.pageSize){
            endIndex = this.state.pageSize
            startIndex = 0
        }else{
            endIndex = endIndex - this.state.pageSize
            startIndex = endIndex - this.state.pageSize
            if(startIndex < 0){
                startIndex = 0
            }
        }
        this.setState({
            startIndex,
            endIndex
        })
    };

    updateSushis = (id, price) => {
        id = id - 1
        let currentBank = this.state.bank
        if(currentBank >= price){
            let bank = currentBank - price
            let allSushis = this.state.allSushis
            allSushis[id]["eaten"] = true
            this.setState({
                allSushis,
                bank
            })
        }
    };

    handleAddMoney(){
        let bank = this.state.bank + parseFloat(this.state.extraMoney)
        this.setState({
            bank,
            extraMoney: 0
        })
    }

    handleChange(e){
        this.setState({
            extraMoney: e.target.value,
        })
    }

    render() {
        let {eatenSushi, bank, allSushis, startIndex, endIndex} = this.state
        return (
            <div className="app">
                <div className="add-money">
                    <input type="number" min={0} value={this.state.extraMoney} onChange={this.handleChange.bind(this)}/>
                    <button disabled={!(this.state.extraMoney > 0)} onClick={this.handleAddMoney.bind(this)}>add</button>
                </div>
                <SushiContainer
                    sushis={allSushis}
                    moreSushis={this.moreSushis.bind(this)}
                    goBack={this.goBack.bind(this)}
                    eatSushi={this.updateSushis.bind(this)}
                    startIndex={startIndex}
                    endIndex={endIndex}
                />


                <Table sushiPlate={eatenSushi} bank={bank}/>
            </div>
        );
    }

}

export default App;
