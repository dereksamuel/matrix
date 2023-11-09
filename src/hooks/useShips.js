import { useCallback, useEffect, useState } from "react";
import { useMemo } from "react";

function useShips(length, shipLength) {
  const alphabet = 'ABCDEFGHIJ';
  const points = useMemo(() => new Set(), []);
  let ships = [];
  const [shipsState, setShips] = useState([]);

  const generateRandomPoint = useCallback(() => {
    const point = Math.floor(Math.random() * 10) === 0 ? 1 : Math.floor(Math.random() * 10);
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

  const evaluatePointAvailability = (point, shipLength) => {
    const number = point.slice(1);
    const word = point[0];
    const isLeft = Math.abs(+number - 10) < shipLength;
    const bottomArray = [point];
    const topArray = [point];
    let indexBottom = alphabet.indexOf(word);
    let indexTop = alphabet.indexOf(word);

    for (let j = 1; j <= 3; j++) {
      indexBottom++;
      const result = [...alphabet]?.findIndex((val, i) => {
        return i === indexBottom;
      });

      if (result !== -1) {
        bottomArray.push(`${alphabet[result]}${number}`);
      }
    }

    if (bottomArray.length !== 4) {
      for (let j = 1; j <= 3; j++) {
        indexTop--;
        const result = [...alphabet]?.findIndex((val, i) => {
          return i === indexTop;
        });
  
        if (result !== -1) {
          topArray.push(`${alphabet[result]}${number}`);
        }
      }
    }

    return {
      left: isLeft,
      right: !isLeft,
      top: topArray.length === 4,
      bottom: bottomArray.length === 4,
      topArray,
      bottomArray
    };
  };

  function generateCoordinates () {
    for (const point of points) {
      const number = point.slice(1);
      const availability = evaluatePointAvailability(point, shipLength);
      console.log(availability, point);
      let isVertical = Boolean(Math.random() > 0.5);
      let direction = Math.abs(+number - 10) < shipLength ? 'left' : 'right';
      const coordinates = [];

      if (!isVertical) {
        if (direction === 'right') {
          for (let i = 0; i < shipLength; i++) {
            coordinates.push(`${point[0]}${+number + i + 1}`);
          }
        } else if (direction === 'left') {
          for (let i = 0; i < shipLength; i++) {
            coordinates.push(`${point[0]}${+number - i - 1}`);
          }
        }
      } else {
        if (availability.bottom) {
          coordinates.push(...availability.bottomArray);
        } else {
          coordinates.push(...availability.topArray);
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
  }, []);

  console.log(ships);

  return [shipsState, points];
}

export { useShips }
