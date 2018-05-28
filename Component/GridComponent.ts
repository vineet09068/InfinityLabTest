
import { Component, Input,Output,EventEmitter } from "@angular/core";


@Component({
selector:"grid-ui",
templateUrl:"../UI/Grid.html"
})

export class GridComponent{
    gridColumns:Array<Object>=new Array<Object>();
    girdData:Array<Object>=new Array<Object>();
    shouldView :Boolean=false;
    peginationId:string
@Input("grid-columns")
set setGridColums(_gridColumns:Array<Object>){
this.gridColumns=_gridColumns;
}
@Input("pegination-id")
set setPeginationId(_peginationId:string){
this.peginationId=_peginationId;
}
@Input("ViewButton")
set setShouldView(_shouldView:boolean){
this.shouldView=_shouldView;
}

@Input("grid-data")
set setGridDataSet(_gridData:Array<Object>){
    if(_gridData!==null)
      this.girdData=_gridData.map((data,index) => Object.assign({}, data, data["SR NO"]=index+1));
   }

@Output("grid-selected")
selected:EventEmitter<Object>=new EventEmitter();

SelectedRow(_selected:Object){
    _selected["action"]="select";
    this.selected.emit(_selected);
}
DeleteRow(_selected:Object){
      _selected["action"]="delete";
    this.selected.emit(_selected);
}
ViewRow(_selected:Object){
    _selected["action"]="view";
    this.selected.emit(_selected);
}

}
