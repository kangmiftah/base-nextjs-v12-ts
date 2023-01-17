import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { useEffect } from "react";
interface PropsType {
   id: string;
   height?: number;
}

export default function ({ height=400, ...props}: PropsType): JSX.Element {
   useEffect(function () {
      // Create chart instance
      let chart = am4core.create(props.id, am4charts.XYChart);

      // Add data
      chart.data = [
         {
            country: "Lithuania",
            litres: 501.9,
         },
         {
            country: "Czech Republic",
            litres: 301.9,
         },
         {
            country: "Ireland",
            litres: 201.1,
         },
         {
            country: "Germany",
            litres: 165.8,
         },
         {
            country: "Australia",
            litres: 139.9,
         },
         {
            country: "Austria",
            litres: 128.3,
         },
         {
            country: "UK",
            litres: 99,
         },
         {
            country: "Belgium",
            litres: 60,
         },
         {
            country: "The Netherlands",
            litres: 50,
         },
      ];

      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "country";
      categoryAxis.title.text = "Countries";
      
      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.title.text = "Litres sold (M)";
      
      let series = chart.series.push(new am4charts.ColumnSeries());
      series.name = "Sales";
      series.columns.template.tooltipText = "Series: {name}\nCategory: {categoryX}\nValue: {valueY}";
      series.columns.template.fill = am4core.color("#104547"); // fill
      series.dataFields.valueY = "litres";
      series.dataFields.categoryX = "country";
      
   },[])

   return <div style={{ height }} id={props.id}></div>;
}
