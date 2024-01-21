import { injectMessageIds } from "src/utils/injectMessageIds";

const scope = "views.ProfilePage.ProfileCard";

export default injectMessageIds(scope, {
  registered: "Member Since {registerDate, date, medium}",
  shareProfile: "Share Profile",
  tripsCount: "Trips: {totalTrips, number}",
  markersCount: "Markers: {totalMarkers, number}"
}) as any;
