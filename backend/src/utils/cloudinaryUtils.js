import cloudinary from "../config/cloudinaryConfig.js";

const uploadImagesOnCloudinary = async (imageFiles) => {
    try {
        const imageUrls = [];
        for(const image of imageFiles) {
            // convert to base64 String;
            const base64String = image.buffer.toString('base64');
            const dataURI = `data:${image.mimetype};base64,${base64String}`;

            // upload on cloudinary;
            const response = await cloudinary.uploader.upload(dataURI, {
                folder: 'Greenbasket/products'
            });
            if (!response || !response.secure_url) {
                throw new Error("Image upload failed");
            }
            imageUrls.push(response.secure_url);
        }
        return imageUrls;
    } catch (error) {
        throw new Error(`Cloudinary Upload Failed: ${error.message}`);
    }
}

export default uploadImagesOnCloudinary;