import { ETab } from "../types";
import useParams from "../useParams";
import ActivityLog from "./Tabs/ActivityLog/ActivityLog";
import EditProfile from "./Tabs/EditProfile/EditProfile";
import Trips from "./Tabs/Trips/Trips";

export default function TabContent() {
  const { tab } = useParams();

  switch (tab as ETab) {
    case ETab.Profile:
      return <EditProfile />;
    case ETab.Trips:
      return <Trips />;
    case ETab.Activity:
      return <ActivityLog />;
    default:
      return "Non-Existing";
  }
}
