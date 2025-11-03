import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produto } from '../shared/models/produto';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cards.html',
  styleUrl: './cards.scss',
})
export class Cards {
  @Input() produto!: Produto;
}
