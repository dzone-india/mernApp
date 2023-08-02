import React, { useState } from "react";
import {
  RadioGroup,
  Radio,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@material-ui/core";

const PersonalDetail = (props) => {
  const { onOptionSelectListener, title, options, values } = props;
  const [value, setValue] = useState(values);

  const handleChange = (event) => {
    setValue(event.target.value);
    onOptionSelectListener && onOptionSelectListener(event.target.value);
  };

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
        {options.map((option) => (
          <FormControlLabel value={option} control={<Radio />} label={option} />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default PersonalDetail;
