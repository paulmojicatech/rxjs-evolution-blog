import { Component, Input } from '@angular/core';
import { IPlayerOverview } from '../../../app/models/players.interface';

@Component({
    selector: 'app-side-panel',
    templateUrl: './side-panel.component.html',
})
export class SidePanelComponent {
    @Input()
    player: IPlayerOverview;
}
