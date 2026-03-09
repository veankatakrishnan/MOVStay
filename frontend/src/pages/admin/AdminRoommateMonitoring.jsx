import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Grid, Card, CardContent } from '@mui/material';
import {
    BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

const COLORS = ['#10b981', '#ef4444', '#f59e0b', '#3b82f6'];
const STATUS_COLORS = { 'accepted': '#10b981', 'rejected': '#ef4444', 'pending': '#f59e0b' };

const AdminRoommateMonitoring = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchMonitoringData = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/admin/roommate-monitoring', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const resData = await response.json();
                
                // Format for recharts
                const formatCompatibility = resData.compatibilityDistribution.map(item => {
                    let range = 'Unknown';
                    if (item._id === 0) range = '0-50';
                    else if (item._id === 50) range = '50-70';
                    else if (item._id === 70) range = '70-85';
                    else if (item._id === 85) range = '85-100';
                    return { range, count: item.count };
                });

                const formatStatus = resData.acceptanceStatusData.map(item => ({
                    name: item._id, value: item.count
                }));

                setData({
                    metrics: resData.metrics,
                    compatibilityData: formatCompatibility,
                    statusData: formatStatus
                });
            }
        } catch (error) {
            console.error('Failed to fetch roommate monitoring data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMonitoringData();
    }, []);

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', p: 10 }}><CircularProgress /></Box>;
    if (!data) return <Typography>Failed to load data.</Typography>;

    return (
        <Box>
            <Typography variant="h4" sx={{ mb: 4, fontWeight: 'bold', color: '#1e293b' }}>
                Roommate Matching Monitor
            </Typography>

            {/* Metrics */}
            <Grid container spacing={3} sx={{ mb: 4 }}>
                <Grid item xs={12} md={4}>
                    <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
                        <CardContent>
                            <Typography color="textSecondary" variant="subtitle2" sx={{ fontWeight: 600, textTransform: 'uppercase' }}>Total Matches Generated</Typography>
                            <Typography variant="h3" sx={{ fontWeight: 'bold', mt: 1, color: '#0f172a' }}>{data.metrics.totalMatches}</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
                        <CardContent>
                            <Typography color="textSecondary" variant="subtitle2" sx={{ fontWeight: 600, textTransform: 'uppercase' }}>Average Compatibility</Typography>
                            <Typography variant="h3" sx={{ fontWeight: 'bold', mt: 1, color: '#3b82f6' }}>{data.metrics.avgCompatibilityScore}%</Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                    <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}>
                        <CardContent>
                            <Typography color="textSecondary" variant="subtitle2" sx={{ fontWeight: 600, textTransform: 'uppercase' }}>Acceptance Rate</Typography>
                            <Typography variant="h3" sx={{ fontWeight: 'bold', mt: 1, color: '#10b981' }}>{data.metrics.matchAcceptanceRate}%</Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Charts */}
            <Grid container spacing={3}>
                <Grid item xs={12} md={7}>
                    <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', p: 2 }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', color: '#334155' }}>Compatibility Score Distribution</Typography>
                            <Box sx={{ height: 300 }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={data.compatibilityData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                        <XAxis dataKey="range" stroke="#64748b" />
                                        <YAxis stroke="#64748b" />
                                        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} cursor={{fill: '#f1f5f9'}} />
                                        <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={5}>
                    <Card sx={{ borderRadius: '16px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', p: 2 }}>
                        <CardContent>
                            <Typography variant="h6" sx={{ mb: 3, fontWeight: 'bold', color: '#334155' }}>Match Acceptance Status</Typography>
                            <Box sx={{ height: 300 }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={data.statusData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                            outerRadius={100}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {data.statusData.map((entry, index) => (
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
            </Grid>
        </Box>
    );
};

export default AdminRoommateMonitoring;
