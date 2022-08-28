import { ComponentStory, ComponentMeta } from '@storybook/react';
import rawData from '../data/severity_hour.json'
import BarChart from '../components/BarChart';
import { initConverter } from '../utils/converter';

export default {
    title: 'Charts/BarChart',
    component: BarChart,
    argTypes: {
        format: { control: 'text', description: 'Формат значений оси X' },
        data: { table: { disable: true } },
        minorTicks: { description: 'Шаг сетки по оси X' },
        step: { description: 'Шаг, с которым добавляются подписи оси X' },
        keys: { description: 'Массив ключей', table: { disable: true } },
        labels: { description: 'Названия линий, показываются во всплывающей подсказке' },
        start: { control: 'date', description: 'Ось X, начальная дата' },
        finish: { control: 'date', description: 'Ось X, конечная дата' },
    },
} as ComponentMeta<typeof BarChart>;

const Template: ComponentStory<typeof BarChart> = args => <BarChart {...args} />;

export const Base = Template.bind({});
Base.args = {
    data: initConverter(rawData, ['high', 'mid', 'low', 'other']),
    colors: ['#BD60F0', '#79D55E', '#AB304E', '#E04375'],
    labels: ['high', 'mid', 'low', 'other'],
    keys: ['high', 'mid', 'low', 'other'],
    format: 'dd.MM HH:mm',
    minorTicks: 1,
    step: 5,
};
