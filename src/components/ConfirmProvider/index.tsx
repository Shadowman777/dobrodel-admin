import { ConfirmProvider } from 'material-ui-confirm'
import React, { FC } from 'react'

export const ConfirmationProvider: FC = ({ ...props }) => {
  return (
    <ConfirmProvider
      defaultOptions={{
        title: 'Вы уверены?',
        confirmationText: 'Да',
        cancellationText: 'Отмена'
      }}
      {...props}
    />
  )
}
