export const MAX_FILE_SIZE = 6;
export const imageFormats = ['.jpeg', '.jpe', '.jif', '.jfif', '.jfi', '.jpg', '.png'];

export const convertWebFormat = webFormat => '.' + webFormat.substr(webFormat.lastIndexOf('/') + 1);

export const bytesToMB = bytes => bytes / (1024*1024);

export const isValidFileSize = fileSize => bytesToMB(fileSize) < MAX_FILE_SIZE;

export const isValidFileFormat = fileFormat => imageFormats.includes(fileFormat);

export const isValidFile = file => {
    if (!isValidFileSize(file.size)) {
        return { isValid: false, error: 'ImageSizeNotice' };
    }

    if (!isValidFileFormat(convertWebFormat(file.type))) {
        return { isValid: false, error: 'ImageTypeNotice' };
    }

    return { isValid: true };
}