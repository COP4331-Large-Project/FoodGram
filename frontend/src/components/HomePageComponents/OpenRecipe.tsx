import {
    Avatar,
    Button,
    ButtonGroup,
    Fab,
    Stack,
    Modal,
    styled,
    TextField,
    Tooltip,
    Typography,
    IconButton,
  } from "@mui/material";
  import React, { useState } from "react";
  import { Add as AddIcon } from "@mui/icons-material";
  import { Box } from "@mui/system";
  import { Container } from "@mui/material";
  import axios from "axios";
  import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
  
  const StyledModal = styled(Modal)({
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
      value: "Breakfast",
      label: "Breakfast",
    },
    {
      value: "Lunch",
      label: "Lunch",
    },
    {
      value: "Dinner",
      label: "Dinner",
    },
  ];
  
  var myBoolean = false;
  
  const OpenRecipe = (props, props1) => {
  
    const [state, setState] = useState(false)  
  
  
    var _ud = localStorage.getItem("user_data");
    var ud = JSON.parse(_ud);
    var userID = ud.id;
    var postID = props._id;
    var Category;
  
    //For file upload
    const [file, setFile] = useState();
    const [name, setName] = useState();
    const [instructions, setInstructions] = useState();
    const [ingredients, setIngredients] = useState();
    //For dropdown category
    const [category, setCategory] = React.useState("");
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setCategory(event.target.value);
    };
    //For errors
    const [errorValidation, setErrorValidation] = useState("");
    const [message, setMessage] = useState("");
  
    const [open, setOpen] = useState(false);
  
    function handleChangeImage(event) {
      setFile(event.target.files[0]);
    }
    function handleChangeName(event) {
      setName(event.target.value);
    }
  
    function handleChangeInstructions(event) {
      setInstructions(event.target.value);
    }
    function handleChangeIngredients(event) {
      setIngredients(event.target.value);
    }
  
    const handleClose = () => {
      setOpen(false);
    };
  
    let bp = require("../Path.js");
  
    const loadRecipe = async (event) => {
      event.preventDefault();
  
      setName(props.name);
      setInstructions(props.instructions);
      setIngredients(props.ingredients);
      setCategory(props.category);
    }
  
    console.log("PROPS in MODAL", props);
  
    return (
      <>
        <StyledModal
          open={props.show}
          onClose={props.close}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box component="div" sx={{ backgroundColor: "white", borderRadius: "20px" }}>
            <br></br>
            {/* <Box display="flex" flexGrow={2}>
              <IconButton>
                <CloseOutlinedIcon onClick={props.close} />
              </IconButton>
            </Box> */}
            <Container
              id="BACKGROUND"
              maxWidth="md"
              sx={{
                // backgroundColor: "pink",
                p: "0px",
                minHeight: "50vh",
                minWidth: "60vh",
                display: "flex",
                flexDirection: "column",
                // alignItems: "center",
                justifyContent: "start",
                width: "auto",
                maxHeight: "100vh",
                overflowY: "auto",
              }}
            >
              <Box
                component="div"
                sx={{
                  // backgroundColor: "blue",
                  // gap: "10px",
                  // m: "10px",
                  display: "flex",
                  width: "100%",
                  justifyContent: "right",
                }}
              >
                <IconButton>
                  <CloseOutlinedIcon onClick={props.close} />
                </IconButton>
              </Box>
              <Box
                component="div"
                sx={{
                  // backgroundColor: "yellow",
                  gap: "10px",
                  m: "10px",
                  display: "flex",
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <Typography variant="h4" color="secondary.dark" textAlign="center">
                  {props.name}
                </Typography>
              </Box>
              <img className="pictureSizeRecipeCard" src={props.imagePath}></img>
              <Typography
                variant="h6"
                component="h6"
                fontWeight={500}
                sx={{ mr: "5px", fontWeight: "bold" }}
              >
                By: {props.firstName} {props.lastName}
              </Typography>
              <Typography
                variant="h6"
                component="h6"
                fontWeight={500}
                sx={{ mr: "400px", fontWeight: "bold" }}
              >
                Ingredients:
              </Typography>
              <Typography variant="h6" component="h6" fontWeight={500} sx={{ mr: "5px" }}>
                {props.ingredients}
              </Typography>
              <Typography
                variant="h6"
                component="h6"
                fontWeight={500}
                sx={{ mr: "5px", fontWeight: "bold" }}
              >
                Recipe:
              </Typography>
              <Typography variant="h6" component="h6" fontWeight={500} sx={{ mr: "5px" }}>
                {props.instructions}
              </Typography>
              <br></br>
              <br></br>
              <br></br>
            </Container>
          </Box>
        </StyledModal>
      </>
    );
  };
  
  export default OpenRecipe;
  