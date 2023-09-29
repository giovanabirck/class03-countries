function Country(props) {
  const details = props.details;
  return (
    <div className="country">
      <div className="country-image">
        <img src={details.image} alt={details.name} />
      </div>
      <div className="country-details">
        <h2>{details.name}</h2>
        <p>
          <span>Capital</span>: <span>{details.capital}</span>
        </p>
        <p>
          <span>Population</span>:{" "}
          <span>{details.population.toLocaleString()}</span>
        </p>
        <p>
          <span>Continent</span>: <span>{details.continent}</span>
        </p>
      </div>
    </div>
  );
}

export default Country;
