import DashboardLayout from '../components/DashboardLayout'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import ZoomCard from '../components/ZoomCard';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';
import BigSnackbar from '../components/BigSnackbar';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 6,
    paddingBottom: theme.spacing.unit * 2,
  }
});

function Index(props) {
  const { classes } = props;
  const [state, setState] = React.useState({
    openSnackbar: false,
    messageSnackbar: '',
    loading: false,
    loadingCard: false,
    snackbarVariant: 'info',
  })

  const handleLoading = (appStatus) => {
    setState({ ...state, ...appStatus });
  }

  const handleSystemConnection = async ({ message = '', loading = true, type = 'info' }) => {
    console.log("handleSystemConnection: ", message);
    handleLoading({
      openSnackbar: true, 
      messageSnackbar: message,
      loading, 
      loadingCard: true, 
      snackbarVariant: type
    });
    return new Promise ( (resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 1300)
    });
  }

  const validateServiceOnline = async (url) => {
        const serverOnline = await fetch(url);
        const resServerOnline = await serverOnline;
        return new Promise( (resolve) => {
          setTimeout(() => {
              resolve(resServerOnline);
          }, 600)
        })
  }

  const getSystemStatus = async () => {
    try{
      console.log("init: getSystemStatus");

      // verificando servidor
      await handleSystemConnection({ message: "Conectando a servidor", type: 'info'});
      await handleSystemConnection({ message: "Verificando servidor", type: 'info' });
      let serviceOnlineStatus = await validateServiceOnline("https://jsonplaceholder.typicode.com");
      if(serviceOnlineStatus.ok){
        console.log("servidor online");
        await handleSystemConnection({ message: "Servidor ONLINE", loading: false, type: 'success'});
      }else{
        await handleSystemConnection({ message: "No se ha podido conectar al servidor.", loading: false, type: 'error'});
        throw new Error("No se ha podido conectar al servidor.");
      }

      // verificando APP
      await handleSystemConnection({ message: "Conectando con el software", type: 'info' });
      await handleSystemConnection({ message: "Verificando software", type: 'info'})
      serviceOnlineStatus = await validateServiceOnline("https://jsonplaceholder.typicode.com/posts/42");
      if(serviceOnlineStatus.ok){
        console.log("APP online");
        await handleSystemConnection({ message: "Software ONLINE", loading: false, type: 'success' });
        await handleSystemConnection({ message: "Ingresando...", loading: true, type: 'success'});
        window.location.assign("http://www.w3schools.com")
      }else{
        await handleSystemConnection({ message: "No se ha podido conectar al Software.", loading: false, type: 'error'});
        throw new Error("No se ha podido conectar al Software.");
        // send alert
      }
    }catch(err){
      console.error("error", err);
      await handleSystemConnection({ message: "Error al conectar, intente nuevamente.", loading: false, type: 'error'});
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
              loading={state.loadingCard}
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
      <BigSnackbar 
        open={state.openSnackbar}
        message={state.messageSnackbar}
        loading={state.loading} 
        variant={state.snackbarVariant}
        />
    </DashboardLayout>
  );
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Index);