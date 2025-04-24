export  class EmployeeModel {
    empid: number;
    name: string;
    city: string;
    state: string;
    emailid: string;
    contactno: string;
    address: string;
    pincode: string;

    constructor() {
        this.empid = 1;
        this.name ='';
        this.city = '';
        this.state = '';
        this.emailid = '';
        this.contactno = '';
        this.address = '';
        this.pincode = '';
    }

}