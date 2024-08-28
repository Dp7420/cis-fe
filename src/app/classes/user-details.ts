export class UserDetails {
  id?: number;
  fullName: string;
  userName: string;
  email: string;
  mobile: number;
  password: string;
  role: String = 'USER';
  designation: string;
  status: String = 'PENDING';
  cin: string;
  companyname: string;

  company: {
    companyId?: number;
    companyname?: string;
  }= { companyId: undefined, companyname:undefined };
}
