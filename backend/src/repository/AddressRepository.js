import CrudRepository from "./CrudRepository.js";
import Address from "../models/Address.js";

class AddressRepository extends CrudRepository {
    constructor() {
        super(Address);
    }

    async findAddressesByUserId(userId) {
        try {
            const addresses = await Address.find({ user: userId });
            return addresses;
        } catch (error) {
            throw error;
        }
    }
}

export default AddressRepository; 