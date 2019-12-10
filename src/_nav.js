export default {
  items: [
    {
      name: 'NeoDevices',
      url: '/dashboard',
      icon: 'icon-speedometer',
     
    },
   
    {
      name: 'Category',
      url: '/category',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'CategoryList',
          url: '/category/categoryList',
          icon: 'icon-puzzle',
        },
        {
          name: 'Add Category',
          url: '/category/addCategory',
          icon: 'icon-puzzle',
        },
       
      ],
    },
    {
      name: 'Devices',
      url: '/devices',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'DeviceList',
          url: '/device/deviceList',
          icon: 'icon-puzzle',
        },
        {
          name: 'Add Device',
          url: '/device/addDevice',
          icon: 'icon-puzzle',
        },
      ],
    },
    {
      name: 'Employee',
      url: '/employee',
      icon: 'icon-puzzle',
      children: [
        {
          name: 'EmployeeList',
          url: '/employee/employeeList',
          icon: 'icon-puzzle',
        },
        // {
        //   name: 'Add Employee',
        //   url: '/base/cards',
        //   icon: 'icon-puzzle',
        // },
      ],
    },
   
  ],
};
