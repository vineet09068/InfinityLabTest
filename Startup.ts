import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {DeviceAppModule} from "./Module/DeviceAppModule";

const plateform=platformBrowserDynamic();
plateform.bootstrapModule(DeviceAppModule)