import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Zoom from '@material-ui/core/Zoom';
import blue from '@material-ui/core/colors/blue';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const styles = theme => ({
  card: {
    maxWidth: 400,
    minHeight: 300
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  avatar: {
    backgroundColor: blue[500],
  },
  content: {
      minHeight: 81
  }
});

const ZoomCard = (props) => {
  const { classes, avatarLetter, image, title, description, transitionDelay } = props;

  console.log("props", props);

  return (
    <Zoom in={true} style={{ transitionDelay }}>
        <Card className={classes.card}>
        <CardHeader
            avatar={
            <Avatar aria-label={title} className={classes.avatar}>
                {avatarLetter}
            </Avatar>
            }
            action={
            <IconButton>
                <MoreVertIcon />
            </IconButton>
            }
            title={title}
        />
        <CardActionArea>
            <CardMedia
                className={classes.media}
                image={image}
                title={title}
            />
            <CardContent className={classes.content}>
                <Typography component="p">
                {description}
                </Typography>
            </CardContent>
        </CardActionArea>
        </Card>
    </Zoom>
    
  );
}

ZoomCard.propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    avatarLetter: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    transitionDelay: PropTypes.string.isRequired
  };

export default withStyles(styles)(ZoomCard);