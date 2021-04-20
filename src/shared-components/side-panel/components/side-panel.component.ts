import { Component, Input } from '@angular/core';
import { IPlayerOverview } from '../../../app/models/players.interface';

@Component({
    selector: 'app-side-panel',
    templateUrl: './side-panel.component.html',
    styleUrls: ['./side-panel.component.scss']
})
export class SidePanelComponent {
    @Input()
    player: IPlayerOverview;
}
