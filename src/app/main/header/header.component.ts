import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/authentication/session.services';
import { LoggedUserData } from 'src/app/models/loggedUserData.model';
import { ApiService } from 'src/app/Service/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user: LoggedUserData | null = null;
  readonly documentValue: number = this.sessionService.getItem("document") ?? 0;
  constructor(
    public router: Router,
    public sessionService: SessionService,
    public apiService: ApiService
  ) { }

  ngOnInit(): void {
    if (this.sessionService.isLoggedIn()) {
      this.apiService.getMembersByDocument(this.documentValue).subscribe(data => {
        this.user = data;
        this.sessionService.setItem("UserAddress", data.address);
        this.sessionService.setIsAdmin(Boolean(data.roleName));
      });
    }
  }

  logout(): void {
    this.sessionService.clear();
    this.router.navigate(['/login']);
  }

  controlPanel(): void {
    this.router.navigate(['/mis_citas']);
  }
}

