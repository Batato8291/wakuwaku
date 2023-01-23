import axios from 'axios';

class MyUploadAdapter {
  constructor(loader) {
    // The file loader instance to use during the upload.
    this.loader = loader;
  }

  // Starts the upload process. Base64
  // upload() {
  //   return new Promise((resolve, reject) => {
  //     // 使用 FileReader() 物件讀取檔案
  //     const reader = new window.FileReader();
  //     // 觸發 load 事件後，resolve 丟回物件完成 Promise
  //     reader.addEventListener('load', () => {
  //       resolve({ default: reader.result });
  //     });
  //     // 觸發錯誤事件，以 reject 丟回 Promise 失敗原因
  //     reader.addEventListener('error', (err) => {
  //       reject(err);
  //     });
  //     // 觸發 abort 事件時，以 reject() ，使 Promise 失敗
  //     reader.addEventListener('abort', () => {
  //       reject();
  //     });
  //     // 告訴 FileReader 物件用 url 格式讀取，用於設定 img.src 性質
  //     this.loader.file.then((file) => {
  //       reader.readAsDataURL(file);
  //     });
  //   });
  // }

  // use axios
  async upload() {
    const uploadedFile = await this.loader.file;
    const data = new FormData();
    data.append('file-to-upload', uploadedFile);
    const res = await axios({
      url: `${process.env.VUE_APP_API}api/${process.env.VUE_APP_PATH}/admin/upload`,
      method: 'POST',
      data,
      withCredentials: true,
    });
    return { default: res.data.imageUrl };
  }
}

export default MyUploadAdapter;
