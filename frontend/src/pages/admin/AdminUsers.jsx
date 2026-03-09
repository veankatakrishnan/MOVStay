import React, { useEffect, useState } from 'react';
import { Box, Typography,  CircularProgress, IconButton, Chip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import BlockIcon from '@mui/icons-material/Block';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteIcon from '@mui/icons-material/Delete';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);

    const fetchUsers = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:5000/api/admin/users', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            }
        } catch (error) {
            console.error('Failed to fetch users:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleStatusChange = async (id, currentStatus) => {
        setActionLoading(true);
        const newStatus = currentStatus === 'active' ? 'blocked' : 'active';
        try {
            const token = localStorage.getItem('token');
            await fetch(`http://localhost:5000/api/admin/user/${id}/status`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status: newStatus })
            });
            setUsers(prev => prev.map(u => u._id === id ? { ...u, status: newStatus } : u));
        } catch (error) {
            console.error('Error updating status:', error);
        } finally {
            setActionLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;
        setActionLoading(true);
        try {
            const token = localStorage.getItem('token');
            await fetch(`http://localhost:5000/api/admin/user/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            setUsers(prev => prev.filter(u => u._id !== id));
        } catch (error) {
            console.error('Error deleting user:', error);
        } finally {
            setActionLoading(false);
        }
    };

    const columns = [
        { field: 'name', headerName: 'Name', flex: 1 },
        { field: 'email', headerName: 'Email', flex: 1 },
        { field: 'phone', headerName: 'Phone', flex: 1 },
        { 
            field: 'role', 
            headerName: 'Role', 
            width: 120,
            renderCell: (params) => (
                <Chip 
                    label={params.row.role.toUpperCase()} 
                    color={params.row.role === 'admin' ? 'error' : params.row.role === 'owner' ? 'warning' : 'info'} 
                    size="small" 
                    sx={{ fontWeight: 'bold' }} 
                />
            )
        },
        { 
            field: 'status', 
            headerName: 'Status', 
            width: 120,
            renderCell: (params) => (
                <Chip 
                    label={params.row.status.toUpperCase()} 
                    color={params.row.status === 'active' ? 'success' : 'default'} 
                    size="small" 
                />
            )
        },
        {
            field: 'actions',
            headerName: 'Actions',
            width: 150,
            sortable: false,
            renderCell: (params) => {
                if (params.row.role === 'admin') return <Typography variant="caption" sx={{ color: 'text.secondary', display: 'flex', alignItems: 'center', height: '100%' }}>Super Admin</Typography>;

                return (
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', height: '100%' }}>
                        <IconButton 
                            size="small" 
                            color={params.row.status === 'active' ? "error" : "success"}
                            onClick={() => handleStatusChange(params.row._id, params.row.status)}
                            disabled={actionLoading}
                            title={params.row.status === 'active' ? "Block User" : "Activate User"}
                        >
                            {params.row.status === 'active' ? <BlockIcon fontSize="small" /> : <CheckCircleOutlineIcon fontSize="small" />}
                        </IconButton>
                        <IconButton 
                            size="small" 
                            color="error"
                            onClick={() => handleDelete(params.row._id)}
                            disabled={actionLoading}
                            title="Delete User"
                        >
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Box>
                );
            }
        }
    ];

    return (
        <Box sx={{ p: 2, backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', height: '100%' }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 'bold', color: '#1e293b' }}>
                User Management
            </Typography>
            
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress /></Box>
            ) : (
                <Box sx={{ height: 600, width: '100%' }}>
                    <DataGrid
                        rows={users}
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

export default AdminUsers;
