import { useEffect, useRef } from 'react';

const formatVal = (val, type) => {
  let formattedVal;
  switch (type) {
    case 'number':
      formattedVal = Number(val);
      break;
    case 'csv':
      formattedVal = val.split(',');
      break;
    default:
      formattedVal = val;
      break;
  }

  return formattedVal;
};

export default function Input({
  type,
  config,
  value,
  onChange,
  handleValidation,
  handleSubmit,
  validateOnBlur,
}) {
  const inputRef = useRef();

  useEffect(() => {
    const refVar = inputRef.current;

    const handler = (e) => {
      console.log(e.key, 'KEY');
      if (e.key === ' ') {
        e.preventDefault();
        e.target.value += '_';
      }
    };

    if (config.preventSpaces) {
      refVar.addEventListener('keydown', handler);
    }

    refVar.focus();

    return () => {
      if (config.preventSpaces) {
        refVar.removeEventListener('keydown', handler);
      }
    };
  }, [config.preventSpaces]);

  return (
    <input
      ref={inputRef}
      className="field-input"
      type={type}
      value={value}
      onChange={(e) => {
        onChange(formatVal(e.target.value, type));
      }}
      onBlur={(e) => {
        let formattedVal = formatVal(e.target.value, type);
        if (handleValidation && validateOnBlur) handleValidation(formattedVal);
        if (handleSubmit) {
          console.log('submitting', e.target.value);
          handleSubmit(formattedVal);
        }
      }}
    />
  );
}
