import { useEffect, useState } from 'react'

const imageMimeType = /image\/(png|jpg|jpeg)/i

function ImagePicker() {
  const [file, setFile] = useState(null)
  const [fileDataURL, setFileDataURL] = useState(null)
  console.log(fileDataURL)
  const changeHandler = (e) => {
    const file = e.target.files[0]
    if (!file.type.match(imageMimeType)) {
      alert('Image mime type is not valid')
      return
    }
    setFile(file)
  }
  useEffect(() => {
    let fileReader,
      isCancel = false
    if (file) {
      fileReader = new FileReader()
      fileReader.onload = (e) => {
        const { result } = e.target
        if (result && !isCancel) {
          setFileDataURL(result)
        }
      }
      fileReader.readAsDataURL(file)
    }
    return () => {
      isCancel = true
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort()
      }
    }
  }, [file])

  return (
    <>
      <label htmlFor="image"> Browse images </label>
      <input
        type="file"
        id="image"
        accept=".png, .jpg, .jpeg"
        onChange={changeHandler}
      />
    </>
  )
}
export default ImagePicker
