import DashboardLayout from "../components/DashboardLayout";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import ZoomCard from "../components/ZoomCard";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Fade from "@material-ui/core/Fade";
import BigSnackbar from "../components/BigSnackbar";
import fetch from "isomorphic-unfetch";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 9,
    paddingBottom: theme.spacing.unit * 3
  }
});

function Index(props) {
  const { classes } = props;
  const [state, setState] = React.useState({
    openSnackbar: false,
    messageSnackbar: "",
    loading: false,
    loadingCard: false,
    snackbarVariant: "info"
  });

  const handleLoading = appStatus => {
    setState({
      ...state,
      ...appStatus
    });
  };

  const handleSystemConnection = async ({
    message = "",
    loading = true,
    type = "info",
    loadingCard = true
  }) =>
    await handleLoading({
      openSnackbar: true,
      messageSnackbar: message,
      loading,
      loadingCard,
      snackbarVariant: type
    });

  const validateServiceOnline = async url => {
    const serverOnline = await fetch(url);
    const resServerOnline = await serverOnline;
    return resServerOnline;
  };

  const getSystemStatus = async system => {
    try {
      console.info("init: getSystemStatus: ", system);

      const systemRoutes = {
        contratos: {
          title: "Contratos",
          server: "https://jsonplaceholder.typicode.com",
          api: "https://jsonplaceholder.typicode.com"
        },
        sistema2: {
          title: "Sistema S2",
          server: "http://www.localhost:4001",
          api: "http://www.localhost:4001/api"
        }
      };

      // verificando servidor
      await handleSystemConnection({
        message: "Conectando a servidor...",
        loadingCard: system,
        type: "info"
      });

      // pause and validate
      await new Promise(resolve => {
        setTimeout(resolve, 900);
      });

      // validar service
      let serviceOnlineStatus = await validateServiceOnline(
        systemRoutes[system].server
      );
      if (serviceOnlineStatus.ok) {
        await handleSystemConnection({
          message: "Servidor ONLINE",
          loading: false,
          loadingCard: system,
          type: "success"
        });
      } else {
        await handleSystemConnection({
          message: "No se ha podido conectar al servidor.",
          loading: false,
          loadingCard: false,
          type: "error"
        });
      }

      // pause
      await new Promise(resolve => {
        setTimeout(resolve, 600);
      });
      // verificando APP
      await handleSystemConnection({
        message: `Conectando con al sistema ${systemRoutes[system].title}...`,
        loadingCard: system,
        type: "info"
      });
      // pause
      await new Promise(resolve => {
        setTimeout(resolve, 900);
      });

      // validar api
      serviceOnlineStatus = await validateServiceOnline(
        systemRoutes[system].api
      );
      if (serviceOnlineStatus.ok) {
        await handleSystemConnection({
          message: `${systemRoutes[system].title} ONLINE`,
          loadingCard: system,
          loading: false,
          type: "success"
        });
        // pause
        await new Promise(resolve => {
          setTimeout(resolve, 600);
        });
        await handleSystemConnection({
          message: "Ingresando...",
          loadingCard: system,
          loading: true,
          type: "success"
        });
        window.location.assign(systemRoutes[system].server);
      } else {
        await handleSystemConnection({
          message: "No se ha podido conectar al Software.",
          loading: false,
          loadingCard: false,
          type: "error"
        });
        // send alert
      }
    } catch (err) {
      console.error("error", err);
      await handleSystemConnection({
        message: "Error al conectar, intente nuevamente.",
        loading: false,
        loadingCard: false,
        type: "error"
      });
    }
  };

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
          <Grid item xs={12} style={{ margin: 12 }}>
            <Fade in={true}>
              <Typography variant="h4" align="center" gutterBottom>
                Bienvenido, porfavor seleccione un sistema
              </Typography>
            </Fade>
          </Grid>
          <Grid item>
            <ZoomCard
              cardActionAreaOnClick={() => getSystemStatus("contratos")}
              loading={state.loadingCard === "contratos"}
              avatarLetter="C"
              title="Contratos"
              subheader="v1.0"
              description="Sistema de gestión de contratos para proveedores de Crecic S.A."
              image="/static/contratos.png"
              transitionDelay="500ms"
            />
          </Grid>
          <Grid item>
            <ZoomCard
              cardActionAreaOnClick={() => getSystemStatus("sistema2")}
              loading={state.loadingCard === "sistema2"}
              avatarLetter="S"
              title="Sistema S"
              subheader="v1.2"
              description="Sistema de gestión de x para proveedores de Crecic S.A."
              image="/static/sistema-1.jpg"
              transitionDelay="1500ms"
            />
          </Grid>
          <Grid item>
            <ZoomCard
              avatarLetter="L"
              title="Sistema L"
              subheader="v1.1"
              description="Sistema de gestión de y para proveedores de Crecic S.A."
              image="/static/sistema-2.jpg"
              transitionDelay="2500ms"
            />
          </Grid>
        </Grid>
      </Grid>
      <BigSnackbar
        open={state.openSnackbar}
        message={state.messageSnackbar}
        loading={state.loading}
        variant={state.snackbarVariant}
        handleClose={() =>
          setState({
            ...state,
            openSnackbar: false,
            loading: false,
            loadingCard: false
          })
        }
      />
    </DashboardLayout>
  );
}

Index.getInitialProps = async function() {
  // 1-  Token Validation or other request here -------------------------

  // const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
  // const data = await res.json()

  // console.log(`Show data fetched. Count: ${data.length}`)

  return {
    user: {
      name: "Erick Quiroz",
      rol: "admin"
    }
  };
};

Index.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Index);
