export function converImagetoBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file); //convert to base64
    reader.onloadend = () => resolve(reader.result); //resolve if the result is successful
    reader.onerror = reject; //reject if the result is not successful
  });
}
