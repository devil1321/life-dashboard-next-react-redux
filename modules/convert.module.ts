export const getBase64 = (file:any) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

export const base64toUrl = async (base64Data:string) => {
    const r = await fetch(base64Data);
    const blob = await r.blob();
    return URL.createObjectURL(blob);
}