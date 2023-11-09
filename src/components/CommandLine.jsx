import PropTypes from 'prop-types';
import '../assets/css/command_line.css';

function CommandLine({ onSubmit, onCleanLocal }) {
  const onClean = () => {
    const input = document.querySelector('input');
    input.value = '';
    input.focus();
    onCleanLocal();
  };

  return (
    <form onSubmit={(event) => onSubmit(true, event)} className="command_line">
      <label className='input_container'>
        <p>Comandos:</p>
        <input name="cell" className='input' type="text" maxLength={3} required />
      </label>
      <button className='btn' type='submit'>Ejecutar</button>
      <button className='btn' type='button' onClick={onClean}>Limpiar</button>
    </form>
  );
}

CommandLine.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCleanLocal: PropTypes.func.isRequired,
};

export { CommandLine };
