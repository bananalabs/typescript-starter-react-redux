declare module "redux-devtools-chart-monitor" {
  import * as React from 'react'

  export interface IChartMonitorProps {
    preserveScrollTop?: boolean,
    select?: (state: any) => any,
    theme?: any,
    invertTheme?: boolean
  }

  export default class ChartMonitor extends React.Component<IChartMonitorProps, any> { }
}

// declare module 'Window';
// declare module 'module';
declare module 'react-router-redux';
declare module 'react-router';
declare module 'react-router-dom';
declare module 'redux-devtools-extension/developmentOnly';
