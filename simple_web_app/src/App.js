import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import { Container } from "@material-ui/core";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { makeStyles } from "@material-ui/core/styles";
import { csv } from "d3-fetch";
import { scaleLinear } from "d3-scale";
import { interpolateHcl } from "d3-interpolate";
import {
  ComposableMap,
  Geographies,
  Geography,
  Sphere,
  Graticule,
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const colorScale = scaleLinear()
  // .domain([0.29, 0.68])
  .range(["#FAEBD7", "#8B0000"])
  .interpolate(interpolateHcl);

const App = () => {
  // const [date, setDate] = useState("2021-08-02");
  // const [totalCases, setTotalCases] = useState();
  // const [totalDeaths, setTotalDeaths] = useState();
  // const [total_cases_per_million, setTotal_cases_per_million] = useState();
  // const [total_tests, setTotal_tests] = useState();
  // const [total_vaccinations, setTotal_vaccinations] = useState();
  // const [people_fully_vaccinated, setPeople_fully_vaccinated] = useState();
  // const [new_vaccinations, setNew_vaccinations] = useState();
  // const [population, setPopulation] = useState();
  // const [population_density, setPopulation_density] = useState();
  // const [median_age, setMedian_age] = useState();
  // const [gdp_per_capita, setGdp_per_capita] = useState();
  // const [life_expectancy, setLife_expectancy] = useState();
  // iso_code,continent,location,
  // date,
  // total_cases, new_cases,new_cases_smoothed,
  // total_deaths, new_deaths,new_deaths_smoothed,
  // total_cases_per_million,new_cases_per_million,new_cases_smoothed_per_million,
  // total_deaths_per_million,new_deaths_per_million,new_deaths_smoothed_per_million,reproduction_rate,icu_patients,icu_patients_per_million,
  // hosp_patients, hosp_patients_per_million,weekly_icu_admissions,weekly_icu_admissions_per_million,weekly_hosp_admissions,weekly_hosp_admissions_per_million,new_tests,
  // total_tests,total_tests_per_thousand,new_tests_per_thousand,new_tests_smoothed,new_tests_smoothed_per_thousand,positive_rate,tests_per_case,tests_units,
  // total_vaccinations,people_vaccinated,
  // people_fully_vaccinated,total_boosters,
  // new_vaccinations,new_vaccinations_smoothed,total_vaccinations_per_hundred,people_vaccinated_per_hundred,people_fully_vaccinated_per_hundred,total_boosters_per_hundred,new_vaccinations_smoothed_per_million,new_people_vaccinated_smoothed,new_people_vaccinated_smoothed_per_hundred,stringency_index,
  // population,
  // population_density,
  // median_age,aged_65_older,aged_70_older,
  // gdp_per_capita,extreme_poverty,cardiovasc_death_rate,diabetes_prevalence,female_smokers,male_smokers,handwashing_facilities,hospital_beds_per_thousand,
  // life_expectancy,human_development_index,excess_mortality_cumulative_absolute,excess_mortality_cumulative,excess_mortality,excess_mortality_cumulative_per_million

  const [typeOfDataForTheMap, setTypeOfDataForTheMap] = useState("total_cases");
  const [data, setData] = useState([]);

  useEffect(() => {
    csv(
      `https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.csv`
    ).then((data) => {
      setData(data);
    });
  }, [typeOfDataForTheMap]);

  const handleTypeOfDataForTheMap = (event, newTypeOfDataForTheMap) => {
    if (newTypeOfDataForTheMap !== null) {
      setTypeOfDataForTheMap(newTypeOfDataForTheMap);
    }
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      fontFamily: "Calibri",
      textAlign: "center",
    },
    button: {
      background: "#F5F5DC",
    },
  }));

  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Grid
        container
        spacing={3}
        xs={12}
        sm={12}
        md={12}
        lg={12}
        alignItems="center"
        justifyContent="center"
      >
        <Grid
          container
          spacing={3}
          xs={12}
          sm={12}
          md={6}
          lg={6}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item xs={12} sm={12} md={6} lg={6} spacing={0}>
            <ToggleButtonGroup
              value={typeOfDataForTheMap}
              exclusive
              onChange={handleTypeOfDataForTheMap}
              aria-label="text variable"
            >
              <ToggleButton
                style={{ width: 200 }}
                value="total_cases"
                aria-label="left aligned"
                className={classes.button}
              >
                {/* <img src={rainLogo} alt="rainLogo" width="36" height="36" /> */}
                total_cases
              </ToggleButton>
              <ToggleButton
                style={{ width: 200 }}
                value="total_deaths"
                aria-label="right aligned"
                className={classes.button}
              >
                {/* <img src={tempLogo} alt="tempLogo" width="36" height="36" />{" "} */}
                total_deaths
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        </Grid>
      </Grid>
      <ComposableMap
        projectionConfig={{
          rotate: [-10, 0, 0],
          scale: 147,
        }}
      >
        <Sphere stroke="#E4E5E6" strokeWidth={0.5} />
        <Graticule stroke="#E4E5E6" strokeWidth={0.5} />
        {data.length > 0 && (
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const d = data.find(
                  (s) => s.iso_code === geo.properties.ISO_A3
                );
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={d ? colorScale(d[typeOfDataForTheMap]) : "#F5F4F6"}
                  />
                );
              })
            }
          </Geographies>
        )}
      </ComposableMap>
    </Container>
  );
};

export default App;
