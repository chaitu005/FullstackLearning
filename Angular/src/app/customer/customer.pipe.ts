import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transform'
})
export class CustomerPipe implements PipeTransform {

  transform(value: any, colID:any): any {
    if(colID == "Gender"){
      value = value== 1? "Male" : "Female";
    }
    return value;
  }

}
