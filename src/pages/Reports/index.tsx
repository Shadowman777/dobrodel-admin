import React from 'react'
import Layout from 'components/Layout'
import { List } from '@material-ui/core'
import { ReportForm } from './ReportForm'
import { ByDateReportForm } from './ByDateReportForm'
import { ListProductsPurchaseFormNew } from './ListProductsOrderPickingNewForm'

const Reports = () => {
  return (
    <Layout title="Отчеты">
      <List component="nav">
        <ReportForm
          name="Список товаров для сборки заказов excel"
          url="/api/report/list-products-order-picking/pdf"
        />
        <ListProductsPurchaseFormNew
          name="Список продуктов для сборки заказов (новый)"
          url="/api/report/list-products-order-picking-new/pdf"
        />
        <ByDateReportForm
          name="Список товаров для закупки по дате совершения заказа Excel"
          url="/api/report/list-products-purchase/order-date"
        />
        <ByDateReportForm
          name="Список товаров для закупки по дате получения заказа Excel"
          url="/api/report/list-products-purchase/excel"
        />
        <ByDateReportForm
          name="Этикетки для размещения на пакете по дате совершения заказа Excel"
          url="/api/report/order-label-placed-package/order-date"
        />
        <ReportForm
          name="Этикетки для размещения на пакете по дате получения заказа Excel"
          url="/api/report/order-label-placed-package/pdf"
        />
      </List>
    </Layout>
  )
}

export default Reports
