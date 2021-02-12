import { Component, Input, OnInit } from '@angular/core';
import { TickerResolver } from 'src/app/app-config';

@Component({
  selector: 'app-asset-item',
  templateUrl: './asset-item.component.html',
  styleUrls: ['./asset-item.component.css']
})
export class AssetItemComponent implements OnInit {

  @Input() item: any;
  @Input() type: string;
  constructor() { }

  ngOnInit(): void {
  }

  resolve(a) {
    return  TickerResolver(a)
  } 
}
