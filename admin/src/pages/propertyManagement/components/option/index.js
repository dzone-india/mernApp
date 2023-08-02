import React from "react";
import {
  makeStyles,
  Grid,
  Typography,
  Button,
  Menu,
  MenuItem,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  text1: {
    fontFamily: '"Open Sans",sans-serif',
    color: "#666666",
    fontSize: 14,
  },
  text2: {
    fontFamily: '"Open Sans",sans-serif',
    color: "#606060",
    fontSize: 12,
  },
  text3: {
    fontFamily: '"Open Sans",sans-serif',
    color: "#606060",
    fontSize: 14,
  },
  style1: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#333333",
    marginRight: 2,
    // padding: 5,
  },
  style2: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  selectedOptionStyle: {
    backgroundColor: "#e0a8a6", //"#FBE9E8",
  },
}));

const Option = (props) => {
  const {
    items,
    label,
    onSelect,
    moreOptions,
    value,
    fieldName,
    showMore = true,
  } = props;
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const allItemsExceptLast = items.slice(0, -1);
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [selectedOptionIndex, setSelectedOptionIndex] = React.useState(-1);

  const handleSelectOption = (item, index) => {
    setSelectedOptionIndex(index);
    setSelectedOption("");
    onSelect && onSelect({ fieldName, item });
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionSelection = (item) => {
    setSelectedOption(item);
    setSelectedOptionIndex(-1);
    setAnchorEl(null);
    onSelect && onSelect({ fieldName, item });
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const extraStyleSelectedOption = selectedOption
    ? classes.selectedOptionStyle
    : null;
  return (
    <>
      <Grid container style={{ marginTop: 20 }}>
        <Grid item xs={12} md={12}>
          <Typography className={classes.text2}>{label}</Typography>
        </Grid>
        <Grid item xs={12} md={12} className={classes.style2}>
          {allItemsExceptLast?.map((item, index) => {
            const extraStyle =
              index === selectedOptionIndex
                ? classes.selectedOptionStyle
                : null;
            if (value[fieldName] && item === value[fieldName]) {
              return (
                <Button
                  key={index}
                  variant="outlined"
                  onClick={() => handleSelectOption(item, index)}
                  className={`${classes.style1} ${extraStyle} ${classes.selectedOptionStyle}`}
                  style={{ borderColor: "#606060", color: "#606060" }}
                >
                  {item}
                </Button>
              );
            } else {
              return (
                <Button
                  key={index}
                  variant="outlined"
                  onClick={() => handleSelectOption(item, index)}
                  className={`${classes.style1} ${extraStyle}`}
                  style={{ borderColor: "#606060", color: "#606060" }}
                >
                  {item}
                </Button>
              );
            }
          })}
          <Button
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
            variant="outlined"
            style={{ borderColor: "#606060", color: "#606060" }}
            className={`${classes.style1} ${extraStyleSelectedOption}`}
          >
            {showMore && selectedOption
              ? selectedOption
              : items[items.length - 1]}
          </Button>
          {showMore && (
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {moreOptions?.map((item, index) => (
                <MenuItem
                  key={index}
                  onClick={() => handleOptionSelection(item)}
                >
                  {item}
                </MenuItem>
              ))}
            </Menu>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default Option;
