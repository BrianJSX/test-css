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
import { LanguageService } from 'src/app/shared/services/language/language-service.service';
import { Router } from '@angular/router';
import { FontsizeService } from 'src/app/shared/services/fontSize/fontsize.service';
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
  openProfileMobile = false;
  openNotifycation = false;
  openNotifycationMobile = false;
  countNotiUnRead = 0;

  page = 1;
  activeNotify = 1;
  check = false;
  totalPage = 0;

  //ng-modal select
  language = this.cookieStorage.getCookie('lang') || 'en';
  fontZoom = '1rem';
  fontZoomMobile = '1rem';

  resizeObservable$!: Observable<any>;
  resizeSubscription$!: Subscription;
  clickedPopupElement!: Subscription;

  userInfo: UserInfoResponse | null = null;
  userProfile: UserProfileResponse | null = null;
  notification: NotificationResponse | null = null;

  @ViewChild('refContent') refcontent!: ElementRef<HTMLButtonElement>;
  @ViewChild('refNotiMessage') refNotiMessage!: ElementRef<HTMLButtonElement>;
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
    private languageService: LanguageService,
    private fontSizeService: FontsizeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.languageService.language$.subscribe((language) => {
      if (language) {
        this.translate.use(language);
        this.language = language;
      }
    });

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

    this.fontSizeService.fontSize$.subscribe((fontSize) => {
      if (fontSize) {
        this.fontZoom = fontSize;
        this.handleFontZoom(fontSize, 'getFirst');
      }
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
    this.handleZoomUserProfile();
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

  handleLogout() {
    this.authService.logout().subscribe(
      (res) => {
        this.cookieStorage.deleteAllCookies();
        this.router.navigateByUrl('/auth/login-penguin');
      },
      (err) => {
        this.cookieStorage.deleteAllCookies();
        this.router.navigateByUrl('/auth/login-penguin');
      }
    );
  }

  handleSwitchCountry() {
    this.router.navigateByUrl('/choose-country');
  }

  handleChangeLanguage(e: Event) {
    this.authService
      .updateUserProfile({ language: e.toString() })
      .subscribe((res) => console.log(res));
    this.languageService.setLanguage(e.toString());
    this.cookieStorage.setCookie('lang', e.toString());
  }

  handleFontZoom(e: Event | string, first?: string) {
    let fontSize = "0";
    let language = this.cookieStorage.getCookie("lang");
    this.fontZoom = e.toString();
    switch (e.toString()) {
      case '1rem':
        fontSize = "0";
        break;
      case '1.1rem':
        fontSize = "1";
        break;
      case '1.2rem':
        fontSize = "2";
        break;
      case '1.3rem':
        fontSize = "3";
        break;
    }
    if (first) {
      this.refcontent.nativeElement.style.fontSize = e.toString();
    } else {
      this.authService.updateUserProfile({ fontSize, language }).subscribe(res => console.log(res));
      this.refcontent.nativeElement.style.fontSize = e.toString();
    }
  }

  handleZoomNotication() {
    setTimeout(() => {
      let cdkScrollRef: HTMLDivElement | null = document.querySelector(
        '.cdk-virtual-scroll-content-wrapper'
      );
      let notifyAction: HTMLDivElement | null = document.querySelector(
        '.dashboard-notification-action'
      );
      switch (this.fontZoom) {
        case '1rem':
          if (cdkScrollRef && notifyAction) {
            cdkScrollRef.style.fontSize = '100%';
            notifyAction.style.fontSize = '100%';
          }
          break;
        case '1.1rem':
          if (cdkScrollRef && notifyAction) {
            cdkScrollRef.style.fontSize = '110%';
            notifyAction.style.fontSize = '110%';
          }
          break;
        case '1.2rem':
          if (cdkScrollRef && notifyAction) {
            cdkScrollRef.style.fontSize = '120%';
            notifyAction.style.fontSize = '120%';
          }
          break;
        case '1.3rem':
          if (cdkScrollRef && notifyAction) {
            cdkScrollRef.style.fontSize = '130%';
            notifyAction.style.fontSize = '130%';
          }
          break;
      }
    }, 100);
  }

  handleZoomUserProfile() {
    setTimeout(() => {
      let userInfoRef: HTMLDivElement | null = document.querySelector(
        '.dashboard-userInfoAv'
      );
      if (userInfoRef) {
        switch (this.fontZoom) {
          case '1rem':
            if (userInfoRef) {
              userInfoRef.style.fontSize = '100%';
            }
            break;
          case '1.1rem':
            if (userInfoRef) {
              userInfoRef.style.fontSize = '110%';
            }
            break;
          case '1.2rem':
            if (userInfoRef) {
              userInfoRef.style.fontSize = '120%';
            }
            break;
          case '1.3rem':
            if (userInfoRef) {
              userInfoRef.style.fontSize = '130%';
            }
            break;
        }
      }
    }, 0);
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
