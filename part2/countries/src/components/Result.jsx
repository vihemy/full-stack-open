const SingleLineResult = ({ country, handleShowFullResult }) => {
  return (
    <p>
      {country.name.common}{" "}
      <button onClick={() => handleShowFullResult(country)}>show</button>
    </p>
  );
};

const FullResult = ({ country }) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital: {country.capital}</p>
      <p>area: {country.area}</p>
      <p>
        <b>languages:</b>
      </p>
      <ul>
        {Object.values(country.languages).map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
      <img
        src={country.flags.svg}
        alt={country.flags.alt}
        width={150}
        height={150}
      />
    </div>
  );
};

const Result = ({ filteredCountries, handleShowFullResult }) => {
  let content;

  switch (true) {
    case !filteredCountries.length:
      content = <div>No country with this name.</div>;
      break;
    case filteredCountries.length > 10:
      content = <div>Too many matches, specify another filter</div>;
      break;
    case filteredCountries.length > 1:
      content = (
        <div>
          {filteredCountries.map((c) => (
            <SingleLineResult
              key={c.cca3}
              country={c}
              handleShowFullResult={handleShowFullResult}
            />
          ))}
        </div>
      );
      break;
    default:
      content = <FullResult country={filteredCountries[0]} />;
  }

  return <div>{content}</div>;
};

export default Result;
