const Complaint = require('../model/Complaint');
const Room = require('../model/Room');

module.exports = {
    dashboard: async (req, res) => {
        try {
            const countComplaint = await Complaint.find({
                status: false,
                hostel: req.userData.hostelAlloted
            }).count();
            const hostelStatus = await Room.find({
                paymentStatus: false,
                hostel: req.userData.hostelAlloted
            }).count();
            return res.status(200).json({ complaint_count: countComplaint, room_allot_status: hostelStatus });
        } catch (err) {
            console.log(err);
            res.status(200).json({ message: 'Internal Server Error' });
        }
    }
}