import AddressRepository from "../repository/AddressRepository.js";

class AddressService {
    constructor() {
        this.addressRepository = new AddressRepository();
    }

    async addAddress(addressData) {
        try {
            const newAddress = await this.addressRepository.create(addressData);
            return newAddress;
        } catch (error) {
            throw error;
        }
    }

    async getAddressesByUserId(userId) {
        try {
            const addresses = await this.addressRepository.findAddressesByUserId(userId);
            return addresses;
        } catch (error) {
            throw error;
        }
    }
}

export default AddressService; 