import React from "react";
import Country from "./Country";

const Countries = ({ countries }) => {
  return (
    <div className="countries-container">
      {countries.map((country) => (
        <Country key={country.cca3} country={country} />
      ))}
    </div>
  );
};

export default Countries;
