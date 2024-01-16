import React from "react";
import { useEffect, useRef } from "react";
import { FormattedMessage } from "react-intl";
import { generatePath, useNavigate } from "react-router-dom";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import MapIcon from "@mui/icons-material/Map";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { Avatar, Badge, Button, Card, Divider, Grid, Typography } from "@mui/material";

import cx from "classnames";

import useCopyToClipboard from "src/hooks/useCopyToClipboard";
import useSkeleton from "src/hooks/useSkeleton";
import { handleFileSelected } from "src/hooks/useUploadFile";
import useUserProfile from "src/hooks/useUserProfile";
import { ERoute } from "src/routes";

import useEffectiveUserId from "../useEffectiveUserId";
import useParams from "../useParams";
import style from "./ProfileCard.module.scss";
import messages from "./messages";

export default function ProfileCard() {
  const { id: userIdParam, tab: tabParam } = useParams();

  const copyToClipboard = useCopyToClipboard();
  const effectiveUserId = useEffectiveUserId();

  const navigate = useNavigate();

  const { userProfile, isLoading, editProfile } = useUserProfile(effectiveUserId);
  const { profilePicture, fullname, registerDate, totalTrips, totalMarkers } = userProfile || {};

  const withSkeleton = useSkeleton({ isLoading });

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (userIdParam === null && typeof effectiveUserId === "number") {
      const explicitPath = generatePath(ERoute.UserProfile, {
        id: `${effectiveUserId}`,
        tab: tabParam
      });

      navigate(explicitPath, { replace: true });
    }
  }, [userIdParam, effectiveUserId]);

  const handleShareProfile = () => {
    const path = generatePath(ERoute.UserProfile, {
      id: effectiveUserId ? `${effectiveUserId}` : null,
      tab: tabParam
    });
    const url = `${window.location.host}${path}`;
    copyToClipboard(url);
  };

  const handleProfilePictureChanged = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const profilePicture = await handleFileSelected(event)[0];
    await editProfile({ profilePicture });
  };

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
              onClick={() => fileInputRef?.current?.click()}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              classes={{ root: style.badge }}
              badgeContent={<PhotoCameraIcon classes={{ root: style.camera }} />}
            >
              <Avatar classes={{ root: style.avatar }} src={profilePicture} alt={fullname} />
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
      <input type="file" ref={fileInputRef} onChange={handleProfilePictureChanged} hidden />
    </Card>
  );
}
