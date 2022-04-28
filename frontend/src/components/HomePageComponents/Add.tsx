import {
  Avatar,
  Button,
  ButtonGroup,
  Fab,
  Modal,
  Stack,
  styled,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { Add as AddIcon } from "@mui/icons-material";
import { Box } from "@mui/system";
import { Container } from "@mui/material";
import { MenuItem } from "@mui/material";

const SytledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const UserBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  // gap: "10px",
  // marginBottom: "20px",
});

const categories = [
  {
    value: "BREAKFAST",
    label: "Breakfast",
  },
  {
    value: "LUNCH",
    label: "Lunch",
  },
  {
    value: "DINNER",
    label: "Dinner",
  },
];

const Add = () => {
  //For dropdown category
  const [category, setCategory] = React.useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value);
  };

  const [open, setOpen] = useState(false);

  return (
    <>
      <Tooltip
        onClick={(e) => setOpen(true)}
        title="Add Recipe"
        sx={{
          position: "fixed",
          bottom: 80,
          left: { xs: "calc(50% - 25px)", md: 30 },
        }}
      >
        <Fab color="primary" aria-label="add">
          <AddIcon />
        </Fab>
      </Tooltip>

      <SytledModal
        open={open}
        onClose={(e) => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* <Box
          width={400}
          height={280}
          bgcolor={"background.default"}
          color={"text.primary"}
          p={3}
          borderRadius={5}
        >
          <Typography variant="h6" color="secondary.main" textAlign="center">
            Create Recipe
          </Typography>
          <TextField
            sx={{ width: "100%" }}
            id="standard-multiline-static"
            multiline
            rows={3}
            placeholder="What's on your mind?"
            variant="standard"
          />
          <ButtonGroup fullWidth variant="contained" aria-label="outlined primary button group">
            <Button>Save</Button>
            <Button sx={{ width: "100px" }}>
              <DateRange />
            </Button>
          </ButtonGroup>
        </Box> */}

        <Box component="div" sx={{ backgroundColor: "secondary.light", borderRadius: "20px" }}>
          <Container
            id="BACKGROUND"
            maxWidth="md"
            sx={{
              p: "40px",
              minHeight: "60vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "start",
              width: "auto",
            }}
          >
            <Typography variant="h5" color="secondary.dark" textAlign="center">
              Create/Edit Recipe (Add selector to reuse component)
            </Typography>
            {/* {!editing ? (
              <Typography component="h3" variant="h3">
                Create a Recipe
              </Typography>
            ) : (
              <Typography component="h3" variant="h3">
                Editing a Recipe
                <IconButton>
                  <CancelIcon />
                </IconButton>
              </Typography>
            )} */}

            {/* RECIPE NAME BOX */}
            <Box
              component="div"
              sx={{
                backgroundColor: "white",
                p: "6px 10px",
                m: "20px",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                width: "100%",
                justifyContent: "space-around",
              }}
            >
              <Typography
                variant="h6"
                component="h6"
                fontWeight={500}
                sx={{ mr: "2rem", width: "auto", textAlign: "right" }}
              >
                Recipe Name:
              </Typography>
              <TextField id="recipeName" className="recipeInput" sx={{ flex: 3 }}></TextField>
            </Box>
            {/* END OF RECIPE NAME BOX */}

            {/* CATEGORIES BOX */}
            <Box
              sx={{
                backgroundColor: "white",
                p: "6px 10px",
                m: "20px",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                width: "100%",
                justifyContent: "space-around",
              }}
            >
              <Container
                disableGutters
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="h6"
                  component="h6"
                  fontWeight={500}
                  sx={{ mr: "2rem", width: "auto", textAlign: "right" }}
                >
                  Category:
                </Typography>

                <TextField
                  id="categoryDropdown"
                  select
                  value={category}
                  onChange={handleChange}
                  SelectProps={{
                    native: true,
                  }}
                >
                  {categories.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Container>
              <Container disableGutters sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h6" component="h6" fontWeight={500} sx={{ mr: "5px" }}>
                  Imagen:
                </Typography>
                <div>
                  <input type="file"/>
                </div>
                {/* <TextField
                  id="recipeCookTime"
                  className="recipeInput"
                  placeholder="10m"
                  sx={{ width: "10rem" }}
                ></TextField> */}
              </Container>
            </Box>
            {/* END OF CATEGORIES BOX */}

            {/* INGREDIENTS BOX */}
            <Box
              component="div"
              sx={{
                backgroundColor: "white",
                p: "6px 10px",
                m: "20px",
                borderRadius: "20px",
                display: "flex",
                alignItems: "center",
                width: "100%",
                justifyContent: "space-around",
              }}
            >
              <Typography
                variant="h6"
                component="h6"
                fontWeight={500}
                sx={{ mr: "2rem", width: "auto", textAlign: "right" }}
              >
                Ingredients:
              </Typography>
              <TextField id="recipeName" className="recipeInput" sx={{ flex: 3 }}></TextField>
            </Box>
            {/* END INGREDIENTS BOX */}

            {/* INSTRUCTIONS BOX */}
            <Box
              component="div"
              sx={{
                backgroundColor: "white",
                p: "6px 10px",
                m: "20px",
                borderRadius: "20px",
                display: "flex",
                alignItems: "top",
                width: "100%",
                justifyContent: "space-around",
              }}
            >
              <Typography
                variant="h6"
                component="h6"
                fontWeight={500}
                sx={{ mr: "2rem", width: "auto", textAlign: "right" }}
              >
                Instructions:
              </Typography>
              <TextField
                id="recipeName"
                multiline
                rows={4}
                className="recipeInput"
                sx={{ flex: 3 }}
              ></TextField>
            </Box>
            {/* END INSTRUCTIONS BOX */}

            <Button
              fullWidth
              id="createSubmit"
              type="button"
              // onClick={saveRecipe}
              className="Classic"
              sx={{ mt: "1rem" }}
            >
              {/* {!editing ? "Publish Recipe" : "Update Recipe"} */}
            </Button>
          </Container>
        </Box>
      </SytledModal>
    </>
  );
};

export default Add;