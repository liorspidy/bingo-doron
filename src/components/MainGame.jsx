/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import BingoCell from "./BingoCell";
import classes from "./MainGame.module.css";

const MainGame = (props) => {
  const initialCellState = Array.from({ length: 5 }, () => Array(5).fill(0));
  const storedCellState = JSON.parse(localStorage.getItem("bingoState"));
  const [bingoState, setBingoState] = useState(
    storedCellState !== null ? storedCellState : initialCellState
  );

  const [currentMonth, setCurrentMonth] = useState({ name: "", number: 0 });

  useEffect(() => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const currentDate = new Date();
    const monthNumber = currentDate.getMonth();
    const monthName = months[monthNumber];

    setCurrentMonth({ name: monthName, number: monthNumber + 1 });
  }, []);

  const checkDates = () => {
    const currentDate = new Date();
    const daysInWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const storedMatrix = JSON.parse(localStorage.getItem("bingoMatrix"));

    if (storedMatrix && storedMatrix.length === 5) {
      const latestDateInMatrix = new Date(
        storedMatrix[4][4].year,
        storedMatrix[4][4].month - 1,
        storedMatrix[4][4].dayOfMonth
      );

      if (
        latestDateInMatrix >= currentDate ||
        daysInWeek[currentDate.getDay()] === "Fri" ||
        daysInWeek[currentDate.getDay()] === "Sat"
      ) {
        return storedMatrix;
      }
    }

    const allWeeks = [];

    for (let week = 0; week < 5; week++) {
      const weekStart = new Date(currentDate);
      weekStart.setDate(
        currentDate.getDate() + week * 7 - currentDate.getDay()
      );

      const weekDetails = [];

      for (let day = 0; day < 5; day++) {
        const date = new Date(weekStart);
        date.setDate(weekStart.getDate() + day);

        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const dayOfMonth = date.getDate();
        const dayName = daysInWeek[date.getDay()];

        weekDetails.push({ dayName, dayOfMonth, month, year });
      }

      allWeeks.push(weekDetails);
    }

    localStorage.setItem("bingoMatrix", JSON.stringify(allWeeks));
    return allWeeks;
  };

  const daysArray = checkDates();

  const maxWidth = window.innerWidth;
  const cellSize = maxWidth / 6;

  useEffect(() => {
    const checkWinningState = () => {
      for (let i = 0; i < 5; i++) {
        if (
          bingoState[i].every((cell) => cell === 1) ||
          bingoState.every((row) => row[i] === 1)
        ) {
          props.setYouWon(true);
          return;
        }
      }

      // Check diagonals
      if (
        bingoState[0][0] === 1 &&
        bingoState[1][1] === 1 &&
        bingoState[2][2] === 1 &&
        bingoState[3][3] === 1 &&
        bingoState[4][4] === 1
      ) {
        props.setYouWon(true);
        return;
      }

      if (
        bingoState[0][4] === 1 &&
        bingoState[1][3] === 1 &&
        bingoState[2][2] === 1 &&
        bingoState[3][1] === 1 &&
        bingoState[4][0] === 1
      ) {
        props.setYouWon(true);
        return;
      }
    };

    checkWinningState();
    localStorage.setItem("bingoState", JSON.stringify(bingoState));
  }, [bingoState]);

  return (
    <div className={classes.maingame}>
      <div className={classes.currentMonth}>
        <h1 style={{ fontSize: cellSize / 1.8 }}>{currentMonth.name}</h1>
      </div>
      <div className={classes.bingoGrid}>
        {daysArray.map((week, weekIndex) =>
          week.map((day, dayIndex) => (
            <BingoCell
              key={dayIndex + weekIndex}
              weekIndex={weekIndex}
              dayIndex={dayIndex}
              day={day}
              cellSize={cellSize}
              setBingoState={setBingoState}
              bingoState={bingoState}
            />
          ))
        )}
      </div>
      <div className={classes.rights}>
        <span style={{ fontSize: cellSize / 7 }}>Created by Lior Fridman</span>
      </div>
    </div>
  );
};

export default MainGame;
