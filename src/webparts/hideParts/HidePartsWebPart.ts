import { Version } from '@microsoft/sp-core-library';
import {
    BaseClientSideWebPart,
    IPropertyPaneConfiguration,
    PropertyPaneTextField,
    PropertyPaneDropdown
  } from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';
import { PropertyPanePropertyEditor } from '@pnp/spfx-property-controls/lib/PropertyPanePropertyEditor';
import * as strings from 'HidePartsWebPartStrings';

import { sp } from "@pnp/sp";
import Vue from 'vue';
require('./assets/styles.css');
import HidePartsComponent from './components/HideParts.vue';

export interface IHidePartsWebPartProps {
  description: string;
  rows: string | string [];
}

export default class HidePartsWebPart extends BaseClientSideWebPart<IHidePartsWebPartProps> {

  public onInit(): Promise<void> {
    sp.setup({
      spfxContext: this.context
    });
    
    console.log("Super onInit called: " + this.context.pageContext.web.absoluteUrl);

    return Promise.resolve();
  }

  public render(): void {
    const id: string = `wp-${this.instanceId}`;
    this.domElement.innerHTML = `<div id="${id}"></div>`;

    let el = new Vue({
      el: `#${id}`,
      render: h => h(HidePartsComponent, {
        props: {
          description: this.properties.description,
          rows: this.properties.rows
        }
      })
    });
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
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
  }
}
