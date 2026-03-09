import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, AppBar, Toolbar, CssBaseline } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import LogoutIcon from '@mui/icons-material/Logout';
import { useEffect } from 'react';

const drawerWidth = 240;

const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin/dashboard' },
    { text: 'Users', icon: <PeopleIcon />, path: '/admin/users' },
    { text: 'Listings', icon: <ListAltIcon />, path: '/admin/listings' },
    { text: 'Analytics', icon: <AssessmentIcon />, path: '/admin/analytics' },
    { text: 'Reports', icon: <ReportProblemIcon />, path: '/admin/reports' },
    { text: 'Roommate Monitoring', icon: <SupervisorAccountIcon />, path: '/admin/roommate-monitoring' },
];

export default function AdminLayout() {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('userRole');
        if (!token || role !== 'admin') {
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        navigate('/login');
    };

    return (
        <Box sx={{ display: 'flex', backgroundColor: '#F8FAFC', minHeight: '100vh' }}>
            <CssBaseline />
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#0F172A' }}>
                <Toolbar>
                    <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
                        MOV Stay - Admin Portal
                    </Typography>
                    <Typography variant="body2" sx={{ mr: 2, opacity: 0.8 }}>
                        Welcome, Administrator
                    </Typography>
                    <LogoutIcon onClick={handleLogout} sx={{ cursor: 'pointer', '&:hover': { color: '#ef4444' } }} />
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', backgroundColor: '#ffffff', borderRight: '1px solid #e2e8f0' },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto', mt: 2 }}>
                    <List>
                        {menuItems.map((item) => (
                            <ListItem
                                button
                                key={item.text}
                                onClick={() => navigate(item.path)}
                                selected={location.pathname === item.path}
                                sx={{
                                    mx: 1,
                                    borderRadius: '8px',
                                    mb: 0.5,
                                    backgroundColor: location.pathname === item.path ? '#f1f5f9' : 'transparent',
                                    '&:hover': { backgroundColor: '#e2e8f0' },
                                    color: location.pathname === item.path ? '#0f172a' : '#475569'
                                }}
                            >
                                <ListItemIcon sx={{ color: location.pathname === item.path ? '#0f172a' : '#64748b', minWidth: '40px' }}>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText 
                                    primary={item.text} 
                                    primaryTypographyProps={{ 
                                        fontSize: '0.9rem', 
                                        fontWeight: location.pathname === item.path ? 600 : 500 
                                    }} 
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 4, pt: 10 }}>
                <Outlet />
            </Box>
        </Box>
    );
}
