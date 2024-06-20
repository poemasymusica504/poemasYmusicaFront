import React, { useEffect } from 'react';
import { ConfigProvider, theme, App } from 'antd';
import './App.css'
import useModeStore from './infrastructure/context/ModeFontStore';
import RouterApp from './RouterApp';

function MyApp() {

  const { defaultAlgorithm, darkAlgorithm } = theme;
  const { darkMode } = useModeStore((state) => state); 
  return (
    <ConfigProvider
      theme={{
        token: {
          fontSize: 14,
          borderRadius: 8,
          paddingLG: 16,
        },
        algorithm: darkMode ? darkAlgorithm : defaultAlgorithm,
        components: {
          Segmented: {
            itemSelectedBg: '#fa1f03',
          },
          Notification: {
            zIndexPopup: 3050,
          },
        },
      }}
    >
    <App>
      <RouterApp />
    </App>
    </ConfigProvider>
  )
}

export default MyApp;
