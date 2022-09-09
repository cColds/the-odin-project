import vdate from '../../../modules/vdate';

export default [
  {
    id: 'inbox',
    title: 'Inbox',
    iconType: 'inbox',
    type: 'default',
    options: {
      deleted: false,
      edited: false,
    },
    isActive: true,
  },
  {
    id: 'today',
    title: 'Today',
    iconType: 'today',
    filter: ({ dueDate }) => vdate.isToday(new Date(dueDate)),
    type: 'default',
    options: {
      deleted: false,
      edited: false,
      parent: true,
    },
  },
  {
    id: 'week',
    title: 'Week',
    iconType: 'date_range',
    filter: ({ dueDate }) => {
      const isToday = vdate.isToday(new Date(dueDate));
      const isWeek = vdate.isWeek(new Date(dueDate));

      return !isToday && isWeek;
    },
    type: 'default',
    options: {
      deleted: false,
      edited: false,
      added: false,
      parent: true,
    },
  },
  {
    id: 'month',
    title: 'Month',
    iconType: 'calendar_month',
    filter: ({ dueDate }) => {
      const isToday = vdate.isToday(new Date(dueDate));
      const isWeek = vdate.isWeek(new Date(dueDate));
      const isMonth = vdate.isMonth(new Date(dueDate));

      return !isToday && !isWeek && isMonth;
    },
    type: 'default',
    options: {
      deleted: false,
      edited: false,
      added: false,
      parent: true,
    },
  },
  {
    id: 'expired',
    title: 'Expired',
    iconType: 'calendar_month',
    filter: ({ isExpired }) => isExpired,
    type: 'default',
    options: {
      deleted: false,
      edited: false,
      added: false,
      parent: true,
    },
  },
];
