import * as React from "react";
import CardActionArea from "@mui/material/CardActionArea";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Button from "@mui/material/Button";
import { DeleteOutline, Favorite, FavoriteBorder } from "@mui/icons-material";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Checkbox,
  Typography,
} from "@mui/material";
import { Expand } from "@mui/icons-material";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Collapse from "@mui/material/Collapse";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ModeEditOutlineOutlined from '@mui/icons-material/ModeEditOutlineOutlined';

interface Props {
  image: string;
  title: string;
  category: string;
  description: string;
  ingredients: string;
  instructions: string;
}

// Expand more actions
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

// End of expand more actions

export default function RecipeCard(props) {

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  
  return (
    <Card
      variant="outlined"
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        borderRadius: "20px",
        borderColor: "seondary.main",
        // backgroundColor: "primary.light",
        maxWidth: "100%",
        transition: "all 0.3s ease", //speed of transition 0.3s acelleration/decelation
        ":hover": { background: "#fce4ec" },
      }}
    >
      <CardActionArea>
        <CardMedia component="img" height="140" image={props.imagePath} />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            {props.name}
          </Typography>
          <Typography gutterBottom variant="body2" component="p">
            Category: {props.category}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{ color: "primary" }} />} />
        <IconButton>
          <ModeEditOutlineOutlined />
        </IconButton>
        <IconButton>
          <DeleteOutline />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
        {/* <IconButton onClick={() => console.log('delete', title)}>
          <DeleteOutline />
        </IconButton> */}
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Ingredients:</Typography>
          <Typography paragraph>
            {props.ingredients}
          </Typography>
          <Typography paragraph>Instructions:</Typography>
          <Typography paragraph>
            {props.instructions}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
