const User = require('../models/User');
const PgListing = require('../models/PgListing');
const Enquiry = require('../models/Enquiry');
const RoommateMatch = require('../models/RoommateMatch');

// @desc    Get Admin Dashboard Metrics
// @route   GET /api/admin/dashboard
// @access  Private/Admin
exports.getDashboardMetrics = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalStudents = await User.countDocuments({ role: 'student' });
        const totalOwners = await User.countDocuments({ role: 'owner' });
        
        const totalListings = await PgListing.countDocuments();
        const activeListings = await PgListing.countDocuments({ isActive: true });
        
        const totalEnquiries = await Enquiry.countDocuments();

        res.json({
            totalUsers,
            totalStudents,
            totalOwners,
            totalListings,
            activeListings,
            totalEnquiries
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private/Admin
exports.getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password').sort({ createdAt: -1 });
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update user status
// @route   PATCH /api/admin/user/:id/status
// @access  Private/Admin
exports.updateUserStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const user = await User.findById(req.params.id);
        if (user) {
            user.status = status;
            await user.save();
            res.json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete user
// @route   DELETE /api/admin/user/:id
// @access  Private/Admin
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (user) {
            await User.deleteOne({ _id: user._id });
            res.json({ message: 'User removed' });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all listings
// @route   GET /api/admin/listings
// @access  Private/Admin
exports.getListings = async (req, res) => {
    try {
        const listings = await PgListing.find({}).sort({ createdAt: -1 });
        
        // Populate owner name if ownerId was an ObjectId.
        // It's defined as String in schema, so we do a simple manual lookup or let it be.
        // I'll fetch user docs to map ownerName if possible.
        const users = await User.find({ role: 'owner' });
        const userMap = users.reduce((acc, curr) => {
            acc[curr._id.toString()] = curr.name;
            return acc;
        }, {});

        const populatedListings = listings.map(l => ({
            ...l._doc,
            ownerName: userMap[l.ownerId] || 'Unknown Owner'
        }));

        res.json(populatedListings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update listing status
// @route   PATCH /api/admin/listing/:id/status
// @access  Private/Admin
exports.updateListingStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const listing = await PgListing.findById(req.params.id);
        if (listing) {
            listing.status = status;
            await listing.save();
            res.json(listing);
        } else {
            res.status(404).json({ message: 'Listing not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get Analytics Data
// @route   GET /api/admin/analytics
// @access  Private/Admin
exports.getAnalytics = async (req, res) => {
    try {
        const userGrowth = await User.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { "_id": 1 } }
        ]);

        const listingsByLocation = await PgListing.aggregate([
            {
                $group: {
                    _id: "$location",
                    count: { $sum: 1 }
                }
            }
        ]);

        const listingStatusData = await PgListing.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ]);
        
        // Mock enquiry trend since Enquiry lacks Date right now except createdAt
        const enquiryTrend = await Enquiry.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
                    count: { $sum: 1 }
                }
            },
            { $sort: { "_id": 1 } }
        ]);

        res.json({
            userGrowth,
            listingsByLocation,
            listingStatusData,
            enquiryTrend
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get Reports
// @route   GET /api/admin/reports
// @access  Private/Admin
exports.getReports = async (req, res) => {
    try {
        const mockReports = [
            { _id: '1', type: 'Suspicious Activity', description: 'User sent 50 bulk mails', reportedBy: 'System', status: 'Pending', date: new Date() },
            { _id: '2', type: 'Fake Listing', description: 'Images look stolen from internet', reportedBy: 'Student', status: 'Reviewed', date: new Date() },
            { _id: '3', type: 'Abusive Behaviour', description: 'Owner used offensive language in message', reportedBy: 'Student', status: 'Resolved', date: new Date() }
        ];
        res.json(mockReports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get Roommate Matching Monitoring Data
// @route   GET /api/admin/roommate-monitoring
// @access  Private/Admin
exports.getRoommateMonitoring = async (req, res) => {
    try {
        const totalMatches = await RoommateMatch.countDocuments() || 150; // default mocks for UI validation if empty
        
        const avgScoreAgg = await RoommateMatch.aggregate([
            { $group: { _id: null, avgScore: { $avg: '$compatibilityScore' } } }
        ]);
        const avgCompatibilityScore = avgScoreAgg.length > 0 && avgScoreAgg[0].avgScore !== null 
            ? avgScoreAgg[0].avgScore 
            : 75.5;

        const acceptedMatches = await RoommateMatch.countDocuments({ status: 'accepted' }) || 60;
        const matchAcceptanceRate = totalMatches > 0 ? (acceptedMatches / totalMatches) * 100 : 40.0;

        let compatibilityDistribution = await RoommateMatch.aggregate([
            {
                $bucket: {
                    groupBy: "$compatibilityScore",
                    boundaries: [0, 50, 70, 85, 101],
                    default: "Other",
                    output: { count: { $sum: 1 } }
                }
            }
        ]);

        if (compatibilityDistribution.length === 0) {
            compatibilityDistribution = [
                { _id: 0, count: 10 },
                { _id: 50, count: 40 },
                { _id: 70, count: 80 },
                { _id: 85, count: 20 }
            ];
        }

        let acceptanceStatusData = await RoommateMatch.aggregate([
            {
                $group: {
                    _id: "$status",
                    count: { $sum: 1 }
                }
            }
        ]);

        if (acceptanceStatusData.length === 0) {
            acceptanceStatusData = [
                { _id: 'pending', count: 50 },
                { _id: 'accepted', count: 60 },
                { _id: 'rejected', count: 40 }
            ];
        }

        res.json({
            metrics: {
                totalMatches,
                avgCompatibilityScore: parseFloat(avgCompatibilityScore.toFixed(2)),
                matchAcceptanceRate: parseFloat(matchAcceptanceRate.toFixed(2))
            },
            compatibilityDistribution,
            acceptanceStatusData
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
