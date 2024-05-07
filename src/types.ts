export interface Projects {
    items : Project[];
    total : number;
    page : number;
    perpage : number;
    totalPages : number;
}

export interface Project {
   
    id?  : number; 
    Name : string;
    StartDate : string;
    FinishDate : string;
    Added : string;
    AddedBy : string;
    thumbnail : string;
}

export interface ProjectMaterials {
    items : ProjectMaterial[] 
    total : number;
}
export interface ProjectMaterialx {

    materialName : string;
    quantity : number;
    amount : number;
    StoreName : string;
    purchaseDate : string;
}

export interface ProjectMaterial {

    id? : number;
    Name : string;
    diyProjectId : number;
    materialName : string;
    quantity : number;
    amount : number;
    StoreName : string;
    purchaseDate : string;
    added : string;
    addedBy : string
}

export interface responsiveOptions 
    {
        breakpoint: string; 
        numVisible: number; 
        numScroll: number;
    }
