import { useState } from "react";
import Country from "./components/Country";
import data from "./data/countries.json";

import "./styles.css";

// Sort by
function alphaCompare(a, b) {
  return a.name.localeCompare(b.name);
}

function ascCompare(a, b) {
  return a.population - b.population;
}

function descCompare(a, b) {
  return b.population - a.population;
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function sort(list, compareFunc) {
  return list.sort(compareFunc);
}

// Filter
// function filter(list, option) {
//   if (option === "all") {
//     return list;
//   } else {
//     return list.filter(function (item) {
//       return item.continent.toLowerCase() === option.toLowerCase();
//     });
//   }
// }

function filter(list, option) {
  if (option === "all") {
    return list;
  } else if (option === "1") {
    return list.filter(function (item) {
      return item.population < 100000000;
    });
  } else if (option === "100m") {
    return list.filter(function (item) {
      return item.population >= 100000000 && item.population < 200000000;
    });
  } else if (option === "200m") {
    return list.filter(function (item) {
      return item.population >= 200000000 && item.population < 500000000;
    });
  } else if (option === "500m") {
    return list.filter(function (item) {
      return item.population >= 500000000 && item.population < 1000000000;
    });
  } else if (option === "1b") {
    return list.filter(function (item) {
      return item.population >= 1000000000;
    });
  } else {
    return list.filter(function (item) {
      return item.continent.toLowerCase() === option.toLowerCase();
    });
  }
}

export default function App() {
  const [sortOption, setSortOption] = useState(">");
  const [filterOption, setFilterOption] = useState("all");
  const [sortedCountries, setSortedCountries] = useState(
    data.countries.slice()
  );

  function handleSort(e) {
    setSortOption(e.target.value);

    if (e.target.value === "shuffle") {
      setFilterOption("all");
      setSortedCountries(shuffle(data.countries.slice()));
    }
  }

  function handleFilter(e) {
    setFilterOption(e.target.value);
  }

  function sortCountries() {
    let func;
    if (sortOption === "alpha") {
      func = alphaCompare;
    } else if (sortOption === "<") {
      func = ascCompare;
    } else if (sortOption === ">") {
      func = descCompare;
    } else {
      func = shuffle;
    }
    return sort(sortedCountries.slice(), func);
  }

  const sortedCountriesList = sortCountries();
  const filteredCountries = filter(sortedCountriesList.slice(), filterOption);

  return (
    <div className="App">
      <h1>World's largest countries by population</h1>
      <div className="filters">
        <label>
          Sort by:
          <select onChange={handleSort} value={sortOption}>
            <option value="alpha">Alphabetically</option>
            <option value="<">Population Asc</option>
            <option value=">">Population Desc</option>
            <option value="shuffle">Shuffle</option>
          </select>
        </label>
        <label>
          Filters:
          <select onChange={handleFilter} value={filterOption}>
            <optgroup label="By continent">
              <option value="all">All</option>
              <option value="asia">Asia</option>
              <option value="africa">Africa</option>
              <option value="europe">Europe</option>
              <option value="north america">North America</option>
              <option value="south america">South America</option>
            </optgroup>
            <optgroup label="By population size">
              <option value="1">Less than 100m</option>
              <option value="100m">100m to 200m</option>
              <option value="200m">200m to 500m</option>
              <option value="500m">500m to 1b</option>
              <option value="1b">1b or more</option>
            </optgroup>
          </select>
        </label>
      </div>
      <div className="countries">
        {filteredCountries.map(function (country) {
          return <Country details={country} key={country.id} />;
        })}
      </div>
    </div>
  );
}
