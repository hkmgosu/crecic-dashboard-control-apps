import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import blue from '@material-ui/core/colors/blue';
import red from '@material-ui/core/colors/red';

const styles = theme => ({
  root: { 
    minHeight: "90px", 
    minWidth: "390px",
  },
  circularProgress: {
    margin: theme.spacing.unit * 2,
    color: theme.palette.primary.light
  },
  done: {
    margin: theme.spacing.unit * 3
  },
  success: {
    backgroundColor: green[700],
  },
  error: {
    backgroundColor: red[700],
  },
  info: {
    backgroundColor: blue[700],
  },
  warning: {
    backgroundColor: amber[700],
  }
});

function BigSnackbar(props) {
  const { open, message, loading, variant, classes } = props;
  const [state, setState] = React.useState({
    open
  });

  const statusIcons = {
    success: <CheckCircleIcon className={classes.done} />,
    warning: <WarningIcon className={classes.done} />,
    error: <ErrorIcon className={classes.done} />,
    info: <InfoIcon className={classes.done} /> 

  }

  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }

    setState({ ...state, open: false });
  }

  function StatusProgress() {
    return loading ? <CircularProgress className={classes.circularProgress} /> : statusIcons[variant]
  }

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={9000}
        onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
          'classes': { root: classes[variant] }
        }}
        thickness={3.9}
        message={<span id="message-id">{message}</span>}
        action={<StatusProgress />}
      />
    </div>
  );
}

BigSnackbar.propTypes = {
  classes: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  loading: PropTypes.bool,
  message: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

export default withStyles(styles)(BigSnackbar);