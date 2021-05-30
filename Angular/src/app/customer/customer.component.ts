import { Component, OnInit } from '@angular/core';
import { CustomerService } from './services/customer/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})

// export class CustomerData {
//   StudentId: string;
//   DateOfBirth: string;
//   Email: string;
//   FirstName: string;
//   LastName: string;
//   constructor(){
//     this.StudentId = "";
//     this.DateOfBirth = "";
//     this.Email = "";
//     this.FirstName = "";
//     this.LastName = "";

//   }
// }

export class CustomerComponent implements OnInit {
  constructor(private customerService: CustomerService) { 
    
  }
  customers :any = []
  customersFound :any =[]
  columns :any = []
  customerID : any = "";
  customer:any= {};
  msgText:string="";
  searchKey:string="";
  ngOnInit(): void {
    this.loadColumns();
    this.loadCustomers();
    this.setCustomerParams();
  }

  setCustomerParams(){
    // this.customer.StudentId = "";
    this.customer.DateOfBirth = "";
    this.customer.Email = "";
    this.customer.FirstName = "";
    this.customer.LastName = "";
    this.customer.Gender = "";
    this.customer.Education = [];
    this.customer.About = "";
  }
 
  education: any = [
    {
      name: "SSC",
      value: "SSC"
    },
    {
      name: "Inter",
      value: "Inter"
    },
    {
      name: "Btech",
      value: "Btech"
    },
    {
      name: "PG",
      value: "PG"
    },
    {
      name: "DPG",
      value: "DPG"
    }
  ];

  onChange(name: string, obj: any) {
    if (obj.target.checked) {
      this.customer.Education.push(name);
    } else {
      // let index = this.customer.Education.indexOf(name)
      // this.customer.Education.removeAt(index);
      this.customer.Education.splice(this.customer.Education.indexOf(name), 1);
    }
  }

  loadColumns():void{
    this.columns = []
    this.columns.push({id:"StudentId", title:"StudentId"});
    this.columns.push({id:"FirstName", title:"FirstName"});
    this.columns.push({id:"LastName", title:"LastName"});
    this.columns.push({id:"Email", title:"Email"});
    this.columns.push({id:"DateOfBirth", title:"DateOfBirth"});
    this.columns.push({id:"Gender", title:"Gender"});
    this.columns.push({id:"Education", title:"Education"});
    this.columns.push({id:"About", title:"About"});
  }
  loadCustomers():void{
    this.customerService.getCustomers()
    .subscribe(
      (data)=>{
        if(data){
          //console.log(data);
          this.customers = data; 
        }
        
      }
    )
  }
  searchCustomers():void{
    this.customerService.searchCustomers(this.searchKey)
    .subscribe(
      (data)=>{
        if(data){
          //console.log(data);
          this.customersFound = data; 
        }
        
      }
    )
  }

  deleteCustomer():void{

  }
  loadCustomer():void{
    if(this.customerID){
      this.customerService.getCustomer(this.customerID)
      .subscribe(
        (data)=>{
          if(data){
            this.customersFound = data; 
          }
          
        }
      )
    }
  }
  addCustomer():void{
      if(this.validateCustomer()){
        this.customerService.addCustomer(this.customer)
        .subscribe(
          (data)=>{
            if(data){
              
            }
            this.setCustomerParams();
            this.loadCustomers();
            this.msgText = "User added successfully!!";
          }
        )
      }
     
  }
  validateCustomer():boolean{
      var dateVal = Date.parse(this.customer.DateOfBirth);
      this.msgText="";
      if(this.isUserExits()){
        this.msgText ="User Already Exists!!";
        return false;
      }
      else if(!this.customer.DateOfBirth)
      {
        this.msgText ="Please enter Date of Birth!!";
        return false;
      }
      else if (isNaN(dateVal) || !this.isDateGraterThan20Years()) {
        this.msgText ="Please enter valid Date of Birth!!";
        return false;
      }
      else{
        return true;
      }
  }
  isDateGraterThan20Years():boolean{
    let dob = new Date(this.customer.DateOfBirth);
    let today = new Date();
    if((today.getFullYear() - dob.getFullYear())>20){
      return true;
    }
    else{
      return false;
    }
  }
  isUserExits():boolean{
    return this.customers.some((cust: { FirstName: any; LastName: any; Email: any; DateOfBirth: any; })=>
        cust.FirstName.toUpperCase() ==this.customer.FirstName.toUpperCase().trim()
        && cust.LastName.toUpperCase()==this.customer.LastName.toUpperCase().trim()
        && cust.Email.toUpperCase()==this.customer.Email.toUpperCase().trim()
        && cust.DateOfBirth==this.customer.DateOfBirth.trim()
        )
  }

}
