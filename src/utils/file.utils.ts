function getBase64(
  file: File,
  callback: (
    result: string | ArrayBuffer | null,
    error: ProgressEvent<FileReader> | null
  ) => void
) {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    callback(reader.result, null);
  };
  reader.onerror = function (error) {
    callback(null, error);
  };
}

export { getBase64 };
