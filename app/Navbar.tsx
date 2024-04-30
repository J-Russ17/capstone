"use client";

import * as React from "react";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useSession, signOut } from "next-auth/react";

function Navbar() {
  const { status, data: session } = useSession();
  const isAuthenticated = status === "authenticated";

  const pages = [
    { label: "Play", path: isAuthenticated ? "/play" : "/api/auth/signin" },
    { label: "Leaderboards", path: "/leaderboards" },
    {
      label: isAuthenticated ? "Sign Out" : "Register",
      path: isAuthenticated ? "/api/auth/signout" : "/register",
    },
  ];

  const settings = [
    { label: "Profile", path: "/profile" },
    { label: "Account", path: "/account" },
    { label: "Dashboard", path: "/dashboard" },
    { label: "Logout", path: "/api/auth/signout" },
  ];

  const appBarStyle = {
    backgroundColor: "#000",
    color: "#DAA520",
  };

  const linkStyle = {
    color: "inherit",
    textDecoration: "none",
  };

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = async () => {
    await signOut({ redirect: false });
    handleCloseUserMenu();
  };

  return (
    <AppBar position="static" sx={appBarStyle}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <Link href="/" passHref>
              Next Chess
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem
                  key={`${page.label}-${index}`}
                  onClick={handleCloseNavMenu}
                >
                  <Link href={page.path} passHref>
                    {page.label}
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page, index) => (
              <Button
                key={`button-${page.label}-${index}`}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                <Link href={page.path} passHref>
                  <Typography sx={{ color: "inherit", textDecoration: "none" }}>
                    {page.label}
                  </Typography>
                </Link>
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                {status === "authenticated" && (
                  <Avatar alt="Profile" src="/static/images/avatar/2.jpg" />
                )}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, index) => {
                const key = `setting-${setting.label}-${index}`;
                return setting.label === "Logout" ? (
                  <MenuItem key={key} onClick={handleLogout}>
                    <Typography textAlign="center">{setting.label}</Typography>
                  </MenuItem>
                ) : (
                  <Link href={setting.path} passHref key={key}>
                    <MenuItem onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">
                        {setting.label}
                      </Typography>
                    </MenuItem>
                  </Link>
                );
              })}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
