import { Card, CardContent, Typography } from "@mui/material";

const StatCard = ({ title, value, icon }) => {
  return (
    <Card sx={{ minWidth: 200 }}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <Typography variant="h5">{value}</Typography>
        <Typography variant="h6" sx={{ color: "gray" }}>
          {icon}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StatCard;
