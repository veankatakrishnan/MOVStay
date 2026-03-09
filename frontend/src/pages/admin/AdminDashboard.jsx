import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Box, CircularProgress } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import HomeIcon from '@mui/icons-material/Home';
import ApartmentIcon from '@mui/icons-material/Apartment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MessageIcon from '@mui/icons-material/Message';

const AdminDashboard = () => {
    const [metrics, setMetrics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:5000/api/admin/dashboard', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch dashboard metrics');
                }

                const data = await response.json();
                setMetrics(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMetrics();
    }, []);

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress /></Box>;
    if (error) return <Typography color="error" variant="h6">{error}</Typography>;

    const cards = [
        { title: 'Total Users', value: metrics?.totalUsers || 0, icon: <PeopleIcon fontSize="large" sx={{ color: '#3b82f6' }} /> },
        { title: 'Total Students', value: metrics?.totalStudents || 0, icon: <SchoolIcon fontSize="large" sx={{ color: '#8b5cf6' }} /> },
        { title: 'Total Owners', value: metrics?.totalOwners || 0, icon: <HomeIcon fontSize="large" sx={{ color: '#f59e0b' }} /> },
        { title: 'Total Listings', value: metrics?.totalListings || 0, icon: <ApartmentIcon fontSize="large" sx={{ color: '#10b981' }} /> },
        { title: 'Active Listings', value: metrics?.activeListings || 0, icon: <CheckCircleIcon fontSize="large" sx={{ color: '#14b8a6' }} /> },
        { title: 'Total Enquiries', value: metrics?.totalEnquiries || 0, icon: <MessageIcon fontSize="large" sx={{ color: '#ef4444' }} /> },
    ];

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: '#1e293b' }}>
                Dashboard Overview
            </Typography>

            <Grid container spacing={3}>
                {cards.map((card, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card sx={{ 
                            borderRadius: '16px', 
                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
                            border: '1px solid #f1f5f9',
                            p: 1
                        }}>
                            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Box>
                                    <Typography color="textSecondary" variant="subtitle2" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', color: '#64748b' }}>
                                        {card.title}
                                    </Typography>
                                    <Typography variant="h3" sx={{ fontWeight: 'bold', mt: 1, color: '#0f172a' }}>
                                        {card.value}
                                    </Typography>
                                </Box>
                                <Box sx={{ p: 2, backgroundColor: '#f8fafc', borderRadius: '12px' }}>
                                    {card.icon}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default AdminDashboard;
