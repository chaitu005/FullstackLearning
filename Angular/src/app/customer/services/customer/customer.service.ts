
import { Injectable } from '@angular/core';
 
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';

 
@Injectable({
  providedIn: 'root'
})
export class CustomerService {
 
  getBaseURL: string = "https://test-erms.azurewebsites.net/api/hol/get";
  deleteBaseURL: string="https://test-erms.azurewebsites.net/api/hol/delete";
  addBaseURL:string="https://test-erms.azurewebsites.net/api/hol/post";
  searchBaseURL:string="https://test-erms.azurewebsites.net/api/hol/post";
  headerVals = {
    "x-username":"chait",
    "x-token": "Y2hhaXQ=",
    "Content-Type":"application/json"
  }
  constructor(private http: HttpClient) {
  }


  getCustomers(): Observable<any> {
    this.getBaseURL = "http://localhost:4200/api/users"
    return this.http.get(this.getBaseURL,{headers: new HttpHeaders(this.headerVals)})
  }
 

  getCustomer(customerID:any): Observable<any> {
    return this.http.get(this.getBaseURL+"?searchText="+customerID.trim(),{headers: new HttpHeaders(this.headerVals)})
  }
  deleteCustomer(customerID:any) {
    //Implementation of delete customer logic needed
  }

  addCustomer(customer:any): Observable<any> {

    let customerObj={
        DateOfBirth: customer.DateOfBirth.trim(),
        Email:  customer.Email.trim(),
        FirstName:  customer.FirstName.trim(),
        LastName:  customer.LastName.trim(),
        StudentID:0,
        Education: customer.Education,
        Gender : customer.Gender,
        About : customer.About
    }
    var objectToSend = JSON.stringify(customerObj);
    this.addBaseURL = "http://localhost:4200/api/adduser";
    return this.http.post(this.addBaseURL,objectToSend,{
      headers: new HttpHeaders(this.headerVals)
    })
  }
  searchCustomers(key:String): Observable<any> {
    this.searchBaseURL = "http://localhost:4200/api/searchuser"
    key = key==""?"*":key.trim();
    return this.http.post(this.searchBaseURL,key,{
      headers: new HttpHeaders(this.headerVals)
    })
  }
 
}