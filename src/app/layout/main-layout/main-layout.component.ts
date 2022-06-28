import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';
import {
  UserInfoResponse,
  UserProfileResponse,
} from 'src/app/core/interface/auth';
import {
  DataNotificationResponse,
  NotificationResponse,
} from 'src/app/core/interface/notification';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { NotificationService } from 'src/app/shared/services/notification/notification.service';
import { concat } from 'lodash';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { TranslateService } from '@ngx-translate/core';
import { CookieStorage } from 'src/app/core/utils/cookie';
@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnInit, AfterViewInit {
  isCollapsed = false;
  isCollapsedMobile = false;
  isCollapsedMenuRight = false;

  openProfile = false;
  openNotifycation = false;
  openNotifycationMobile = false;
  countNotiUnRead = 0;

  page = 1;
  activeNotify = 1;
  check = false;
  totalPage = 0;

  //ng-modal select
  language = "en"
  fontZoom = "1rem"

  resizeObservable$!: Observable<any>;
  resizeSubscription$!: Subscription;
  clickedPopupElement!: Subscription;

  userInfo: UserInfoResponse | null = null;
  userProfile: UserProfileResponse | null = null;
  notification: NotificationResponse | null = null;

  @ViewChild('refAvatar') refAvatar: ElementRef<HTMLButtonElement> | undefined;
  @ViewChild('refPopup') refPopup: ElementRef<HTMLDivElement> | undefined;
  @ViewChild('refSider') refSider: ElementRef<HTMLElement> | undefined;
  @ViewChild('refScrollNoti') refScrollNoti:
    | CdkVirtualScrollViewport
    | undefined;
  @ViewChild(CdkVirtualScrollViewport)
  viewport!: CdkVirtualScrollViewport;

  constructor(
    private authService: AuthService,
    private notifyService: NotificationService,
    private translate: TranslateService,
    private cookieStorage: CookieStorage,
  ) {}

  ngOnInit(): void {
    this.authService
      .getUserInfo()
      .subscribe((res) => this.authService.setUserInfo(res));
    this.authService
      .getUserProfile()
      .subscribe((res) => this.authService.setUserProfile(res));
    this.notifyService.getNotification().subscribe((res) => {
      if (res.meta) {
        this.totalPage = res.meta.totalPages;
      } else {
        this.totalPage = 1;
      }
      this.notifyService.setNotifycation(res);
    });
    this.notifyService
      .getCountNoticationUnRead()
      .subscribe((res) => (this.countNotiUnRead = res.data));

    this.authService.userInfo$.subscribe((res) => {
      this.userInfo = res;
    });
    this.authService.userProfile$.subscribe((res) => {
      this.userProfile = res;
    });
    this.notifyService.notification$.subscribe((res) => {
      this.notification = res;
    });
  }

  ngAfterViewInit(): void {
    this.resizeObservable$ = fromEvent(window, 'resize');
    this.resizeSubscription$ = this.resizeObservable$.subscribe((evt) => {
      this.openNotifycation = false;
      this.openNotifycationMobile = false;
      if (evt.target.innerWidth < 1000) {
        this.refSider?.nativeElement.classList.remove('show');
        this.isCollapsedMobile = false;
      }
    });

    fromEvent(window, 'click').subscribe((e: any) => {
      if (
        this.refPopup?.nativeElement.contains(e.target) ||
        this.refAvatar?.nativeElement.contains(e.target)
      ) {
        this.openProfile = true;
      } else {
        this.openProfile = false;
      }
    });
  }

  handleOpenProfile() {
    this.openProfile = true;
  }

  handleCloseProfile() {
    this.openProfile = false;
  }

  onScroll() {
    this.page++;
    if (this.notification?.data) {
      let currentPage = this.notification
        .data as unknown as DataNotificationResponse;
      this.handleNotifycationAllScroll(currentPage);
    }
  }

  handleChangeLanguage(e: Event) {
    this.cookieStorage.setCookie('lang', e.toString());
    this.translate.use(this.cookieStorage.getCookie('lang') || 'en');
  }

  handleFontZoom(e: Event) {
    let text: any = document.querySelectorAll(".text");
    for (let index = 0; index < text.length; index++) {
      text[index].style.fontSize = e.toString();
    }
  }

  handleNotifycationAllScroll(currentPage: DataNotificationResponse) {
    switch (this.activeNotify) {
      case 1:
        this.notifyService.getNotification(this.page).subscribe((res) => {
          this.totalPage = res.meta.totalPages;
          if (res.data.length > 0) {
            let data = concat(
              currentPage,
              res.data
            ) as unknown as DataNotificationResponse;
            let response = { ...res, data } as unknown as NotificationResponse;
            this.notifyService.setNotifycation(response);
          }
        });
        break;
      case 2:
        this.notifyService.getNotificationRead(this.page).subscribe((res) => {
          this.totalPage = res.meta.totalPages;
          if (res.data.length > 0) {
            let data = concat(
              currentPage,
              res.data
            ) as unknown as DataNotificationResponse;
            let response = { ...res, data } as unknown as NotificationResponse;
            this.notifyService.setNotifycation(response);
          }
        });
        break;
      case 3:
        this.notifyService.getNotificationUnRead(this.page).subscribe((res) => {
          this.totalPage = res.meta.totalPages;
          if (res.data.length > 0) {
            let data = concat(
              currentPage,
              res.data
            ) as unknown as DataNotificationResponse;
            let response = { ...res, data } as unknown as NotificationResponse;
            this.notifyService.setNotifycation(response);
          }
        });
        break;
    }
  }

  handleNotifycationAll() {
    this.page = 1;
    this.activeNotify = 1;
    this.refScrollNoti?.scrollToIndex(0);
    this.notifyService.getNotification().subscribe((res) => {
      if (res.meta) {
        this.totalPage = res.meta.totalPages;
      } else {
        this.totalPage = 1;
      }
      this.notifyService.setNotifycation(res);
    });
  }

  handleNotifycationRead() {
    this.page = 1;
    this.activeNotify = 2;
    this.refScrollNoti?.scrollToIndex(0);
    this.notifyService.getNotificationRead().subscribe((res) => {
      if (res.meta) {
        this.totalPage = res.meta.totalPages;
      } else {
        this.totalPage = 1;
      }
      this.notifyService.setNotifycation(res);
    });
  }

  handleNotifycationUnRead() {
    this.page = 1;
    this.activeNotify = 3;
    this.refScrollNoti?.scrollToIndex(0);
    this.notifyService.getNotificationUnRead().subscribe((res) => {
      if (res.meta) {
        this.totalPage = res.meta.totalPages;
      } else {
        this.totalPage = 1;
      }
      this.notifyService.setNotifycation(res);
    });
  }

  handleResetNotification() {
    switch (this.activeNotify) {
      case 1:
        this.handleNotifycationAll();
        break;
      case 2:
        this.handleNotifycationRead();
        break;
      case 3:
        this.handleNotifycationUnRead();
        break;
      default:
        break;
    }
  }

  nextListItem(val: any) {
    const total = this.viewport.getDataLength();
    const end = this.viewport.getRenderedRange().end;

    if (this.page == this.totalPage) {
      return;
    } else if (end == total) {
      this.onScroll();
    }
  }

  trackByIdx(i: number) {
    return i;
  }
}
