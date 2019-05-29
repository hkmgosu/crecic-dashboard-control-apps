import { withStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import CircularProgress from "@material-ui/core/CircularProgress";
import PropTypes from "prop-types";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ErrorIcon from "@material-ui/icons/Error";
import InfoIcon from "@material-ui/icons/Info";
import WarningIcon from "@material-ui/icons/Warning";
import green from "@material-ui/core/colors/green";
import amber from "@material-ui/core/colors/amber";
import blue from "@material-ui/core/colors/blue";
import red from "@material-ui/core/colors/red";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

const styles = theme => ({
  root: {
    minHeight: "90px",
    minWidth: "420px"
  },
  circularProgress: {
    margin: theme.spacing.unit * 2,
    color: theme.palette.primary.light
  },
  done: {
    margin: theme.spacing.unit * 3
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing.unit
  },
  message: {
    display: "flex",
    alignItems: "center"
  },
  success: {
    backgroundColor: green[700],
    minHeight: "90px",
    minWidth: "420px"
  },
  error: {
    backgroundColor: red[700],
    minHeight: "90px",
    minWidth: "420px"
  },
  info: {
    backgroundColor: blue[700],
    minHeight: "90px",
    minWidth: "420px"
  },
  warning: {
    backgroundColor: amber[700],
    minHeight: "90px",
    minWidth: "420px"
  }
});

function BigSnackbar(props) {
  const { open, message, loading, variant, classes, handleClose } = props;

  const statusIcons = {
    success: <CheckCircleIcon className={classes.done} />,
    warning: <WarningIcon className={classes.done} />,
    error: <ErrorIcon className={classes.done} />,
    info: <InfoIcon className={classes.done} />
  };

  function StatusProgress() {
    return loading ? (
      <CircularProgress className={classes.circularProgress} />
    ) : (
      statusIcons[variant]
    );
  }

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        className={classes.root}
        open={open}
        autoHideDuration={7200}
        onClose={handleClose}
        ContentProps={{
          "aria-describedby": "message-id",
          classes: { root: classes[variant] }
        }}
        thickness={3.9}
        message={
          <span id="message-id" className={classes.message}>
            <StatusProgress />
            {message}
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={handleClose}
          >
            <CloseIcon className={classes.icon} />
          </IconButton>
        ]}
      />
    </div>
  );
}

BigSnackbar.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  loading: PropTypes.bool,
  message: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(["success", "warning", "error", "info"]).isRequired,
  handleClose: PropTypes.func
};

export default withStyles(styles)(BigSnackbar);
