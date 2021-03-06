import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {DataTransferService} from "../../../services/data-transfer.service";

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  page = 1
  totalPages = 1

  constructor(private router: Router, private dataTransfer: DataTransferService, private activatedRoute: ActivatedRoute) {

    this.activatedRoute.queryParams.subscribe(value => {

      ///SET PAGE FROM URL
      this.page = +value?.page
      const queryParams: Params = {page: value.page};
      this.router.navigate([], {relativeTo: activatedRoute, queryParams: queryParams})
      this.dataTransfer.store.subscribe(value => {
        this.totalPages = value.totalPages
      })

    })

  }

  ngOnInit(): void {
    this.router.navigate([], {relativeTo: this.activatedRoute, queryParams: {page: 1}})
  }

//CHANGE PAGE FROM BUTTON

  changePage(number: number) {

    if (!(this.page < 1 && this.page<this.totalPages) ) {
        this.page = (this.page + number)
        this.dataTransfer.store.next({...this.dataTransfer.store.getValue(),currentPage: this.page, totalPages: this.totalPages})
        const queryParams: Params = {page: this.page};

        this.router.navigate([], {relativeTo: this.activatedRoute, queryParams: queryParams})


    } else {
      this.page = this.totalPages
    }


  }

//CHANGE PAGE FROM INPUT
  changePageFromInput({target}: any) {

    if (+target.value > this.totalPages) {
      target.value = this.totalPages
      this.page = +target.value
      const queryParams: Params = {page: this.page};
      this.dataTransfer.store.next({...this.dataTransfer.store.getValue(),currentPage: this.page, totalPages: this.totalPages})

      this.router.navigate([], {queryParams: queryParams})

    } else {

      this.page = +target.value
      this.dataTransfer.store.next({...this.dataTransfer.store.getValue(),currentPage: this.page, totalPages: this.totalPages})
      const queryParams: Params = {page: this.page};
      this.router.navigate([], {queryParams: queryParams})
    }

  }
}
