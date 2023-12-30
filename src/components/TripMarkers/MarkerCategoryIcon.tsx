import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import CommuteIcon from "@mui/icons-material/Commute";
import LandscapeIcon from "@mui/icons-material/Landscape";
import ParkIcon from "@mui/icons-material/Park";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { EMarkerCategory } from "src/api/markers";

type TProps = {
  category: EMarkerCategory;
};

export default function MarkerCategoryIcon({ category }: TProps) {
  switch (category) {
    case EMarkerCategory.nature:
      return <LandscapeIcon />;
    case EMarkerCategory.shopping:
      return <ShoppingBagIcon />;
    case EMarkerCategory.Beach:
      return <BeachAccessIcon />;
    case EMarkerCategory.Parks:
      return <ParkIcon />;
    case EMarkerCategory.PublicTransportation:
      return <CommuteIcon />;
    case EMarkerCategory.Restaurant:
      return <RestaurantIcon />;
  }
}
