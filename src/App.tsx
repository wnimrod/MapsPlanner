import { useState } from "react";
import "./App.css";
import { Box } from "@mui/material";
import MainBar from "./components/MainBar/MainBar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Box>
      <MainBar />
    </Box>
  );
}

export default App;
