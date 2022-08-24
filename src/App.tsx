import { Box, Grommet } from "grommet";

import { Tasks } from "./features/tasks/Tasks";

const theme = {
  global: {
    colors: {
      brand: "#4D61FC",
    },
    font: {
      family: "Roboto",
      size: "18px",
      height: "20px",
    },
  },
};


const App = () => {
  return (
    <Grommet theme={theme} full>
      <Box fill>
        <Tasks />
      </Box>
    </Grommet>
  );
}

export default App;
