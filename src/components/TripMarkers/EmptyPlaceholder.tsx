import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import { Typography } from "@mui/material";
import { Container } from "@mui/system";

import style from "./TripMarkers.module.scss";

export default function EmptyPlaceholder() {
  return (
    <Container className={style.missingMarkers}>
      <AddLocationAltIcon className={style.icon} fontSize="large" color="primary" />
      <Typography variant="body2" color="common.onBackground">
        You Still have no marker. Start adding one :) Right Clock on the desired spot.
      </Typography>
    </Container>
  );
}
