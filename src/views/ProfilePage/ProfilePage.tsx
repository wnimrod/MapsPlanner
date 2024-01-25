import { Grid } from "@mui/material";

import ProfileCard from "./ProfileCard/ProfileCard";
import style from "./ProfilePage.module.scss";
import SettingsCard from "./SettingsCard/SettingsCard";

export default function ProfilePage() {
  return (
    <Grid container classes={{ root: style.container }}>
      <Grid height="100%" container direction={{ xs: "column", md: "row" }} spacing={3}>
        <Grid item md={3} classes={{ root: style.profileCard }}>
          <ProfileCard />
        </Grid>
        <Grid item md={9} classes={{ root: style.settingsCard }}>
          <SettingsCard />
        </Grid>
      </Grid>
    </Grid>
  );
}
