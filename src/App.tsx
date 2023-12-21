import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";

import "./App.css";
import MainBar from "./components/MainBar/MainBar";
import AppLoading from "./views/AppLoading/AppLoading";

function App() {
  return (
    <Box>
      <AppLoading isOpen={true} />

      <MainBar />

      <Routes>
        <Route path="/" Component={() => <div>Hello world</div>}></Route>
      </Routes>
    </Box>
  );
}

export default App;
