import vdate from '../../../modules/vdate';

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
    filter: (todos) => todos.filter(({ dueDate }) => vdate.isToday(new Date(dueDate))),
    type: 'default',
    options: {
      deleted: false,
      edited: false,
      todoParent: true,
    },
  },
  {
    name: 'Week',
    iconType: 'date_range',
    id: 'week',
    filter: (todos) => todos.filter(({ dueDate }) => vdate.isWeek(new Date(dueDate))),
    type: 'default',
    options: {
      deleted: false,
      edited: false,
      added: false,
      todoParent: true,
    },
  },
  {
    name: 'Month',
    iconType: 'calendar_month',
    id: 'month',
    filter: (todos) => todos.filter(({ dueDate }) => vdate.isMonth(new Date(dueDate))),
    type: 'default',
    options: {
      deleted: false,
      edited: false,
      added: false,
      todoParent: true,
    },
  },
];
