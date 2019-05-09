import DashboardLayout from '../components/DashboardLayout'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import ZoomCard from '../components/ZoomCard';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import Snackbar from '@material-ui/core/Snackbar';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 6,
    paddingBottom: theme.spacing.unit * 2,
  },
});

function Index(props) {
  const { classes } = props;
  const [state, setState] = React.useState({
    openSnackbar: false,
    messageSnackbar: '',
    loading: false,
    serverOnline: false,
    apiOnline: false
  })

  const handleCloseSnackbar = (openSnackbar = false) => {
    setState({ ...state, openSnackbar })
  }

  const validateServerOnline = async () => {
        setState({ ...state, messageSnackbar: 'Verificando Servidor...'})
        console.log("verificando server")
        const serverOnline = await fetch('https://jsonplaceholder.typicode.com');
        const resServerOnline = await serverOnline;
        console.log("antes promise", serverOnline);
        return new Promise( (resolve) => {
          setTimeout(() => {
              console.log('resServer', resServerOnline);
              console.log("resServer END");
              resolve(resServerOnline);

          }, 2000)
        })
  }

  // const validateApiOnline = () => {
  //   setState({ ...state, messageSnackbar: 'Verificando Aplicación...'})
  //   console.log("verificando App")
  //   const appOnline = fetch('https://jsonplaceholder.typicode.com/posts/42');
  //   const resAppOnline = appOnline;
  //   return new Promise( (resolve) => {
  //     setTimeout(() => {
  //         console.log('resApp', resAppOnline);
  //         console.log("resApp END");
  //         resolve(resAppOnline);
  //     }, 2000)
  //   })
  // }

  const getSystemStatus = async () => {
    try{
      console.log("try init");
      setState({ ...state, loading: true, openSnackbar: true, messageSnackbar: 'Conectando...' });
      await validateServerOnline();
      // validateApiOnline();
      console.log("conectado");
    }catch(err){
      console.log("error", err);
      setState({ ...state, loading: false, openSnackbar: true, messageSnackbar: 'Error al tratar de conectarse al sistema, intente nuevamente.' })
      return;
    }
  }

  return (
    <DashboardLayout>
      <Grid className={classes.root} elevation={1}>
        <Grid
          container
          spacing={16}
          direction="row"
          justify="center"
          alignItems="flex-start"
        >
          <Grid item xs={12}>
            <Fade in={true}>
              <Typography variant="h4" align="center" gutterBottom>
                Bienvenido, porfavor seleccione un sistema
              </Typography>
            </Fade>
          </Grid>
          <Grid item>
            <ZoomCard
              cardActionAreaOnClick={(getSystemStatus)}
              avatarLetter="C" 
              title="Contratos" 
              subheader="v1.0"
              description="Sistema de gestión de contratos para proveedores de Crecic S.A." 
              image="/static/contratos.png" 
              transitionDelay="500ms" />
          </Grid>
          <Grid item>
            <ZoomCard 
              avatarLetter="S" 
              title="Sistema S"
              subheader="v1.2" 
              description="Sistema de gestión de x para proveedores de Crecic S.A."
              image="/static/sistema-1.jpg"
              transitionDelay="1500ms" />
          </Grid>
          <Grid item>
            <ZoomCard
              avatarLetter="L"
              title="Sistema L"
              subheader="v1.1"
              description="Sistema de gestión de y para proveedores de Crecic S.A."
              image="/static/sistema-2.jpg"
              transitionDelay="2500ms" />
          </Grid>
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={state.openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{state.messageSnackbar}</span>}
        // action={[
        //   <Button key="undo" color="secondary" size="small" onClick={handleClose}>
        //     UNDO
        //   </Button>,
        //   <IconButton
        //     key="close"
        //     aria-label="Close"
        //     color="inherit"
        //     className={classes.close}
        //     onClick={handleClose}
        //   >
        //     <CloseIcon />
        //   </IconButton>,
        // ]}
      />
    </DashboardLayout>
  );
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Index);