import React, { Fragment } from "react";
import Button from "../components/Button";
import Sushi from "../components/Sushi";

class SushiContainer extends React.Component{
    constructor(props) {
        super(props);
    }

    handleEatenSushi(index,price){
        this.props.eatSushi(index, price)
    }

    render() {
        let  props = this.props
        return (
            <Fragment>
                <div className="belt">
                    {
                        props.startIndex > 0?
                            <Button moreSushis={props.goBack} buttonText="Go back!" />
                            :
                            null
                    }
                    {props.sushis.slice(props.startIndex, props.endIndex).map((sushi, index) => (
                        <Sushi displaySushi={sushi} eatSushi={this.handleEatenSushi.bind(this,sushi.id, sushi.price)} key={index} />
                    ))}
                    {
                        props.endIndex < props.sushis.length?
                            <Button moreSushis={props.moreSushis} buttonText="More sushi!"/>
                            :
                            null
                    }
                </div>
            </Fragment>
        );
    }
}

export default SushiContainer;
