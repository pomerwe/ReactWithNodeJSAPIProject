import React, { PureComponent } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import './StockChart.css'


export default class Example extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';

  render() {
    return (
        <div className='chartDiv'>
            <LineChart
                width={360}
                height={250}
                data={this.props.data}
            >
                
                <XAxis stroke='#fff' dataKey="name" />
                <YAxis stroke='#fff' domain={[0, Math.round(this.props.highValue * 2) ]} />
                <Tooltip />
                <Legend stroke='#fff' />
                <Line type="monotone" dataKey="HighPrice" stroke="#62ff00" />
                <Line type="monotone" dataKey="LowPrice" stroke="#fc0303" />
            </LineChart>
        </div>
      
    );
  }
}