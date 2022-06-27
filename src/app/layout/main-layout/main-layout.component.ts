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
import { Data } from '@angular/router';
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
  countNotiUnRead = 0;
  page = 1;
  activeNotify = 1;
  check = false;

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
    | ElementRef<HTMLElement>
    | undefined;

  constructor(
    private authService: AuthService,
    private notifyService: NotificationService
  ) {}

  ngOnInit(): void {
    this.authService
      .getUserInfo()
      .subscribe((res) => this.authService.setUserInfo(res));
    this.authService
      .getUserProfile()
      .subscribe((res) => this.authService.setUserProfile(res));
    this.notifyService
      .getNotification()
      .subscribe((res) => this.notifyService.setNotifycation(res));
    this.notifyService
      .getCountNoticationUnRead()
      .subscribe((res) => this.countNotiUnRead = res.data);

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
    let currentPage = this.notification
      ?.data as unknown as DataNotificationResponse;
    this.handleNotifycationAllScroll(currentPage);
  }

  handleNotifycationAllScroll(currentPage: DataNotificationResponse) {
    switch (this.activeNotify) {
      case 1:
        this.notifyService.getNotification(this.page).subscribe((res) => {
          let data = concat(
            currentPage,
            res.data
          ) as unknown as DataNotificationResponse;
          let response = { ...res, data } as unknown as NotificationResponse;
          this.notifyService.setNotifycation(response);
        });
        break;
      case 2:
        this.notifyService.getNotificationRead(this.page).subscribe((res) => {
          let data = concat(
            currentPage,
            res.data
          ) as unknown as DataNotificationResponse;
          let response = { ...res, data } as unknown as NotificationResponse;
          this.notifyService.setNotifycation(response);
        });
        break;
      case 3:
        this.notifyService.getNotificationUnRead(this.page).subscribe((res) => {
          let data = concat(
            currentPage,
            res.data
          ) as unknown as DataNotificationResponse;
          let response = { ...res, data } as unknown as NotificationResponse;
          this.notifyService.setNotifycation(response);
        });
        break;
    }
  }

  handleNotifycationAll() {
    this.page = 1;
    this.refScrollNoti?.nativeElement.scrollTo(0, 0);
    this.activeNotify = 1;
    this.notifyService
      .getNotification()
      .subscribe((res) => this.notifyService.setNotifycation(res));
  }

  handleNotifycationRead() {
    this.page = 1;
    this.refScrollNoti?.nativeElement.scrollTo(0, 0);
    this.activeNotify = 2;
    this.notifyService
      .getNotificationRead()
      .subscribe((res) => this.notifyService.setNotifycation(res));
  }

  handleNotifycationUnRead() {
    this.page = 1;
    this.refScrollNoti?.nativeElement.scrollTo(0, 0);
    this.activeNotify = 3;
    this.notifyService.getNotificationUnRead().subscribe((res) => {
      this.notifyService.setNotifycation(res);
    });
  }
}
