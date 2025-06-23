import React, { useState } from 'react';
import {
  Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, IconButton, Chip
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Add as AddIcon, CheckCircle as CheckCircleIcon } from '@mui/icons-material';

const mockMenuItems = [
  { id: 1, name: 'Margherita Pizza', category: 'Pizza', price: 8.99, status: 'Active' },
  { id: 2, name: 'Spicy Chicken Pasta', category: 'Pasta', price: 10.99, status: 'Active' },
  { id: 3, name: 'Caesar Salad', category: 'Salad', price: 6.99, status: 'Inactive' },
];

const categories = ['Pizza', 'Pasta', 'Salad', 'Drinks', 'Dessert'];
const statuses = ['Active', 'Inactive'];

const MenuItems = () => {
  const [items, setItems] = useState(mockMenuItems);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: '', category: '', price: '', status: 'Active' });
  const [editId, setEditId] = useState(null);

  const handleOpen = (item) => {
    if (item) {
      setForm(item);
      setEditId(item.id);
    } else {
      setForm({ name: '', category: '', price: '', status: 'Active' });
      setEditId(null);
    }
    setOpen(true);
  };
  const handleClose = () => setOpen(false);
  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSave = () => {
    if (!form.name || !form.category || !form.price) return;
    if (editId) {
      setItems(items.map(i => i.id === editId ? { ...form, id: editId } : i));
    } else {
      setItems([...items, { ...form, id: Date.now() }]);
    }
    setOpen(false);
  };
  const handleDelete = (id) => setItems(items.filter(i => i.id !== id));
  const handleMarkComplete = (id) => {
    setItems(items.map(i => i.id === id ? { ...i, status: 'Completed' } : i));
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Menu Items</Typography>
      <Button variant="contained" startIcon={<AddIcon />} sx={{ mb: 2 }} onClick={() => handleOpen()}>Add Menu Item</Button>
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map(item => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>₹{Number(item.price || 0).toFixed(2)}</TableCell>
                  <TableCell>
                    <Chip
                      label={item.status}
                      color={item.status === 'Active' ? 'success' : 'default'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleOpen(item)}><EditIcon /></IconButton>
                    <IconButton onClick={() => handleDelete(item.id)} color="error"><DeleteIcon /></IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{editId ? 'Edit Menu Item' : 'Add Menu Item'}</DialogTitle>
        <DialogContent>
          <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth sx={{ mb: 2 }} />
          <TextField select label="Category" name="category" value={form.category} onChange={handleChange} fullWidth sx={{ mb: 2 }}>
            {categories.map(cat => <MenuItem key={cat} value={cat}>{cat}</MenuItem>)}
          </TextField>
          <TextField label="Price" name="price" value={form.price} onChange={handleChange} type="number" fullWidth sx={{ mb: 2 }} />
          <TextField select label="Status" name="status" value={form.status} onChange={handleChange} fullWidth>
            {statuses.map(st => <MenuItem key={st} value={st}>{st}</MenuItem>)}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MenuItems; 