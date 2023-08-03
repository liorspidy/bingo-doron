/* eslint-disable react/prop-types */
import { useState } from "react";
import classes from "./BingoCell.module.css";

const BingoCell = (props) => {
  const [gotMad, setGotMad] = useState(
    props.bingoState[props.weekIndex][props.dayIndex]
  );

  const setDay = () => {
    setGotMad((prevState) => !prevState);
    props.setBingoState((prevState) => {
      const newState = [...prevState];

      newState[props.weekIndex] = [...newState[props.weekIndex]];

      newState[props.weekIndex][props.dayIndex] =
        newState[props.weekIndex][props.dayIndex] === 0 ? 1 : 0;

      return newState;
    });
  };

  return (
    <div
      className={`${classes.cell} ${gotMad ? classes.mad : ""}`}
      style={{ width: props.cellSize, height: props.cellSize }}
      onClick={setDay}
    >
      <div className={classes.title}>
        <h1 style={{ fontSize: props.cellSize / 2.5 }}>
          {props.day.dayOfMonth}
        </h1>
      </div>
      <div className={classes.day}>
        <h2 style={{ fontSize: props.cellSize / 4.5 }}>
          {props.day.dayName.toUpperCase()}
        </h2>
      </div>
    </div>
  );
};

export default BingoCell;
