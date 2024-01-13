import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import {
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import { EAuditAction, TAPIAuditCard } from "src/api/audit";
import useAuditLogs from "src/hooks/useAuditLogs";
import useSkeleton from "src/hooks/useSkeleton";
import { ERoute } from "src/routes";
import { ETab } from "src/views/ProfilePage/types";
import useParams from "src/views/ProfilePage/useParams";

import { FormattedMessage } from "react-intl";
import { generatePath } from "react-router-dom";

import messages from "./messages";

export default function ActivityLog() {
  const { id: profileId } = useParams();
  const { auditLogs, isLoading } = useAuditLogs({ filter: { impersonateUserId: profileId } });

  const fields = ["id", "action", "description", "resource"] as const;

  const withSkeleton = useSkeleton({ isLoading });

  const renderHeader = (field: string) => <FormattedMessage {...messages.headers[field]} />;

  const renderCell = (auditLog: TAPIAuditCard, field: (typeof fields)[number]) => {
    switch (field) {
      case "id":
        return auditLog.id;
      case "action": {
        const { action } = auditLog;
        switch (action) {
          case EAuditAction.Creation:
            return <NoteAddIcon />;
          case EAuditAction.Modification:
            return <EditIcon />;
          case EAuditAction.Deletion:
            return <DeleteIcon />;
          case EAuditAction.ChatGPTQuery:
            return <AutoAwesomeIcon />;
        }
        break;
      }
      case "description": {
        const { action, target, creationDate } = auditLog;
        return (
          <FormattedMessage
            {...messages.description[action]}
            values={{ ...target, creationDate: new Date(creationDate) }}
          />
        );
      }
      case "resource": {
        const { target } = auditLog;
        let resourcePath: string | null = null;

        switch (target.model) {
          case "UserORM":
            resourcePath = generatePath(ERoute.UserProfile, {
              tab: ETab.Profile,
              id: `${target.id}`
            });
            break;
          case "TripORM":
            resourcePath = generatePath(ERoute.Trip, {
              id: `${target.id}`
            });
            break;
        }

        return (
          resourcePath && (
            <Link href={resourcePath} target="_blank">
              <OpenInNewIcon />
            </Link>
          )
        );
      }
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {fields.map((field) => (
              <TableCell>{renderHeader(field)}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {auditLogs?.map((auditLog) => (
            <>
              <TableRow>
                {fields.map((field) => (
                  <TableCell>{withSkeleton(renderCell(auditLog, field))}</TableCell>
                ))}
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
