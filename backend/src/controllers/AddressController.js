import AddressService from "../service/AddressService.js";
const addressService = new AddressService();

export const addAddress = async (req, res) => {
    try {
        const addressData = req.body;
        const newAddress = await addressService.addAddress({
            ...addressData,
            user: req.user.userId
        });
        return res.status(201).json({
            data: newAddress,
            success: true,
            message: "Address added successfully",
            error: null
        });
    } catch (error) {
        return res.status(500).json({
            data: {},
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
};

export const getAddressesByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const addresses = await addressService.getAddressesByUserId(userId);
        return res.status(200).json({
            data: addresses,
            success: true,
            message: "Addresses fetched successfully",
            error: null
        });
    } catch (error) {
        return res.status(500).json({
            data: {},
            success: false,
            message: "Something went wrong",
            error: error.message
        });
    }
}; 