import Hotel from "../models/Hotel.js";
import User from "../models/User.js";

export const registerHotel = async (req, res) => {
    try {
        const { name, address, contact, city } = req.body;
        const owner = req.user._id;
        //check if the user already register
        const hotel = await Hotel.findOne({ owner })
        if (hotel) {
            return res.json({ success: false, message: "You have already registered a hotel" });
        }
        await Hotel.create({ name, address, contact, city, owner });
        //update user role to owner
        await User.findByIdAndUpdate(owner, { role: "hotelOwner" });
        res.json({ success: true, message: "Hotel registered successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });

    }
}