export default [
  {
    name: 'Inbox',
    iconType: 'inbox',
    id: 'inbox',
    type: 'default',
    options: {
      deleted: false,
      edited: false,
    },
  },
  {
    name: 'Today',
    iconType: 'today',
    id: 'today',
    filter: (todos) => todos.filter(({ 'due-date': dueDate }) => dueDate === '00.00.00'),
    type: 'default',
    options: {
      deleted: false,
      edited: false,
    },
  },
  {
    name: 'Week',
    iconType: 'date_range',
    id: 'week',
    filter: (todos) => todos.filter(({ 'due-date': dueDate }) => dueDate === '00.00.01'),
    type: 'default',
    options: {
      deleted: false,
      edited: false,
      added: false,
    },
  },
  {
    name: 'Month',
    iconType: 'calendar_month',
    id: 'month',
    filter: (todos) => todos.filter(({ 'due-date': dueDate }) => dueDate === '00.00.02'),
    type: 'default',
    options: {
      deleted: false,
      edited: false,
      added: false,
    },
  },
];
