import React from "react";
import ReactDOM from "react-dom";
import { makeStyles } from "@material-ui/core/styles";

import MapChart from "./MapChart";

function App() {
  const useStyles = makeStyles((theme) => ({
    root: {
      fontFamily: "Calibri",
      textAlign: "center",
    },
  }));

  const classes = useStyles();

  return (
    <div>
      <MapChart className={classes.root} />
    </div>
  );
}

export default App;
