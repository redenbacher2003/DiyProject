export interface Projects {
  items: Project[];
  total: number;
  page: number;
  perpage: number;
  totalPages: number;
}

export interface Project {
  id?: number;
  Name: string;
  StartDate: string;
  FinishDate: string;
  addedDate: string;
  AddedBy: string;
  thumbnail: string;
}

export interface ProjectMaterials {
  items: ProjectMaterial[];
  total: number;
}

export interface ProjectMaterial {
  Id?: number;
  Name: string;
  diyProjectId?: number;
  materialName: string;
  quantity: number;
  amount: number;
  storeName: string;
  purchaseDate: string;
  added: string;
  addedBy: string;
}

export interface responsiveOptions {
  breakpoint: string;
  numVisible: number;
  numScroll: number;
}


export interface galleries {
  galleries : gallery[]
}

export interface gallery {
  id : number;
  ProjectId : number;
  imageType : string; 
  image : string;
  imageThumbnail : string;
}
