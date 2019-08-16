import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { summaryFileName } from '@angular/compiler/src/aot/util';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

/**
 * 用于应用启动时
 * 一般用来获取应用所需要的基础数据等
 */
@Injectable({
  providedIn: 'root'
})
export class AppService {
  lists;
  showLists = [];
  tab = '';

  localStore = window.localStorage;
  lastId;

  constructor() {
    this.lists = this.getLocalStorage() || [];
  }

  // 实例化一个Subjject对象
 public changeEvent = new Subject();

  changeTab(tab) {
    this.tab = tab;
    this.getShowList(tab);
  }

  getLocalStorage() {
    return JSON.parse(this.localStore.getItem('key'));
  }

  setLocalStorage(lists) {
    this.localStore.setItem('key', JSON.stringify(lists));
  }

  getShowList(tab?) {
    tab = tab || this.tab;
    if (tab === 'actived') {
      this.showLists = this.lists.filter(item => {
        return item.completedFlag === false;
      });
    } else if (tab === 'completed') {
      this.showLists = this.lists.filter(item => {
        return item.completedFlag === true;
      });
    } else {
      this.showLists = this.lists.slice();
    }

    this.changeEvent.next({
      type: 'showList',
      data: this.showLists
    });
  }

  deleteItem(id) {
    let index;
    index = this.lists.findIndex(item => {
      return item.id === id;
    });
    this.lists.splice(index, 1);
    this.setLocalStorage(this.lists);
    this.getShowList();
  }

  clearAllComplete() {
    this.lists = this.lists.filter(e => {
      return e.completedFlag === false;
    });
    this.setLocalStorage(this.lists);
    this.getShowList();
  }

  addItem(name) {
    const data = {
      id: (new Date()).getTime(),
      name,
      completedFlag: false,
    };
    this.lists.push(data);
    this.setLocalStorage(this.lists);
    this.getShowList();
  }

  get getActivedCount() {
    return this.lists.filter(item => {
      return item.completedFlag === false;
    }).length;
  }

  chanageStatus(status, id?) {
    if (id) {
      let index;
      index = this.lists.findIndex(item => {
        return item.id === id;
      });
      this.lists[index].completedFlag = status;
    } else {
      this.lists.forEach(e => {
        e.completedFlag = status;
      });
    }
    this.setLocalStorage(this.lists);
    this.getShowList();
  }

  chanageName(id, name) {
    let index;
    index = this.lists.findIndex(item => {
      return item.id === id;
    });
    this.lists[index].name = name;
    this.setLocalStorage(this.lists);
  }
}
