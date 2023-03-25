import React, { useState } from 'react';
import { Alert, Button, View } from 'react-native';

const DeleteDialog = ({showAlert, handleCancel, deleteHandler}) => {
  return (
  
        <Alert 
            visible={showAlert}
            title="Delete Plant"
            message="Are you sure you want to delete ?"
            buttons={
                [
                    {
                        text: 'Cancel',
                        onPress: handleCancel,
                        style: 'cancel',
                      },
                      { text: 'OK', onPress: deleteHandler }, 
                ]
            }
        
        />
   
  )
}

export default DeleteDialog;
