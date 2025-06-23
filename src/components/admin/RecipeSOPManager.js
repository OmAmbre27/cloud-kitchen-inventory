import React, { useState } from 'react';
import {
  Box,
  Typography,
  MenuItem,
  TextField,
  Button,
  Paper,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from '@mui/material';
import { CloudKitchenDB } from '../../data';
import toast from 'react-hot-toast';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { fetchSOPsFromGoogleSheet } from '../../services/sopSheetService';

const emptySOP = { steps: [], ingredients: [], notes: '' };

const RecipeSOPManager = () => {
  const [menuItemId, setMenuItemId] = useState('');
  const [sop, setSop] = useState(emptySOP);
  const [stepInput, setStepInput] = useState('');
  const [ingredientInput, setIngredientInput] = useState({ name: '', quantity: '', unit: '' });
  const [editing, setEditing] = useState(false);
  const [pdfFile, setPdfFile] = useState(null);
  const [sheetSOPs, setSheetSOPs] = useState([]);

  const menuItems = CloudKitchenDB.menuItems;
  const units = CloudKitchenDB.units;

  const handleMenuItemChange = (e) => {
    const id = Number(e.target.value);
    setMenuItemId(id);
    const item = menuItems.find(m => m.id === id);
    setSop(item?.sop ? { ...item.sop } : emptySOP);
    setPdfFile(item?.sopPdf || null);
    setEditing(true);
  };

  const handleStepAdd = () => {
    if (stepInput.trim()) {
      setSop(prev => ({ ...prev, steps: [...prev.steps, stepInput.trim()] }));
      setStepInput('');
    }
  };

  const handleStepDelete = (idx) => {
    setSop(prev => ({ ...prev, steps: prev.steps.filter((_, i) => i !== idx) }));
  };

  const handleIngredientAdd = () => {
    if (ingredientInput.name && ingredientInput.quantity && ingredientInput.unit) {
      setSop(prev => ({ ...prev, ingredients: [...prev.ingredients, { ...ingredientInput }] }));
      setIngredientInput({ name: '', quantity: '', unit: '' });
    }
  };

  const handleIngredientDelete = (idx) => {
    setSop(prev => ({ ...prev, ingredients: prev.ingredients.filter((_, i) => i !== idx) }));
  };

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
    } else {
      toast.error('Please upload a valid PDF file.');
    }
  };

  const handleRemovePdf = () => {
    setPdfFile(null);
  };

  const handleSave = () => {
    if (!menuItemId) return toast.error('Select a menu item');
    const item = menuItems.find(m => m.id === menuItemId);
    if (!item) return toast.error('Menu item not found');
    item.sop = { ...sop };
    toast.success('Recipe SOP saved!');
    setEditing(false);
  };

  const handleImportFromSheet = async () => {
    const sops = await fetchSOPsFromGoogleSheet();
    setSheetSOPs(sops);
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Manage Recipe SOPs
      </Typography>
      <Paper sx={{ p: 3, maxWidth: 800 }}>
        <TextField
          select
          label="Select Menu Item"
          value={menuItemId}
          onChange={handleMenuItemChange}
          fullWidth
          sx={{ mb: 3 }}
        >
          <MenuItem value="">-- Select --</MenuItem>
          {menuItems.map(item => (
            <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
          ))}
        </TextField>
        {editing && (
          <>
            <Typography variant="h6" sx={{ mt: 2 }}>Steps</Typography>
            <Grid container spacing={1} alignItems="center">
              <Grid item xs={10} sm={11}>
                <TextField
                  label="Add Step"
                  value={stepInput}
                  onChange={e => setStepInput(e.target.value)}
                  fullWidth
                  onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleStepAdd(); } }}
                />
              </Grid>
              <Grid item xs={2} sm={1}>
                <IconButton color="primary" onClick={handleStepAdd}><AddIcon /></IconButton>
              </Grid>
            </Grid>
            <List dense>
              {sop.steps.map((step, idx) => (
                <ListItem key={idx}>
                  <ListItemText primary={`Step ${idx + 1}: ${step}`} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={() => handleStepDelete(idx)}><DeleteIcon /></IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
            <Typography variant="h6" sx={{ mt: 2 }}>Ingredients</Typography>
            <Grid container spacing={1} alignItems="center">
              <Grid item xs={4}>
                <TextField
                  label="Ingredient Name"
                  value={ingredientInput.name}
                  onChange={e => setIngredientInput(i => ({ ...i, name: e.target.value }))}
                  fullWidth
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  label="Quantity"
                  value={ingredientInput.quantity}
                  onChange={e => setIngredientInput(i => ({ ...i, quantity: e.target.value }))}
                  type="number"
                  fullWidth
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  select
                  label="Unit"
                  value={ingredientInput.unit}
                  onChange={e => setIngredientInput(i => ({ ...i, unit: e.target.value }))}
                  fullWidth
                >
                  {units.map(u => (
                    <MenuItem key={u.id} value={u.name}>{u.name}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={2}>
                <IconButton color="primary" onClick={handleIngredientAdd}><AddIcon /></IconButton>
              </Grid>
            </Grid>
            <List dense>
              {sop.ingredients.map((ing, idx) => (
                <ListItem key={idx}>
                  <ListItemText primary={`${ing.name} - ${ing.quantity} ${ing.unit}`} />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" onClick={() => handleIngredientDelete(idx)}><DeleteIcon /></IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
            <Typography variant="h6" sx={{ mt: 2 }}>Notes</Typography>
            <TextField
              label="Notes"
              value={sop.notes}
              onChange={e => setSop(prev => ({ ...prev, notes: e.target.value }))}
              fullWidth
              multiline
              minRows={2}
              sx={{ mb: 2 }}
            />
            <Typography variant="h6" sx={{ mt: 2 }}>SOP PDF (optional)</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Button variant="outlined" component="label" startIcon={<InsertDriveFileIcon />}>
                {pdfFile ? 'Replace PDF' : 'Upload PDF'}
                <input type="file" accept="application/pdf" hidden onChange={handlePdfChange} />
              </Button>
              {pdfFile && (
                <>
                  <Typography variant="body2">{pdfFile.name || 'SOP.pdf'}</Typography>
                  <Button size="small" color="error" onClick={handleRemovePdf}>Remove</Button>
                  <Button size="small" color="primary" href={URL.createObjectURL(pdfFile)} target="_blank">View</Button>
                </>
              )}
            </Box>
            <Button variant="contained" color="primary" onClick={handleSave}>Save SOP</Button>
          </>
        )}
        <Button variant="outlined" onClick={handleImportFromSheet} sx={{ mb: 2 }}>
          Import SOPs from Google Sheet
        </Button>
        {sheetSOPs.length > 0 && (
          <Paper sx={{ mt: 2, p: 2 }}>
            <Typography variant="h6">Imported SOPs</Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    {Object.keys(sheetSOPs[0]).map((col) => (
                      <TableCell key={col}>{col}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sheetSOPs.map((row, idx) => (
                    <TableRow key={idx}>
                      {Object.values(row).map((val, i) => (
                        <TableCell key={i}>{val}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}
      </Paper>
    </Box>
  );
};

export default RecipeSOPManager; 