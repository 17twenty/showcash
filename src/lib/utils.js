/* eslint-disable import/prefer-default-export */

/**
 * Converts a file into base64
 *
 * @param {File} file - file to be converted
 * @returns Promise<string>
 */
export const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    const convertedFile = reader.result;
    resolve(convertedFile.split(',')[1]);
  };
  reader.onerror = error => reject(error);
});
