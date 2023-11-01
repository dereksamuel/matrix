import { useCallback, useEffect, useState } from "react";

function useShips(length, shipLength) {
  const alphabet = 'ABCDEFGHIJ';
  let ships = [];
  let points = new Set();
  const [shipsState, setShips] = useState([]);
  // let triesDirection = [];

  const generateRandomPoint = useCallback(() => {
    const point = Math.floor(Math.random() * 10);
    points.add(`${alphabet[point]}${point}`);
    return `${alphabet[point]}${point}`;
  }, [points]);

  const generatePoints = (startedIndex = 0) => {
    for (let shipIndex = startedIndex; shipIndex < length; shipIndex++) {
      generateRandomPoint();
    }

    if (points.size < length) {
      generatePoints(points.size);
    }
  };

  function generateCoordinates () {
    for (const point of points) {
      const number = point.slice(1);
      let direction = Math.abs(+number - 10) < shipLength ? 'left' : 'right';
      const coordinates = [];
      if (direction === 'right') {
        for (let i = 0; i < shipLength; i++) {
          coordinates.push(`${point[0]}${+number + i + 1}`);
        }
      } else if (direction === 'left') {
        for (let i = 0; i < shipLength; i++) {
          coordinates.push(`${point[0]}${+number - i - 1}`);
        }
      }
      ships.push(coordinates);
    }
    setShips(ships);
  }

  useEffect(() => {
    if (points.size !== length) {
      generatePoints();
      generateCoordinates();
    }
    // console.log(`${alphabet[startedPoint]}${startedPoint}`);
  }, []);

  return [shipsState, points];
}

export { useShips }
