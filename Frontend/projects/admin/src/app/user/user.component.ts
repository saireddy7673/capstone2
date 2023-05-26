import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.getUsers();
  }

  deleteUser(id: string) {
    this.userService.deleteUser(id).subscribe((response) => {
      alert('User is deleted');
      this.getUsers();
    });
  }

  updateUser(id: string) {
    this.router.navigateByUrl(`users/form/${id}`);
  }

  getUsers() {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }
}
