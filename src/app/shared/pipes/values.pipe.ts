import { PipeTransform, Pipe } from '@angular/core'
import { Product } from 'src/app/data-structures/product';
import { DoubleLinkedList } from 'src/app/data-structures/double-linked-list';

@Pipe({ name: 'values' })
export class ValuesPipe implements PipeTransform {
  transform(list: DoubleLinkedList<Product>, args: string[]): any {
    let values: Product[] = [];
    let current_node = list.head;
    while(current_node != null){
      values.push(current_node.key);
      current_node = current_node.next;
    }
    return values
  }
}