import { useState } from 'react';

type ButtonState = 'DEFAULT' | 'SELECTED' | 'WRONG';
type Option = {
  value: string;
  state: ButtonState;
};

function randomise() {
  return Math.random() - 0.5;
}

function getCountries(data: Record<string, string>) {
  return Object.keys(data);
}

function getCapitals(data: Record<string, string>) {
  return Object.values(data);
}

export function getButtonClass(option: Option) {
  if (option.state === 'SELECTED') return 'selected';
  else if (option.state === 'WRONG') return 'wrong';
  else {
    return '';
  }
}

export function CountryCapitalGame({ data }: { data: Record<string, string> }) {
  const [options, setOptions] = useState<Option[]>(
    [...getCountries(data), ...getCapitals(data)]
      .sort(randomise)
      .map((value) => ({
        value,
        state: 'DEFAULT',
      }))
  );
  const [selected, setSelected] = useState<Option>();
  const isGameOver = options.length === 0;

  function onClickHandler(option: Option) {
    if (!selected) {
      setSelected(option);
      setOptions(
        options.map((opt) =>
          opt === option
            ? { ...opt, state: 'SELECTED' }
            : { ...opt, state: 'DEFAULT' }
        )
      );
    } else {
      if (
        selected.value === data[option.value] ||
        data[selected.value] === option.value
      ) {
        setOptions(
          options.filter((opt) => {
            return !(
              opt.value === selected.value || opt.value === option.value
            );
          })
        );
      } else {
        setOptions(
          options.map((opt) => {
            return opt.value === selected.value || opt.value === option.value
              ? { ...opt, state: 'WRONG' }
              : opt;
          })
        );
      }
      setSelected(undefined);
    }
  }

  if (isGameOver) {
    return <div>Congratulations</div>;
  }

  return (
    <>
      {options.map((option) => (
        <button
          className={getButtonClass(option)}
          key={option.value}
          onClick={() => onClickHandler(option)}
        >
          {option.value}
        </button>
      ))}
    </>
  );
}
