import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'serchPipe'
})
export class SerchPipePipe implements PipeTransform {

  transform(myarray: any[],text: string): any {
    return myarray.filter((item) => item.title.toLowerCase().includes(text.toLowerCase()));
  }

}
