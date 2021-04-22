import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'pmtListFilter'
})
export class PmtListFilterPipe implements PipeTransform {
  transform(originalList: any[], propertyToFilterOn: string, searchFilter: string): any[] {
    return !!searchFilter ?
      originalList.filter(item => item[propertyToFilterOn].toLowerCase().lastIndexOf(searchFilter.toLowerCase()) > -1) :
      originalList;
  }
}