import * as React from "react";
import CardActionArea from "@mui/material/CardActionArea";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Button from "@mui/material/Button";
import { Favorite, FavoriteBorder, MoreVert, Share } from "@mui/icons-material";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  Typography,
} from "@mui/material";

interface Props {
  image: string;
  title: string;
  description: string;
}

export default function RecipeCard({ image, title, description }: Props) {
  return (
    <Card sx={{ maxWidth: 300 }}>
      <CardActionArea>
        <CardMedia component="img" height="140" image={image} />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions disableSpacing>
        <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{ color: "primary" }} />} />
        <Button size="small" color="primary">
          View
        </Button>
      </CardActions>
    </Card>
  );
}
