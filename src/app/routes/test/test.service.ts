import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class ParentService {
  // 数据源 next(发射数据)
  private parentToChildSource = new Subject<string>();
  private childToParentSource = new Subject<string>();

  // 数据流 subscribe(取得数据)，在组件中需要订阅
  public parentToChild$ = this.parentToChildSource.asObservable();
  public childToParent$ = this.childToParentSource.asObservable();

  constructor() { }

  public parentToChild(parentDataItem: string) {
    this.parentToChildSource.next(parentDataItem);
  }

  public childToParent(childDataItem: string) {
    this.childToParentSource.next(childDataItem);
  }
}

