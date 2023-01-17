import { actionType } from "../../@types/components/table-grid";
import { layoutStateType } from "../../@types/redux";

export function generateActionListFunction(
   actionSelected: layoutStateType["actionSelected"],
   actions: any,
   onRenderActions: any,
): actionType[] {
   return (actionSelected || [])
      .filter((v) => {
         return v.type === "DROPDOWN_IN_LIST";
      })
      .map((act, inAct) => {
         let onRender: (item?: any) => boolean = () => true;
         if (act.on_render) {
            onRender = onRenderActions[act.on_render as keyof typeof onRenderActions];
         }
         return {
            name: act.name,
            onClick: actions[act.function_name as keyof typeof actions],
            onRender,
            className: act.class_name,
         };
      });
}
