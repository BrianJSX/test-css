export interface NotificationResponse {
  status: string;
  error_code: number;
  error_type: string;
  message: string;
  data: Array<DataNotificationResponse>;
}

export interface DataNotificationResponse {
  id: number;
  userId: number;
  title: string;
  content: string;
  hasAlreadyRead: boolean;
  redirectUrl: string;
  type: string;
  createdDate: number;
  redirectData: {
    id: number;
    countryCode: string;
    type: string;
    orderType: any;
    receivedRoleType: string;
    orderNo: string;
    productDivision: any;
    toStorageCode: any;
    toStorageName: any;
    fromStorageCode: any;
    fromStorageName: any;
    toCustomerCode: any;
    toCustomerName: any;
  };
}
