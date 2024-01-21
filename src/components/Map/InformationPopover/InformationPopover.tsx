import { useRef, useState } from "react";
import { useIntl } from "react-intl";

import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import {
  Card,
  CardContent,
  CircularProgress,
  IconButton,
  Popover,
  PopoverProps,
  Typography
} from "@mui/material";

import { useSnackbar } from "notistack";

import { TAPIMarker } from "src/api/types";
import useMarker from "src/hooks/useMarker";
import useSkeleton from "src/hooks/useSkeleton";

import style from "./InformationPopover.module.scss";
import messages from "./messages";

type TProps = {
  marker: TAPIMarker;
  anchorPosition: PopoverProps["anchorPosition"];
  onClose: () => void;
};

export default function InformationPopover({ anchorPosition, marker, onClose }: TProps) {
  const { formatMessage } = useIntl();
  const { editMarker, deleteMarker } = useMarker({ marker });

  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const descriptionRef = useRef<HTMLSpanElement | null>(null);
  const titleRef = useRef<HTMLSpanElement | null>(null);

  const { enqueueSnackbar } = useSnackbar();

  const withSkeleton = useSkeleton({ isLoading: isSubmitting });

  const handleEditSubmission = async () => {
    setIsEditing(false);
    setIsSubmitting(true);

    try {
      const title = titleRef.current!.innerText;
      const description = descriptionRef.current!.innerText;

      await editMarker(marker.id, { title, description });
    } catch (error) {
      // Revert changes
      titleRef.current!.innerText = marker.title;
      descriptionRef.current!.innerText = marker.description;
      enqueueSnackbar(formatMessage(messages.errors.editMarker), { variant: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteMarker = async () => {
    setIsSubmitting(true);
    onClose();

    try {
      const confirmDeleteMarker = await window.confirmDialog(messages.confirmDeleteMarkerDialog, {
        markerName: marker.title
      });
      if (confirmDeleteMarker) {
        await deleteMarker(marker.id);
      }
    } catch (error) {
      enqueueSnackbar(formatMessage(messages.errors.deleteMarker, { markerName: marker.title }), {
        variant: "error"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderActions = () => {
    if (isSubmitting) {
      return <CircularProgress size={20} />;
    } else if (isEditing) {
      return (
        <IconButton onClick={handleEditSubmission}>
          <CheckIcon />
        </IconButton>
      );
    } else {
      return (
        <>
          <IconButton onClick={() => setIsEditing(true)}>
            <ModeEditIcon />
          </IconButton>
          <IconButton onClick={handleDeleteMarker}>
            <DeleteIcon />
          </IconButton>
        </>
      );
    }
  };

  return (
    <Popover
      open={!!anchorPosition}
      id={`marker-${marker?.id}-details`}
      anchorReference="anchorPosition"
      anchorPosition={anchorPosition}
      onClose={onClose}
    >
      <Card className={style.cardContainer}>
        <CardContent>
          <div className={style.header}>
            <Typography
              gutterBottom
              variant="h5"
              className={style.label}
              contentEditable={isEditing}
              ref={titleRef}
            >
              {withSkeleton(marker.title, 1, { width: 220 })}
            </Typography>
            {renderActions()}
          </div>

          <Typography
            variant="body2"
            color="text.secondary"
            className={style.description}
            contentEditable={isEditing}
            ref={descriptionRef}
          >
            {withSkeleton(marker?.description, +style.descriptionMaxLines, { width: "100%" })}
          </Typography>
        </CardContent>
      </Card>
    </Popover>
  );
}
