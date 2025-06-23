import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Chip,
  Paper,
  InputBase,
  IconButton
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useCloudKitchen } from '../../contexts/CloudKitchenContext';
import toast from 'react-hot-toast';

const MenuItems = () => {
  const { getKitchenData, deductInventoryFromRecipe } = useCloudKitchen();
  const [menu, setMenu] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    const kitchenData = getKitchenData();
    if (kitchenData) {
      setMenu(kitchenData.menu || []);
    }
  }, [getKitchenData]);

  const handleMarkAsComplete = (menuItem) => {
    if (!menuItem.recipe) {
      toast.error(`No recipe found for ${menuItem.name}`);
      return;
    }
    
    const result = deductInventoryFromRecipe(menuItem.recipe);
    if (result?.success) {
      // You might want to update the UI to show the item as "completed"
      // or remove it from a "pending" list, but for now, a toast is fine.
    }
    // Errors are handled via toast within the context function
  };

  const filteredMenu = menu.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom component="h1">
        Menu Items
      </Typography>
      
      <Paper
        component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400, mb: 3 }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Menu Items"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      
      <Grid container spacing={3}>
        {filteredMenu.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {item.name}
                  </Typography>
                  <Chip label={item.status} color={item.status === 'Active' ? 'success' : 'default'} size="small" />
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Category: {item.category}
                </Typography>
                <Typography variant="h5" sx={{ mb: 2 }}>
                  ₹{item.price.toFixed(2)}
                </Typography>
                <Typography variant="body2" paragraph>
                  {item.description}
                </Typography>
              </CardContent>
              <Box sx={{ p: 2, pt: 0 }}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => handleMarkAsComplete(item)}
                >
                  Mark as Complete
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MenuItems; 