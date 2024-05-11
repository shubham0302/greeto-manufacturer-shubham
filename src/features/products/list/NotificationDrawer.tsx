import React from "react";
import { VariantNotification } from "../../../common";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import { Close } from "@mui/icons-material";
import NotificationTile from "./NotificationTile";

type Props = {
  notifications: VariantNotification[];
  onChangeNotification: (
    notification: VariantNotification,
    index: number
  ) => void;
  onClose: () => void;
};

const NotificationDrawer: React.FC<Props> = (props) => {
  const { notifications, onChangeNotification, onClose } = props;
  return (
    <Box
      sx={{
        minWidth: "500px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          gap: 2,
          p: 2,
          alignItems: "center",
        }}
      >
        <Typography variant="labelXxl">Notifications</Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Box>
      <Divider />
      <Box
        sx={{
          width: "100%",
          flex: 1,
          p: 2,
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
            width: "100%",
            height: "100%",
            overflowY: "scroll",
            gap: 4,
          }}
        >
          {notifications.map((np, i) => (
            <NotificationTile
              notification={np}
              index={i}
              onChangeNotification={onChangeNotification}
              key={i}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default NotificationDrawer;
