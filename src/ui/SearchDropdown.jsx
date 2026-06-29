import React, { useState } from "react";

import {
  Box,
  TextField,
  Paper,
  Popper,
  List,
  ListItemButton,
  ListItemText,
  ClickAwayListener,
  InputAdornment,
} from "@mui/material";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";

const SearchDropdown = ({ label, options, value, onChange, optionLabel }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [search, setSearch] = useState("");

  const open = Boolean(anchorEl);

  const filteredOptions = options.filter((item) =>
    item[optionLabel]?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <>
      <TextField
        label={label}
        value={value || ""}
        placeholder={`Select ${label}`}
        fullWidth
        onClick={(e) => setAnchorEl(e.currentTarget)}
        InputProps={{
          readOnly: true,
          endAdornment: (
            <InputAdornment position="end">
              <KeyboardArrowDownRoundedIcon />
            </InputAdornment>
          ),
        }}
        sx={{
          "& .MuiInputBase-input": {
            cursor: "pointer",
          },
        }}
      />

      <Popper
        open={open}
        anchorEl={anchorEl}
        placement="bottom-start"
        style={{
          zIndex: 1300,
          width: anchorEl?.clientWidth,
        }}
      >
        <ClickAwayListener
          onClickAway={() => {
            setAnchorEl(null);
            setSearch("");
          }}
        >
          <Paper
            elevation={8}
            sx={{
              mt: 1,
              borderRadius: "14px",
              overflow: "hidden",
              width: "100%",
            }}
          >
            <Box p={1}>
              <TextField
                size="small"
                fullWidth
                placeholder={`Search ${label}`}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchRoundedIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            <List
              sx={{
                maxHeight: 250,
                overflow: "auto",
              }}
            >
              {filteredOptions.length > 0 ? (
                filteredOptions.map((item) => (
                  <ListItemButton
                    key={item[optionLabel]}
                    selected={value === item[optionLabel]}
                    onClick={() => {
                      onChange(item[optionLabel]);
                      setAnchorEl(null);
                      setSearch("");
                    }}
                  >
                    <ListItemButton disabled>
                      <ListItemText
                        primary="No records found"
                        sx={{
                          textAlign: "center",
                          color: "text.secondary",
                        }}
                      />
                    </ListItemButton>
                  </ListItemButton>
                ))
              ) : (
                <ListItemText
                  primary="No records found"
                  sx={{
                    p: 2,
                    textAlign: "center",
                    color: "gray",
                  }}
                />
              )}
            </List>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </>
  );
};

export default SearchDropdown;
