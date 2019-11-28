import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css']
})
export class NewPostComponent implements OnInit {

  public registerForm: FormGroup;
  public submitted = false;
  public message = '';
  flagRes: boolean = false;

  constructor( private formBuilder: FormBuilder,
               private postService: PostService) { }

  ngOnInit() {
    this.initnewPost();
  }

  initnewPost() {
    this.registerForm = this.formBuilder.group({
      title: [ '', Validators.required ],
      body: [ '', Validators.required ],
      userId: [ '', Validators.required ]
    });
  }

  onSubmit(){
    if (this.registerForm.invalid) {
      this.submitted = true;
        return;
    }
 
  	this.postService.postNewPost(this.registerForm.value)
      .subscribe((res: any) => {
        console.log(res);
        this.submitted = false;
        this.flagRes = true;
        this.initnewPost();
        this.message = "Successful post :)";
      }, (error: any) => {
        this.submitted = false;
        this.flagRes = true;
        this.message = "Error, please try it later :(";
        console.log(error);
  	});
  }

}
