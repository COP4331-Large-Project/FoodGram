import * as React from "react";
import CardActionArea from "@mui/material/CardActionArea";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Button from "@mui/material/Button";
import { DeleteOutline, Favorite, FavoriteBorder, } from "@mui/icons-material";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  Typography,
  IconButton,
} from "@mui/material";

interface Props {
  image: string;
  title: string;
  description: string;
}

export default function RecipeCard(props) {
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
            {props.recipe}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{ color: "primary" }} />} />
        <Button size="small">
          View
        </Button>
        {/* <IconButton onClick={() => console.log('delete', title)}>
          <DeleteOutline />
        </IconButton> */}
      </CardActions>
    </Card>
  );
}
