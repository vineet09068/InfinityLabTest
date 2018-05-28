import {NgModule} from "@angular/core";
import {FormsModule}  from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {InMemoryWebApiModule} from "angular-in-memory-web-api";
import { HttpModule} from '@angular/http';
import {GridComponent} from "../Component/GridComponent";
import {DeviceComponent} from "../Component/DeviceComponent";
import {DeviceInterfaceComponent} from "../Component/DeviceInterfaceComponent";
import {Ng2PaginationModule} from '../ng2-pagination'; 
import {RouterModule,Routes} from "@angular/router";

@NgModule({
    imports:[BrowserModule,Ng2PaginationModule,FormsModule,HttpModule],
    declarations:[DeviceComponent,GridComponent,DeviceInterfaceComponent],
    bootstrap:[DeviceComponent]
})

export class DeviceAppModule {


}