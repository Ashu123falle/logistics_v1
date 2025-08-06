import { AppBar, Toolbar, Typography, Button } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ bgcolor: "#1976d2" }}>
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6">Customer Dashboard</Typography>
        <Button color="inherit">Logout</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
