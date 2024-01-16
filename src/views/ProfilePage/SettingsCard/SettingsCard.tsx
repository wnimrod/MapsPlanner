import { useIntl } from "react-intl";
import { generatePath, useNavigate, useParams } from "react-router-dom";

import { Box, Card, CardContent, Divider, Tab, Tabs } from "@mui/material";

import { ERoute } from "src/routes";

import { type ETab, tabs } from "../types";
import style from "./SettingsCard.module.scss";
import TabContent from "./TabContent";
import messages from "./messages";

export default function SettingsCard() {
  const { id = null, tab: selectedTab = tabs[0] } = useParams();
  const navigate = useNavigate();

  const { formatMessage } = useIntl();

  const handleTabChanged = (_: React.SyntheticEvent<Element, Event>, tabIdx: number) => {
    const path = generatePath(ERoute.UserProfile, { id, tab: tabs[tabIdx] });
    navigate(path);
  };

  return (
    <Card variant="outlined" classes={{ root: style.container }}>
      <CardContent>
        <Tabs value={tabs.indexOf(selectedTab as ETab)} onChange={handleTabChanged}>
          {tabs.map((key) => (
            <Tab key={`tab-${key}`} label={formatMessage(messages.tabs[key.toLowerCase()])} />
          ))}
        </Tabs>
        <Divider />
        <Box mt={3}>
          <TabContent />
        </Box>
      </CardContent>
    </Card>
  );
}
