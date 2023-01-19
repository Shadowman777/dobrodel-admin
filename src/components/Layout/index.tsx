import React, { FC } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import ExitToApp from '@material-ui/icons/ExitToApp'
import MenuIcon from '@material-ui/icons/Menu'
import CloseIcon from '@material-ui/icons/Close'
import { Drawer, Hidden, Tooltip } from '@material-ui/core'
import { useAppDispatch } from 'hooks/appHooks'
import { setLoggedIn } from 'store/slices/main/slice'
import { LayoutProps } from './types'
import { LeftMenu } from './LeftMenu'
import {
  StyledContent,
  StyledPaper,
  StyledPageHeader,
  StyledToolbar,
  StyledFlexGrow,
  StyledAppBar
} from './styled'

const drawerWidth = 270

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: 1
  },
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    flex: 1
  },
  paper: {
    padding: theme.spacing(2)
  },
  root: {
    display: 'flex'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  closeMenuButton: {
    marginRight: 'auto',
    marginLeft: 0
  }
}))

const Layout: FC<LayoutProps> = ({ children, title, action }) => {
  const classes = useStyles()
  const [mobileOpen, setMobileOpen] = React.useState(false)
  function handleDrawerToggle() {
    setMobileOpen(!mobileOpen)
  }
  const dispatch = useAppDispatch()

  return (
    <div className={classes.root}>
      <CssBaseline />
      <StyledAppBar position="fixed">
        <StyledToolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Dobrodel
          </Typography>
          <StyledFlexGrow />
          <Tooltip title="Выход">
            <IconButton
              color="inherit"
              onClick={() => dispatch(setLoggedIn(false))}
            >
              <ExitToApp />
            </IconButton>
          </Tooltip>
        </StyledToolbar>
      </StyledAppBar>

      <nav className={classes.drawer}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            <IconButton
              onClick={handleDrawerToggle}
              className={classes.closeMenuButton}
            >
              <CloseIcon />
            </IconButton>
            <LeftMenu />
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
              paper: classes.drawerPaper
            }}
          >
            <div className={classes.toolbar} />
            <LeftMenu />
          </Drawer>
        </Hidden>
      </nav>
      <StyledContent>
        <div className={classes.toolbar} />
        <StyledPaper>
          <StyledPageHeader>
            <Typography variant="h5" component="h2">
              {title}
            </Typography>
            {action}
          </StyledPageHeader>
          {children}
        </StyledPaper>
      </StyledContent>
    </div>
  )
}

export default Layout
