export const globals = {
  DASHBOARD_ADMIN_URL: 'https://omnio04.shipedge.com/admin/dashboard',
  DASHBOARD_URL: 'https://omnio04.shipedge.com/dashboard',
  WAREHOUSE_CREATE: 'https://omnio04.shipedge.com/admin/warehouses/create',
  WAREHOUSES_LIST: 'https://omnio04.shipedge.com/admin/warehouses',

  LOGIN_URL: 'https://omnio04.shipedge.com/session/login',

  WAREHOUSE_TEST_USER: {
    NAME: 'qa17',
    USERNAME: 'oms2',
    PASSWORD: 'Admin123',
  },
  WAREHOUSE_TEST: {
    NAME: 'qa25',
    SERVER_NAME: 'qa25',
    PREFIX: 'qa25',
    FIRST_ADDRESS: '1250 U.S. 130',
    SECOND_ADDRESS: '',
    URL: 'https://qa25.shipedge.com',
    URL_IMAGES: '',
    FIRST_PHONE: 454345342,
    SECOND_PHONE: 54345342,
    COUNTRY: 'United States',
    STATE: 'New Mexico',
    CITY: 'Robbinsville',
    POSTAL_CODE: 86951,
    DESCRIPTION: 'TEST',
    FAX: '4542342342',
    CORPORAT_EMAIL: 'test22@gmail.com',
  },
  WAREHOUSE_CONNECTION_DATA: {
    NAME: 'qa25',
    TYPE_DATA_BASE: 'mysql',
    HOST: 'qa25.shipedge.com',
    PORT: '3306',
    DATABASE: 'shipedge_alpaca_qa25',
    USERNAME: 'remote',
    PASSWORD: 'muddyB3e54',
    CHARACTER: 'utf8',
    COLLATION: 'utf8_general_ci',
    TIME_ZONE: '(GMT-04:00) America/La_Paz',
  },
  ILOC_SHIPEDGE: {
    NAME: 'Shipedge - WAREHOUSE',
    USERNAME: 'darknext01',
    PASSWORD: 'Admin123',
  },
  LOGIN_ADMIN_OMNIO: {
    USERNAME: 'admin@shipedge.com',
    PASSWORD: 'Admin123',
  },
  COMPANY_TEST: {
    FIRST_NAME: 'David',
    LAST_NAME: 'Pizarro Villca',
    EMAIL: 'usertest1@gmail.com',
    PASSWORD: 'Shipedge123.',
    COMPANY: 'Company Test playwright1',
    CONTACT_FULL_NAME: 'David Pizarro Villca',
    COUNTRY: 'United States',
    STATE: 'New York',
    CITY: 'Rochester',
    ADDRESS: '1000 Genesee St',
    PHONE: 85839284,
    POSTAL_CODE: 14611,
  },

  PRODUCT_TEST: {
    PRODUCT_NAME: 'TEST PRODUCT',
    DESCRIPTION: 'TEST DESCRIPTION',
    WEIGHT: 1,
    WIDTH: 1,
    HEIGHT: 1,
    LENGTH: 1,
  },
  // FLAG_TESTS: {
  //   ISLOGIN: FALSE,
  //   ISCOMPANY_REGISTER: FALSE,
  //   ISWAREHOUSE_REGISTER: FALSE,
  //   ISCONECTED_COMPANY_ILOC: FALSE,
  // },
};
