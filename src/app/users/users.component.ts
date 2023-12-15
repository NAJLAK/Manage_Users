// import { Component } from '@angular/core';
// import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
// import { TranslateService } from '@ngx-translate/core';
// import { environment } from 'src/environment/environment';
// import { UsersService } from 'src/services/users.service';

// @Component({
//   selector: 'app-users',
//   templateUrl: './users.component.html',
//   styleUrls: ['./users.component.scss'],
// })
// export class UsersComponent {
//   pageNumber: any;
//   showAddUserForm: boolean = false;
//   newUser: any = { firstName: '', lastName: '' };
//   showUpdateForm: boolean = false;
//   userToUpdate: any = { id: 0, firstName: '', lastName: '' };
//   constructor(
//     private translateService: TranslateService,
//     private userService: UsersService
//   ) {
//     this.fetchData(1);
//   }

//   show_success: boolean = false;
//   show_fail: boolean = false;
//   show_cancel: boolean = false;
//   success_message_text: string = '';
//   fail_message_text: string = '';
//   cancel_message_text: string = '';

//   users: any[] = [];

//   toggleAddUserForm() {
//     this.showAddUserForm = !this.showAddUserForm;
//     this.newUser = { firstName: '', lastName: '' };
//   }
//   fetchData(nbr: number = 1) {
//     this.pageNumber = nbr;

//     this.userService.getUsers(this.pageNumber).subscribe(
//       (response) => {
//         this.users = response.data;
//         console.log(this.users);
//       },
//       (error) => {
//         console.error(error);
//       }
//     );
//   }
//   addUser() {
//     this.userService.addUser(this.newUser).subscribe(
//       (addedUser) => {
//         console.log('User added successfully', addedUser);
//         this.show_success = true;
//         this.success_message_text = 'success';
//         this.users.push(addedUser);
//         this.toggleAddUserForm();
//       },
//       (error) => {
//         console.error('Failed to add user', error);
//         this.show_fail = true;
//         this.fail_message_text = 'fail';
//       }
//     );
//   }
  
//   deleteUser(id: number) {
//     const confirmation_message = this.translateService.instant('confirmation');
//     let user_input = window.confirm(confirmation_message);

//     if (user_input) {
//       this.userService.deleteUser(id).subscribe(
//         () => {
//           console.log('User deleted successfully');
//           this.show_success = true;
//           this.success_message_text = 'success';
//           this.refresh_users(this.pageNumber);
//         },
//         (error) => {
//           console.error('Failed to delete user', error);
//           this.show_fail = true;
//           this.fail_message_text = 'fail';
//         }
//       );
//     } else {
//       const cancel_message = this.translateService.instant('cancel');
//       this.show_cancel = true;
//       this.cancel_message_text = 'cancel';
//     }
//   }

//   updateUser(id: number) {
//     this.userService.updateUser(id, this.userToUpdate).subscribe(
//       () => {
//         console.log('User updated successfully');
//         this.show_success = true;
//         this.success_message_text = 'success';
//         this.refresh_users(this.pageNumber);
//         this.showUpdateForm = false;
//       },
//       (error) => {
//         console.error('Failed to update user', error);
//         this.show_fail = true;
//         this.fail_message_text = 'fail';
//       }
//     );
//   }

//   refresh_users(pageNumber: number) {
//     this.fetchData(pageNumber);
//   }

//   success_closed() {
//     this.show_success = false;
//   }

//   fail_closed() {
//     this.show_fail = false;
//   }

//   cancel_closed() {
//     this.show_cancel = false;
//   }
// }

import { Component } from '@angular/core';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environment/environment';
import { UsersService } from 'src/services/users.service';
import { UserType } from 'src/app/types/user.type';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  pageNumber: any;
  showAddUserForm: boolean = false;
  newUser: any = { firstName: '', lastName: '' };
  showUpdateForm: boolean = false;
  userToUpdate: any = { id: 0, firstName: '', lastName: '' };

  show_success: boolean = false;
  show_fail: boolean = false;
  show_cancel: boolean = false;
  success_message_text: string = '';
  fail_message_text: string = '';
  cancel_message_text: string = '';

  users: any[] = [];

  constructor(
    private translateService: TranslateService,
    private userService: UsersService
  ) {
    this.fetchData(1);
  }

  toggleAddUserForm() {
    this.showAddUserForm = !this.showAddUserForm;
    this.newUser = { firstName: '', lastName: '' };
  }

  fetchData(nbr: number = 1) {
    this.pageNumber = nbr;

    this.userService.getUsers(this.pageNumber).subscribe(
      (response) => {
        this.users = response.data;
        console.log(this.users);
      },
      (error) => {
        console.error(error);
      }
    );
  }
  addUser() {
    // Log the data being sent to the server
    console.log('Adding user with data:', this.newUser);
  
    this.userService.addUser(this.newUser).subscribe(
      (addedUser) => {
        // Log the response from the server
        console.log('User added successfully. Server response:', addedUser);
  
        // Show success message
        this.show_success = true;
        this.success_message_text = 'success';
  
        // Update the local users array with the added user
        this.users.push(addedUser);
  
        // Reset the form and hide the add user form
        this.toggleAddUserForm();
      },
      (error) => {
        // Log the error
        console.error('Failed to add user. Server error:', error);
  
        // Show fail message
        this.show_fail = true;
        this.fail_message_text = 'fail';
      }
    );
  }
  

  deleteUser(id: number) {
    const confirmation_message = this.translateService.instant('confirmation');
    let user_input = window.confirm(confirmation_message);

    if (user_input) {
      this.userService.deleteUser(id).subscribe(
        () => {
          console.log('User deleted successfully');
          this.show_success = true;
          this.success_message_text = 'success';
          this.users = this.users.filter((user) => user.id !== id); // Remove the deleted user from the array
        },
        (error) => {
          console.error('Failed to delete user', error);
          this.show_fail = true;
          this.fail_message_text = 'fail';
        }
      );
    } else {
      const cancel_message = this.translateService.instant('cancel');
      this.show_cancel = true;
      this.cancel_message_text = 'cancel';
    }
  }
 // users.component.ts
 updateUser(id: number) {
  console.log('Updating user with ID:', id);
  const updatedUser: Partial<UserType> = {
    first_name: this.userToUpdate.first_name,
    last_name: this.userToUpdate.last_name,
  };
  console.log('Updated user data:', updatedUser);

  this.userService.updateUser(id, updatedUser).subscribe(
    (updatedUserFromServer) => {
      console.log('User updated successfully');
      console.log('Updated User:', updatedUserFromServer);
      this.show_success = true;
      this.success_message_text = 'success';
      this.refresh_users(this.pageNumber);
      this.showUpdateForm = false;
    },
    (error) => {
      console.error('Failed to update user', error);
      this.show_fail = true;
      this.fail_message_text = 'fail';
    }
  );
}


  

  refresh_users(pageNumber: number) {
    this.fetchData(pageNumber);
  }

  success_closed() {
    this.show_success = false;
  }

  fail_closed() {
    this.show_fail = false;
  }

  cancel_closed() {
    this.show_cancel = false;
  }
}

