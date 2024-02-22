import { Typography } from "@mui/material";
import React from "react";

export default function ErrorMessage({message}) {
  return (
    <Typography margin={0} padding={0} style={{ color: "red", fontSize: "small" }}>
      {message}
    </Typography>
  );
}
