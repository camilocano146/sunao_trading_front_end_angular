import { Injectable } from '@angular/core';
import {SnotifyPosition, SnotifyService} from 'ng-snotify';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {
  configSuccess = {timeout: 3000, titleMaxLength: 50, position: SnotifyPosition.rightTop, showProgressBar: false};
  configWarning = {timeout: 3000, titleMaxLength: 50, position: SnotifyPosition.rightTop, showProgressBar: false};
  configError = {timeout: 3000, titleMaxLength: 50, showProgressBar: false, position: SnotifyPosition.rightTop};
  configErrorSnapshot = {timeout: 4000, showProgressBar: false, titleMaxLength: 200, position: SnotifyPosition.rightTop};
  configErrorSnapshotLong = {timeout: 5000, showProgressBar: false, titleMaxLength: 200, position: SnotifyPosition.rightTop};
  configWarningSnapshotLong = {timeout: 5000, showProgressBar: false, titleMaxLength: 200, position: SnotifyPosition.rightTop};
  configSuccessSnapshot = {timeout: 4000, showProgressBar: false, titleMaxLength: 200, position: SnotifyPosition.rightTop};
  configErrorTime = {timeout: 2000, titleMaxLength: 50, position: SnotifyPosition.rightTop, showProgressBar: false};

  constructor(private snotifyService: SnotifyService, private translate: TranslateService) {}

  showSuccess(title, body?): void {
    this.snotifyService.success(body, title, this.configSuccess);
  }

  showError(title, body): void {
    this.snotifyService.error(body, title, this.configError);
  }

  showErrorSnapshot(body, title?): void {
    this.snotifyService.error(body, title, this.configErrorSnapshot);
  }

  showErrorSnapshotLong(body, title?): void {
    this.snotifyService.error(body, title, this.configErrorSnapshotLong);
  }

  showSuccessSnapshot(body, title?): void {
    this.snotifyService.success(body, title, this.configSuccessSnapshot);
  }

  showWarningSnapshot(body, title?): void {
    this.snotifyService.warning(body, title, this.configWarningSnapshotLong);
  }

  showErrorTime(title, body): void {
    this.snotifyService.error(body, title, this.configErrorTime);
  }

  showErrorWithMethod(title, body, classOfMethod, method): void {
    this.snotifyService.error(body, title, {timeout: 0, titleMaxLength: 50, position: SnotifyPosition.rightTop, buttons: [
        {text: 'Reintentar', action: () => method.call(classOfMethod), bold: true}
      ]});
  }

  showWarning(title, body): void {
    this.snotifyService.warning(body, title, this.configWarning);
  }

  clear(): void {
    this.snotifyService.clear();
  }

  showSuccessCreateOrEdit(dataEdit: boolean): void {
    if (dataEdit) {
      this.showSuccessSnapshot(this.translate.instant('success.element_updated'));
    } else {
      this.showSuccessSnapshot(this.translate.instant('success.element_created'));
    }
  }
}
