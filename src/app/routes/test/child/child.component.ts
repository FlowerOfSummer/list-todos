import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { ParentService } from '../test.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  encapsulation: ViewEncapsulation.None
})


export class ChildComponent implements OnDestroy {
  /**
   * 子组件的数据
   * @ type {[string , string , string]}
   */
  public childData = ['来自子组件数据a', '来自子组件数据b', '来自子组件数据c'];
  /**
   * 存储来自父组件数据
   * @ type {Array}
   */
  public dataFromParent = [];
  public nextData = 0;
  public subscription: Subscription;
  constructor(private parentService: ParentService) {
    this.subscription = parentService.parentToChild$.subscribe(data => {
      this.dataFromParent.push(`${data}`);
    });
  }

  /**
   * 发射数据到父组件
   */
  public emissionDataToParent() {
    const toParentData = this.childData[this.nextData++];
    this.parentService.childToParent(toParentData);
    if (this.nextData >= this.childData.length) { this.nextData = 0; }
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}

