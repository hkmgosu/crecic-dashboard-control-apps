import DashboardLayout from '../components/DashboardLayout'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import ZoomCard from '../components/ZoomCard';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Fade from '@material-ui/core/Fade';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 6,
    paddingBottom: theme.spacing.unit * 2,
  },
});

function Index(props) {
  const { classes } = props;

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
    </DashboardLayout>
  );
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Index);