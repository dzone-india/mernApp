import React from "react";
import {
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@material-ui/core";

const Transaction = (props) => {
  const { onOptionSelectListener, title, options, values, keyIndex } = props;
  const [value, setValue] = React.useState(values);

  const handleChange = (event) => {
    event.preventDefault();
    const value = event.target.value;
    setValue(event.target.value);
    onOptionSelectListener && onOptionSelectListener({ value, title });
  };

  return (
    <FormControl component="fieldset" key={keyIndex}>
      <FormLabel component="legend">{title}</FormLabel>
      <RadioGroup
        aria-label="personal-info"
        name="personal-info"
        value={value}
        onChange={handleChange}
        row
      >
        {options.map((option) => (
          <FormControlLabel value={option} control={<Radio />} label={option} />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default Transaction;
