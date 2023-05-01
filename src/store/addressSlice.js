import { createSlice } from '@reduxjs/toolkit';
import { getFirestore, collection, query, where, getDocs, addDoc, doc, deleteDoc, updateDoc } from 'firebase/firestore';

const firestore = getFirestore();

const initialState = {
  addresses: [],
  loading: false,
  error: null,
};

const addressSlice = createSlice({
  name: 'address',
  initialState,
  reducers: {
    setAddressLoading: (state) => {
      state.loading = true;
    },
    setAddressSuccess: (state, action) => {
      state.addresses = action.payload;
      state.loading = false;
    },
    setAddressError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    addAddress: (state, action) => {
      state.addresses.push(action.payload);
    },
    updateAddress: (state, action) => {
      const index = state.addresses.findIndex((address) => address.id === action.payload.id);
      if (index !== -1) {
        state.addresses[index] = action.payload;
      }
    },
    deleteAddress: (state, action) => {
      state.addresses = state.addresses.filter((address) => address.id !== action.payload);
    },
  },
});

export const {
  setAddressLoading,
  setAddressSuccess,
  setAddressError,
  addAddress,
  updateAddress,
  deleteAddress,
} = addressSlice.actions;

export const fetchAddresses = (userId) => async (dispatch) => {
  dispatch(setAddressLoading());

  try {
    const addressRef = collection(firestore, 'addresses');
    const userAddressQuery = query(addressRef, where('userId', '==', userId));
    const snapshot = await getDocs(userAddressQuery);
    const addresses = [];

    snapshot.forEach((doc) => {
      addresses.push({ id: doc.id, ...doc.data() });
    });

    dispatch(setAddressSuccess(addresses));
  } catch (error) {
    dispatch(setAddressError(error.message));
  }
};

export const saveAddress = (newAddress) => async (dispatch) => {
  try {
    const addressRef = collection(firestore, 'addresses');
    const docRef = await addDoc(addressRef, newAddress);
    dispatch(addressSlice.actions.addAddress({ id: docRef.id, ...newAddress }));
  } catch (error) {
    console.error('Error adding address:', error);
  }
};

export const editAddress = (updatedAddress) => async (dispatch) => {
  try {
    const { id, ...data } = updatedAddress;
    const docRef = doc(firestore, 'addresses', id);
    await updateDoc(docRef, data);
    dispatch(addressSlice.actions.updateAddress(updatedAddress));
  } catch (error) {
    console.error('Error updating address:', error);
  }
};

export const removeAddress = (id) => async (dispatch) => {
  try {
    const docRef = doc(firestore, 'addresses', id);
    await deleteDoc(docRef);
    dispatch(addressSlice.actions.deleteAddress(id));
  } catch (error) {
    console.error('Error deleting address:', error);
  }
};

export default addressSlice.reducer;
