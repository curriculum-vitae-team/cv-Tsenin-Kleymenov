export const convertBase64 = (file: File): Promise<unknown> => {
  return new Promise(resolve => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = () => {
      resolve(fileReader.result)
    }
  })
}
