import LocationOnIcon from "@mui/icons-material/LocationOn";
import MapIcon from "@mui/icons-material/Map";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { Avatar, Badge, Button, Card, Divider, Grid, Typography } from "@mui/material";
import cx from "classnames";
import useCopyToClipboard from "src/hooks/useCopyToClipboard";
import useSkeleton from "src/hooks/useSkeleton";
import useUserProfile from "src/hooks/useUserProfile";
import { ERoute } from "src/routes";

import { useEffect } from "react";
import { FormattedMessage } from "react-intl";
import { generatePath, useNavigate, useParams } from "react-router-dom";

import { ETab } from "../types";
import useEffectiveUserId from "../useEffectiveUserId";
import style from "./ProfileCard.module.scss";
import messages from "./messages";

export default function ProfileCard() {
  const { id: userIdParam = null, page: pageParam = null } = useParams();
  const copyToClipboard = useCopyToClipboard();
  const effectiveUserId = useEffectiveUserId();

  const navigate = useNavigate();

  const { userProfile, isLoading } = useUserProfile(effectiveUserId);
  const { profilePicture, fullname, registerDate, totalTrips, totalMarkers } = userProfile || {};

  const withSkeleton = useSkeleton({ isLoading });

  const handleShareProfile = () => {
    const path = generatePath(ERoute.UserProfile, {
      id: effectiveUserId ? `${effectiveUserId}` : null,
      page: pageParam
    });
    const url = `${window.location.host}${path}`;
    copyToClipboard(url);
  };

  useEffect(() => {
    if (userIdParam === null && typeof effectiveUserId === "number") {
      const explicitPath = generatePath(ERoute.UserProfile, {
        id: `${effectiveUserId}`,
        page: pageParam || ETab.Profile
      });

      console.log("Replacing with explicit path: ", explicitPath);
      navigate(explicitPath, { replace: true });
    }
  }, [userIdParam, effectiveUserId]);
  if (!isLoading && !userProfile) {
    return null;
  }

  return (
    <Card variant="outlined">
      <Grid container classes={{ container: style.container }} spacing={2}>
        <Grid item classes={{ root: style.profilePicture }}>
          {withSkeleton(
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={<PhotoCameraIcon classes={{ root: style.badge }} />}
            >
              <Avatar classes={{ root: style.avatar }} src={profilePicture} />
            </Badge>,
            1,
            {
              variant: "circular",
              classes: { root: cx(style.avatar, style.skeleton) }
            }
          )}
        </Grid>
        <Grid item>
          <Typography variant="h6">{withSkeleton(fullname)}</Typography>
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
        <Grid item>
          {withSkeleton(() => (
            <Typography variant="subtitle1">
              <FormattedMessage
                {...messages.registered}
                values={{ registerDate: new Date(registerDate!) }}
              />
            </Typography>
          ))}
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
        <Grid item classes={{ root: style.count }}>
          <div>
            {withSkeleton(<MapIcon />, 1, { width: 20 })}
            {withSkeleton(
              <Typography variant="subtitle1">
                <FormattedMessage {...messages.tripsCount} values={{ totalTrips }} />
              </Typography>,
              1,
              { width: "50%" }
            )}
          </div>
          <div>
            {withSkeleton(<LocationOnIcon />, 1, { width: 20 })}
            {withSkeleton(
              <Typography variant="subtitle1">
                <FormattedMessage {...messages.markersCount} values={{ totalMarkers }} />
              </Typography>,
              1,
              { width: "50%" }
            )}
          </div>
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
        <Grid item>
          {withSkeleton(
            <Button fullWidth variant="outlined" onClick={handleShareProfile}>
              <FormattedMessage {...messages.shareProfile} />
            </Button>
          )}
        </Grid>
      </Grid>
    </Card>
  );
}
