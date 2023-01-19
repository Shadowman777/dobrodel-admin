type Data = Record<string, any>

export function buildFormData(
  formData: FormData,
  data: Data,
  parentKey?: string
) {
  if (
    data &&
    typeof data === 'object' &&
    !(data instanceof File) &&
    !(data instanceof Blob)
  ) {
    Object.keys(data).forEach((key) => {
      buildFormData(
        formData,
        data[key],
        parentKey ? `${parentKey}[${key}]` : key
      )
    })
  } else if (parentKey) {
    const value = data == null ? '' : data

    formData.append(parentKey, value)
  }
  return formData
}
