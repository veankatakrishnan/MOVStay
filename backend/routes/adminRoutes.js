const express = require('express');
const router = express.Router();
const {
    getDashboardMetrics,
    getUsers,
    updateUserStatus,
    deleteUser,
    getListings,
    updateListingStatus,
    getAnalytics,
    getReports,
    getRoommateMonitoring
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/dashboard').get(protect, admin, getDashboardMetrics);
router.route('/users').get(protect, admin, getUsers);
router.route('/user/:id/status').patch(protect, admin, updateUserStatus);
router.route('/user/:id').delete(protect, admin, deleteUser);
router.route('/listings').get(protect, admin, getListings);
router.route('/listing/:id/status').patch(protect, admin, updateListingStatus);
router.route('/analytics').get(protect, admin, getAnalytics);
router.route('/reports').get(protect, admin, getReports);
router.route('/roommate-monitoring').get(protect, admin, getRoommateMonitoring);

module.exports = router;
