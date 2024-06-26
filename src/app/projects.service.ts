import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, map, pipe } from 'rxjs';
import { ProjectMaterials, Projects, ProjectMaterial, Project, gallery} from '../types';
import { HttpClientModule } from '@angular/common/http';
import { observeNotification } from 'rxjs/internal/Notification';
import { query } from '@angular/animations';

@Injectable({
  providedIn: 'root'
})


export class ProjectsService {

  baseUrl = 'http://10.39.1.10:8082/api/DiyProject/';

  constructor(private http: HttpClient) {}

  getProjects = () : Observable<Project[]> => { 
   
    const apiUrl = this.baseUrl + 'GetProjects/';

    return this.http.get(apiUrl, { 
      responseType : 'json'
    }) as Observable<Project[]>;
  }

  getProjectMaterialsByDiyProjectId = (diyProjectId : number) : Observable<ProjectMaterial[]> => {
    const apiUrl = this.baseUrl + 'GetMaterialsByProjectId_Async/';  
    let queryParams = new HttpParams();
    queryParams = queryParams.append('diyProjectId', diyProjectId); // Append the 'id' 
    return this.http.get(apiUrl, 
                                 { responseType : 'json',
                                  params : queryParams
                                 } 
                        ) as Observable<ProjectMaterial[]>;
  }

  getProjectMaterialByMaterialId = (MaterialId : number) : Observable<ProjectMaterial> => {
    const apiUrl = this.baseUrl + 'GetMaterialByProjectMaterialId_Async/';  
    let queryParams = new HttpParams();
    queryParams = queryParams.append('materialId', MaterialId); // Append the 'id' 
    return this.http.get(apiUrl, 
                                 { responseType : 'json',
                                  params : queryParams
                                 } 
                        ) as Observable<ProjectMaterial>;
  }


  updateProjectById = (project : Project) : Observable<Project> => {
    const apiUrl = this.baseUrl + 'UpdateProject_async/';
  
    const headers = new HttpHeaders().set('Content-Type', 'application/json'); 
    return this.http.put(apiUrl,
                         JSON.stringify(project),
                         { headers, 
                           responseType : 'json' 
                         },
                      ) as Observable<Project>;

  }
  
  updateProjectMaterialById = (projectMaterial : ProjectMaterial) : Observable<ProjectMaterial> => {
    const apiUrl = this.baseUrl + 'UpdateProjectMaterial_async/';
  
    const headers = new HttpHeaders().set('Content-Type', 'application/json'); 
    return this.http.put(apiUrl,
                         JSON.stringify(projectMaterial),
                         { headers, 
                           responseType : 'json' 
                         },
                      ) as Observable<ProjectMaterial>;

  }
 
  AddDiyProject = (project : Project) : Observable<Project> => {
    const apiUrl = this.baseUrl + 'createProject_Async/';
  
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
   
    return this.http.post(apiUrl,
                         JSON.stringify(project),
                         { headers, 
                           responseType : 'json' 
                         },
                      ) as Observable<Project>;

  }

  AddDiyProjectMaterial = (projectMaterial : ProjectMaterial) : Observable<ProjectMaterial> => {
    const apiUrl = this.baseUrl + 'AddProjectMaterial_async/';
  
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(apiUrl,
                         JSON.stringify(projectMaterial),
                         { headers, 
                           responseType : 'json' 
                         },
                      ) as Observable<ProjectMaterial>;

  }
  // will either Add or Update current object vs new object 
  updateProject(currentData : Project, newData : Project) : boolean 
  {    
      currentData.id = newData.id;
      currentData.Name = newData.Name;
      currentData.StartDate = newData.StartDate;
      currentData.FinishDate = newData.FinishDate;
      currentData.thumbnail = newData.thumbnail;
      currentData.addedDate = newData.addedDate;
      currentData.AddedBy = newData.AddedBy;              
    return true;

  }

  updateProjectMaterial(currentData : ProjectMaterial, newData : ProjectMaterial) : boolean 
  {    
      currentData.Id = newData.Id;
      currentData.Name = newData.Name;
      currentData.materialName = newData.materialName;
      currentData.storeName = newData.storeName;
      currentData.diyProjectId = newData.diyProjectId;
      currentData.amount = newData.amount;
      currentData.addedBy = newData.addedBy;
      currentData.added = newData.added;
      currentData.purchaseDate = newData.purchaseDate;
      currentData.quantity = newData.quantity;
                     
    return true;

  }

  getGalleryThumbnails = () : Observable<gallery> => { 

    const apiUrl = this.baseUrl + 'GetProjectThumbnails_Async/';

    return this.http.get(apiUrl, { 
      responseType : 'json'
    }) as Observable<gallery>;
  }

  getGalleryImages = (projectid : number) : Observable<gallery> => { 
       
    const apiUrl = this.baseUrl + 'GetProjectGalleryImagesByProjectId_Async/';
    let queryParams = new HttpParams();
    queryParams = queryParams.append('projectId', projectid); // Append the 'id' 

    return this.http.get(apiUrl, 
      { responseType : 'json',
       params : queryParams
      }) as Observable<gallery>;
  }


  DeleteProjectMaterial = (id : number | undefined, user : string) : void => {
    const apiUrl = this.baseUrl + id;
    const queryParams = new HttpParams()
    .set('user', user);
    console.log('delete service');
    console.log(queryParams);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    this.http.delete(apiUrl,
                         { headers, 
                           params : queryParams
                         },
                      ).subscribe(); 

  }


}