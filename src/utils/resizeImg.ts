type ImgConfig = {
  maxWidth?: number
  maxHeight?: number
}

export function resizeImg(
  file: File,
  imgConfig: ImgConfig = {},
  callback: (file: File) => void
) {
  const img = new Image()
  img.addEventListener('load', () => {
    let ratioW = 1
    let ratioH = 1
    if (imgConfig.maxWidth && img.width > imgConfig.maxWidth) {
      ratioW = imgConfig.maxWidth / img.width
    }
    if (imgConfig.maxHeight && img.height > imgConfig.maxHeight) {
      ratioH = imgConfig.maxHeight / img.height
    }
    img.width *= Math.min(ratioH, ratioW)
    img.height *= Math.min(ratioH, ratioW)
    const canvas = document.createElement('canvas')
    canvas.width = img.width
    canvas.height = img.height
    canvas.getContext('2d')?.drawImage(img, 0, 0, img.width, img.height)
    canvas.toBlob((blob) => {
      const file = new File([blob!], 'image.png')
      callback(file)
    })
  })
  img.src = window.URL.createObjectURL(file)
}
