export const encodeFileToBase64 = (fileBlob) => {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();

        if (fileBlob) {
            fileReader.readAsDataURL(fileBlob);
            fileReader.onload = () => {
                if (fileReader.result) {
                    resolve(fileReader.result);
                } else {
                    reject("Error loading file");
                }
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        } else {
            reject("No file provided");
        }
    });
};

export const base64String = async (file) => {
    const b64 = await encodeFileToBase64(file);
    const b64Str = b64.substring(b64.indexOf("base64,") + 7);
    return b64Str;
};
