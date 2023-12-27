import ParkIcon from "@mui/icons-material/Park";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { EMarkerCategory } from "src/api/markers";

type TProps = {
  category: EMarkerCategory;
};

export default function MarkerCategoryIcon({ category }: TProps) {
  switch (category) {
    case EMarkerCategory.nature:
      return <ParkIcon />;
    case EMarkerCategory.shopping:
      return <ShoppingBagIcon />;
  }
}
