
export class Customers {
  customerId?: number;
  primaryName: string;
  secondaryName: string;
  primaryMobile: number;
  primaryEmail: string;
  secondaryEmail: String;
  secondaryMobile: String;
  companyName: string;
  cin: string;
  comTelephone: number;
  mainPerson: string;
  designation: string;
  pan: string;
  gst: string;
  companyEmail: string;
  address: string;
  website: string;
  contactNo: number;
  state: string;
  pincode: number;
  

  services: Array<{
    serviceId: number;
    serviceName: string;
    category: {
      categoryId: number;
      categoryName: string;
    }
  }>;
}
