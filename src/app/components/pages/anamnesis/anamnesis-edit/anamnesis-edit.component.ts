import { ShareDataService } from './../../../../services/share-data/share-data.service';
import { isObjectEmpty, sortByKey } from 'src/app/app.utils';
import { subscribeOn } from 'rxjs/operators';
import { AnamnesisService } from 'src/app/services/entities/anamnesis.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-anamnesis-edit',
  templateUrl: './anamnesis-edit.component.html',
  styleUrls: ['./anamnesis-edit.component.css']
})
export class AnamnesisEditComponent implements OnInit {

  public questionsForm: FormGroup;

  public anamnesisData: any;

  public newQuestion = false;

  public creatingQuestion: boolean;


  constructor(
    private shareDataService: ShareDataService,
    private fb: FormBuilder,
    private anamnesisService: AnamnesisService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.shareDataService.activateLoadingScreen(true);

    this.activatedRoute.params.subscribe(res => {

      this.anamnesisService.get(res.id).subscribe(
        (res) => {
          this.shareDataService.activateLoadingScreen(false);
          this.anamnesisData = res;

        },
        () => {
          this.shareDataService.activateLoadingScreen(false);

        });

    });

    this.questionsForm = this.fb.group({
      question: ['', [Validators.required]],
      type: [1, [Validators.required]],
      line_number: ['', [Validators.required]],
    });

  }

  public submitQuestionData() {
    if (this.questionsForm.valid) {

      this.creatingQuestion = true;


      const formControls = this.questionsForm.controls;

      const questionData = {
        id: this.anamnesisData.id,
        question: formControls.question.value,
        type: formControls.type.value,
        line_number: formControls.line_number.value,
      };


      this.anamnesisService.createAnamnesisQuestion(questionData)
        .subscribe(
          (res) => {
            this.anamnesisData.questions.push(res);
            this.creatingQuestion = false;
            this.questionsForm.reset();
            this.newQuestion = false;

          },
          () => {
            this.creatingQuestion = false;

          }
        );
    }
  }




}