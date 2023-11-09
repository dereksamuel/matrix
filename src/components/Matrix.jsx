import { useEffect, useState } from 'react';
import '../assets/css/matrix.css';
import { useShips } from '../hooks/useShips';
import { CommandLine } from "./CommandLine"

function Matrix() {
  const rows = [];
  const alphabet = 'ABCDEFGHIJ';
  const [destroyedShips, setDestroyedShips] = useState(new Set());
  const [shipsState] = useShips(5, 4);
  const [selectedCells, setSelectedCells] = useState([]);

  const onSelectCell = (isForm, event) => {
    if (isForm) {
      event.preventDefault();
    }

    const cell = isForm ? new FormData(event.target).get('cell').toUpperCase() : event.toUpperCase();
    setSelectedCells([...selectedCells, cell]);
  };

  useEffect(() => {
    for (const ss of shipsState) {
      let result = ss.map((item) => {
        if (selectedCells.includes(item)) {
          return item;
        }
      });
      result = result.filter((item) => item !== undefined);
      if (result.length === 4) {
        setDestroyedShips(previousState => new Set([...previousState, ss]));
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCells]);

  useEffect(() => {
    if (destroyedShips.size === 5) {
      alert('¡Ganaste!');
    }
  }, [destroyedShips]);

  for (let i = 0; i < 10; i++) {
    const cells = [];
    for (let j = 0; j < 10; j++) {
      cells.push(<div key={j} className='alphabet_container'>
        {i === 0 && <div className="alphabet">{alphabet[j]}</div>}
        <button className={`cell`} onClick={() => onSelectCell(false, `${alphabet[j]}${i + 1}`)}>
          {selectedCells.find((sc) => {
            return sc === `${alphabet[j]}${i + 1}`;
          }) && shipsState.find(ss => {
            return ss.find(s => s === `${alphabet[j]}${i + 1}`);
          }) ? 'O' : selectedCells.find((sc) => {
            return sc === `${alphabet[j]}${i + 1}`;
          }) && 'X'}
        </button>
      </div>);
    }
    rows.push(<div key={i} className="container_cell">
      <span className="number-cell">{i + 1}</span>
      {cells}
    </div>);
  }

  const onCleanLocal = () => {
    location.reload();
  };

  return (
    <>
      <h3>Barcos destruidos: {destroyedShips.size}</h3>
      <CommandLine onSubmit={onSelectCell} onCleanLocal={onCleanLocal} />
      <div className="matrix">
        {rows}
      </div>
    </>
  );
}

export { Matrix };
