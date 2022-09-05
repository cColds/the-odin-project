export default [
  {
    name: 'Inbox',
    iconType: 'inbox',
    id: 'inbox',
    type: 'default',
  },
  {
    name: 'Today',
    iconType: 'today',
    id: 'today',
    filter: (todos) => todos.filter(({ 'due-date': dueDate }) => dueDate === '00.00.00'),
    type: 'default',
  },
  {
    name: 'Week',
    iconType: 'date_range',
    id: 'week',
    filter: (todos) => todos.filter(({ 'due-date': dueDate }) => dueDate === '00.00.01'),
    type: 'default',
  },
  {
    name: 'Month',
    iconType: 'calendar_month',
    id: 'month',
    filter: (todos) => todos.filter(({ 'due-date': dueDate }) => dueDate === '00.00.02'),
    type: 'default',
  },
];
