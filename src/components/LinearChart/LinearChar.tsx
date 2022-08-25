import { format as formatDate } from "date-fns";
import { FC } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { initConverter, prepareData } from "./converter";
import rawData from '../../data/total_hour.json';
import { getTicks } from "./utils";
import CustomAxisTick from './CustomAxisTick';

interface LinearGraphProps {
  format?: string;
  step?: number;
  minorTicks?: number;
  labels?: string[];
  start?: number;
  finish?: number;
  min?: number | 'auto';
  max?: number | 'auto';
  data?: Array<any>;
}

const LinearChart: FC<LinearGraphProps> = ({ start, finish, min, max, step, minorTicks, format }) => {
  const data = initConverter(rawData);
  const dataset = prepareData({ ...data })

  min = typeof min !== 'number' ? Math.min(...data.datasets[0]) : min
  max = typeof max !== 'number' ? Math.max(...data.datasets[0]) : max

  start??= dataset[0]!.time
  finish??= dataset.at(-1)!.time

  format||= "dd MMM yyyy"

  return (
    <LineChart data={dataset} width={800} height={400}>
      <CartesianGrid strokeDasharray="5 5" />
      <XAxis
        dataKey="time"
        type="number"
        domain={[start, finish]}
        allowDataOverflow
        tickSize={0}
        interval={0}
        ticks={getTicks(data.times, minorTicks || step || 1)}
        tick={<CustomAxisTick step={step || 1}/>}
        tickFormatter={(timestamp:number) => formatDate(new Date(timestamp), format!)}
      />
      <YAxis type='number' domain={[min, max]} allowDataOverflow />
      <Tooltip labelFormatter={(timestamp:number) => formatDate(new Date(timestamp), format!)}/>
      <Line type="monotone" dataKey={data.labels[0]} stroke={'#5D71F7'} />
    </LineChart>
  );
};

export default LinearChart;

LinearChart.defaultProps = {
  min: "auto",
  max: "auto",
  format: "dd MMM yyyy",
  minorTicks: 1,
  step: 1,
};
