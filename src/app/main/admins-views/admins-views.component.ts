import { Component } from '@angular/core';
import { SessionService } from 'src/app/authentication/session.services';

@Component({
  selector: 'app-admins-views',
  templateUrl: './admins-views.component.html',
  styleUrls: ['./admins-views.component.css']
})
export class AdminsViewsComponent {

  constructor(private sessionService: SessionService) {}
   
  selectedComponent: string = "citas";
  isAdmin: boolean = this.sessionService.isAdmin();
  
  onToggleChange(value: string) {
    this.selectedComponent = value;
  }
}
