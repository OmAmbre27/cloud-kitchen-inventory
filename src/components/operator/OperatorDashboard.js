import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Button
} from '@mui/material';
import {
  Inventory as InventoryIcon,
  Search as SearchIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon
} from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const OperatorDashboard = () => {
  const navigate = useNavigate();
  // Mock data
  const stats = [
    {
      title: 'Total Items',
      value: '1,234',
      icon: <InventoryIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      color: '#1976d2',
      onClick: () => navigate('/operator/inventory')
    },
    {
      title: 'Low Stock Items',
      value: '12',
      icon: <WarningIcon sx={{ fontSize: 40, color: 'warning.main' }} />,
      color: '#ed6c02',
      onClick: () => navigate('/operator/inventory')
    }
  ];

  const chartData = [
    { name: 'Mon', items: 12 },
    { name: 'Tue', items: 15 },
    { name: 'Wed', items: 8 },
    { name: 'Thu', items: 20 },
    { name: 'Fri', items: 18 },
    { name: 'Sat', items: 10 },
    { name: 'Sun', items: 5 }
  ];

  const recentTransactions = [
    { id: 2, action: 'Stock Updated', item: 'iPhone 14 Pro', quantity: -2, time: '5 minutes ago', status: 'info', onClick: () => navigate('/operator/inventory') },
    { id: 4, action: 'Low Stock Alert', item: 'Wireless Mouse', quantity: 3, time: '15 minutes ago', status: 'warning', onClick: () => navigate('/operator/inventory') }
  ];

  const quickActions = [
    { 
      title: 'Search Items', 
      icon: <SearchIcon />, 
      color: 'success', 
      action: () => navigate('/operator/search')
    },
    { 
      title: 'View Inventory', 
      icon: <InventoryIcon />, 
      color: 'info', 
      action: () => navigate('/operator/inventory')
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'success':
        return <CheckCircleIcon sx={{ color: 'success.main', fontSize: 16 }} />;
      case 'warning':
        return <WarningIcon sx={{ color: 'warning.main', fontSize: 16 }} />;
      default:
        return <CheckCircleIcon sx={{ color: 'info.main', fontSize: 16 }} />;
    }
  };

  // Click handlers
  const handleStatCardClick = (stat) => {
    if (stat.onClick) {
      stat.onClick();
    }
  };

  const handleTransactionClick = (transaction) => {
    // No action needed for recent transactions
  };

  const handleChartClick = (data) => {
    // Optionally, navigate or show details based on chart click
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Operator Dashboard
      </Typography>
      
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card 
              sx={{ 
                height: '100%',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: 4,
                  backgroundColor: 'rgba(25, 118, 210, 0.04)'
                }
              }}
              onClick={() => handleStatCardClick(stat)}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography color="textSecondary" gutterBottom variant="h6">
                      {stat.title}
                    </Typography>
                    <Typography variant="h4" component="div">
                      {stat.value}
                    </Typography>
                  </Box>
                  {stat.icon}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Grid container spacing={2}>
              {quickActions.map((action, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Button
                    variant="outlined"
                    startIcon={action.icon}
                    fullWidth
                    sx={{ 
                      height: 60,
                      borderColor: `${action.color}.main`,
                      color: `${action.color}.main`,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: `${action.color}.dark`,
                        backgroundColor: `${action.color}.light`,
                        color: `${action.color}.dark`,
                        transform: 'translateY(-2px)',
                        boxShadow: 2
                      }
                    }}
                    onClick={action.action}
                  >
                    {action.title}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      {/* Charts and Recent Activity */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Weekly Activity
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData} onClick={handleChartClick}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="items" fill="#1976d2" name="Items Added" />
              </BarChart>
            </ResponsiveContainer>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recent Transactions
            </Typography>
            <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
              {recentTransactions.map((transaction) => (
                <Box 
                  key={transaction.id} 
                  sx={{ 
                    mb: 2, 
                    p: 2, 
                    border: '1px solid #e0e0e0', 
                    borderRadius: 1,
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: 'rgba(25, 118, 210, 0.04)',
                      borderColor: 'primary.main',
                      transform: 'translateX(4px)'
                    }
                  }}
                  onClick={() => handleTransactionClick(transaction)}
                >
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="body2" fontWeight="bold">
                      {transaction.action}
                    </Typography>
                    <Chip
                      icon={getStatusIcon(transaction.status)}
                      label={transaction.status}
                      size="small"
                      variant="outlined"
                    />
                  </Box>
                  <Typography variant="body2" color="textSecondary">
                    {transaction.item}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Quantity: {transaction.quantity > 0 ? `+${transaction.quantity}` : transaction.quantity}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {transaction.time}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OperatorDashboard; 