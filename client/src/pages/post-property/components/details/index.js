import React, { useState } from "react";
import {
  Grid,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
  FormLabel,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  text1: {
    fontFamily: '"Open Sans"',
    color: "#303030",
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
  },
  text3: {
    fontFamily: '"Open Sans",sans-serif',
    color: "#666666",
    fontSize: 14,
  },
  text4: {
    fontFamily: '"Open Sans",sans-serif',
    color: "#333333",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text5: {
    fontFamily: '"Open Sans",sans-serif',
    color: "#FF7601",
    fontSize: 20,
    fontWeight: "bold",
  },
  text6: {
    fontFamily: '"Open Sans",sans-serif',
    color: "#888888",
    fontSize: 15,
    fontWeight: 400,
    lineHeight: 1.8,
  },
  text7: {
    fontFamily: '"Open Sans",sans-serif',
    color: "#333333",
    fontSize: 25,
    fontWeight: "bold",
    marginRight: 10,
  },
  icon: {
    color: "#FF7601",
    fontSize: 20,
    paddingRight: 10,
  },
  style1: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  btn1: {
    borderRadius: 8,
    color: "#FFFFFF",
    textTransform: "none",
    fontFamily: '"Open Sans",sans-serif',
    backgroundColor: "#FF7601",
  },
  btn2: {
    borderRadius: 15,
    color: "#FFFFFF",
    textTransform: "none",
    marginRight: 10,
    fontFamily: '"Open Sans",sans-serif',
  },
  style2: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  style3: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  box1: {
    width: 10,
    paddingRight: 5,
    paddingLeft: 5,
    color: "#333333",
  },
}));

const PersonalDetail = (props) => {
  const { onOptionSelectListener, title, options } = props;
  const [value, setValue] = React.useState("female");

  const handleChange = (event) => {
    setValue(event.target.value);
    onOptionSelectListener && onOptionSelectListener(event.target.value);
  };
  const classes = useStyles();

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{title}</FormLabel>
      <RadioGroup
        aria-label="personal-info"
        name="personal-info"
        value={value}
        onChange={handleChange}
        row
      >
        {options.map((option, index) => {
          <FormControlLabel
            value={option}
            key={index}
            control={<Radio />}
            label={option}
          />;
        })}
      </RadioGroup>
    </FormControl>
  );
};

export default PersonalDetail;
