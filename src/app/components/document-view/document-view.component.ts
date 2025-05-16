import { TranslateService } from '@ngx-translate/core';
import { first } from 'rxjs/operators';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ApplicationPresenterAPI, ApplicationPresenter, RobotSettings } from '@universal-robots/contribution-api';
import { DocumentViewNode } from './document-view.node';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PATH } from 'src/generated/contribution-constants';

@Component({
    templateUrl: './document-view.component.html',
    styleUrls: ['./document-view.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class DocumentViewComponent implements ApplicationPresenter, OnChanges {
    // applicationAPI is optional
    @Input() applicationAPI: ApplicationPresenterAPI;
    // robotSettings is optional
    @Input() robotSettings: RobotSettings;
    // applicationNode is required
    @Input() applicationNode: DocumentViewNode;

    constructor(
        protected readonly translateService: TranslateService,
        protected readonly cd: ChangeDetectorRef,
        private sanitizer: DomSanitizer
    ) {
    }
    pdfSafeURL: SafeResourceUrl;       

    ngOnInit(): void {
        this.pdfSafeURL = this.sanitizer.bypassSecurityTrustResourceUrl(PATH + '/assets/docs/UR5e_User_Manual_en_Global.pdf');
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes?.robotSettings) {
            if (!changes?.robotSettings?.currentValue) {
                return;
            }

            if (changes?.robotSettings?.isFirstChange()) {
                if (changes?.robotSettings?.currentValue) {
                    this.translateService.use(changes?.robotSettings?.currentValue?.language);
                }
                this.translateService.setDefaultLang('en');
            }

            this.translateService
                .use(changes?.robotSettings?.currentValue?.language)
                .pipe(first())
                .subscribe(() => {
                    this.cd.detectChanges();
                });
        }
    }



    // call saveNode to save node parameters
    saveNode() {
        this.cd.detectChanges();
        this.applicationAPI.applicationNodeService.updateNode(this.applicationNode);
    }
}
