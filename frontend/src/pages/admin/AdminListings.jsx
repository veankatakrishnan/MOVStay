import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, MenuItem, Select, FormControl, Chip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

const AdminListings = () => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchListings = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/admin/listings', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setListings(data);
            }
        } catch (error) {
            console.error('Failed to fetch listings:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchListings();
    }, []);

    const handleStatusChange = async (id, newStatus) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`http://localhost:5000/api/admin/listing/${id}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (response.ok) {
                setListings(prev => prev.map(l => l._id === id ? { ...l, status: newStatus } : l));
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const columns = [
        { field: 'pgName', headerName: 'Listing Name', flex: 1.5 },
        { field: 'ownerName', headerName: 'Owner Name', flex: 1 },
        { field: 'location', headerName: 'Location', flex: 1 },
        { 
            field: 'rent', 
            headerName: 'Rent (₹)', 
            width: 120,
            valueFormatter: (params) => {
                // Ensure params is treated safely if undefined/null
                if(params && typeof params.value === 'number') {
                     return params.value.toLocaleString('en-IN')
                }
                return params;
            }
        },
        { 
            field: 'status', 
            headerName: 'Current Status', 
            width: 130,
            renderCell: (params) => {
                const colorMap = { 'pending': 'warning', 'approved': 'success', 'rejected': 'error' };
                return <Chip label={params.row.status.toUpperCase()} color={colorMap[params.row.status] || 'default'} size="small" />;
            }
        },
        {
            field: 'actions',
            headerName: 'Moderation',
            width: 160,
            sortable: false,
            renderCell: (params) => (
                <FormControl size="small" fullWidth sx={{ mt: 0.5 }}>
                    <Select
                        value={params.row.status}
                        onChange={(e) => handleStatusChange(params.row._id, e.target.value)}
                        sx={{ fontSize: '0.85rem', height: '32px' }}
                    >
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="approved">Approve</MenuItem>
                        <MenuItem value="rejected">Reject</MenuItem>
                    </Select>
                </FormControl>
            )
        }
    ];

    return (
        <Box sx={{ p: 2, backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', height: '100%' }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#1e293b' }}>
                Listing Moderation
            </Typography>
            
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress /></Box>
            ) : (
                <Box sx={{ height: 600, width: '100%' }}>
                    <DataGrid
                        rows={listings}
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

export default AdminListings;
