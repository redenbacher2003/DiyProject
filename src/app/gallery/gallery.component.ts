import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import { ProjectsService } from '../projects.service';
import { gallery, galleries, Project } from '../../types';
import { DialogModule } from 'primeng/dialog';
import { AvatarModule} from 'primeng/avatar';

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [GalleriaModule, DialogModule, AvatarModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss'
})
export class GalleryComponent {
  
  @Input() display : boolean = false;
  @Input() project!: Project;
  @Input() header : string = "";
  @Output() valueChange = new EventEmitter<boolean>();
  @Output() displayChange = new EventEmitter<boolean>();

  projectId : number | undefined; 
  images: any = [];
  responsiveOptions: any[] | undefined;
  
  constructor(private projectsService: ProjectsService) {}

  ngOnChanges() {

    this.projectId = 2;   
    console.log('gallery id : '  + this.projectId);
    this.projectsService.getGalleryImages(this.projectId).subscribe((data : any) => 
        { 
            this.images = data  
            console.log('data :' + this.images);
        }); 
    
        this.responsiveOptions = [
            {
                breakpoint: '1024px',
                numVisible: 5
                },
                {
                    breakpoint: '768px',
                    numVisible: 3
                },
                {
                    breakpoint: '560px',
                    numVisible: 1
                }
        ];

    }

    getImgSrc(image : string): string {
        return 'http://10.39.1.10:8082/images/gallery/' + image;
    }
    cancel(){
        this.display = false;
        this.displayChange.emit(this.display);
    }

}
