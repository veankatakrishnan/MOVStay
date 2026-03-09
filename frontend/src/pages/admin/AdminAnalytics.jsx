import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Grid, Card, CardContent } from '@mui/material';
import {
    LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
const STATUS_COLORS = { 'pending': '#f59e0b', 'approved': '#10b981', 'rejected': '#ef4444' };

const AdminAnalytics = () => {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:5000/api/admin/analytics', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (response.ok) {
                    const data = await response.json();
                    
                    // Format data for Recharts
                    const formatUserGrowth = data.userGrowth.map(item => ({ month: item._id, users: item.count }));
                    const formatListingsByLocation = data.listingsByLocation.map(item => ({ location: item._id || 'Unknown', count: item.count }));
                    const formatStatusData = data.listingStatusData.map(item => ({ name: item._id, value: item.count }));
                    const formatEnquiryTrend = data.enquiryTrend.map(item => ({ date: item._id, enquiries: item.count }));

                    setAnalytics({
                        userGrowth: formatUserGrowth.length ? formatUserGrowth : [{ month: 'Initial', users: 0 }],
                        listingsByLocation: formatListingsByLocation.length ? formatListingsByLocation : [{ location: 'None', count: 0 }],
                        statusData: formatStatusData.length ? formatStatusData : [{ name: 'pending', value: 1 }],
                        enquiryTrend: formatEnquiryTrend.length ? formatEnquiryTrend : [{ date: 'Initial', enquiries: 0 }]
                    });
                }
            } catch (error) {
                console.error('Failed to fetch analytics:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, []);

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 10 }}><CircularProgress /></Box>;
    if (!analytics) return <Typography>Failed to load analytics data.</Typography>;

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: '#1e293b' }}>
                Platform Analytics
            </Typography>

            <Grid container spacing={3}>
                {/* User Growth Chart */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', p: 2 }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', color: '#334155' }}>User Growth Trend</Typography>
                            <Box sx={{ height: 300 }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={analytics.userGrowth}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                        <XAxis dataKey="month" stroke="#64748b" />
                                        <YAxis stroke="#64748b" />
                                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                        <Legend />
                                        <Line type="monotone" dataKey="users" stroke="#3b82f6" strokeWidth={3} activeDot={{ r: 8 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Listing Status Distribution */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', p: 2 }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', color: '#334155' }}>Listing Status Distribution</Typography>
                            <Box sx={{ height: 300 }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={analytics.statusData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                            outerRadius={100}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {analytics.statusData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name] || COLORS[index % COLORS.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Listings by Location */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', p: 2 }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', color: '#334155' }}>Listings by Location</Typography>
                            <Box sx={{ height: 300 }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={analytics.listingsByLocation}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                        <XAxis dataKey="location" stroke="#64748b" />
                                        <YAxis stroke="#64748b" />
                                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} cursor={{fill: '#f1f5f9'}} />
                                        <Legend />
                                        <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* Enquiry Trend */}
                <Grid item xs={12} md={6}>
                    <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', p: 2 }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', color: '#334155' }}>Enquiry Trend</Typography>
                            <Box sx={{ height: 300 }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={analytics.enquiryTrend}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                        <XAxis dataKey="date" stroke="#64748b" />
                                        <YAxis stroke="#64748b" />
                                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                        <Legend />
                                        <Line type="monotone" dataKey="enquiries" stroke="#ef4444" strokeWidth={3} activeDot={{ r: 8 }} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

            </Grid>
        </Box>
    );
};

export default AdminAnalytics;
