import React from "react";
import "./Country.css";

const Country = ({ country }) => {
  const {
    flags,
    name,
    capital,
    population,
    area,
    continents,
    subregion,
    currencies,
    languages,
    maps,
  } = country;

  // Convert languages and currencies to strings
  const formattedLanguages = languages ? Object.values(languages).join(", ") : "N/A";
  const formattedCurrencies = currencies
    ? Object.values(currencies).map((currency) => `${currency.name} (${currency.symbol})`).join(", ")
    : "N/A";

  return (
    <div className="country-card">
      <div className="country-header">
        <img src={flags.png} alt={`${name.common} flag`} className="country-flag" />
        <h3>{name.common}</h3>
      </div>

      {/* Country details */}
      <div className="country-details">
        <p><strong>Official name:</strong> {name.official || "N/A"}</p>
        <p><strong>Capital:</strong> {capital ? capital[0] : "N/A"}</p>
        <p><strong>Population:</strong> {population.toLocaleString()}</p>
        <p><strong>Languages:</strong> {formattedLanguages}</p>
        <p><strong>Currency:</strong> {formattedCurrencies}</p>
        <p><strong>Area (mi²):</strong> {area ? area.toLocaleString() : "N/A"}</p>
        <p><strong>Subregion:</strong> {subregion || "N/A"}</p>
        <p><strong>Continents:</strong> {continents[0]}</p>
      </div>

      {/* Google Maps link */}
      <a href={maps.googleMaps} target="_blank" rel="noopener noreferrer">
        Show on Google Maps
      </a>
    </div>
  );
};

export default Country;

