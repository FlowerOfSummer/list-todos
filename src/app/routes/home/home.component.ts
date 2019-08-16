import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { AppService } from '../../service/home.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {

  clearFlag;
  inputValue;
  listsFlag;

  subscription: Subscription;
  constructor(public AppS: AppService, private route: ActivatedRoute) {
    this.AppS = AppS;
    this.route = route;
    this.subscription = AppS.changeEvent.subscribe(({type, data}) => {
      if (type === 'showList') {
        this.showClearFlag();
        setTimeout(() => {
          this.listsFlag = this.AppS.lists.length > 0;
        });
      }
    });
  }

  get tab() {
    return this.AppS.tab;
  }

  get showLists() {
    return this.AppS.showLists || [];
  }

  ngOnInit(): void {}


  addItem() {
    if (this.inputValue) {
        this.AppS.addItem(this.inputValue);
    }
    this.inputValue = '';
  }

  clearAllComplete() {
    this.AppS.clearAllComplete();
  }

  // 显示正活跃的任务的条数
  get activedCount() {
    return this.AppS.getActivedCount;
  }

  // 点击全部按钮，实现所有事件状态的改变
  allComplete() {
    let count = 0;
    count = this.showLists.filter(item => {
      return item.completedFlag === true;
    }).length;
    const completedFlag = count === this.showLists.length ? false : true;
    this.AppS.chanageStatus(completedFlag);
  }

  // 判断是否出现clear Completed按钮
  showClearFlag() {
    let num = 0;
    num = this.showLists.filter(item => {
      return item.completedFlag === true;
    }).length;
    this.clearFlag = num > 0;
  }
}
