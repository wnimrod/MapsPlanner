import { Box, Card, CardContent, Tab, Tabs } from "@mui/material";
import { ERoute } from "src/routes";

import { useIntl } from "react-intl";
import { Route, Routes, generatePath, useNavigate, useParams } from "react-router-dom";

import { ETab } from "../types";
import messages from "./messages";

export default function SettingsCard() {
  const tabs = Object.values(ETab);

  const { id = null, page: selectedTab = tabs[0] } = useParams();
  const navigate = useNavigate();

  const { formatMessage } = useIntl();

  const handleTabChanged = (_: React.SyntheticEvent<Element, Event>, tabIdx: number) => {
    const path = generatePath(ERoute.UserProfile, { id, page: tabs[tabIdx] });
    navigate(path);
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Tabs value={tabs.indexOf(selectedTab as ETab)} onChange={handleTabChanged}>
          {tabs.map((key) => (
            <Tab key={`tab-${key}`} label={formatMessage(messages.tabs[key.toLowerCase()])} />
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
}
