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

  var _ud = localStorage.getItem("user_data");
  var ud = JSON.parse(_ud);

  var imagePath;
  var recipeName;
  var userID = ud.id;
  var Ingredients;
  var Instructions;
  var Category;
  const [message, setMessage] = useState("");

  let bp = require("../Path.js");

  const doAdd = async (event) => {
    event.preventDefault();

    userID = document.getElementById("lastName")

    var obj = {
      file: imagePath.value,
      name: recipeName.value,
      userId: userID,
      ingredients: Ingredients.value,
      instructions: Instructions.value,
      category: Category.value,
    };
    
    var js = JSON.stringify(obj);
    try {
      const response = await fetch(bp.buildPath("api/upload"), {
        method: "POST",
        body: js,
        headers: { "Content-Type": "application/json" },
      });

      var res = JSON.parse(await response.text());
      console.log(res.name)
        // var user = { firstName: res.firstName, lastName: res.lastName, id: res.id };
        // localStorage.setItem("user_data", JSON.stringify(user));
        setMessage("Successfully added the recipe!");
        // window.location.href = "/login";
    } catch (e) {
      console.log(e.toString());
      return;
    }
  };;

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
              <TextField 
              id="recipeName" 
              className="recipeInput" 
              sx={{ flex: 3 }}
              ref={(c) => (recipeName = c)}
              ></TextField>
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
                    <option key={option.value} value={option.value} ref={(c) => (Category = c)}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </Container>
              <Container disableGutters sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h6" component="h6" fontWeight={500} sx={{ mr: "5px" }}>
                  Image:
                </Typography>
                <div>
                  <input type="file" ref={(c) => (imagePath = c)}/>
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
              <TextField id="recipeIngredients" className="recipeInput" sx={{ flex: 3 }} ref={(c) => (Ingredients = c)}></TextField>
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
                id="recipeInstructions"
                multiline
                rows={4}
                className="recipeInput"
                sx={{ flex: 3 }}
                ref={(c) => (Instructions = c)}
              ></TextField>
            </Box>
            {/* END INSTRUCTIONS BOX */}
            <button onClick={doAdd}>Submit</button>
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
