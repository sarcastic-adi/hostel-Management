const Complaint = require('../model/Complaint');
const Room = require('../model/Room');
const User = require('../model/User');

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
            return res.status(200).json({ status:'success', complaint_count: countComplaint, room_allot_status: hostelStatus });
        } catch (err) {
            console.log(err);
            res.status(200).json({ message: 'Internal Server Error' });
        }
    },
    resolveComplaint: async (req, res) => {
        try {
            const { complaintId } = req.body;
            if (req.admin === false) {
                return res.status(200).json({ message: 'You are not authorized to resolve this complaint' });
            }
            if (!complaintId) {
                return res.status(200).json({ message: 'Complaint ID is required' });
            }
            Complaint.findById(complaintId, (err, complaint) => {
                if (err) {
                    return res.status(200).json({ message: 'Complaint not found' });
                }
                complaint.status = true;
                complaint.save();
                return res.status(200).json({ message: 'Complaint resolved' });
            });
        } catch (err) {
            console.log(err);
            res.status(200).json({ message: 'Internal Server Error' });
        }
    },
    allotRoom: async (req, res) => {
        try {
            const { id } = req.body;
            if (req.admin === false) {
                return res.status(200).json({ message: 'You are not authorized to allot room' });
            }
            Room.findById(id, (err, room) => {

                if (err) {
                    return res.status(200).json({ message: 'Room not found' });
                }
                room.paymentStatus = true;
                room.save();
                User.findOne({ scholarId: room.scholarId }, (err, user) => {
                    if(err) {
                        return res.status(200).json({ message: 'User not found' });
                    }
                    user.roomNumber = room.number;
                    user.save();
                    return res.status(200).json({ status:"success",message: 'Room Alloted' });
                })
            });
        } catch (err) {
            console.log(err);
            res.status(200).json({ message: 'Internal Server Error' });
        }
    },
    getPendingRequests: async (req, res) => {
        try {
            if (req.admin === false) {
                return res.status(200).json({ message: 'You are not authorized to view pending requests' });
            }
            const pendingRequests = await Room.find({
                paymentStatus: false,
            })
            return res.status(200).json({ status: 'success', data : pendingRequests });
        }catch (err) {
            console.log(err);
            res.status(200).json({ message: 'Internal Server Error' });
        }

    }
}