import { DollarOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import { Text } from '../text'
import React from 'react'
import { Area, AreaConfig } from '@ant-design/plots'
import { useList } from '@refinedev/core'
import { DASHBOARD_DEALS_CHART_QUERY } from '@/graphql/queries'

const DealsChart = () => {

  const { data } = useList({
    resource: 'dealStages',
    meta: {
      gqlQuery: DASHBOARD_DEALS_CHART_QUERY
    }
  });

  console.log(data);

  const config: AreaConfig = {
    data: [],
  };
  
  return (
    <Card
      style={{ 
        height: '100%',
      }}
      styles={{
        header: { 
          padding: '8px 16px',
        },
        body: { 
          padding: '0 1rem',
        }
      }}
      title={
        <div
          style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <DollarOutlined />
          <Text size="sm" style={{ marginLeft: '0.5rem' }}> Deals </Text>
        </div>
      }
    >
      <Area {...config} height={325} />
    </Card>
  )
}

export default DealsChart
