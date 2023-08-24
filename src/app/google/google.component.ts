import { Component } from '@angular/core';

@Component({
  selector: 'app-google',
  templateUrl: './google.component.html',
  styleUrls: ['./google.component.less',]
  // styles: [
  //   'nz-row {background-color: white; min-height: 70%}',
  //   "nz-result {background-color: '#f0f2f5'}"
  // ]
})
export class GoogleComponent {
  dataSet: {key: string, name: string, age: number, address: string}[] = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park'
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park'
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    }
  ];
}
