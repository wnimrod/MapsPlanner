import { ETab } from "../types";
import useParams from "../useParams";
import EditProfile from "./Tabs/EditProfile/EditProfile";

export default function TabContent() {
  const { tab } = useParams();

  switch (tab as ETab) {
    case ETab.Profile:
      return <EditProfile />;
    default:
      return "Non-Existing";
  }
}
