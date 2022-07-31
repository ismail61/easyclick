import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Tooltip,
  MenuItem,
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";

const Header = ({ user }) => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      {
        user ? <AppBar position="static" sx={{ zIndex: '1' }} color="">
          <Container maxWidth="xl">
            <Toolbar disableGutters>
              <Link to="/">
                <Typography
                  variant="h6"
                  noWrap
                  component="div"
                  color="#2E4763"
                >
                  <span style={{ fontWeight: "700" }}>ESYCLICK</span>
                </Typography>
              </Link>

              <Box sx={{ marginLeft: "auto" }}>
                <Typography textAlign="center" title="Logout">
                  <NavLink
                    className={({ isActive }) => (isActive ? "text-success" : "")}
                    to="/log-out"
                  >
                    <i class="fa fa-xl fa-sign-out" aria-hidden="true"></i>
                  </NavLink>
                </Typography>
              </Box>
            </Toolbar>
          </Container>
        </AppBar> : null
      }
    </>
  )
};
export default Header;