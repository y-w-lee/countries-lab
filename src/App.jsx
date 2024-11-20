import React, { useEffect, useState } from "react";
import Countries from "./Countries";
import "./App.css";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [subregions, setSubregions] = useState([]); // State to store unique subregions
  const [filterBy, setFilterBy] = useState({ continent: "", subregion: "" });
  const [sortBy, setSortBy] = useState("");
  const [top10, setTop10] = useState(null); // Tracks current "Top 10" selection
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  const filterTop10 = (criteria) => {
    setTop10(criteria); // Set the active "Top 10" filter
    const sorted = [...countries].sort((a, b) => b[criteria] - a[criteria]);
    setFilteredCountries(sorted.slice(0, 10));
  };

  const resetTop10 = () => {
    setTop10(null); // Reset the "Top 10" filter
    setFilteredCountries(countries); // Show all countries again
  };

  const resetFilters = () => {
    setFilterBy({ continent: "", subregion: "" });
    setTop10(null); // Reset all filters
    setSortBy("");
    setFilteredCountries(countries); // Reset to original dataset
  };

  // Fetch data from API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) {
          throw new Error("Failed to fetch countries data");
        }
        const data = await response.json();
        setCountries(data);
        setFilteredCountries(data);

        // unique subregions
        const uniqueSubregions = Array.from(
          new Set(data.map((country) => country.subregion).filter(Boolean))
        ).sort(); // Sort alphabetically
        setSubregions(uniqueSubregions);

        setLoading(false); // Set loading to false after data is loaded
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

  // Filter by Continent
  const filterByContinent = (continent) => {
    setFilterBy({ continent, subregion: "" });
    const filtered = countries.filter(
      (country) => country.continents && country.continents[0] === continent
    );
    setFilteredCountries(filtered);
    setTop10(null); // Reset Top 10 filter when continent changes
  };

  // Filter by Subregion
  const filterBySubregion = (subregion) => {
    setFilterBy({ continent: "", subregion });
    const filtered = countries.filter(
      (country) => country.subregion === subregion
    );
    setFilteredCountries(filtered);
    setTop10(null); // Reset Top 10 filter when subregion changes
  };

  // Alphabetical sorting
  const sortAlphabetically = () => {
    setSortBy("name");
    const sorted = [...filteredCountries].sort((a, b) =>
      a.name.common.localeCompare(b.name.common)
    );
    setFilteredCountries(sorted);
  };

  if (loading) {
    return <div className="app-container">Loading...</div>;
  }

  if (error) {
    return <div className="app-container">Error: {error}</div>;
  }

  return (
    <div className="app-container">
      <h1 className="app-header">Countries of the World</h1>

      <h3>Filter & Sort</h3>
      <div className="filters-container">
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              checked={sortBy === "name"}
              onChange={() => sortAlphabetically()}
            />
            Alpha
          </label>
        </div>
        <div className="filter-group">
          <label>
            <input
              type="checkbox"
              checked={top10 === "population"}
              onChange={() =>
                top10 === "population" ? resetTop10() : filterTop10("population")
              }
            />
            Top 10 by population
          </label>
          <label>
            <input
              type="checkbox"
              checked={top10 === "area"}
              onChange={() =>
                top10 === "area" ? resetTop10() : filterTop10("area")
              }
            />
            Top 10 by area
          </label>
        </div>

        <div className="filter-group">
          <label>
            By continent:
            <select
              onChange={(e) => filterByContinent(e.target.value)}
              value={filterBy.continent || "All"}
            >
              <option value="All">All</option>
              <option value="Africa">Africa</option>
              <option value="Asia">Asia</option>
              <option value="Europe">Europe</option>
              <option value="Oceania">Oceania</option>
              <option value="North America">North America</option>
              <option value="South America">South America</option>
            </select>
          </label>
        </div>
        <div className="filter-group">
          <label>
            By subregion:
            <select
              onChange={(e) => filterBySubregion(e.target.value)}
              value={filterBy.subregion || "Choose region"}
            >
              <option value="Choose region">Choose region</option>
              {subregions.map((subregion) => (
                <option key={subregion} value={subregion}>
                  {subregion}
                </option>
              ))}
            </select>
          </label>
        </div>
        {/* <button onClick={resetFilters}>Reset Filters</button> */}
      </div>

      {/* Countries List */}
      <Countries countries={filteredCountries} />
    </div>
  );
};

export default App;
