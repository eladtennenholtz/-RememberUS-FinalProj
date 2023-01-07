import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Button } from "@mui/material";

const RadioControl = (props) => {
  const [furnitureValue, setfurnitureValue] = React.useState("sofa");
  const handlefurnitureValueChange = (event) => {
    setfurnitureValue(event.target.value);
  };
  const handleUploadClick = () => {
    props.addFurnitureHandler(furnitureValue);
  };
  return (
    <FormControl>
      <FormLabel id="row-radio-buttons-group-label">
        Please chose furniture
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        onChange={handlefurnitureValueChange}
      >
        <FormControlLabel value="sofa" control={<Radio />} label="sofa" />
        <FormControlLabel value="shower" control={<Radio />} label="shower" />
        <FormControlLabel value="toilet" control={<Radio />} label="toilet" />
        <FormControlLabel value="TV" control={<Radio />} label="TV" />
        <FormControlLabel value="fridge" control={<Radio />} label="fridge" />
        <FormControlLabel value="door" control={<Radio />} label="door" />
        <FormControlLabel value="chair" control={<Radio />} label="chair" />
        <FormControlLabel value="table" control={<Radio />} label="table" />
        <FormControlLabel value="carpet" control={<Radio />} label="carpet" />
        <Button onClick={handleUploadClick}>Upload</Button>
      </RadioGroup>
    </FormControl>
  );
};
export default RadioControl;
