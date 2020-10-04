<template>
    <div id="hideParts">Hide Web Parts</div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { sp, PermissionKind } from "@pnp/sp";
export interface IHidePartsProps {
    description: string,
    rows: string | string[]
}

@Component
export default class HideParts extends Vue implements IHidePartsProps {

    @Prop()
    public description: string;
    @Prop()
    public rows: string | string[];

    mounted () {
      let loc = String(window.location)
      let mode = "Display"
      if (loc.indexOf('Mode=Edit') > 0) {
        mode = "Edit"
      }
      console.log("MODE: " + mode)
      if (mode === 'Display') {
        
        sp.web.getCurrentUserEffectivePermissions().then(perms => {
          if (sp.web.hasPermissions(perms, PermissionKind.AddListItems)) {
            console.log("You are a member.")
            for(let i = 0; i < this.rows.length; i++ ) {
              if (this.rows[i]["Role"] === "Visitor") {
                let id = "[data-sp-a11y-id='" + this.rows[i]["ID"] + "']"
                let part = document.querySelector(id)
                part.setAttribute("style", "display: none;")
              }
            }
          } else {
            console.log("You are a visitor.")
            for(let i = 0; i < this.rows.length; i++ ) {
              if (this.rows[i]["Role"] === "Member") {
                let id = "[data-sp-a11y-id='" + this.rows[i]["ID"] + "']"
                let part = document.querySelector(id)
                part.setAttribute("style", "display: none;")
              }
            }
          }
        })
        document.getElementById('hideParts').setAttribute("style", "display: none;")
      }
    }

}
</script>

<style lang="scss" module>

</style>


