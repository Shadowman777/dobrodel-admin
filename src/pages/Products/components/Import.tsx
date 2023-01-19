import React, { FC, useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  DialogActions,
  Snackbar
} from '@material-ui/core'
import { CloudUpload as UploadIcon } from '@material-ui/icons'
import { DropzoneArea } from 'material-ui-dropzone'
import { Alert } from '@material-ui/lab'
import { importProducts } from 'store/slices/product/thunks'
import { useAppDispatch } from 'hooks/appHooks'

export const Import: FC = () => {
  const dispatch = useAppDispatch()
  const [open, setOpen] = useState(false)
  const [file, setFile] = useState<File>()
  const [error, setError] = useState<string>('')
  const [completed, setCompleted] = useState<boolean>(false)
  const handleSubmit = () => {
    if (!file) {
      setError('Выберите файл')
      return
    }
    const data = new FormData()
    data.append('file', file)
    dispatch(importProducts(data)).then((e) => {
      if (e.payload.code === 'error') {
        setError(e.payload.message)
      } else {
        setCompleted(true)
      }
    })
  }
  const handleChange = (files: File[]) => {
    setFile(files[0])
  }
  const handleClose = () => {
    setError('')
    setFile(undefined)
    setOpen(false)
    setCompleted(false)
  }
  return (
    <>
      <Button
        startIcon={<UploadIcon />}
        onClick={(e) => {
          e.stopPropagation()
          setOpen(true)
        }}
      >
        Импорт товаров
      </Button>
      {open && (
        <Dialog
          open={open}
          onClose={() => setOpen(false)}
          fullWidth
          maxWidth="md"
        >
          <DialogTitle>Импорт товаров</DialogTitle>
          <DialogContent>
            {error && <Alert severity="error">{error}</Alert>}
            <DropzoneArea
              dropzoneText="Перетащите файл или нажмите на область"
              acceptedFiles={[
                'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
              ]}
              filesLimit={1}
              onChange={handleChange}
            />
          </DialogContent>
          <DialogActions>
            <Button type="button" color="primary" onClick={handleClose}>
              Отмена
            </Button>
            <Button color="primary" type="button" onClick={handleSubmit}>
              Импортировать
            </Button>
          </DialogActions>
        </Dialog>
      )}
      <Snackbar open={completed} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          Операция завершена
        </Alert>
      </Snackbar>
    </>
  )
}
