import DashboardLayout from '../components/DashboardLayout'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles';
import ZoomCard from '../components/ZoomCard';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 8,
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
          <Grid item>
            <ZoomCard avatarLetter="C" title="Contratos" description="Sistema de gestión de contratos para proveedores de Crecic S.A." image="/static/contratos.png" transitionDelay="1000ms" />
          </Grid>
          <Grid item>
            <ZoomCard avatarLetter="S" title="Sistema S" description="Sistema de gestión de x para proveedores de Crecic S.A." image="/static/sistema-1.jpg" transitionDelay="2000ms" />
          </Grid>
          <Grid item>
            <ZoomCard avatarLetter="L" title="Sistema L" description="Sistema de gestión de y para proveedores de Crecic S.A." image="/static/sistema-2.jpg" transitionDelay="3000ms" />
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