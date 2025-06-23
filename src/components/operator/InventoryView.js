import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Chip,
  Grid,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  Edit as EditIcon,
  Visibility as ViewIcon,
  Search as SearchIcon
} from '@mui/icons-material';
import toast from 'react-hot-toast';

const InventoryView = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: 'Fresh Tomatoes',
      category: 'Vegetables',
      quantity: 25,
      unit: 'kg',
      price: 2.99,
      supplier: 'Fresh Farm Co.',
      status: 'In Stock',
      location: 'Cold Storage A',
      expiryDate: '2024-01-25',
      minThreshold: 5
    },
    {
      id: 2,
      name: 'Chicken Breast',
      category: 'Meat',
      quantity: 15,
      unit: 'kg',
      price: 8.99,
      supplier: 'Quality Meats Ltd.',
      status: 'In Stock',
      location: 'Freezer B',
      expiryDate: '2024-01-20',
      minThreshold: 8
    },
    {
      id: 3,
      name: 'Basil Leaves',
      category: 'Herbs',
      quantity: 2,
      unit: 'kg',
      price: 12.99,
      supplier: 'Herb Garden',
      status: 'Low Stock',
      location: 'Refrigerator C',
      expiryDate: '2024-01-18',
      minThreshold: 3
    },
    {
      id: 4,
      name: 'Pasta Spaghetti',
      category: 'Dry Goods',
      quantity: 30,
      unit: 'kg',
      price: 3.99,
      supplier: 'Italian Foods Inc.',
      status: 'In Stock',
      location: 'Dry Storage D',
      expiryDate: '2024-12-15',
      minThreshold: 10
    },
    {
      id: 5,
      name: 'Olive Oil',
      category: 'Oils & Sauces',
      quantity: 0,
      unit: 'L',
      price: 15.99,
      supplier: 'Mediterranean Imports',
      status: 'Out of Stock',
      location: 'Dry Storage E',
      expiryDate: '2024-06-30',
      minThreshold: 5
    }
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [updateQuantity, setUpdateQuantity] = useState('');

  const categories = ['Vegetables', 'Meat', 'Herbs', 'Dry Goods', 'Oils & Sauces', 'Dairy', 'Seafood', 'Fruits'];

  const handleViewItem = (item) => {
    setSelectedItem(item);
    setUpdateQuantity('');
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedItem(null);
    setUpdateQuantity('');
  };

  const handleUpdateQuantity = () => {
    if (!updateQuantity || isNaN(updateQuantity)) {
      toast.error('Please enter a valid quantity to add');
      return;
    }
    const increase = parseFloat(updateQuantity);
    if (increase <= 0) {
      toast.error('Please enter a positive number to increase stock');
      return;
    }
    const updatedItems = items.map(item => {
      if (item.id === selectedItem.id) {
        const newQuantity = item.quantity + increase;
        const status = newQuantity === 0 ? 'Out of Stock' : 
                      newQuantity <= item.minThreshold ? 'Low Stock' : 'In Stock';
        return { ...item, quantity: newQuantity, status };
      }
      return item;
    });
    setItems(updatedItems);
    toast.success(`Stock increased for ${selectedItem.name}`);
    handleCloseDialog();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Stock':
        return 'success';
      case 'Low Stock':
        return 'warning';
      case 'Out of Stock':
        return 'error';
      default:
        return 'default';
    }
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const stats = {
    totalItems: items.length,
    inStock: items.filter(item => item.status === 'In Stock').length,
    lowStock: items.filter(item => item.status === 'Low Stock').length,
    outOfStock: items.filter(item => item.status === 'Out of Stock').length
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Kitchen Inventory View
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total Ingredients
              </Typography>
              <Typography variant="h4">{stats.totalItems}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                In Stock
              </Typography>
              <Typography variant="h4" color="success.main">{stats.inStock}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Low Stock
              </Typography>
              <Typography variant="h4" color="warning.main">{stats.lowStock}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Out of Stock
              </Typography>
              <Typography variant="h4" color="error.main">{stats.outOfStock}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Search and Filter */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              placeholder="Search ingredients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Filter by Category</InputLabel>
              <Select
                value={filterCategory}
                label="Filter by Category"
                onChange={(e) => setFilterCategory(e.target.value)}
              >
                <MenuItem value="">All Categories</MenuItem>
                {categories.map(category => (
                  <MenuItem key={category} value={category}>{category}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>

      {/* Items Table */}
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Ingredient</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Unit</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Expiry Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>{item.unit}</TableCell>
                  <TableCell>{item.location}</TableCell>
                  <TableCell>{item.expiryDate}</TableCell>
                  <TableCell>
                    <Chip
                      label={item.status}
                      color={getStatusColor(item.status)}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => handleViewItem(item)}
                      color="primary"
                    >
                      <ViewIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* View/Update Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedItem ? `Update ${selectedItem.name}` : 'Ingredient Details'}
        </DialogTitle>
        <DialogContent>
          {selectedItem && (
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    {selectedItem.name}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="textSecondary">
                    Category
                  </Typography>
                  <Typography variant="body1">
                    {selectedItem.category}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="textSecondary">
                    Supplier
                  </Typography>
                  <Typography variant="body1">
                    {selectedItem.supplier}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="textSecondary">
                    Location
                  </Typography>
                  <Typography variant="body1">
                    {selectedItem.location}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="textSecondary">
                    Expiry Date
                  </Typography>
                  <Typography variant="body1">
                    {selectedItem.expiryDate}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="textSecondary">
                    Current Quantity
                  </Typography>
                  <Typography variant="body1">
                    {selectedItem.quantity} {selectedItem.unit}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="textSecondary">
                    Price per Unit
                  </Typography>
                  <Typography variant="body1">
                    ${selectedItem.price}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    Increase Quantity
                  </Typography>
                  <TextField
                    fullWidth
                    type="number"
                    value={updateQuantity}
                    onChange={(e) => setUpdateQuantity(e.target.value)}
                    placeholder={`Enter amount to add in ${selectedItem.unit}`}
                    inputProps={{ min: 1 }}
                  />
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleUpdateQuantity} variant="contained">
            Increase Stock
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InventoryView; 