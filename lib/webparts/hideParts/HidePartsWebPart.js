var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart, PropertyPaneTextField } from '@microsoft/sp-webpart-base';
import { PropertyPanePropertyEditor } from '@pnp/spfx-property-controls/lib/PropertyPanePropertyEditor';
import * as strings from 'HidePartsWebPartStrings';
import { sp } from "@pnp/sp";
import Vue from 'vue';
require('./assets/styles.css');
import HidePartsComponent from './components/HideParts.vue';
var HidePartsWebPart = /** @class */ (function (_super) {
    __extends(HidePartsWebPart, _super);
    function HidePartsWebPart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HidePartsWebPart.prototype.onInit = function () {
        sp.setup({
            spfxContext: this.context
        });
        console.log("Super onInit called: " + this.context.pageContext.web.absoluteUrl);
        return Promise.resolve();
    };
    HidePartsWebPart.prototype.render = function () {
        var _this = this;
        var id = "wp-" + this.instanceId;
        this.domElement.innerHTML = "<div id=\"" + id + "\"></div>";
        var el = new Vue({
            el: "#" + id,
            render: function (h) { return h(HidePartsComponent, {
                props: {
                    description: _this.properties.description,
                    rows: _this.properties.rows
                }
            }); }
        });
    };
    Object.defineProperty(HidePartsWebPart.prototype, "dataVersion", {
        get: function () {
            return Version.parse('1.0');
        },
        enumerable: true,
        configurable: true
    });
    HidePartsWebPart.prototype.getPropertyPaneConfiguration = function () {
        return {
            pages: [
                {
                    header: {
                        description: strings.PropertyPaneDescription
                    },
                    groups: [
                        {
                            groupName: strings.BasicGroupName,
                            groupFields: [
                                PropertyPaneTextField('description', {
                                    label: strings.DescriptionFieldLabel
                                }),
                                PropertyPanePropertyEditor({
                                    webpart: this,
                                    key: 'propertyEditor'
                                })
                            ]
                        }
                    ]
                }
            ]
        };
    };
    return HidePartsWebPart;
}(BaseClientSideWebPart));
export default HidePartsWebPart;
//# sourceMappingURL=HidePartsWebPart.js.map