import { Component, OnInit, inject } from '@angular/core';
import { PaymentsService } from '../../core/services/payments.service';
import { Allorders } from '../../core/interfaces/allorders';
import { DatePipe } from '@angular/common';
import { jwtDecode } from 'jwt-decode';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [DatePipe, RouterLink],
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.scss']
})
export class AllordersComponent implements OnInit {
  private readonly _PaymentsService = inject(PaymentsService);

  currentDate: Date = new Date();

  userId: any;
  allUserOrders: Allorders[] = [];

  ngOnInit(): void {
    const userData = this._PaymentsService.decodeUserData()
    this.userId = userData.id;
    this.displayUserOrders();
  }

  displayUserOrders() {
    this._PaymentsService.getUserOrders(this.userId).subscribe({
      next: (response) => {
        this.allUserOrders = response

      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}


