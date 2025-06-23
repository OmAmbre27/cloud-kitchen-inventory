import React, { useState } from 'react';
import {
  Box,
  Typography,
  MenuItem,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  TextField,
  Button
} from '@mui/material';
import { CloudKitchenDB } from '../../data';

const RecipeSOPView = () => {
  const [menuItemId, setMenuItemId] = useState('');
  const menuItems = CloudKitchenDB.menuItems;
  const selected = menuItems.find(m => m.id === Number(menuItemId));
  const sop = selected?.sop;

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        View Recipe SOP
      </Typography>
      <Paper sx={{ p: 3, maxWidth: 800 }}>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Select a menu item to view its Standard Operating Procedure.
        </Typography>
        <TextField
          select
          label="Select Menu Item"
          value={menuItemId}
          onChange={e => setMenuItemId(e.target.value)}
          fullWidth
          sx={{ mb: 3 }}
        >
          <MenuItem value="">-- Select --</MenuItem>
          {menuItems.map(item => (
            <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
          ))}
        </TextField>
        {sop && (
          <>
            <Typography variant="h6" sx={{ mt: 2 }}>Steps</Typography>
            <List dense>
              {sop.steps.length === 0 ? (
                <ListItem><ListItemText primary="No steps defined." /></ListItem>
              ) : (
                sop.steps.map((step, idx) => (
                  <ListItem key={idx}>
                    <ListItemText primary={`Step ${idx + 1}: ${step}`} />
                  </ListItem>
                ))
              )}
            </List>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6">Ingredients</Typography>
            <List dense>
              {sop.ingredients.length === 0 ? (
                <ListItem><ListItemText primary="No ingredients defined." /></ListItem>
              ) : (
                sop.ingredients.map((ing, idx) => (
                  <ListItem key={idx}>
                    <ListItemText primary={`${ing.name} - ${ing.quantity} ${ing.unit}`} />
                  </ListItem>
                ))
              )}
            </List>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6">Notes</Typography>
            <Typography variant="body2">{sop.notes || 'No notes.'}</Typography>
            {selected?.sopPdf && (
              <Box sx={{ mt: 2 }}>
                <Button variant="outlined" color="primary" href={URL.createObjectURL(selected.sopPdf)} target="_blank">
                  View SOP PDF
                </Button>
              </Box>
            )}
          </>
        )}
      </Paper>
    </Box>
  );
};

export default RecipeSOPView; 