import React, { useState, useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { Container } from "@material-ui/core";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import { csv } from "d3-fetch";
import { scaleLinear } from "d3-scale";
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
  .domain([10, 100000])
  .range(["#ffedea", "#ff5233"])
// .interpolate(interpolateHcl);

const App = () => {
  const [typeOfDataForTheMap, setTypeOfDataForTheMap] = useState("total_cases");
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date("2020-04-17T21:11:54")
  );
  const listForMAxValue = [];

  useEffect(() => {
    csv(
      `https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.csv`
    ).then((data) => {
      setData(data);
    });
  }, [typeOfDataForTheMap]);

  var filteredDataForMap = data.filter(function (d) {
    if (d["date"] === selectedDate.toISOString().substr(0, 10)) {
      return d;
    }
  });

  console.log("data");
  console.log(data);
  console.log("filteredDataForMap");
  console.log(filteredDataForMap);
  console.log("selectedDate");
  console.log(selectedDate.toISOString().substr(0, 10));

  var filteredDataForColorScale = filteredDataForMap.filter(function (d) {
    if (d[{ typeOfDataForTheMap }] !== null) {
      return d;
    }
  });


  // for (let i = 0; i < filteredDataForMap.length; i++) {
  //   listForMAxValue.push(filteredDataForMap[i])
  // }

  filteredDataForMap.map((Object) => {
    listForMAxValue.push(Object.typeOfDataForTheMap);
  });

  console.log("filteredDataForColorScale");
  console.log(filteredDataForColorScale);
  console.log("listForMAxValue");
  console.log(listForMAxValue);



  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTypeOfDataForTheMap = (event, newTypeOfDataForTheMap) => {
    if (newTypeOfDataForTheMap !== null) {
      setTypeOfDataForTheMap(newTypeOfDataForTheMap);
    }
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      fontFamily: "Calibri",
      textAlign: "center",
      flexGrow: 1,
      justifyContent: "space-evenly",
      fontSize: 50,
      background: "#FFFFF0",
    },
    button: {
      background: "#F5F5DC",
    },
    titleText: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
      background: "#FFFACD",
    },
    infoText: {
      padding: theme.spacing(2),
      textAlign: "center",
      color: theme.palette.text.secondary,
      background: "#F5F5DC",
      fontSize: 22,
    },
  }));

  const classes = useStyles();

  return (
    <Container className={classes.root} maxWidth="false" >
      <Paper className={classes.titleText} elevation={3}>
        COVID DATA ON MAP
      </Paper>
      <Paper className={classes.infoText} elevation={3}>
        This is covid-19 data on map app. Choose the data and data you are interested in. It will appear on the map.
      </Paper>
      <Grid container spacing={3} >
        <Grid item xs={12} sm={12} md={3} lg={3}>
          {/* <p> {selectedDate.toISOString().substr(0, 10)} </p> */}
          <ToggleButtonGroup
            orientation="vertical"
            value={typeOfDataForTheMap}
            exclusive
            onChange={handleTypeOfDataForTheMap}
            aria-label="text variable"
          >
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                animateYearScrolling="true"
                minDate="2020-02-10"
                disableFuture
                disableToolbar
                style={{ width: 250 }}
                variant="inline"
                format="MM/dd/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Pick a date"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
            <ToggleButton
              style={{ width: 250 }}
              value="total_cases"
              aria-label="left aligned"
              className={classes.button}
            >
              {/* <img src={rainLogo} alt="rainLogo" width="36" height="36" /> */}
              total cases
            </ToggleButton>
            <ToggleButton
              style={{ width: 250 }}
              value="total_deaths"
              aria-label="right aligned"
              className={classes.button}
            >
              {/* <img src={tempLogo} alt="tempLogo" width="36" height="36" />{" "} */}
              total deaths
            </ToggleButton>{" "}
            <ToggleButton
              style={{ width: 250 }}
              value="total_cases_per_million"
              aria-label="right aligned"
              className={classes.button}
            >
              {/* <img src={tempLogo} alt="tempLogo" width="36" height="36" />{" "} */}
              total cases per million
            </ToggleButton>{" "}
            <ToggleButton
              style={{ width: 250 }}
              value="total_deaths_per_million"
              aria-label="right aligned"
              className={classes.button}
            >
              {/* <img src={tempLogo} alt="tempLogo" width="36" height="36" />{" "} */}
              total deaths per million
            </ToggleButton>{" "}
            <ToggleButton
              style={{ width: 250 }}
              value="hosp_patients"
              aria-label="right aligned"
              className={classes.button}
            >
              {/* <img src={tempLogo} alt="tempLogo" width="36" height="36" />{" "} */}
              hospital patients
            </ToggleButton>
            <ToggleButton
              style={{ width: 250 }}
              value="total_tests"
              aria-label="right aligned"
              className={classes.button}
            >
              {/* <img src={tempLogo} alt="tempLogo" width="36" height="36" />{" "} */}
              total tests
            </ToggleButton>{" "}
            <ToggleButton
              style={{ width: 250 }}
              value="total_vaccinations"
              aria-label="right aligned"
              className={classes.button}
            >
              {/* <img src={tempLogo} alt="tempLogo" width="36" height="36" />{" "} */}
              total vaccinations
            </ToggleButton>{" "}
            <ToggleButton
              style={{ width: 250 }}
              value="people_fully_vaccinated"
              aria-label="right aligned"
              className={classes.button}
            >
              {/* <img src={tempLogo} alt="tempLogo" width="36" height="36" />{" "} */}
              people fully vaccinated
            </ToggleButton>
            <ToggleButton
              style={{ width: 250 }}
              value="new_vaccinations"
              aria-label="right aligned"
              className={classes.button}
            >
              {/* <img src={tempLogo} alt="tempLogo" width="36" height="36" />{" "} */}
              new vaccinations
            </ToggleButton>{" "}
            <ToggleButton
              style={{ width: 250 }}
              value="population"
              aria-label="right aligned"
              className={classes.button}
            >
              {/* <img src={tempLogo} alt="tempLogo" width="36" height="36" />{" "} */}
              population
            </ToggleButton>
            <ToggleButton
              style={{ width: 250 }}
              value="population_density"
              aria-label="right aligned"
              className={classes.button}
            >
              {/* <img src={tempLogo} alt="tempLogo" width="36" height="36" />{" "} */}
              population density
            </ToggleButton>{" "}
            <ToggleButton
              style={{ width: 250 }}
              value="median_age"
              aria-label="right aligned"
              className={classes.button}
            >
              {/* <img src={tempLogo} alt="tempLogo" width="36" height="36" />{" "} */}
              median age
            </ToggleButton>
            <ToggleButton
              style={{ width: 250 }}
              value="gdp_per_capita"
              aria-label="right aligned"
              className={classes.button}
            >
              {/* <img src={tempLogo} alt="tempLogo" width="36" height="36" />{" "} */}
              gdp per capita
            </ToggleButton>{" "}
            <ToggleButton
              style={{ width: 250 }}
              value="life_expectancy"
              aria-label="right aligned"
              className={classes.button}
            >
              {/* <img src={tempLogo} alt="tempLogo" width="36" height="36" />{" "} */}
              life expectancy
            </ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid item xs={12} sm={12} md={9} lg={9}>
          <ComposableMap 
            projectionConfig={{
              rotate: [-10, 0, 0],
              scale: 147,
            }}
          >
            <Sphere stroke="#E4E5E6" strokeWidth={0.8} />
            <Graticule stroke="#E4E5E6" strokeWidth={0.8} />
            {filteredDataForMap.length > 0 && (
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const d = filteredDataForMap.find(
                      (s) => s.iso_code === geo.properties.ISO_A3
                    );
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={
                          d ? colorScale(d[typeOfDataForTheMap]) : "#F5F4F6"
                        }
                      />
                    );
                  })
                }
              </Geographies>
            )}
          </ComposableMap>
        </Grid>
      </Grid>
    </Container>
  );
};

export default App;
