import { User } from './user.model.js';
import { cloudinary } from '../utils/cloudinary.js';
import { HttpError } from '../helpers/index.js';
import { CLOUDINARY_FOLDER } from '../constants/CloudinaryFolderConstants.js';
import { ImageService } from '../image/image.service.js';

const updateUser = async (formData, formFile) => {
  // Update user info in db

  // TODO configure logic to save updated user with image url to DB

  // const avatarURL = await saveUserAvatarToCloud(formFile.path);
  await ImageService.processAvatarImage({ width: 68, height: 68 });
  const avatarURL = await ImageService.saveImageToCloud(
    CLOUDINARY_FOLDER.AVATARS
  );

  return { avatarURL };
};

const updateTheme = async (userId, theme) => {
  return User.findByIdAndUpdate({ _id: userId }, { theme }, { new: true });
};

const saveUserAvatarToCloud = async filePath => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: CLOUDINARY_FOLDER.AVATARS,
    });

    return result.url;
  } catch (error) {
    throw HttpError(400);
  }
};

export default { updateUser, updateTheme, saveUserAvatarToCloud };
