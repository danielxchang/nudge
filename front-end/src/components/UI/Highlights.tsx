import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import match from "autosuggest-highlight/match";
import parse from "autosuggest-highlight/parse";

import { HabitOption } from "../../models/habit";

interface Props {
  options: HabitOption[];
  label: string;
}

const Highlights: React.FC<Props> = (props) => {
  return (
    <Autocomplete
      id="highlights-input"
      options={props.options}
      getOptionLabel={(option) => option.title}
      renderInput={(params) => (
        <TextField {...params} label={props.label} margin="normal" />
      )}
      renderOption={(props, option, { inputValue }) => {
        const matches = match(option.title, inputValue);
        const parts = parse(option.title, matches);

        return (
          <li {...props}>
            <div>
              {parts.map(
                (part: { text: string; highlight: boolean }, index: number) => (
                  <span
                    key={index}
                    style={{
                      fontWeight: part.highlight ? 700 : 400,
                    }}
                  >
                    {part.text}
                  </span>
                )
              )}
            </div>
          </li>
        );
      }}
    />
  );
};

export default Highlights;
