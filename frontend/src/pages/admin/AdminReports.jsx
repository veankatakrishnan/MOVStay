import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Chip, MenuItem, Select, FormControl } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const AdminReports = () => {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchReports = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/admin/reports', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setReports(data);
            }
        } catch (error) {
            console.error('Failed to fetch reports:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    const columns = [
        { field: 'type', headerName: 'Report Type', width: 200, renderCell: (params) => <Typography variant="body2" fontWeight="bold">{params.value}</Typography> },
        { field: 'description', headerName: 'Description / Details', flex: 1 },
        { field: 'reportedBy', headerName: 'Reported By', width: 150 },
        { 
            field: 'date', 
            headerName: 'Date', 
            width: 150,
            valueFormatter: (params) => params.value ? new Date(params.value).toLocaleDateString() : 'N/A'
        },
        { 
            field: 'status', 
            headerName: 'Status', 
            width: 150,
            renderCell: (params) => {
                const colorMap = { 'Pending': 'warning', 'Reviewed': 'info', 'Resolved': 'success' };
                return <Chip label={params.row.status} color={colorMap[params.row.status] || 'default'} size="small" />;
            }
        },
        {
            field: 'actions',
            headerName: 'Update Status',
            width: 160,
            sortable: false,
            renderCell: (params) => (
                <FormControl size="small" fullWidth sx={{ mt: 0.5 }}>
                    <Select
                        value={params.row.status}
                        onChange={(e) => {
                            // Local mock update since API is mock
                            setReports(prev => prev.map(r => r._id === params.row._id ? { ...r, status: e.target.value } : r));
                        }}
                        sx={{ fontSize: '0.85rem', height: '32px' }}
                    >
                        <MenuItem value="Pending">Pending</MenuItem>
                        <MenuItem value="Reviewed">Reviewed</MenuItem>
                        <MenuItem value="Resolved">Resolved</MenuItem>
                    </Select>
                </FormControl>
            )
        }
    ];

    return (
        <Box sx={{ p: 2, backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', height: '100%' }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#1e293b' }}>
                Moderation & Reports
            </Typography>
            
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress /></Box>
            ) : (
                <Box sx={{ height: 600, width: '100%' }}>
                    <DataGrid
                        rows={reports}
                        columns={columns}
                        getRowId={(row) => row._id}
                        initialState={{
                            pagination: { paginationModel: { pageSize: 10 } },
                        }}
                        pageSizeOptions={[10, 25, 50]}
                        disableRowSelectionOnClick
                        sx={{
                            border: 'none',
                            '& .MuiDataGrid-cell': { borderBottom: '1px solid #f1f5f9' },
                            '& .MuiDataGrid-columnHeaders': { backgroundColor: '#f8fafc', borderBottom: '2px solid #e2e8f0', color: '#475569', fontWeight: 'bold' }
                        }}
                    />
                </Box>
            )}
        </Box>
    );
};

export default AdminReports;
