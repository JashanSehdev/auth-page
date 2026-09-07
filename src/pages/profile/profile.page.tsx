import {Box, Button, Typography } from "@mui/material";
import styles from "./profile.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const Profile = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <Box>
      <Box className={styles.container}>
        <Box className={styles.image_container}>
            <Box
            component="img"
            src={
              "https://imgs.search.brave.com/kMkkKMABwmU94hZaqUp88dSD0hyFJ1scssFYOFhiNAE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9waG90/b3N3ZWVrLmluL3dw/LWNvbnRlbnQvdXBs/b2Fkcy9BZXN0aGV0/aWMtR2lybC1QaWMt/Mi5qcGc"
            }
            className={styles.profile_image}
          />
          <Button>Change Profile Pic</Button>

        </Box>
        <Box className = {styles.details}>
        <Typography>NAME: {user?.name}</Typography>
        <Typography>EMAIL: {user?.email}</Typography>
        <Button>Edit Profile</Button>
        </Box>
        

      </Box>
    </Box>
  );
};

export default Profile;
