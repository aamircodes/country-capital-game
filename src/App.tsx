function CountryCapitalGame({ data }: { data: Record<string, string> }) {
  const countries = Object.keys(data);
  const capital = Object.values(data);
  const options = countries.concat(capital);

  return (
    <>
      {options.map((option) => (
        <button>{option}</button>
      ))}
    </>
  );
}

function App() {
  return (
    <>
      <CountryCapitalGame data={{ Germany: 'Berlin', Azerbaijan: 'Baku' }} />
    </>
  );
}

export default App;
