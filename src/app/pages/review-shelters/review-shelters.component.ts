import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Shelter, ShelterProp } from 'src/app/models/shelter';
import { ShelterService } from 'src/app/services/shelter.service';

@Component({
  selector: 'app-review-shelters',
  templateUrl: './review-shelters.component.html',
  styleUrls: ['./review-shelters.component.css'],
})
export class ReviewSheltersComponent implements OnInit {
  pendingShelters: Array<Shelter> = [];
  shelterToApprove: Shelter;
  constructor(
    private shelterService: ShelterService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.shelterService.getPending().subscribe({
      next: (data: Array<ShelterProp>) => {
        this.pendingShelters = data.map(
          (shelterProp) => new Shelter(shelterProp)
        );
      },
    });
  }
  approve(): boolean {
    this.shelterService.approveShelter(this.shelterToApprove).subscribe({
      next: (data) => {
        this.pendingShelters = this.pendingShelters.filter(
          (element) => element.getId() != this.shelterToApprove.getId()
        );
      },
      error: (err) => {
        console.log(err);
        return false;
      },
    });
    return true;
  }
  open(content: any, shelter: Shelter) {
    this.shelterToApprove = shelter;
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
}
