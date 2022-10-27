import React from "react";

const Sushi = (props) => {
  return (
    <div className="sushi">
      <div
        className="plate"
        onClick={() =>
          props.displaySushi.eaten !== true?
              props.eatSushi(props.displaySushi.id, props.displaySushi.price)
              :
              null
        }
      >
        {
            props.displaySushi.eaten !== true?
                <img src={props.displaySushi.img_url} width="100%" />
                :
                null
        }
      </div>
      <h4 className="sushi-details">
        {props.displaySushi.name} - ${props.displaySushi.price}
      </h4>
    </div>
  );
};

export default Sushi;
