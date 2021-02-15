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

  get assetColor() {
    let ratio = (this.item.last_signal + 2.)/ 4.
    ratio = ratio > 1 ? 1 : ratio;
    ratio = ratio < 0 ? 0 : ratio;

    const color2 = 'FF0000';
    const color1 = '00FF00';
    const hex = function(x) {
        x = x.toString(16);
        return (x.length == 1) ? '0' + x : x;
    };

    const r = Math.ceil(parseInt(color1.substring(0,2), 16) * ratio + parseInt(color2.substring(0,2), 16) * (1-ratio));
    const g = Math.ceil(parseInt(color1.substring(2,4), 16) * ratio + parseInt(color2.substring(2,4), 16) * (1-ratio));
    const b = Math.ceil(parseInt(color1.substring(4,6), 16) * ratio + parseInt(color2.substring(4,6), 16) * (1-ratio));

    const middle = hex(r) + hex(g) + hex(b);

    return `#${middle}`;
  }
}
