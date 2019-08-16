import { Component, ViewEncapsulation, OnInit, Input } from '@angular/core';
import { AppService } from '../../../service/home.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-show-list',
  templateUrl: './show-list.component.html',
  styleUrls: ['./show-list.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ShowListComponent implements OnInit {
  constructor(public AppS: AppService, private route: ActivatedRoute) {}

  get showLists() {
    return this.AppS.showLists;
  }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.AppS.changeTab(data.tab);
    });
  }

  deleteItem(id) {
    this.AppS.deleteItem(id);
  }

  // 根据是否选中，改变状态
  ifChecked(event, item) {
    item.completedFlag = event.currentTarget.checked ? true : false;
    this.AppS.chanageStatus(item.completedFlag, item.id);
  }

  // 双击可编辑
  changeEvent(item) {
    this.showLists.forEach(e => {
      e.canEdit = e.id === item.id ? true : false;
    });
  }

  // enter键调用函数
  changeName(e, item) {
    item.canEdit = false;
    this.AppS.chanageName(item.id, e.currentTarget.value);
  }
}
