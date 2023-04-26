import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import {
  Avatar,
  Typography,
  Container,
  Button,
  TextField,
  Box,
  CircularProgress,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const useStyles = makeStyles({
  avatarContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 150,
    height: 150,
  },
});

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);
  const [previewAvatar, setPreviewAvatar] = useState(null);
  const classes = useStyles();
  const auth = getAuth();
  const user = auth.currentUser;
  const storage = getStorage();

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const userDocRef = doc(collection(db, 'users'), user.uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          setUserData(userDocSnap.data());
          setPhone(userDocSnap.data().phone);
          setAddress(userDocSnap.data().address);
        } else {
          console.error('User document not found');
        }
      }
    };

    fetchData();
  }, [user]);

  const handleAvatarPreview = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setPreviewAvatar(e.target.result);
      reader.readAsDataURL(file);
    }
    setAvatarFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (avatarFile) {
      const avatarRef = ref(storage, `avatars/${user.uid}`);
      await uploadBytes(avatarRef, avatarFile);
      const avatarURL = await getDownloadURL(avatarRef);
      userData.avatarURL = avatarURL;
      setPreviewAvatar(null);
    }

    userData.phone = phone;
    userData.address = address;

    try {
      const userDocRef = doc(collection(db, 'users'), user.uid);
      await updateDoc(userDocRef, userData);
      setUserData({ ...userData });
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      {userData && (
        <>
          <Box className={classes.avatarContainer}>
            <Avatar
              className={classes.avatar}
              src={previewAvatar || userData.avatarURL}
            >
              {previewAvatar || userData.avatarURL ? '' : userData.name[0]}
            </Avatar>
          </Box>
          <Typography variant="h4">{userData.name}</Typography>
          <Typography variant="h6">{user.email}</Typography>
          <form onSubmit={handleSubmit}>
            <Box mt={2}>
              <Button component="label" variant="contained">
                Cambiar avatar
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleAvatarPreview}
                />
                  </Button>
                </Box>
                <TextField
                  label="Teléfono"
                  variant="outlined"
                  fullWidth
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  sx={{ mt: 1 }}
                />
                <TextField
                  label="Dirección"
                  variant="outlined"
                  fullWidth
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  sx={{ mt: 1 }}
                />
                <Box display="flex" justifyContent="center" mt={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading}
                  >
                    {loading ? (
                      <CircularProgress size={24} />
                    ) : (
                      'Actualizar perfil'
                    )}
                  </Button>
                </Box>
              </form>
            </>
          )}
        </Container>
      );
    };
    
    export default UserProfile;
