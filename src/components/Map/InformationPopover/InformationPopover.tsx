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
import { IAPIMarker } from "src/api/markers";
import useMarker from "src/hooks/useMarker";
import useSkeleton from "src/hooks/useSkeleton";
import { setAlert } from "src/store/global";
import { AppDispatch } from "src/store/store";

import { useRef, useState } from "react";
import { useDispatch } from "react-redux";

import style from "./InformationPopover.module.scss";

type TProps = {
  marker: IAPIMarker;
  anchorPosition: PopoverProps["anchorPosition"];
  onClose: () => void;
};

export default function InformationPopover({ anchorPosition, marker, onClose }: TProps) {
  const { editMarker, deleteMarker } = useMarker({ marker });

  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const descriptionRef = useRef<HTMLSpanElement | null>(null);
  const titleRef = useRef<HTMLSpanElement | null>(null);

  const dispatch: AppDispatch = useDispatch();

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

      dispatch(setAlert({ message: "Failed to edit marker.", severity: "error" }));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteMarker = async () => {
    setIsSubmitting(true);
    try {
      await deleteMarker(marker.id);
      onClose();
    } catch (error) {
      dispatch(
        setAlert({ message: `Failed to delete marker \`${marker.title}\``, severity: "error" })
      );
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
