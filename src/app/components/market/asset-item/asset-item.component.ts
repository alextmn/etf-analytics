import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-asset-item',
  templateUrl: './asset-item.component.html',
  styleUrls: ['./asset-item.component.css']
})
export class AssetItemComponent implements OnInit {

  @Input() item: any;
  constructor() { }

  ngOnInit(): void {
  }

}
